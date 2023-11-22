import type { FC } from 'react';
import { useState, useMemo, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { MyButton } from '@components/button';
import { useSelect } from '@hooks/use-select';
import carConstants from '@constants/options/car';
import { MySelect } from '@components/select';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { MyInput } from '@components/input';
import { useDatepicker } from '@hooks/use-datepicker';
import { useCheckbox } from '@hooks/use-checkbox';
import { showGetCarcodeModal } from '@actions/modal/get-carcode.action';
import { MyCheckbox } from '@components/checkbox';
import { MyDatepicker } from '@components/datepicker';
import { showSetCaraccModal } from '@actions/modal/set-caracc.action';
import { CarcodeSearchModal } from '@components/modal/CarcodeSearch';
import { SetCarAccModal } from '@components/modal/SetCaracc';

interface Props {}
// 가입예정일
export const FormCarDetail: FC<Props> = () => {
    const displayName = 'wr-pages-compare-car';

    const dispatch = useDispatch();
    // 차명코드
    const [carcode, setCarcode] = useInput('');
    // LPG 여부
    const [checkLpg] = useCheckbox(false);
    // 탑차 여부
    const [checkTopcar] = useCheckbox(false);
    // 스포츠카
    const [sportcar] = useSelect(carConstants.sportcar);
    // 차량연식
    const [caryear, setCaryear] = useSelect(carConstants.year);
    // 차량등록일
    const [cardate] = useDatepicker(new Date());
    // 차량명
    const [carname, setCarname] = useInput('');
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
    const [carprice] = useNumbericInput('0', {
        addComma: true,
    });
    // 일부담보
    const [ilPrice] = useNumbericInput('', {
        addComma: true,
    });
    // 유상운송
    const [usang] = useSelect(carConstants.usang);
    // 기중기장치요율
    const [usang2] = useNumbericInput('0');
    const memoizingDefaultAccs = useMemo(
        () =>
            Array.from({ length: 4 }).map((v) => ({
                name: '',
                price: '0',
            })),
        [],
    );
    // 추가부속 - 선택
    const [accs, setAccs] = useState(memoizingDefaultAccs);
    const [directCaraccname] = useInput('');
    const [directCaraccprice] = useNumbericInput('0', { addComma: true });
    // 추가부속의 합
    const totalCaraccPrice = useMemo(
        () =>
            accs.reduce((acc, cur) => acc + +cur.price.replace(/,/g, ''), 0) +
            +directCaraccprice.value.replace(/,/g, ''),
        [accs, directCaraccprice.value],
    );
    // 차명코드 조회
    const handleShowCarSearch = () => {
        dispatch(showGetCarcodeModal());
    };
    // 추가부속 설정
    const handleShowSetCaracc = () => {
        dispatch(showSetCaraccModal());
    };
    return (
        <>
            <div className="wr-table--normal">
                <table className="wr-table table wr-mt">
                    <colgroup>
                        <col
                            width="130px"
                            className={`${displayName}__label`}
                        />
                        <col width="570px" />
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
                                <span className="wr-label--required">
                                    차명코드
                                </span>
                            </td>
                            <td>
                                <div className={`${displayName}__description`}>
                                    <div
                                        style={{
                                            width: 150,
                                        }}
                                    >
                                        <MyInput
                                            name="carcode"
                                            readOnly
                                            onClick={handleShowCarSearch}
                                            {...carcode}
                                        />
                                    </div>
                                    <MyButton
                                        type="button"
                                        className="btn-warning btn-sm"
                                        onClick={handleShowCarSearch}
                                    >
                                        조회
                                    </MyButton>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>차량형태</span>
                            </td>
                            <td>
                                <div className={`${displayName}__description`}>
                                    <MyCheckbox
                                        id="check_lpg"
                                        name="lpg"
                                        value="1"
                                        label="LPG차량"
                                        {...checkLpg}
                                    />
                                    <MyCheckbox
                                        id="check_top"
                                        name="topcar"
                                        value="1"
                                        label="탑차"
                                        {...checkTopcar}
                                    />
                                    <div>
                                        <label
                                            className="wr-label--required"
                                            htmlFor="sportcar"
                                        >
                                            <strong>스포츠카</strong>
                                        </label>
                                    </div>
                                    <div
                                        style={{
                                            width: 150,
                                        }}
                                    >
                                        <MySelect id="sportcar" {...sportcar} />
                                    </div>
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
                                <div className={`${displayName}__description`}>
                                    <div
                                        style={{
                                            width: 150,
                                        }}
                                    >
                                        <MySelect id="caryear" {...caryear} />
                                    </div>
                                    <div>
                                        <label
                                            className="wr-label--required"
                                            htmlFor="cardate"
                                        >
                                            <strong>차량등록일</strong>
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
                                            cleanable={false}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="carname">차량명</label>
                            </td>
                            <td>
                                <MyInput
                                    id="carname"
                                    name="carname"
                                    placeholder="차량명"
                                    {...carname}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="car_grade">차량등급</label>
                            </td>
                            <td>
                                <div className={`${displayName}__description`}>
                                    <div
                                        style={{
                                            width: 150,
                                        }}
                                    >
                                        <MySelect
                                            id="car_grade"
                                            {...carGrade}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="baegirang">
                                            <strong>배기량(승차정원)</strong>
                                        </label>
                                    </div>
                                    <div
                                        style={{
                                            width: 150,
                                        }}
                                    >
                                        <MyInput
                                            id="baegirang"
                                            name="baegirang"
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
                                <span>차량구분</span>
                            </td>
                            <td>
                                <div className={`${displayName}__description`}>
                                    <div
                                        style={{
                                            width: 150,
                                        }}
                                    >
                                        <MySelect
                                            id="cartype"
                                            placeholder="==차종선택=="
                                            isDisabled
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="membercode">
                                            <strong>차량구매형태</strong>
                                        </label>
                                    </div>
                                    <div
                                        style={{
                                            width: 150,
                                        }}
                                    >
                                        <MySelect
                                            id="membercode"
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
                                <div className={`${displayName}__description`}>
                                    <MyCheckbox
                                        id="check_auto"
                                        name="auto"
                                        label="오토"
                                        value="1"
                                        {...checkAuto}
                                    />
                                    <MyCheckbox
                                        id="check_abs"
                                        name="abs_halin"
                                        label="ABS"
                                        value="1"
                                        {...checkAbsHalin}
                                    />
                                    <MyCheckbox
                                        id="check_imo"
                                        name="imo"
                                        label="이모빌"
                                        value="1"
                                        {...checkImo}
                                    />
                                    <div>
                                        <label htmlFor="aircode">
                                            <strong>에어백</strong>
                                        </label>
                                    </div>
                                    <div style={{ width: 200 }}>
                                        <MySelect id="aircode" {...aircode} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>기본부속2</span>
                            </td>
                            <td>
                                <div className={`${displayName}__description`}>
                                    <div
                                        style={{
                                            width: 120,
                                        }}
                                    >
                                        <MySelect id="chung" {...chung} />
                                    </div>
                                    <div
                                        style={{
                                            width: 120,
                                        }}
                                    >
                                        <MySelect id="gps" {...gps} />
                                    </div>

                                    <MyCheckbox
                                        id="check_bbox"
                                        name="bbox"
                                        value="1"
                                        label="블랙박스"
                                        {...checkBlackbox}
                                    />
                                    <MyCheckbox
                                        id="check_bluelink"
                                        name="blue_link"
                                        value="1"
                                        label="커넥티드"
                                        {...checkBluelink}
                                    />
                                    <MyCheckbox
                                        id="check_l_jobcode_nm"
                                        name="l_jobcode_nm"
                                        value="1"
                                        label="지능형안전"
                                        {...checkJobcodeNm}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>추가부속 - 선택</span>
                                <div className="d-flex justify-content-center">
                                    <MyButton
                                        type="button"
                                        className="btn-primary btn-sm"
                                        onClick={handleShowSetCaracc}
                                    >
                                        부속추가
                                    </MyButton>
                                </div>
                            </td>
                            <td>
                                <div className={`${displayName}__description`}>
                                    {accs.slice(0, 2).map((v, i) => (
                                        <Fragment key={`setCaraccFirst${i}`}>
                                            <div
                                                style={{
                                                    width: 130,
                                                }}
                                            >
                                                <MyInput
                                                    id={`caraccNameFirstRow${i}`}
                                                    disabled
                                                    defaultValue={v.name}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    width: 130,
                                                }}
                                            >
                                                <MyInput
                                                    id={`caraccPriceFirstRow${i}`}
                                                    disabled
                                                    className="text-end"
                                                    defaultValue={v.price}
                                                    unit="만원"
                                                />
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                                <div
                                    className={`${displayName}__description wr-mt`}
                                >
                                    {accs.slice(2).map((v, i) => (
                                        <Fragment key={`setCaraccSecond${i}`}>
                                            <div
                                                style={{
                                                    width: 130,
                                                }}
                                            >
                                                <MyInput
                                                    id={`caraccNameSecondRow${i}`}
                                                    disabled
                                                    defaultValue={v.name}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    width: 130,
                                                }}
                                            >
                                                <MyInput
                                                    id={`caraccPriceSecondRow${i}`}
                                                    disabled
                                                    className="text-end"
                                                    defaultValue={v.price}
                                                    unit="만원"
                                                />
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="direct_bupum">
                                    추가부속 - 입력
                                </label>
                            </td>
                            <td>
                                <div className={`${displayName}__description`}>
                                    <div style={{ width: 410 }}>
                                        <MyInput
                                            id="direct_bupum"
                                            placeholder="추가부속입력"
                                            {...directCaraccname}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            width: 130,
                                        }}
                                    >
                                        <MyInput
                                            name="direct_bupum_price"
                                            className="text-end"
                                            {...directCaraccprice}
                                            unit="만원"
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="carprice">차량가액</label>
                            </td>
                            <td>
                                <div className={`${displayName}__description`}>
                                    <div
                                        style={{
                                            width: 140,
                                        }}
                                    >
                                        <MyInput
                                            id="carprice"
                                            name="carprice"
                                            placeholder="0"
                                            className="text-end"
                                            unit="만원"
                                            {...carprice}
                                        />
                                    </div>
                                    <div>
                                        <strong>부속가액</strong>
                                    </div>
                                    <div
                                        style={{
                                            width: 140,
                                        }}
                                    >
                                        <MyInput
                                            name="bupum_price"
                                            placeholder="0"
                                            className="text-end"
                                            readOnly
                                            defaultValue={totalCaraccPrice.toLocaleString()}
                                            unit="만원"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="il_price">
                                            <strong>일부담보</strong>
                                        </label>
                                    </div>
                                    <div
                                        style={{
                                            width: 125,
                                        }}
                                    >
                                        <MyInput
                                            id="il_price"
                                            name="il_price"
                                            placeholder="0"
                                            className="text-end"
                                            unit="만원"
                                            {...ilPrice}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>기타사항</span>
                            </td>
                            <td>
                                <div className={`${displayName}__description`}>
                                    <div>
                                        <label htmlFor="usang">
                                            <strong>유상운송</strong>
                                        </label>
                                    </div>
                                    <div style={{ width: 220 }}>
                                        <MySelect id="usang" {...usang} />
                                    </div>

                                    <div>
                                        <label htmlFor="usang2">
                                            <strong>기중기장치요율</strong>
                                        </label>
                                    </div>
                                    <div
                                        style={{
                                            width: 100,
                                        }}
                                    >
                                        <MyInput
                                            id="usang2"
                                            name="usang2"
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
            <CarcodeSearchModal
                setExternalCarcode={setCarcode}
                setExternalCaryear={setCaryear}
                setExternalCarname={setCarname}
            />
            <SetCarAccModal setExternalAccs={setAccs} />
        </>
    );
};
