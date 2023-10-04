import type { FC } from 'react';

import { MyButton } from '@components/button';
import { MySelect } from '@components/select';
import { useSelect } from '@hooks/use-select';
import carConstants from '@constants/options/car';
import { useCheckbox } from '@hooks/use-checkbox';
import { MyCheckbox } from '@components/checkbox';

interface Props {}
// 보험요율사항
export const FormCarRate: FC<Props> = () => {
    const displayName = 'wr-pages-compare-car';
    // 보험가입경력 - 피보험자
    const [guipcarrer] = useSelect(carConstants.exp, carConstants.exp[1]);
    // 보험가입경력 - 차량
    const [guipcarrerCar, setGuipcarrerCar] = useSelect(carConstants.exp2);
    // 직전3년가입경력 - DB
    const [lJobcode] = useSelect(carConstants.exp, null);
    // 직전3년가입경력 - KB
    const [guipCarrerKb] = useSelect(carConstants.exp, null);
    // 교통법규 위반
    const [trafficDist] = useSelect(carConstants.tVio);
    // 교통법규 위반 건수
    const [trafficDetail] = useSelect(carConstants.numCase.slice(0, 4));
    // 총차량대수
    const [childdrive] = useSelect(carConstants.cDrive);
    // 할증율 - 할인할증
    const [halin] = useSelect(carConstants.halin, carConstants.halin[20]);
    // 할증율 - 군/법인/해외경력인정
    const [checkRateU] = useCheckbox(false);
    // 할증율 - 기본할증
    const [specialCode] = useSelect(carConstants.sCode);
    // 할증율 - 추가할증
    const [specialCode2] = useSelect(carConstants.sCode2);
    // 사고요율 - 3년간사고요율
    const [ssSago3, setSsSago3] = useSelect(carConstants.sago3);
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
    // 차가 2대이상 or 신차 preset
    const handlePresetTwoOrNew = () => {
        setGuipcarrerCar(carConstants.exp2[1]);

        setSsSago3(carConstants.sago3[2]);
    };

    return (
        <div className="wr-table--normal">
            <table className="wr-table table wr-mt">
                <colgroup>
                    <col width="130px" className={`${displayName}__label`} />
                    <col width="570px" />
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
                            <div className={`${displayName}__description`}>
                                <div>
                                    <label
                                        className="wr-label--required"
                                        htmlFor="guipcarrer"
                                    >
                                        <strong>피보험자</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
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
                                        <strong>차량</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 200,
                                    }}
                                >
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
                            <div className={`${displayName}__description`}>
                                <div>
                                    <label htmlFor="l_jobcode">
                                        <strong>DB</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
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
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
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
                            <div className={`${displayName}__description`}>
                                <div
                                    style={{
                                        width: 200,
                                    }}
                                >
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
                                    <label
                                        htmlFor="childdrive"
                                        className="wr-label--required"
                                    >
                                        <strong>총차량대수</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 100,
                                    }}
                                >
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
                            <div className={`${displayName}__description`}>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <MySelect inputId="halin" {...halin} />
                                </div>
                                {(guipcarrer.value?.value === 'B2' ||
                                    guipcarrer.value?.value === 'B3') && (
                                    <MyCheckbox
                                        id="rate_u"
                                        name="rate_u"
                                        label="군/법인/해외경력인정"
                                        value="1"
                                        {...checkRateU}
                                    />
                                )}
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
                            <div className={`${displayName}__description`}>
                                <div>
                                    <label
                                        className="wr-label--required"
                                        htmlFor="special_code"
                                    >
                                        <strong>기본할증</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 200,
                                    }}
                                >
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
                                        <strong>추가할증</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 200,
                                    }}
                                >
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
                            <div className={`${displayName}__description`}>
                                <div>
                                    <label
                                        className="wr-label--required"
                                        htmlFor="ss_sago3"
                                    >
                                        <strong>3년간요율</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 190,
                                    }}
                                >
                                    <MySelect inputId="ss_sago3" {...ssSago3} />
                                </div>

                                <div>
                                    <label htmlFor="pre_sago3">
                                        <strong>전계약요율</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 190,
                                    }}
                                >
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
                                        <strong>1년사고점수</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 177,
                                    }}
                                >
                                    <MySelect
                                        inputId="p_sago"
                                        menuPlacement="top"
                                        {...pSago}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="goout2">
                                        <strong>3년사고점수</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 182,
                                    }}
                                >
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
                            <div className={`${displayName}__description`}>
                                <div>
                                    <label htmlFor="sago3">
                                        <strong>3년간</strong>
                                    </label>
                                </div>
                                <div className="d-flex">
                                    <MySelect inputId="sago3" {...sago3} />
                                    <div className="wr-form__unit wr-border-l--hide">
                                        건
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="sago2">
                                        <strong>2년간</strong>
                                    </label>
                                </div>
                                <div className="d-flex">
                                    <MySelect inputId="sago2" {...sago2} />
                                    <div className="wr-form__unit wr-border-l--hide">
                                        건
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="sago1">
                                        <strong>1년간</strong>
                                    </label>
                                </div>
                                <div className="d-flex">
                                    <MySelect inputId="sago1" {...sago1} />
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
                            <div className={`${displayName}__description`}>
                                <div>
                                    <label htmlFor="car_sago3">
                                        <strong>3년간</strong>
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
                                        <strong>2년간</strong>
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
                                        <strong>1년간</strong>
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
                    <tr>
                        <td colSpan={2}>
                            <div className="wr-pages-detail__center">
                                <MyButton
                                    type="button"
                                    className="text-danger"
                                    onClick={handlePresetTwoOrNew}
                                >
                                    차가 2대이상인 경우 또는 신차인 경우
                                    클릭하세요
                                </MyButton>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
