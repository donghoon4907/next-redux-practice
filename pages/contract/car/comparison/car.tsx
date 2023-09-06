import type { NextPage } from 'next';
import type { ChangeEvent } from 'react';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker } from 'rsuite';
import addMonths from 'date-fns/addMonths';
import { MySelect } from '@components/select';
import { MyInput } from '@components/input';
import { MyRadio } from '@components/radio';
import { MyLayout } from '@components/Layout';
import { MyButton } from '@components/button';
import { MyCheckbox } from '@components/checkbox';
import { CAR_LOCALE, CAR_USAGE } from '@constants/options/car';
import { useSelect } from '@hooks/use-select';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { isNumberic } from '@utils/validation';
import { CoreSelectOption } from '@interfaces/core';
import { MyFooter } from '@components/footer';
import { MyLabel } from '@components/label';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';

function getGender(residentNumber: string) {
    var genderNumber = parseInt(residentNumber);

    if (genderNumber % 2 === 0) {
        return '여성';
    } else {
        return '남성';
    }
}

function getAge(residentNumber: string, genderNumber: string): number {
    // 주민번호 앞 7자리를 추출합니다.
    const birthDate = residentNumber.substring(0, 6);
    // 2000년대생 여부
    const isMbaby = Number(genderNumber) >= 3;

    // 현재 날짜를 가져옵니다.
    const currentDate = new Date();

    // 생년월일을 추출합니다.
    const birthYear = Number(birthDate.substring(0, 2));
    const birthMonth = Number(birthDate.substring(2, 4));
    const birthDay = Number(birthDate.substring(4, 6));

    // 현재 날짜를 이용하여 만 나이를 계산합니다.
    let age = currentDate.getFullYear() - ((isMbaby ? 2000 : 1900) + birthYear);

    // 생일이 지났는지 체크합니다.
    if (
        birthMonth < currentDate.getMonth() + 1 ||
        (birthMonth === currentDate.getMonth() + 1 &&
            birthDay <= currentDate.getDate())
    ) {
        // 생일이 지났으면 나이를 1 증가시킵니다.
        age++;
    }

    return age - 1;
}

