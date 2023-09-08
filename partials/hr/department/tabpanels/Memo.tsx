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
import { MyDatepicker } from '@components/datepicker';
import { useDatepicker } from '@hooks/use-datepicker';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const MemoTabpanel: FC<Props> = ({ id, tabId, hidden, editable }) => {
    const dispatch = useDispatch();

    const { commissions } = useSelector<AppState, HrState>((state) => state.hr);

    // 상담시간
    const [consultingDate] = useDatepicker(null);

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
                        id="consultingDivision"
                        label="상담구분"
                        type={labelType}
                    >
                        <MySelect
                            inputId="consultingDivision"
                            placeHolderFontSize={16}
                            height={variables.detailFilterHeight}
                            isDisabled={!editable}
                            options={[]}
                            value={null}
                            onChange={() => {}}
                            // {...bank}
                        />
                    </WithLabel>
                </div>
                <div className="col-4">
                    <WithLabel
                        id="consultingDate"
                        label="상담예정"
                        type={labelType}
                    >
                        <MyDatepicker
                            id="consultingDate"
                            size="md"
                            placeholder="상담예정"
                            format="yyyy-MM-dd HH:mm:ss"
                            disabled={!editable}
                            hooks={consultingDate}
                        />
                    </WithLabel>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <textarea style={{ width: '100%', height: 200 }} />
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>상담내역</strong>
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

                                    <th style={{ width: '100px' }}>
                                        <strong>구분</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>작성일자</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>작성자</strong>
                                    </th>
                                    <th>
                                        <strong>내용</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>상담예정</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={editable ? 6 : 5}>
                                        등록된 설정이 없습니다.
                                    </td>
                                </tr>
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
