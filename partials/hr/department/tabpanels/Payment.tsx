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

export const PaymentTabpanel: FC<Props> = ({ id, tabId, hidden, editable }) => {
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
            <div className="wr-pages-detail__subtitle">
                <strong>소득지급 설정</strong>
            </div>
            <div className="row">
                <div className="col-4">
                    <WithLabel id="bank" label="은행명" type={labelType}>
                        <MySelect
                            inputId="bank"
                            placeholder="선택"
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
                    <div className="wr-ml">
                        <WithLabel
                            id="account"
                            label="계좌번호"
                            type={labelType}
                        >
                            <MyInput
                                type="text"
                                id="account"
                                placeholder="계좌번호"
                                readOnly={!editable}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="col-4">
                    <div className="wr-ml">
                        <WithLabel id="holder" label="예금주" type={labelType}>
                            <MyInput
                                type="text"
                                id="holder"
                                placeholder="예금주"
                                readOnly={!editable}
                            />
                        </WithLabel>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-4">
                    <WithLabel
                        id="aRelation"
                        label="예금주관계"
                        type={labelType}
                    >
                        <MySelect
                            inputId="aRelation"
                            placeholder="선택"
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
                    <div className="wr-ml">
                        <WithLabel id="isTax" label="과세여부" type={labelType}>
                            <MySelect
                                inputId="isTax"
                                placeholder="선택"
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
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>정기공제관리</strong>
                        {editable && (
                            <div>
                                <MyButton
                                    className="btn-danger"
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
                                        <strong>시작월</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>종료월</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>적용차수</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>공제항목</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>적용금액</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>공제율(%)</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={editable ? 7 : 6}>
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
