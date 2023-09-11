import type { NextPage } from 'next';
import type { ChangeEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import addYears from 'date-fns/addYears';
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
import { WithLabel } from '@components/WithLabel';
import carConstants from '@constants/options/car';
import { residentNumToAge } from '@utils/calculator';
import { useCheckbox } from '@hooks/use-checkbox';
import { MyDatepicker } from '@components/datepicker';
import { carShouldDisableDate } from '@utils/datepicker';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { getCompaniesRequest } from '@actions/hr/get-companies';

function getGender(residentNumber: string) {
    var genderNumber = parseInt(residentNumber);

    if (genderNumber % 2 === 0) {
        return '여성';
    } else {
        return '남성';
    }
}

const ComparisonCar: NextPage = () => {
    const displayName = 'wr-pages-compare-car';

    const dispatch = useDispatch();

    const { carUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );
    // 주민번호 앞자리
    const [startResidentNum, setStartResidentNum] = useState('');
    // 주민번호 뒷자리
    const [endResidentNum, setEndResidentNum] = useState('');
    const endResidentNumRef = useRef<HTMLInputElement>(null);
    // 주민번호 피드백
    const [residentNumFeedback, setResidentNumFeedback] = useState('');
    // 차량 번호 - 지역
    const [carLocale, setCarLocale] = useSelect(carConstants.locale);
    // 차량 번호 - 차종
    const [carType, setCarType] = useNumbericInput('', { maxLength: 3 });
    // 차량 번호 - 용도
    const [carUsage, setCarUsage] = useSelect(carConstants.usage);
    // 차량 번호 - 등록 번호
    const [carRegiNum, setCarRegiNum] = useNumbericInput('', { maxLength: 4 });
    // 차량 번호 - 직접입력
    const [directCarNum] = useInput('');
    // const directCarNumRef = useRef<HTMLInputElement>(null);
    // 가입예정일 - start
    const [idate, setIdate] = useDatepicker(new Date(), {
        callbackOnChange: (nextDate) => {
            if (nextDate) {
                setTodt(addYears(new Date(), 1));
            }
        },
    });
    // 보험만기일
    const [todt, setTodt] = useDatepicker(addYears(new Date(), 1));
    // 차량용도
    const [caruse, setCaruse] = useState('');
    // 가족한정
    const [carfamily] = useSelect(carConstants.family);
    // 어린이 특약(현대 / KB / 동부)
    const [drate] = useSelect(carConstants.dDist);
    // 운전자연령
    const [carage] = useSelect(carConstants.minAge);
    // 납입방법
    const [divideNum] = useSelect(carConstants.payMethod);
    // 물적사고 할증
    const [mulSago] = useSelect(carConstants.mSago, carConstants.mSago[3]);
    // 전보험사
    const [preComp] = useSelect(carUseCompanies, null);
    // LPG 여부
    const [checkLpg] = useCheckbox(false);
    // 탑차 여부
    const [checkTopcar] = useCheckbox(false);
    // 스포츠카 여부
    const [checkSportcar] = useCheckbox(false);
    // 스포츠카
    const [sportcar] = useSelect(carConstants.sportcar);
    // 차량연식
    const [caryear] = useSelect(
        Array.from({ length: 31 }).reduce((acc: CoreSelectOption[], cur, i) => {
            const targetYear = addYears(new Date(), i * -1)
                .getFullYear()
                .toString();

            if (i === 0) {
                return [
                    {
                        label: `${targetYear}A`,
                        value: `${targetYear}A`,
                    },
                    {
                        label: `${targetYear}B`,
                        value: `${targetYear}B`,
                    },
                ];
            } else {
                return [
                    ...acc,
                    {
                        label: targetYear,
                        value: targetYear,
                    },
                ];
            }
        }, []),
    );
    // 차량등록일
    const [cardate] = useDatepicker(null);
    // 차량명
    const [carname] = useInput('');
    // 차량등급
    const [carGrade] = useSelect(carConstants.grade, carConstants.grade[10]);
    // 배기량
    const [baegirang] = useNumbericInput('');
    // 차량구매형태
    const [membercode] = useSelect(carConstants.pType);
    // 오토 여부
    const [checkAuto] = useCheckbox(false);
    // ABS 여부
    const [checkAbsHalin] = useCheckbox(false);
    // 이모빌라이저 여부
    const [checkImo] = useCheckbox(false);
    // 에어백
    const [aircode] = useSelect(carConstants.airBack, carConstants.airBack[2]);
    // 전방출동
    const [chung] = useSelect(carConstants.chung2);
    // 차선이탈
    const [gps] = useSelect(carConstants.gps2);
    // 블랙박스 여부
    const [checkBlackbox] = useCheckbox(false);
    // 블루링크 여부
    const [checkBluelink] = useCheckbox(false);
    // 지능형 안전장치 여부
    const [checkJobcodeNm] = useCheckbox(false);
    // 차량가액
    const [carprice] = useNumbericInput('', {
        addComma: true,
    });
    // 일부담보
    const [liPrice] = useNumbericInput('', {
        addComma: true,
    });
    // 유상운송
    const [usang] = useSelect(carConstants.usang);
    // 기중기장치요율
    const [usang2] = useNumbericInput('');
    // 대인배상 2
    const [dambo2] = useSelect(carConstants.dambo2, carConstants.dambo2[1]);
    // 대물한도
    const [dambo3] = useSelect(carConstants.dambo3, carConstants.dambo3[6]);
    // 자손/자상
    const [dambo4] = useSelect(carConstants.dambo4, carConstants.dambo4[1]);
    // 무보험차
    const [dambo5] = useSelect(carConstants.dambo5, carConstants.dambo5[1]);
    // 자기차량
    const [dambo6] = useSelect(carConstants.dambo6, carConstants.dambo6[1]);
    // 긴급출동
    const [gooutDist] = useSelect(carConstants.gDist);
    // 긴급출동 상세
    const [gooutDetail] = useSelect(carConstants.gDetail);
    // 마일리지
    const [mileDist] = useSelect(carConstants.mDist);
    // 마일리지 상세
    const [mileDetail] = useSelect(carConstants.mDetail, null);
    // 메모
    const [memo] = useInput('');
    // 보험가입경력 - 피보험자
    const [guipcarrer] = useSelect(carConstants.exp);
    // 보험가입경력 - 차량
    const [guipcarrerCar] = useSelect(carConstants.exp2, null);
    // 직전3년가입경력 - DB
    const [lJobcode] = useSelect(carConstants.exp, null);
    // 직전3년가입경력 - KB
    const [guipCarrerKb] = useSelect(carConstants.exp, null);
    // 교통법규 위반
    const [trafficDist] = useSelect(carConstants.tVio);
    // 교통법규 위반 건수
    const [trafficDetail] = useSelect(carConstants.numCase.slice(0, 4));
    // 총차량대수
    const [childdrive] = useSelect(carConstants.cDrive, null);
    // 할증율 - 할인할증
    const [halin] = useSelect(carConstants.halin, carConstants.halin[20]);
    // 할증율 - 군/법인/해외경력인정
    const [checkRateU] = useCheckbox(false);
    // 할증율 - 기본할증
    const [specialCode] = useSelect(carConstants.sCode);
    // 할증율 - 추가할증
    const [specialCode2] = useSelect(carConstants.sCode2);
    // 사고요율 - 3년간사고요율
    const [ssSago3] = useSelect(carConstants.sago3);
    // 사고요율 - 전계약사고요율
    const [preSago3] = useSelect(carConstants.prevSago);
    // 사고요율 - 3년사고점수
    const [pSago] = useSelect(carConstants.accCount, null);
    // 사고요율 - 1년사고점수
    const [goout2] = useSelect(carConstants.accCount, null);
    // 피보기준 사고건수 - 3년간
    const [sago3] = useSelect(carConstants.numCase);
    // 피보기준 사고건수 - 2년간
    const [sago2] = useSelect(carConstants.numCase);
    // 피보기준 사고건수 - 1년간
    const [sago1] = useSelect(carConstants.numCase);
    // 차량기준 사고건수 - 3년간
    const [carSago3] = useSelect(carConstants.numCase);
    // 차량기준 사고건수 - 2년간
    const [carNonum] = useSelect(carConstants.numCase);
    // 차량기준 사고건수 - 1년간
    const [carSago1] = useSelect(carConstants.numCase);

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
                age = residentNumToAge(startResidentNum + endResidentNum);

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

    const handleClickToday = () => {
        const today = new Date();

        setIdate(today);

        setTodt(addYears(today, 1));
    };

    const handleChangeCaruse = (evt: ChangeEvent<HTMLInputElement>) => {
        setCaruse(evt.target.value);
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
                <div className={displayName}>
                    <div className={`${displayName}__header`}>
                        <div className="d-flex justify-content-between w-100">
                            <div className="d-flex justify-content-start">
                                <div>
                                    <WithLabel
                                        id="orga"
                                        label="지점"
                                        type="active"
                                    >
                                        <MySelect inputId="orga" />
                                    </WithLabel>
                                </div>
                                <div className="wr-ml">
                                    <WithLabel
                                        id="team"
                                        label="팀"
                                        type="active"
                                    >
                                        <MySelect inputId="orga" />
                                    </WithLabel>
                                </div>
                                <div className="wr-ml">
                                    <WithLabel
                                        id="member"
                                        label="구성원"
                                        type="active"
                                    >
                                        <MySelect inputId="orga" />
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start">
                                <div>
                                    <WithLabel
                                        id="manager"
                                        label="담당"
                                        type="active"
                                    >
                                        <MySelect inputId="orga" />
                                    </WithLabel>
                                </div>

                                <div className="wr-ml">
                                    <WithLabel
                                        id="status"
                                        label="처리상태"
                                        type="active"
                                    >
                                        <MySelect inputId="orga" />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${displayName}__body row wr-mt`}>
                        <div
                            className={`${displayName}__left wr-pages-detail__left`}
                        >
                            <div className="wr-table--normal">
                                <table className="wr-table table">
                                    <colgroup>
                                        <col width="150px" />
                                        <col width="550px" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>
                                                <span>고객기본정보</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label
                                                    htmlFor="residentNum"
                                                    className="wr-label--required"
                                                >
                                                    주민번호
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div
                                                        style={{
                                                            width: 150,
                                                        }}
                                                    >
                                                        <MyInput
                                                            id="residentNum"
                                                            type="text"
                                                            pattern="[0-9]{6}"
                                                            onChange={
                                                                handleChangeStartResidentNum
                                                            }
                                                            value={
                                                                startResidentNum
                                                            }
                                                        />
                                                    </div>
                                                    <div>-</div>
                                                    <div
                                                        style={{
                                                            width: 35,
                                                        }}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            pattern="[0-9]{1}"
                                                            ref={
                                                                endResidentNumRef
                                                            }
                                                            onChange={
                                                                handleChangeEndResidentNum
                                                            }
                                                            onBlur={
                                                                handleBlurEndResidentNum
                                                            }
                                                            value={
                                                                endResidentNum
                                                            }
                                                        />
                                                    </div>
                                                    <div>******</div>
                                                    <div>
                                                        {residentNumFeedback}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="carnum">
                                                    차량번호
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 100 }}>
                                                        <MySelect
                                                            inputId="carnum"
                                                            {...carLocale}
                                                        />
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: 60,
                                                        }}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            placeholder="999"
                                                            pattern="[0-9]{2,3}"
                                                            {...carType}
                                                        />
                                                    </div>
                                                    <MySelect {...carUsage} />
                                                    <div
                                                        style={{
                                                            width: 70,
                                                        }}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            placeholder="9999"
                                                            pattern="[0-9]{4}"
                                                            {...carRegiNum}
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 150,
                                                        }}
                                                    >
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
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className="wr-label--required">
                                                    가입예정일
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div
                                                        style={{
                                                            width: 130,
                                                        }}
                                                    >
                                                        <MyDatepicker
                                                            id="idate"
                                                            size="sm"
                                                            placeholder="가입예정일"
                                                            hooks={idate}
                                                            shouldDisableDate={
                                                                carShouldDisableDate
                                                            }
                                                        />
                                                    </div>
                                                    <MyButton
                                                        className="btn-warning btn-sm"
                                                        onClick={
                                                            handleClickToday
                                                        }
                                                    >
                                                        오늘
                                                    </MyButton>
                                                    <div>~</div>
                                                    <div
                                                        style={{
                                                            width: 130,
                                                        }}
                                                    >
                                                        <MyDatepicker
                                                            id="todt"
                                                            size="md"
                                                            placeholder="보험만기일"
                                                            hooks={todt}
                                                            shouldDisableDate={
                                                                carShouldDisableDate
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>개발원조회</span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <MyButton className="btn-warning btn-sm">
                                                        현대
                                                    </MyButton>
                                                    <MyButton className="btn-warning btn-sm">
                                                        DB(신규)
                                                    </MyButton>
                                                    <MyButton className="btn-warning btn-sm">
                                                        DB(갱신)
                                                    </MyButton>
                                                    <MyButton className="btn-warning btn-sm">
                                                        메리츠
                                                    </MyButton>
                                                    <MyButton className="btn-warning btn-sm">
                                                        KB
                                                    </MyButton>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="customerNm"
                                                >
                                                    고객명
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div
                                                        style={{
                                                            width: 150,
                                                        }}
                                                    >
                                                        <MyInput
                                                            id="customerNm"
                                                            placeholder="홍길동"
                                                        />
                                                    </div>
                                                    <MyButton className="btn-warning btn-sm">
                                                        고객상세사항
                                                    </MyButton>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="caruse1"
                                                >
                                                    차량용도
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <MyRadio
                                                        id="caruse1"
                                                        name="caruse"
                                                        label="출퇴근용(영리)"
                                                        value="1"
                                                        onChange={
                                                            handleChangeCaruse
                                                        }
                                                        checked={caruse === '1'}
                                                    />
                                                    <MyRadio
                                                        id="caruse2"
                                                        name="caruse"
                                                        label="사업용(비영리)"
                                                        value="2"
                                                        onChange={
                                                            handleChangeCaruse
                                                        }
                                                        checked={caruse === '2'}
                                                    />
                                                    <MyRadio
                                                        id="caruse3"
                                                        name="caruse"
                                                        label="종교단체"
                                                        value="3"
                                                        onChange={
                                                            handleChangeCaruse
                                                        }
                                                        checked={caruse === '3'}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="carfamily"
                                                >
                                                    가족한정
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="carfamily"
                                                            {...carfamily}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="drate">
                                                            <strong>
                                                                어린이특약
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="drate"
                                                            {...drate}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="carage"
                                                >
                                                    운전자연령
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="carage"
                                                            {...carage}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="divide_num">
                                                    납입방법
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="divide_num"
                                                            {...divideNum}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="mul_sago">
                                                    물적사고할증
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="mul_sago"
                                                            {...mulSago}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="prev_comp">
                                                    전보험사
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="prev_comp"
                                                            {...preComp}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="prev_no">
                                                            <strong>
                                                                전계약 NO
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 150,
                                                        }}
                                                    >
                                                        <MyInput
                                                            id="prev_no"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="wr-table--normal">
                                <table className="wr-table table wr-mt">
                                    <colgroup>
                                        <col width="150px" />
                                        <col width="550px" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>
                                                <span>차량사항</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label className="wr-label--required">
                                                    차명코드
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div
                                                        style={{
                                                            width: 150,
                                                        }}
                                                    >
                                                        <MyInput disabled />
                                                    </div>
                                                    <MyButton className="btn-warning btn-sm">
                                                        조회
                                                    </MyButton>
                                                    <MyButton className="btn-warning btn-sm">
                                                        안전옵션
                                                    </MyButton>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="carnum">
                                                    차량형태
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <MyCheckbox
                                                        id="lpg"
                                                        label="LPG차량"
                                                        {...checkLpg}
                                                    />
                                                    <MyCheckbox
                                                        id="top"
                                                        label="탑차"
                                                        {...checkTopcar}
                                                    />
                                                    <MyCheckbox
                                                        id="sports"
                                                        label="스포츠카"
                                                        {...checkSportcar}
                                                    />
                                                    {checkSportcar.checked && (
                                                        <div
                                                            style={{
                                                                width: 150,
                                                            }}
                                                        >
                                                            <MySelect
                                                                {...sportcar}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="caryear"
                                                >
                                                    차량연식
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="caryear"
                                                            {...caryear}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            className="wr-label--required"
                                                            htmlFor="cardate"
                                                        >
                                                            <strong>
                                                                차량등록일
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 150,
                                                        }}
                                                    >
                                                        <MyDatepicker
                                                            id="cardate"
                                                            size="sm"
                                                            placeholder="차량등록일"
                                                            hooks={cardate}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="carname"
                                                >
                                                    차량명
                                                </label>
                                            </td>
                                            <td>
                                                <MyInput
                                                    id="carname"
                                                    placeholder="차량명"
                                                    {...carname}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="car_grade">
                                                    차량등급
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="car_grade"
                                                            {...carGrade}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="baegirang">
                                                            <strong>
                                                                배기량(승차정원)
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 150,
                                                        }}
                                                    >
                                                        <MyInput
                                                            id="baegirang"
                                                            className="text-end"
                                                            placeholder="0"
                                                            unit="cc(명)"
                                                            {...baegirang}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="baegicode">
                                                    차량구분
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="baegicode"
                                                            placeholder="==차종선택=="
                                                            isDisabled
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="membercode">
                                                            <strong>
                                                                차량구매형태
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="membercode"
                                                            {...membercode}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>기본부속1</span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <MyCheckbox
                                                        id="auto"
                                                        label="오토"
                                                        {...checkAuto}
                                                    />
                                                    <MyCheckbox
                                                        id="abs"
                                                        label="ABS"
                                                        {...checkAbsHalin}
                                                    />
                                                    <MyCheckbox
                                                        id="emobil"
                                                        label="이모빌"
                                                        {...checkImo}
                                                    />
                                                    <div>
                                                        <label htmlFor="aircode">
                                                            <strong>
                                                                에어백
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <MySelect
                                                        inputId="aircode"
                                                        {...aircode}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>기본부속2</span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 120 }}>
                                                        <MySelect {...chung} />
                                                    </div>
                                                    <div style={{ width: 120 }}>
                                                        <MySelect {...gps} />
                                                    </div>

                                                    <MyCheckbox
                                                        id="bbox"
                                                        label="블랙박스"
                                                        {...checkBlackbox}
                                                    />
                                                    <MyCheckbox
                                                        id="bluelink"
                                                        label="블루링크"
                                                        {...checkBluelink}
                                                    />
                                                    <MyCheckbox
                                                        id="l_jobcode_nm"
                                                        label="지능형안전"
                                                        {...checkJobcodeNm}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="carprice">
                                                    차량가액
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div
                                                        style={{
                                                            width: 100,
                                                        }}
                                                    >
                                                        <MyInput
                                                            id="carprice"
                                                            placeholder="0"
                                                            className="text-end"
                                                            unit="만원"
                                                            {...carprice}
                                                        />
                                                    </div>
                                                    <div>
                                                        <strong>
                                                            부속가액
                                                        </strong>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 100,
                                                        }}
                                                    >
                                                        <MyInput
                                                            placeholder="0"
                                                            className="text-end"
                                                            disabled
                                                            unit="만원"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="li_price">
                                                            <strong>
                                                                일부담보
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 100,
                                                        }}
                                                    >
                                                        <MyInput
                                                            id="li_price"
                                                            placeholder="0"
                                                            className="text-end"
                                                            unit="만원"
                                                            {...liPrice}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="carprice">
                                                    기타사항
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div>
                                                        <label htmlFor="usang">
                                                            <strong>
                                                                유상운송
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <MySelect
                                                        inputId="usang"
                                                        {...usang}
                                                    />
                                                    <div>
                                                        <label htmlFor="usang2">
                                                            <strong>
                                                                기중기장치요율
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 100,
                                                        }}
                                                    >
                                                        <MyInput
                                                            placeholder="0"
                                                            className="text-end"
                                                            unit="%"
                                                            {...usang2}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="wr-table--normal">
                                <table className="wr-table table wr-mt">
                                    <colgroup>
                                        <col width="150px" />
                                        <col width="200px" />
                                        <col width="150px" />
                                        <col width="200px" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th colSpan={4}>
                                                <div className="wr-pages-detail__center">
                                                    <span>세부 담보 설정</span>
                                                    <MyButton className="btn-warning btn-sm wr-ml">
                                                        책임보험
                                                    </MyButton>
                                                    <MyButton className="btn-warning btn-sm wr-ml">
                                                        기본담보
                                                    </MyButton>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>대인배상I</span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div>
                                                        <strong>
                                                            의무가입
                                                        </strong>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="dambo2"
                                                >
                                                    대인배상II
                                                </label>
                                            </td>
                                            <td>
                                                <MySelect
                                                    inputId="dambo2"
                                                    {...dambo2}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="dambo3"
                                                >
                                                    대물한도
                                                </label>
                                            </td>
                                            <td>
                                                <MySelect
                                                    inputId="dambo3"
                                                    {...dambo3}
                                                />
                                            </td>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="dambo4"
                                                >
                                                    자손/자상
                                                </label>
                                            </td>
                                            <td>
                                                <MySelect
                                                    inputId="dambo4"
                                                    {...dambo4}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="dambo5"
                                                >
                                                    무보험차
                                                </label>
                                            </td>
                                            <td>
                                                <MySelect
                                                    inputId="dambo5"
                                                    {...dambo5}
                                                />
                                            </td>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="dambo6"
                                                >
                                                    자기차량
                                                </label>
                                            </td>
                                            <td>
                                                <MySelect
                                                    inputId="dambo6"
                                                    {...dambo6}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="goout1"
                                                >
                                                    긴급출동
                                                </label>
                                            </td>
                                            <td>
                                                <MySelect
                                                    inputId="goout1"
                                                    {...gooutDist}
                                                />
                                            </td>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="goout_dist"
                                                >
                                                    긴급출동세부
                                                </label>
                                            </td>
                                            <td>
                                                <MySelect
                                                    inputId="goout_dist"
                                                    {...gooutDetail}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="mile1">
                                                    마일리지특약
                                                </label>
                                            </td>
                                            <td colSpan={3}>
                                                <div className="d-flex justify-content-start align-items-center">
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="mile1"
                                                            {...mileDist}
                                                        />
                                                    </div>
                                                    <div style={{ width: 300 }}>
                                                        <div className="wr-ml">
                                                            <MySelect
                                                                inputId="mile2"
                                                                {...mileDetail}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="memo">
                                                    메모
                                                </label>
                                            </td>
                                            <td colSpan={3}>
                                                <textarea
                                                    rows={4}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    {...memo}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="wr-table--normal">
                                <table className="wr-table table wr-mt">
                                    <colgroup>
                                        <col width="150px" />
                                        <col width="550px" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>
                                                <span>보험요율사항</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span className="wr-label--required">
                                                    보험가입경력
                                                </span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div>
                                                        <label
                                                            className="wr-label--required"
                                                            htmlFor="guipcarrer"
                                                        >
                                                            <strong>
                                                                피보험자
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="guipcarrer"
                                                            {...guipcarrer}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label
                                                            className="wr-label--required"
                                                            htmlFor="guipcarrer_car"
                                                        >
                                                            <strong>
                                                                차량
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 200 }}>
                                                        <MySelect
                                                            inputId="guipcarrer_car"
                                                            {...guipcarrerCar}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>직전3년가입경력</span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div>
                                                        <label htmlFor="l_jobcode">
                                                            <strong>DB</strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="l_jobcode"
                                                            {...lJobcode}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="guipcarrer_kb">
                                                            <strong>KB</strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="guipcarrer_kb"
                                                            {...guipCarrerKb}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="traffic"
                                                >
                                                    교통법규위반
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 200 }}>
                                                        <MySelect
                                                            inputId="traffic"
                                                            {...trafficDist}
                                                        />
                                                    </div>

                                                    <div className="d-flex">
                                                        <MySelect
                                                            inputId="gr_area"
                                                            {...trafficDetail}
                                                        />
                                                        <div className="wr-form__unit wr-border-l--hide">
                                                            건
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="childdrive">
                                                            <strong>
                                                                총차량대수
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 100 }}>
                                                        <MySelect
                                                            inputId="childdrive"
                                                            {...childdrive}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label
                                                    className="wr-label--required"
                                                    htmlFor="halin"
                                                >
                                                    할인할증률
                                                </label>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div style={{ width: 150 }}>
                                                        <MySelect
                                                            inputId="halin"
                                                            {...halin}
                                                        />
                                                    </div>

                                                    <MyCheckbox
                                                        id="rate_u"
                                                        label="군/법인/해외경력인정"
                                                        {...checkRateU}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="wr-label--required">
                                                    특별할증율
                                                </span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div>
                                                        <label
                                                            className="wr-label--required"
                                                            htmlFor="special_code"
                                                        >
                                                            <strong>
                                                                기본할증
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 200 }}>
                                                        <MySelect
                                                            inputId="special_code"
                                                            menuPlacement="top"
                                                            {...specialCode}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label
                                                            className="wr-label--required"
                                                            htmlFor="special_code2"
                                                        >
                                                            <strong>
                                                                추가할증
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 200 }}>
                                                        <MySelect
                                                            inputId="special_code2"
                                                            menuPlacement="top"
                                                            {...specialCode2}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>3년간사고요율</span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div>
                                                        <label
                                                            className="wr-label--required"
                                                            htmlFor="ss_sago3"
                                                        >
                                                            <strong>
                                                                3년간요율
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 190 }}>
                                                        <MySelect
                                                            inputId="ss_sago3"
                                                            {...ssSago3}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="pre_sago3">
                                                            <strong>
                                                                전계약요율
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 190 }}>
                                                        <MySelect
                                                            inputId="pre_sago3"
                                                            {...preSago3}
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={`${displayName}__description wr-mt`}
                                                >
                                                    <div>
                                                        <label htmlFor="p_sago">
                                                            <strong>
                                                                1년사고점수
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 177 }}>
                                                        <MySelect
                                                            inputId="p_sago"
                                                            menuPlacement="top"
                                                            {...pSago}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="goout2">
                                                            <strong>
                                                                3년사고점수
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div style={{ width: 182 }}>
                                                        <MySelect
                                                            inputId="goout2"
                                                            menuPlacement="top"
                                                            {...goout2}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>피보기준 사고건수</span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div>
                                                        <label htmlFor="sago3">
                                                            <strong>
                                                                3년간
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div className="d-flex">
                                                        <MySelect
                                                            inputId="sago3"
                                                            {...sago3}
                                                        />
                                                        <div className="wr-form__unit wr-border-l--hide">
                                                            건
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="sago2">
                                                            <strong>
                                                                2년간
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div className="d-flex">
                                                        <MySelect
                                                            inputId="sago2"
                                                            {...sago2}
                                                        />
                                                        <div className="wr-form__unit wr-border-l--hide">
                                                            건
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="sago1">
                                                            <strong>
                                                                1년간
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div className="d-flex">
                                                        <MySelect
                                                            inputId="sago1"
                                                            {...sago1}
                                                        />
                                                        <div className="wr-form__unit wr-border-l--hide">
                                                            건
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>차량기준 사고건수</span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`${displayName}__description`}
                                                >
                                                    <div>
                                                        <label htmlFor="car_sago3">
                                                            <strong>
                                                                3년간
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div className="d-flex">
                                                        <MySelect
                                                            inputId="car_sago3"
                                                            {...carSago3}
                                                        />
                                                        <div className="wr-form__unit wr-border-l--hide">
                                                            건
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="car_nonum">
                                                            <strong>
                                                                2년간
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div className="d-flex">
                                                        <MySelect
                                                            inputId="car_nonum"
                                                            {...carNonum}
                                                        />
                                                        <div className="wr-form__unit wr-border-l--hide">
                                                            건
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="car_sago1">
                                                            <strong>
                                                                1년간
                                                            </strong>
                                                        </label>
                                                    </div>
                                                    <div className="d-flex">
                                                        <MySelect
                                                            inputId="car_sago1"
                                                            {...carSago1}
                                                        />
                                                        <div className="wr-form__unit wr-border-l--hide">
                                                            건
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={`wr-pages-detail__right`}></div>
                    </div>
                    <MyFooter>
                        <div className="wr-footer__between">
                            <div>
                                <div className="wr-pages-detail__buttons">
                                    <MyButton className="btn-dark">
                                        보험료계산
                                    </MyButton>
                                    <MyButton className="btn-secondary">
                                        초기화
                                    </MyButton>
                                </div>
                            </div>
                            <div>
                                <MyButton className="btn-primary">
                                    계약정보저장
                                </MyButton>
                            </div>
                        </div>
                    </MyFooter>
                </div>
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(
            getOrgasRequest({
                idx: '1',
            }),
        );

        dispatch(getCompaniesRequest('car-use'));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default ComparisonCar;
