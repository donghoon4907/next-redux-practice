import type { FC } from 'react';
import { MyButton } from '@components/button';
import { useSelect } from '@hooks/use-select';
import carConstants from '@constants/options/car';
import { MySelect } from '@components/select';
import { FormTextarea } from '@components/textarea/Form';

interface Props {}
// 세부 담보 설정
export const FormCarGuarantee: FC<Props> = () => {
    const displayName = 'wr-pages-compare-car';
    // 대인배상 2
    const [dambo2, setDambo2] = useSelect(
        carConstants.dambo2,
        carConstants.dambo2[1],
    );
    // 대물한도
    const [dambo3, setDambo3] = useSelect(
        carConstants.dambo3,
        carConstants.dambo3[6],
    );
    // 자손/자상
    const [dambo4, setDambo4] = useSelect(
        carConstants.dambo4,
        carConstants.dambo4[3],
    );
    // 무보험차
    const [dambo5, setDambo5] = useSelect(
        carConstants.dambo5,
        carConstants.dambo5[1],
    );
    // 자기차량
    const [dambo6, setDambo6] = useSelect(
        carConstants.dambo6,
        carConstants.dambo6[1],
    );
    // 긴급출동
    const [gooutDist, setGooutDist] = useSelect(carConstants.gDist);
    // 긴급출동 세부
    const [gooutDetail] = useSelect(
        carConstants.gDetail,
        carConstants.gDetail[1],
    );
    // 마일리지
    const [mileDist] = useSelect(carConstants.mDist);
    // 마일리지 상세
    const [mileDetail] = useSelect(carConstants.mDetail, null);

    // 책임보험 preset
    const handlePresetLi = () => {
        setDambo2(carConstants.dambo2[0]);

        setDambo3(carConstants.dambo3[2]);

        setDambo4(carConstants.dambo4[0]);

        setDambo5(carConstants.dambo5[0]);

        setDambo6(carConstants.dambo6[0]);

        setGooutDist(carConstants.gDist[2]);
    };
    // 기본담보 preset
    const handlePresetBasicGuarantee = () => {
        setDambo2(carConstants.dambo2[1]);

        setDambo3(carConstants.dambo3[6]);

        setDambo4(carConstants.dambo4[3]);

        setDambo5(carConstants.dambo5[1]);

        setDambo6(carConstants.dambo6[1]);

        setGooutDist(carConstants.gDist[0]);
    };

    return (
        <div className="wr-table--normal">
            <table className="wr-table table wr-mt">
                <colgroup>
                    <col width="130px" className={`${displayName}__label`} />
                    <col width="220px" />
                    <col width="130px" className={`${displayName}__label`} />
                    <col width="220px" />
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan={4}>
                            <div className="wr-pages-detail__center">
                                <span>세부 담보 설정</span>
                                <MyButton
                                    type="button"
                                    className="btn-warning btn-sm"
                                    onClick={handlePresetLi}
                                >
                                    책임보험
                                </MyButton>
                                <MyButton
                                    type="button"
                                    className="btn-warning btn-sm"
                                    onClick={handlePresetBasicGuarantee}
                                >
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
                            <div className={`${displayName}__description`}>
                                <div>
                                    <strong>의무가입</strong>
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
                            <MySelect inputId="dambo2" required {...dambo2} />
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
                            <MySelect inputId="dambo3" required {...dambo3} />
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
                            <MySelect inputId="dambo4" required {...dambo4} />
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
                            <MySelect inputId="dambo5" required {...dambo5} />
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
                            <MySelect inputId="dambo6" required {...dambo6} />
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
                                required
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
                                required
                                {...gooutDetail}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="mile1">마일리지특약</label>
                        </td>
                        <td colSpan={3}>
                            <div className="d-flex justify-content-start align-items-center">
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <MySelect inputId="mile1" {...mileDist} />
                                </div>
                                <div
                                    style={{
                                        width: 300,
                                    }}
                                >
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
                            <label htmlFor="memo">메모</label>
                        </td>
                        <td colSpan={3}>
                            <FormTextarea
                                id="memo"
                                name="memo"
                                rows={4}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
