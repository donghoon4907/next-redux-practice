import type { FC, ChangeEvent } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { Commission } from '@models/commission';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { AppState } from '@reducers/index';
import { HrState } from '@reducers/hr';
import { MyTableExtension } from '@components/table/Extension';
import { MyCheckbox } from '@components/checkbox';
import { MyButton } from '@components/button';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { showLifeLongModal } from '@actions/modal/life-long.action';
import {
    deleteCommission,
    updateCommission,
} from '@actions/hr/set-commission.action';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const CommissionTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const dispatch = useDispatch();

    const { commissions } = useSelector<AppState, HrState>((state) => state.hr);

    const labelType = 'disable';

    const handleShowSettingModal = () => {
        dispatch(showLifeLongModal());
    };

    const handleAllCheckCommission = (evt: ChangeEvent<HTMLInputElement>) => {
        commissions.forEach((v) => {
            dispatch(updateCommission({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheckCommission = (
        evt: ChangeEvent<HTMLInputElement>,
        v: Commission,
    ) => {
        dispatch(updateCommission({ ...v, checked: evt.target.checked }));
    };

    const handleDeleteCommission = () => {
        if (commissions.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 설정을 선택해주세요.');
        }
        commissions
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteCommission({ index: v.index }));
            });
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-4">
                    <WithLabel
                        id="guarGoal"
                        label="자동차 수수료 규정"
                        type={labelType}
                        isExpand
                    >
                        <div style={{ width: 185 }}>
                            <MySelect
                                id="pointStatus"
                                height={variables.detailFilterHeight}
                                isDisabled={!editable}
                                options={[]}
                                value={null}
                                onChange={() => {}}
                            />
                        </div>

                        <MyButton
                            className="btn-primary"
                            style={{ height: variables.detailFilterHeight }}
                        >
                            보기
                        </MyButton>
                    </WithLabel>
                </div>
                <div className="col-4">
                    <WithLabel
                        id="guarGoal"
                        label="일반 수수료 지급비율"
                        type={labelType}
                        isExpand
                    >
                        <div>
                            <MyInput
                                type="text"
                                id="genRate"
                                placeholder="지급율"
                                className="text-end"
                                readOnly={!editable}
                                unit="%"
                            />
                        </div>
                    </WithLabel>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>장기 기본수수료</strong>
                        {editable && (
                            <div>
                                <MyButton
                                    className="btn-danger btn-sm"
                                    onClick={handleDeleteCommission}
                                >
                                    선택삭제
                                </MyButton>
                            </div>
                        )}
                    </div>
                    <div className="wr-table--normal wr-mb">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    {editable && (
                                        <th style={{ width: 30 }}>
                                            <MyCheckbox
                                                label=""
                                                onChange={
                                                    handleAllCheckCommission
                                                }
                                            />
                                        </th>
                                    )}

                                    <th style={{ width: '150px' }}>
                                        <strong>시작월</strong>
                                    </th>
                                    <th style={{ width: '150px' }}>
                                        <strong>종료월</strong>
                                    </th>
                                    <th>
                                        <strong>수수료규정</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {commissions.length === 0 && (
                                    <tr>
                                        <td colSpan={editable ? 4 : 3}>
                                            등록된 설정이 없습니다.
                                        </td>
                                    </tr>
                                )}
                                {commissions.map((v, i) => (
                                    <tr key={`commission${i}`}>
                                        <td>
                                            <MyCheckbox
                                                label=""
                                                checked={v.checked}
                                                onChange={(evt) =>
                                                    handleCheckCommission(
                                                        evt,
                                                        v,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td>
                                            <span>{v.sMonth}</span>
                                        </td>
                                        <td>
                                            <span>{v.eMonth}</span>
                                        </td>
                                        <td>
                                            <span>{v.rule}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {editable && (
                            <MyTableExtension
                                onClick={handleShowSettingModal}
                            />
                        )}
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
