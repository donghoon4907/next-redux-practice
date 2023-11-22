import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { CarState } from '@reducers/car';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CoreEditableComponent } from '@interfaces/core';
import type { UseDatepickerOutput } from '@hooks/use-datepicker';
import type { UseInputOutput } from '@hooks/use-input';
import { useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyCheckbox } from '@components/checkbox';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { MyUnit } from '@components/Unit';

interface Props extends MyTabpanelProps, CoreEditableComponent {
    bboxDateHooks: UseDatepickerOutput;
    bboxPriceHooks: UseInputOutput;
}

export const CompareTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    bboxDateHooks,
    bboxPriceHooks,
}) => {
    const { estimate } = useSelector<AppState, CarState>((state) => state.car);

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            {estimate ? (
                <div className="row wr-pages-detail__applydatepicker">
                    <div className="flex-fill">
                        <div className="row">
                            <div className="flex-fill">
                                <FloatInput
                                    label="차명코드"
                                    readOnly
                                    value={estimate.carcode}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="차량연식"
                                    readOnly
                                    value={estimate.caryear}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="차명"
                                    readOnly
                                    value={estimate.carname}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="차량등급"
                                    readOnly
                                    value={estimate.car_grade}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="차량등록일"
                                    readOnly
                                    value={estimate.cardate}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="배기량"
                                    readOnly
                                    value={estimate.baegirang}
                                    after={<MyUnit placement="last">cc</MyUnit>}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="탑승인원"
                                    readOnly
                                    value={estimate.people_num}
                                    after={
                                        <MyUnit placement="last">인승</MyUnit>
                                    }
                                />
                            </div>
                        </div>
                        <div className="row wr-mt wr-pb wr-border-b">
                            <div className="flex-fill">
                                <FloatInput
                                    label="에어백"
                                    readOnly
                                    value={estimate.aircode}
                                />
                            </div>
                            <div className="flex-fill">
                                <div className="wr-pages-detail__buttons h-100">
                                    <MyCheckbox
                                        label="오토"
                                        readOnly
                                        checked={estimate.auto}
                                    />
                                    <MyCheckbox
                                        label="ABS"
                                        readOnly
                                        checked={estimate.abs_halin}
                                    />
                                    <MyCheckbox
                                        label="이모빌라이저"
                                        readOnly
                                        checked={estimate.imo}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="전방충돌"
                                    readOnly
                                    value={estimate.chung}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="차선이탈"
                                    readOnly
                                    value={estimate.gps}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt wr-pb wr-border-b">
                            <div className="flex-fill">
                                <FloatInput
                                    label="커넥티드카(블루링크 또는 UVO)"
                                    readOnly
                                    value={estimate.blue_link ? 'Y' : 'N'}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="지능형 안전장치"
                                    readOnly
                                    value={estimate.l_jobcode_nm ? 'Y' : 'N'}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="블랙박스"
                                    readOnly
                                    value={estimate.bbox ? 'Y' : 'N'}
                                />
                            </div>
                            <div className="flex-fill"></div>
                        </div>
                        {estimate.bbox && (
                            <div className="row wr-mt wr-pb wr-border-b">
                                <div className="flex-fill">
                                    <FloatDatepicker
                                        label="구입시기"
                                        readOnly={!editable}
                                        hooks={bboxDateHooks}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <FloatInput
                                        label="구입가"
                                        readOnly={!editable}
                                        isNumber
                                        after={
                                            <MyUnit placement="last">
                                                만원
                                            </MyUnit>
                                        }
                                        {...bboxPriceHooks}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="기본차량가액"
                                    readOnly
                                    value={estimate.carprice.toLocaleString()}
                                    after={
                                        <MyUnit placement="last">만원</MyUnit>
                                    }
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="차량구매형태"
                                    readOnly
                                    value={estimate.membercode}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="부속차량가액"
                                    readOnly
                                    value={estimate.bupum_price.toLocaleString()}
                                    after={
                                        <MyUnit placement="last">만원</MyUnit>
                                    }
                                />
                            </div>
                            <div className="flex-fill wr-border-b">
                                <div className="wr-pages-detail__title wr-pt">
                                    <div>총차량가액</div>
                                    <div>
                                        <span className="wr-pages-detail__total">
                                            {estimate.car_tot.toLocaleString()}
                                        </span>
                                        <span className="wr-pl">만원</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__buttons wr-mt">
                            <MyCheckbox
                                label="LPG"
                                readOnly
                                checked={estimate.lpg}
                            />
                            <MyCheckbox
                                label="탑차"
                                readOnly
                                checked={estimate.topcar}
                            />
                            <MyCheckbox
                                label="스포츠카"
                                readOnly
                                checked={estimate.sportcar}
                            />
                        </div>
                        <div className="row wr-mt wr-pb wr-border-b">
                            <div className="flex-fill">
                                <FloatInput
                                    label="유상운송"
                                    readOnly
                                    value={estimate.usang}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="기중기 장치요율"
                                    readOnly
                                    value={estimate.usang2}
                                    after={<MyUnit placement="last">%</MyUnit>}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="총 차량대수"
                                    readOnly
                                    value={estimate.childdrive}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="차량용도"
                                    readOnly
                                    value={estimate.caruse}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="wr-divider__vertical"></div>
                    <div className="flex-fill">
                        <div className="wr-pages-detail__title wr-border-b">
                            세부담보
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="대인배상I"
                                    readOnly
                                    value={estimate.dambo1}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="대인배상II"
                                    readOnly
                                    value={estimate.dambo2}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="대물한도"
                                    readOnly
                                    value={estimate.dambo3}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="자손/자상"
                                    readOnly
                                    value={estimate.dambo4}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="무보험차"
                                    readOnly
                                    value={estimate.dambo5}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="자기차량"
                                    readOnly
                                    value={estimate.dambo6}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt wr-pb wr-border-b">
                            <div className="flex-fill">
                                <FloatInput
                                    label="물적사고할증"
                                    readOnly
                                    value={estimate.mul_sago}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="긴급출동"
                                    readOnly
                                    value={`${estimate.goout1}, ${estimate.goout_dist}`}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="마일리지"
                                    readOnly
                                    value={`${estimate.mile1}, ${estimate.mile2}`}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="자녀특약"
                                    readOnly
                                    value={estimate.drate}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="일부담보"
                                    readOnly
                                    value={estimate.il_price.toLocaleString()}
                                    after={
                                        <MyUnit placement="last">만원</MyUnit>
                                    }
                                />
                            </div>
                            <div className="flex-fill"></div>
                        </div>
                        <div className="wr-mt wr-pages-detail__title wr-border-b">
                            보험요율
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="보험가입경력(피보기준)"
                                    readOnly
                                    value={estimate.guipcarrer}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="보험가입경력(차량기준)"
                                    readOnly
                                    value={estimate.guipcarrer_car}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt wr-pb wr-border-b">
                            <div className="flex-fill">
                                <FloatInput
                                    label="직전3년가입경력(DB)"
                                    readOnly
                                    value={estimate.l_jobcode}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="직전3년가입경력(KB)"
                                    readOnly
                                    value={estimate.guipcarrer_kb}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="교통법규위반"
                                    readOnly
                                    value={estimate.traffic}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="교통법규위반건수"
                                    readOnly
                                    value={estimate.gr_area}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt wr-pb wr-border-b">
                            <div className="flex-fill">
                                <div className="wr-pages-detail__buttons wr-mt">
                                    <MyCheckbox
                                        label="군/법인/해외경력 인정"
                                        readOnly
                                        checked={estimate.rate_u}
                                    />
                                </div>
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="특별할증율(추가할증)"
                                    readOnly
                                    value={`${estimate.special_code}, ${estimate.special_code2}`}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="3년간 사고요율"
                                    readOnly
                                    value={estimate.ss_sago3}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="전계약 사고요율"
                                    readOnly
                                    value={estimate.pre_sago3}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt wr-pb wr-border-b">
                            <div className="flex-fill">
                                <FloatInput
                                    label="3년간 사고점수"
                                    readOnly
                                    value={estimate.goout2}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="1년간 사고점수"
                                    readOnly
                                    value={estimate.p_sago}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="피보기준 3년간 사고건수"
                                    readOnly
                                    value={estimate.sago3}
                                    after={<MyUnit placement="last">건</MyUnit>}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="차량기준 3년간 사고건수"
                                    readOnly
                                    value={estimate.car_sago3}
                                    after={<MyUnit placement="last">건</MyUnit>}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="피보기준 2년간 사고건수"
                                    readOnly
                                    value={estimate.car_nonum}
                                    after={<MyUnit placement="last">건</MyUnit>}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="차량기준 2년간 사고건수"
                                    readOnly
                                    value={estimate.car_sago2}
                                    after={<MyUnit placement="last">건</MyUnit>}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="피보기준 1년간 사고건수"
                                    readOnly
                                    value={estimate.sago1}
                                    after={<MyUnit placement="last">건</MyUnit>}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="차량기준 1년간 사고건수"
                                    readOnly
                                    value={estimate.car_sago1}
                                    after={<MyUnit placement="last">건</MyUnit>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>연결된 비교견적 정보가 없습니다.</p>
            )}
        </MyTabpanel>
    );
};