const ComparisonEstimate: NextPage = () => {
    const dispatch = useDispatch();
    // 주민번호 앞자리
    const [startResidentNum, setStartResidentNum] = useState('');
    // 주민번호 뒷자리
    const [endResidentNum, setEndResidentNum] = useState('');
    const endResidentNumRef = useRef<HTMLInputElement>(null);
    // 주민번호 피드백
    const [residentNumFeedback, setResidentNumFeedback] = useState('');
    // 차량 번호 - 지역
    const [carLocale, setCarLocale] = useSelect(CAR_LOCALE);
    // 차량 번호 - 차종
    const [carType, setCarType] = useNumbericInput('', { maxLength: 3 });
    // 차량 번호 - 용도
    const [carUsage, setCarUsage] = useSelect(CAR_USAGE);
    // 차량 번호 - 등록 번호
    const [carRegiNum, setCarRegiNum] = useNumbericInput('', { maxLength: 4 });
    // 차량 번호 - 직접입력
    const [directCarNum] = useInput('');
    // const directCarNumRef = useRef<HTMLInputElement>(null);
    // 가입예정일 - start
    const [startJoinDate, setStartJoinDate] = useState<Date | null>(new Date());
    // 가입예정일 - end
    const [endJoinDate, setEndJoinDate] = useDatepicker(
        addMonths(new Date(), 12),
    );

    const handleChangeStartResidentNum = (
        evt: ChangeEvent<HTMLInputElement>,
    ) => {
        const { value } = evt.target;

        // 공백인 경우 상태만 변화
        if (value === '') {
            setStartResidentNum(value);
            return;
        }

        // 최대 6자리 숫자가 입력되어야함
        if (isNumberic(value) && value.length < 7) {
            setStartResidentNum(value);
        }

        // 6자리 입력 시 주민번호 뒷자리 입력창으로 포커싱
        if (value.length === 6) {
            endResidentNumRef.current?.focus();
        }
    };

    const handleChangeEndResidentNum = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;
        // 공백인 경우 상태만 변화
        if (value === '') {
            setEndResidentNum(value);
            return;
        }

        // 숫자만 입력 허용
        if (!isNumberic(value)) {
            return;
        }

        // 1자리 이상 입력되지 않게 수정
        if (value.length < 2) {
            setEndResidentNum(value);
        }
    };

    const handleBlurEndResidentNum = () => {
        let message;
        let age;
        let gender;
        // 주민번호 앞자리가 6자리의 숫자인지 검증
        if (startResidentNum.length === 6 && isNumberic(startResidentNum)) {
            // 주민번호 뒷자리가 1자리의 숫자인지 검증
            if (endResidentNum.length === 1 && isNumberic(endResidentNum)) {
                age = getAge(startResidentNum, endResidentNum);

                gender = getGender(endResidentNum);

                message = `(만 ${age}세 ${gender})`;
            } else {
                message = '주민번호 뒷자리를 확인하세요';
            }
        } else {
            message = '주민번호 앞자리를 확인하세요';
        }

        setResidentNumFeedback(message);
    };

    const handleBlurDirectCarNum = () => {
        // 입력을 하지 않은 경우
        if (directCarNum.value === '') {
            return;
        }
        // 차량번호 정규식(지역 포함, 미포함)
        const regex = [
            /^([가-힣]{2})([0-9]{2,3})([가-힣]{1})([0-9]{4})$/,
            /^([0-9]{2,3})([가-힣]{1})([0-9]{4})$/,
        ];

        let feedback = null;
        let nextLocale: CoreSelectOption | null = null;
        let nextType: string | null = null;
        let nextUsage: CoreSelectOption | null = null;
        let nextRegiNum: string | null = null;
        // 정규식 매칭 여부
        let isMatch = false;
        for (let i = 0; i < regex.length; i++) {
            const matches = regex[i].exec(directCarNum.value);

            if (matches) {
                isMatch = true;

                let inputLocale = '';
                let inputType = '';
                let inputUsage = '';
                let inputRegiNum = '';
                if (i === 0) {
                    [, inputLocale, inputType, inputUsage, inputRegiNum] =
                        matches;

                    const findIndex = CAR_LOCALE.findIndex(
                        (v) => v.label === inputLocale,
                    );

                    if (findIndex === -1) {
                        feedback = '허용되지 않은 지역을 입력하였습니다.';

                        break;
                    } else {
                        nextLocale = CAR_LOCALE[findIndex];
                    }
                } else if (i === 1) {
                    [, inputType, inputUsage, inputRegiNum] = matches;
                }

                if (isNumberic(inputType)) {
                    nextType = inputType;
                } else {
                    feedback = '차종을 확인하세요';

                    break;
                }

                const findIndex = CAR_USAGE.findIndex(
                    (v) => v.label === inputUsage,
                );
                if (findIndex === -1) {
                    feedback = '허용되지 않은 용도를 입력하였습니다.';

                    break;
                } else {
                    nextUsage = CAR_USAGE[findIndex];
                }

                if (isNumberic(inputRegiNum)) {
                    nextRegiNum = inputRegiNum;
                } else {
                    feedback = '등록번호를 확인하세요';

                    break;
                }

                break;
            }
        }

        if (!isMatch || feedback !== null) {
            alert('차량번호를 확인하세요.');
            console.log(feedback);
        } else {
            if (nextLocale) {
                setCarLocale(nextLocale);
            }

            if (nextType) {
                setCarType(nextType);
            }

            if (nextUsage) {
                setCarUsage(nextUsage);
            }

            if (nextRegiNum) {
                setCarRegiNum(nextRegiNum);
            }
        }
    };

    const handleChangeStartJoinDate = (value: Date | null) => {
        if (value) {
            setEndJoinDate(addMonths(value, 12));
        }

        setStartJoinDate(value);
    };

    const handleClickToday = () => {
        setStartJoinDate(new Date());

        setEndJoinDate(addMonths(new Date(), 12));
    };

    return (
        <>
            <Head>
                <title>비교견적(자동차)</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className="wr-pages-comparison-estimate wr-frame__section">
                    <div className="wr-pages-comparison-estimate__header row wr-mt">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-3">
                                    <MyLabel>지점</MyLabel>
                                    <MySelect
                                        inputId="point"
                                        options={[]}
                                        value={null}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="col-3">
                                    <div className="wr-ml">
                                        <MyLabel>팀</MyLabel>
                                        <MySelect
                                            inputId="point"
                                            options={[]}
                                            value={null}
                                            onChange={() => {}}
                                        />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="wr-ml">
                                        <MyLabel>구성원</MyLabel>
                                        <MySelect
                                            inputId="point"
                                            options={[]}
                                            value={null}
                                            onChange={() => {}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6"></div>
                                <div className="col-3">
                                    <MyLabel>담당</MyLabel>
                                    <MySelect
                                        inputId="point"
                                        options={[]}
                                        value={null}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="col-3">
                                    <div className="wr-ml">
                                        <MyLabel>처리상태</MyLabel>
                                        <MySelect
                                            inputId="point"
                                            options={[]}
                                            value={null}
                                            onChange={() => {}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row wr-pages-comparison-estimate__body wr-mt">
                        <div className="col wr-pages-comparison-estimate__left">
                            <div className="wr-pages-comparison-estimate__block customer">
                                <div className="wr-pages-comparison-estimate__title customer">
                                    <h3>고객기본정보</h3>
                                </div>
                                <div className="wr-pages-comparison-estimate__list">
                                    <div className="wr-pages-comparison-estimate__item customer">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label htmlFor="residentNum">
                                                주민번호
                                            </label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description customer">
                                            <div style={{ width: 150 }}>
                                                <MyInput
                                                    id="residentNum"
                                                    type="text"
                                                    pattern="[0-9]{6}"
                                                    onChange={
                                                        handleChangeStartResidentNum
                                                    }
                                                    value={startResidentNum}
                                                />
                                            </div>
                                            <div>-</div>
                                            <div style={{ width: 35 }}>
                                                <MyInput
                                                    type="text"
                                                    pattern="[0-9]{1}"
                                                    ref={endResidentNumRef}
                                                    onChange={
                                                        handleChangeEndResidentNum
                                                    }
                                                    onBlur={
                                                        handleBlurEndResidentNum
                                                    }
                                                    value={endResidentNum}
                                                />
                                            </div>
                                            <div>******</div>
                                            <div>{residentNumFeedback}</div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item customer">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label htmlFor="carnum">
                                                차량번호
                                            </label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description customer">
                                            <div style={{ width: 110 }}>
                                                <MySelect
                                                    inputId="carnum"
                                                    {...carLocale}
                                                />
                                            </div>
                                            <div style={{ width: 60 }}>
                                                <MyInput
                                                    type="text"
                                                    placeholder="999"
                                                    pattern="[0-9]{2,3}"
                                                    {...carType}
                                                />
                                            </div>
                                            <div style={{ width: 70 }}>
                                                <MySelect {...carUsage} />
                                            </div>
                                            <div style={{ width: 70 }}>
                                                <MyInput
                                                    type="text"
                                                    placeholder="9999"
                                                    pattern="[0-9]{4}"
                                                    {...carRegiNum}
                                                />
                                            </div>
                                            <div style={{ width: 150 }}>
                                                <MyInput
                                                    type="text"
                                                    placeholder="직접입력"
                                                    // ref={directCarNumRef}
                                                    onBlur={
                                                        handleBlurDirectCarNum
                                                    }
                                                    {...directCarNum}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item customer">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>가입예정일</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description customer">
                                            <DatePicker
                                                oneTap
                                                format="yyyy-MM-dd"
                                                style={{ width: 150 }}
                                                size="sm"
                                                placeholder="시작일 선택"
                                                value={startJoinDate}
                                                onChange={
                                                    handleChangeStartJoinDate
                                                }
                                            />
                                            <div style={{ width: 40 }}>
                                                <MyButton
                                                    className="btn-warning wr-pages-comparison-estimate__button"
                                                    onClick={handleClickToday}
                                                >
                                                    오늘
                                                </MyButton>
                                            </div>
                                            <div>~</div>
                                            <DatePicker
                                                oneTap
                                                format="yyyy-MM-dd"
                                                style={{ width: 150 }}
                                                size="sm"
                                                placeholder="마감일 선택"
                                                {...endJoinDate}
                                            />
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item customer">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>개발원조회</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description customer">
                                            <div style={{ width: 50 }}>
                                                <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                                                    현대
                                                </MyButton>
                                            </div>
                                            <div style={{ width: 70 }}>
                                                <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                                                    DB&#40;신규&#41;
                                                </MyButton>
                                            </div>
                                            <div style={{ width: 70 }}>
                                                <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                                                    DB&#40;갱신&#41;
                                                </MyButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item customer">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>고객명</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description customer">
                                            <div style={{ width: 230 }}>
                                                <MyInput placeholder="홍길동" />
                                            </div>
                                            <div style={{ width: 100 }}>
                                                <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                                                    고객상세사항
                                                </MyButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item customer">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>차량용도</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description customer">
                                            <MyRadio
                                                id="usage1"
                                                name="usage"
                                                label="출퇴근용(영리)"
                                            />
                                            <MyRadio
                                                id="usage2"
                                                name="usage"
                                                label="사업용(비영리)"
                                            />
                                            <MyRadio
                                                id="usage3"
                                                name="usage"
                                                label="종교단체"
                                            />
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item customer">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>가족한정</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description customer">
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'가족+형제'}
                                                />
                                            </div>
                                            <div>어린이특약</div>
                                            <div style={{ width: 100 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'선택'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item customer">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>운전자연령</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description customer">
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'만26세이상'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item customer">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>납입방법</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description customer">
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'일시납'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item customer">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>물적사고 할증</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description customer">
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'200만원'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item customer">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>전보험사</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description customer">
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="메리츠"
                                                />
                                            </div>
                                            <div>전계약 NO</div>
                                            <div style={{ width: 100 }}>
                                                <MyInput placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate__block vehicle wr-mt">
                                <div className="wr-pages-comparison-estimate__title vehicle">
                                    <h3>차량사항</h3>
                                </div>
                                <div className="wr-pages-comparison-estimate__list">
                                    <div className="wr-pages-comparison-estimate__item vehicle">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>차명코드</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description vehicle">
                                            <div style={{ width: 150 }}>
                                                <MyInput placeholder="500202" />
                                            </div>
                                            <div style={{ width: 40 }}>
                                                <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                                                    조회
                                                </MyButton>
                                            </div>
                                            <div style={{ width: 70 }}>
                                                <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                                                    안전옵션
                                                </MyButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item vehicle">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>차량형태</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description vehicle">
                                            <MyCheckbox
                                                id="lpg"
                                                label="LPG차량"
                                            />
                                            <MyCheckbox id="top" label="탑차" />
                                            <MyCheckbox
                                                id="sports"
                                                label="스포츠카"
                                            />
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="아니오"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item vehicle">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>차량연식</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description vehicle">
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="2022"
                                                />
                                            </div>
                                            <div>년식</div>
                                            <div>차량등록일</div>
                                            <DatePicker
                                                oneTap
                                                format="yyyy-MM-dd"
                                                style={{ width: 150 }}
                                                size="sm"
                                                placeholder="2022-01-01"
                                            />
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item vehicle">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>차량명</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description vehicle">
                                            <MyInput placeholder="차량명" />
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item vehicle">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>차량등급</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description vehicle">
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="11등급"
                                                />
                                            </div>
                                            <div>배기량(승차정원)</div>
                                            <div style={{ width: 150 }}>
                                                <MyInput
                                                    placeholder="1200"
                                                    unit="cc(명)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item vehicle">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>차량구분</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description vehicle">
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="==차종선택=="
                                                    isDisabled
                                                />
                                            </div>
                                            <div>차량구매형태</div>
                                            <div style={{ width: 100 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="신차"
                                                    isDisabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item vehicle">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>기본부속1</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description vehicle">
                                            <MyCheckbox
                                                id="auto"
                                                label="오토"
                                            />
                                            <MyCheckbox id="abs" label="ABS" />
                                            <MyCheckbox
                                                id="emobil"
                                                label="이모빌"
                                            />
                                            <div>에어백</div>
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="운전석 에어백"
                                                    isDisabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item vehicle">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>기본부속2</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description vehicle">
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'충돌없음'}
                                                />
                                            </div>
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'차선없음'}
                                                />
                                            </div>
                                            <MyCheckbox
                                                id="blackbox"
                                                label="블랙박스"
                                            />
                                            <MyCheckbox
                                                id="bluelink"
                                                label="블루링크"
                                            />
                                            <MyCheckbox
                                                id="intsafe"
                                                label="지능형안전"
                                            />
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item vehicle">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>추가부속</label>
                                            <div style={{ width: 70 }}>
                                                <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                                                    선택옵션
                                                </MyButton>
                                            </div>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description vehicle">
                                            <div style={{ width: '100%' }}>
                                                <div className="row">
                                                    <div className="wr-pages-comparison-estimate__with col-6">
                                                        <div
                                                            style={{
                                                                flex: 1,
                                                            }}
                                                        >
                                                            <MyInput />
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: 150,
                                                            }}
                                                        >
                                                            <MyInput
                                                                placeholder="0"
                                                                unit="만원"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="wr-pages-comparison-estimate__with col-6">
                                                        <div
                                                            style={{
                                                                flex: 1,
                                                            }}
                                                        >
                                                            <MyInput />
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: 150,
                                                            }}
                                                        >
                                                            <MyInput
                                                                placeholder="0"
                                                                unit="만원"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row wr-mt">
                                                    <div className="wr-pages-comparison-estimate__with col-6">
                                                        <div
                                                            style={{
                                                                flex: 1,
                                                            }}
                                                        >
                                                            <MyInput />
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: 150,
                                                            }}
                                                        >
                                                            <MyInput
                                                                placeholder="0"
                                                                unit="만원"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="wr-pages-comparison-estimate__with col-6">
                                                        <div
                                                            style={{
                                                                flex: 1,
                                                            }}
                                                        >
                                                            <MyInput />
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: 150,
                                                            }}
                                                        >
                                                            <MyInput
                                                                placeholder="0"
                                                                unit="만원"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row wr-mt">
                                                    <div className="wr-pages-comparison-estimate__with col">
                                                        <div
                                                            style={{
                                                                flex: 1,
                                                            }}
                                                        >
                                                            <MyInput />
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: 150,
                                                            }}
                                                        >
                                                            <MyInput
                                                                placeholder="0"
                                                                unit="만원"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item vehicle">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>차량가액</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description vehicle">
                                            <div style={{ width: 100 }}>
                                                <MyInput
                                                    placeholder=""
                                                    unit="만원"
                                                />
                                            </div>
                                            <div>부속가액</div>
                                            <div style={{ width: 100 }}>
                                                <MyInput
                                                    placeholder=""
                                                    unit="만원"
                                                />
                                            </div>
                                            <div>일부담보</div>
                                            <div style={{ width: 100 }}>
                                                <MyInput
                                                    placeholder=""
                                                    unit="만원"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item vehicle">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>기타사항</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description vehicle">
                                            <div>유상운송</div>
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="없음"
                                                />
                                            </div>
                                            <div>기중기장치요율</div>
                                            <div style={{ width: 100 }}>
                                                <MyInput
                                                    placeholder=""
                                                    unit="%"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate__block guarantee wr-mt">
                                <div className="wr-pages-comparison-estimate__title guarantee">
                                    <div className="wr-pages-comparison-estimate__with">
                                        <h3>세부 담보 설정</h3>
                                        <div style={{ width: 70 }}>
                                            <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                                                책임보험
                                            </MyButton>
                                        </div>
                                        <div style={{ width: 70 }}>
                                            <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                                                기본담보
                                            </MyButton>
                                        </div>
                                    </div>
                                </div>
                                <div className="wr-pages-comparison-estimate__list">
                                    <div className="wr-pages-comparison-estimate__item guarantee">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>대인배상I</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description guarantee extension">
                                            <div>의무가입</div>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>대인배상II</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description guarantee">
                                            <div style={{ width: 200 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="가입안함"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item guarantee">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>대물한도</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description guarantee extension">
                                            <div style={{ width: 200 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="2천만원"
                                                />
                                            </div>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>자손/자상</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description guarantee">
                                            <div style={{ width: 200 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="가입안함"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item guarantee">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>무보험차</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description guarantee extension">
                                            <div style={{ width: 200 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="가입안함"
                                                />
                                            </div>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>자기차량</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description guarantee">
                                            <div style={{ width: 200 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="가입안함"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item guarantee">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>긴급출동</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description guarantee extension">
                                            <div style={{ width: 200 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="아니요"
                                                />
                                            </div>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>긴급출동세부</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description guarantee">
                                            <div style={{ width: 200 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="전체가입"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item guarantee">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>마일리지특약</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description guarantee">
                                            <div style={{ width: 200 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="미가입"
                                                />
                                            </div>
                                            <div style={{ width: 300 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder="==주행거리 선택=="
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item guarantee">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>메모</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description guarantee">
                                            <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows={5}
                                                defaultValue={''}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate__block insurancerate wr-mt">
                                <div className="wr-pages-comparison-estimate__title insurancerate">
                                    <h3>보험요율사항</h3>
                                </div>
                                <div className="wr-pages-comparison-estimate__list">
                                    <div className="wr-pages-comparison-estimate__item insurancerate">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>보험가입경력</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description insurancerate">
                                            <div>피보험자</div>
                                            <div style={{ width: 120 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'1년미만'}
                                                />
                                            </div>
                                            <div>차량</div>
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'9개월미만'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item insurancerate">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>직전3년가입경력</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description insurancerate">
                                            <div>DB</div>
                                            <div style={{ width: 120 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'==선택=='}
                                                />
                                            </div>
                                            <div>KB</div>
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'==선택=='}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item insurancerate">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>교통법규위반</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description insurancerate">
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'할인(-0.3)'}
                                                />
                                            </div>
                                            <div style={{ width: 60 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'0'}
                                                />
                                            </div>
                                            <div>건</div>
                                            <div>총차량대수</div>
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'==선택=='}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item insurancerate">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>할인할증률</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description insurancerate">
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'11Z'}
                                                />
                                            </div>
                                            <MyCheckbox label="군/법인/해외경력인정" />
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item insurancerate">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>특별할증율</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description insurancerate">
                                            <div>기본할증</div>
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'0%'}
                                                />
                                            </div>
                                            <div>추가할증</div>
                                            <div style={{ width: 150 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'0%'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item insurancerate">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>3년간사고요율</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description insurancerate">
                                            <div style={{ width: '100%' }}>
                                                <div className="row">
                                                    <div className="wr-pages-comparison-estimate__with col-6">
                                                        <div
                                                            style={{
                                                                width: 80,
                                                            }}
                                                        >
                                                            3년간요율
                                                        </div>
                                                        <div
                                                            className="wr-mr"
                                                            style={{
                                                                flex: 1,
                                                            }}
                                                        >
                                                            <MySelect
                                                                options={[]}
                                                                value={null}
                                                                onChange={() => {}}
                                                                placeholder={
                                                                    'ZZZ등급(기타)'
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="wr-pages-comparison-estimate__with col-6">
                                                        <div
                                                            style={{
                                                                width: 80,
                                                            }}
                                                        >
                                                            전계약요율
                                                        </div>
                                                        <div
                                                            style={{
                                                                flex: 1,
                                                            }}
                                                        >
                                                            <MySelect
                                                                options={[]}
                                                                value={null}
                                                                onChange={() => {}}
                                                                placeholder={
                                                                    '3년간사고요율'
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row wr-mt">
                                                    <div className="wr-pages-comparison-estimate__with col-6">
                                                        <div
                                                            style={{
                                                                width: 80,
                                                            }}
                                                        >
                                                            1년사고점수
                                                        </div>
                                                        <div
                                                            className="wr-mr"
                                                            style={{
                                                                flex: 1,
                                                            }}
                                                        >
                                                            <MySelect
                                                                options={[]}
                                                                value={null}
                                                                onChange={() => {}}
                                                                placeholder={
                                                                    '=선택='
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="wr-pages-comparison-estimate__with col-6">
                                                        <div
                                                            style={{
                                                                width: 80,
                                                            }}
                                                        >
                                                            3년사고점수
                                                        </div>
                                                        <div
                                                            style={{
                                                                flex: 1,
                                                            }}
                                                        >
                                                            <MySelect
                                                                options={[]}
                                                                value={null}
                                                                onChange={() => {}}
                                                                placeholder={
                                                                    '=선택='
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item insurancerate">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>피보기준 사고건수</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description insurancerate">
                                            <div>3년간</div>
                                            <div style={{ width: 70 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'0'}
                                                />
                                            </div>
                                            <div>건</div>
                                            <div>2년간</div>
                                            <div style={{ width: 70 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'0'}
                                                />
                                            </div>
                                            <div>건</div>
                                            <div>1년간</div>
                                            <div style={{ width: 70 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'0'}
                                                />
                                            </div>
                                            <div>건</div>
                                        </div>
                                    </div>
                                    <div className="wr-pages-comparison-estimate__item insurancerate">
                                        <div className="wr-pages-comparison-estimate__label">
                                            <label>차량기준 사고건수</label>
                                        </div>
                                        <div className="wr-pages-comparison-estimate__description insurancerate">
                                            <div>3년간</div>
                                            <div style={{ width: 70 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'0'}
                                                />
                                            </div>
                                            <div>건</div>
                                            <div>2년간</div>
                                            <div style={{ width: 70 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'0'}
                                                />
                                            </div>
                                            <div>건</div>
                                            <div>1년간</div>
                                            <div style={{ width: 70 }}>
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'0'}
                                                />
                                            </div>
                                            <div>건</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate__footer">
                                <div className="wr-pages-comparison-estimate__toolbar">
                                    <MyButton className="btn-dark">
                                        보험료계산
                                    </MyButton>
                                    <MyButton className="btn-secondary">
                                        초기화
                                    </MyButton>
                                    <MyButton className="btn-info">
                                        참고사항
                                    </MyButton>
                                </div>
                                <div>
                                    <a>
                                        차가 2대이상인 경우 또는 신차인 경우
                                        클릭하세요
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col wr-pages-comparison-estimate__right">
                            <div className="wr-ml">
                                <div className="wr-table__wrap  wr-table--normal">
                                    <table className="wr-table table">
                                        <thead>
                                            <tr className="wr-table__title">
                                                <th colSpan={2}>
                                                    <span>보험사</span>
                                                </th>
                                                <th style={{ width: '100px' }}>
                                                    <strong>메리츠</strong>
                                                </th>
                                                <th style={{ width: '100px' }}>
                                                    <strong>KB</strong>
                                                </th>
                                                <th style={{ width: '100px' }}>
                                                    <strong>흥국</strong>
                                                </th>
                                                <th style={{ width: '100px' }}>
                                                    <strong>현대</strong>
                                                </th>
                                                <th style={{ width: '100px' }}>
                                                    <strong>DB</strong>
                                                </th>
                                                <th style={{ width: '100px' }}>
                                                    <strong>롯데</strong>
                                                </th>
                                                <th style={{ width: '100px' }}>
                                                    <strong>삼성</strong>
                                                </th>
                                                <th style={{ width: '100px' }}>
                                                    <strong>한화</strong>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="wr-table__subtitle">
                                                <td colSpan={2}>
                                                    <span>총 보험료</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                            </tr>
                                            <tr className="wr-table__subtitle">
                                                <td colSpan={2}>
                                                    <span>(차액)</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="wr-table__subtitle">
                                                    <span>대인 I</span>
                                                </td>
                                                <td>
                                                    <span>의무가입</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="wr-table__subtitle">
                                                    <span>대인 II</span>
                                                </td>
                                                <td>
                                                    <span>무한</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="wr-table__subtitle">
                                                    <span>대물</span>
                                                </td>
                                                <td>
                                                    <span>5억</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="wr-table__subtitle">
                                                    <span>자상</span>
                                                </td>
                                                <td>
                                                    <span>2억/5천</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="wr-table__subtitle">
                                                    <span>무보험</span>
                                                </td>
                                                <td>
                                                    <span>2억</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="wr-table__subtitle">
                                                    <span>자차</span>
                                                </td>
                                                <td>
                                                    <span>20%/20/50</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="wr-table__subtitle">
                                                    <span>긴급출동</span>
                                                </td>
                                                <td>
                                                    <span>가입</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="wr-table__subtitle">
                                                    <span>긴급출동</span>
                                                </td>
                                                <td>
                                                    <span>가입</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>485,410원</span>
                                                </td>
                                                <td>
                                                    <span>485,410원</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    colSpan={2}
                                                    className="wr-table__etc"
                                                >
                                                    <span>운전범위</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>1인(기명)</span>
                                                </td>
                                                <td>
                                                    <span>1인(기명)</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>1인(기명)</span>
                                                </td>
                                                <td>
                                                    <span>1인(기명)</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>1인(기명)</span>
                                                </td>
                                                <td>
                                                    <span>1인(기명)</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>1인(기명)</span>
                                                </td>
                                                <td>
                                                    <span>1인(기명)</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    colSpan={2}
                                                    className="wr-table__etc"
                                                >
                                                    <span>연령특약</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>48세이상</span>
                                                </td>
                                                <td>
                                                    <span>48세이상</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>48세이상</span>
                                                </td>
                                                <td>
                                                    <span>48세이상</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>48세이상</span>
                                                </td>
                                                <td>
                                                    <span>48세이상</span>
                                                </td>
                                                <td className="wr-table__title">
                                                    <span>48세이상</span>
                                                </td>
                                                <td>
                                                    <span>48세이상</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    colSpan={2}
                                                    className="wr-table__etc"
                                                >
                                                    <span>연령변경</span>
                                                </td>
                                                <td className="wr-table__title"></td>
                                                <td></td>
                                                <td className="wr-table__title"></td>
                                                <td></td>
                                                <td className="wr-table__title"></td>
                                                <td></td>
                                                <td className="wr-table__title"></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td
                                                    colSpan={2}
                                                    className="wr-table__etc"
                                                >
                                                    <span>비고</span>
                                                </td>
                                                <td className="wr-table__title"></td>
                                                <td></td>
                                                <td className="wr-table__title"></td>
                                                <td></td>
                                                <td className="wr-table__title"></td>
                                                <td></td>
                                                <td className="wr-table__title"></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="wr-ml wr-mt">
                                <div className="wr-table__wrap wr-table--normal">
                                    <table className="wr-table table">
                                        <thead>
                                            <tr className="wr-table__title">
                                                <th colSpan={5}>
                                                    <span>기타특약 적용시</span>
                                                </th>
                                            </tr>
                                            <tr className="wr-table__title">
                                                <th style={{ width: '100px' }}>
                                                    <span>보험사</span>
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <strong>특약명</strong>
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <strong>조건</strong>
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <strong>할인율</strong>
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <strong>보험료</strong>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="wr-table__subtitle">
                                                <td rowSpan={2}>
                                                    <span>KB</span>
                                                </td>
                                                <td rowSpan={2}>
                                                    <span>
                                                        대중교통이용할인특약
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>
                                                        1000km이상/65~69점
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>3%</span>
                                                </td>
                                                <td>
                                                    <span className="text-danger">
                                                        520,490원
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className="wr-table__subtitle">
                                                <td>
                                                    <span>
                                                        1000km이상/65~69점
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>3%</span>
                                                </td>
                                                <td>
                                                    <span className="text-danger text-end">
                                                        520,490원
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-footer__start">
                        <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                            안내서1
                        </MyButton>
                        <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                            안내서2
                        </MyButton>
                        <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                            안내서3
                        </MyButton>
                        <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                            안내서4
                        </MyButton>
                        <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                            메일발송
                        </MyButton>
                        <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                            팩스전송
                        </MyButton>
                        <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                            장문전송1
                        </MyButton>
                        <MyButton className="btn-warning wr-pages-comparison-estimate__button">
                            장문(FC)
                        </MyButton>
                        <MyButton className="btn-info wr-pages-comparison-estimate__button">
                            계약정보저장
                        </MyButton>
                    </div>
                </MyFooter>
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(),
);

export default ComparisonEstimate;
