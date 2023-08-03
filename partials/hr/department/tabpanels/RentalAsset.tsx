import type { FC, ChangeEvent } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { showGuaranteeSettingModal } from '@actions/modal/guarantee-setting.action';
import { AppState } from '@reducers/index';
import { HrState } from '@reducers/hr';
import { MyTableExtension } from '@components/table/Extension';
import { MyCheckbox } from '@components/checkbox';
import { MyButton } from '@components/button';
import {
    deleteGuarantee,
    updateGuarantee,
} from '@actions/hr/set-guarantee.action';
import { Guarantee } from '@models/guarantee';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const RentalAssetTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const dispatch = useDispatch();

    // const { guarantees } = useSelector<AppState, HrState>((state) => state.hr);

    const labelType = 'disable';

    const handleShowSettingModal = () => {
        // dispatch(showAssetSettingModal());
    };

    const handleAllCheckAsset = (evt: ChangeEvent<HTMLInputElement>) => {
        // guarantees.forEach((v) => {
        //     dispatch(updateGuarantee({ ...v, checked: evt.target.checked }));
        // });
    };

    const handleCheckAsset = (
        evt: ChangeEvent<HTMLInputElement>,
        v: Guarantee,
    ) => {
        // dispatch(updateGuarantee({ ...v, checked: evt.target.checked }));
    };

    const handleDeleteAsset = () => {
        // if (guarantees.findIndex((v) => v.checked) === -1) {
        //     return alert('삭제할 설정을 선택해주세요.');
        // }
        // guarantees
        //     .filter((v) => v.checked)
        //     .forEach((v) => {
        //         dispatch(deleteGuarantee({ index: v.index }));
        //     });
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>자산 설정 내역</strong>
                        <div>
                            <MyButton className="btn-danger">선택삭제</MyButton>
                        </div>
                    </div>
                    <div className="wr-table--normal wr-mb position-relative">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    <th style={{ width: '100px' }}>
                                        <strong>구분</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>항목</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>관리번호</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>월렌트료</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>계약일자</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>계약기간</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>계약종료일</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>의무기간</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>의무종료일</strong>
                                    </th>
                                    <th>
                                        <strong>렌트업체</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>소유권</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>정산연동</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={13}>
                                        <span>데이터가 없습니다.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <MyTableExtension onClick={handleShowSettingModal} />
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
