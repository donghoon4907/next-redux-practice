import type { FC, ChangeEvent } from 'react';
import type { Excontract } from '@models/excontract';
import type { AppState } from '@reducers/index';
import type { CustomerState } from '@reducers/customer';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CreateExcontractModalPayload } from '@actions/modal/create-excontract.action';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyCheckbox } from '@components/checkbox';
import { MyButton } from '@components/button';
import { MyTableExtension } from '@components/table/Extension';
import { showCreateExcontractModal } from '@actions/modal/create-excontract.action';
import {
    deleteExcontract,
    updateExcontract,
} from '@actions/customer/set-excontract.action';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const ExcontractTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const dispatch = useDispatch();

    const { excontracts } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    const filteredLongs = excontracts.filter((v) => v.spe === 'long');

    const filteredCars = excontracts.filter((v) => v.spe === 'car');

    const filteredGens = excontracts.filter((v) => v.spe === 'gen');

    const handleShowCreateModal = (payload: CreateExcontractModalPayload) => {
        dispatch(showCreateExcontractModal(payload));
    };

    const handleAllCheckLongs = (evt: ChangeEvent<HTMLInputElement>) => {
        filteredLongs.forEach((v) => {
            dispatch(updateExcontract({ ...v, checked: evt.target.checked }));
        });
    };

    const handleAllCheckCars = (evt: ChangeEvent<HTMLInputElement>) => {
        filteredCars.forEach((v) => {
            dispatch(updateExcontract({ ...v, checked: evt.target.checked }));
        });
    };

    const handleAllCheckGens = (evt: ChangeEvent<HTMLInputElement>) => {
        filteredGens.forEach((v) => {
            dispatch(updateExcontract({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Excontract) => {
        dispatch(updateExcontract({ ...v, checked: evt.target.checked }));
    };

    const handleDeleteLongs = () => {
        if (filteredLongs.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 장기보험을 선택해주세요.');
        }

        filteredLongs
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteExcontract({ index: v.index }));
            });
    };

    const handleDeleteCars = () => {
        if (filteredCars.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 자동차보험을 선택해주세요.');
        }

        filteredCars
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteExcontract({ index: v.index }));
            });
    };

    const handleDeleteGens = () => {
        if (filteredGens.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 일반보험을 선택해주세요.');
        }

        filteredGens
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteExcontract({ index: v.index }));
            });
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-pages-detail__title">
                타사에서 가입한 보험계약 내역
                <span className="wr-pages-detail__description">
                    총계약건수: {excontracts.length}(장기 {filteredLongs.length}
                    , 자동차 {filteredCars.length}, 일반 {filteredGens.length})
                </span>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>장기보험 ({filteredLongs.length})</strong>
                        {editable && (
                            <div>
                                <MyButton
                                    className="btn-danger btn-sm"
                                    onClick={handleDeleteLongs}
                                >
                                    선택삭제
                                </MyButton>
                            </div>
                        )}
                    </div>
                    <div className="wr-table--normal">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    {editable && (
                                        <th style={{ width: '30px' }}>
                                            <MyCheckbox
                                                label=""
                                                onChange={handleAllCheckLongs}
                                            />
                                        </th>
                                    )}

                                    <th style={{ width: '100px' }}>보험사</th>
                                    <th style={{ width: '200px' }}>상품명</th>
                                    <th style={{ width: '100px' }}>세부보종</th>
                                    <th style={{ width: '100px' }}>보험료</th>
                                    <th style={{ width: '100px' }}>계약일자</th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLongs.length === 0 && (
                                    <tr>
                                        <td colSpan={editable ? 7 : 6}>
                                            내역이 없습니다.
                                        </td>
                                    </tr>
                                )}
                                {filteredLongs.map((v) => (
                                    <tr key={`excontractLong${v.index}`}>
                                        {editable && (
                                            <td>
                                                <MyCheckbox
                                                    label=""
                                                    checked={v.checked}
                                                    onChange={(evt) =>
                                                        handleCheck(evt, v)
                                                    }
                                                />
                                            </td>
                                        )}

                                        <td>
                                            <span>{v.wname}</span>
                                        </td>
                                        <td>
                                            <span
                                                className="text-truncate"
                                                style={{ width: 200 }}
                                            >
                                                {v.title ? v.title : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.subcategory
                                                    ? v.subcategory
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.pay
                                                    ? v.pay.toLocaleString()
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.contdate ? v.contdate : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.remark ? v.remark : '-'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {editable && (
                            <MyTableExtension
                                onClick={() => handleShowCreateModal('long')}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>자동차보험 ({filteredCars.length})</strong>
                        {editable && (
                            <div>
                                <MyButton
                                    className="btn-danger btn-sm"
                                    onClick={handleDeleteCars}
                                >
                                    선택삭제
                                </MyButton>
                            </div>
                        )}
                    </div>
                    <div className="wr-table--normal">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    {editable && (
                                        <th style={{ width: '30px' }}>
                                            <MyCheckbox
                                                label=""
                                                onChange={handleAllCheckCars}
                                            />
                                        </th>
                                    )}

                                    <th style={{ width: '100px' }}>보험사</th>
                                    <th style={{ width: '100px' }}>차량번호</th>
                                    <th style={{ width: '100px' }}>총보험료</th>
                                    <th style={{ width: '100px' }}>개시일자</th>
                                    <th style={{ width: '100px' }}>만기일자</th>
                                    <th style={{ width: '100px' }}>
                                        만기안내여부
                                    </th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCars.length === 0 && (
                                    <tr>
                                        <td colSpan={editable ? 8 : 7}>
                                            내역이 없습니다.
                                        </td>
                                    </tr>
                                )}
                                {filteredCars.map((v) => (
                                    <tr key={`excontractCar${v.index}`}>
                                        {editable && (
                                            <td>
                                                <MyCheckbox
                                                    label=""
                                                    checked={v.checked}
                                                    onChange={(evt) =>
                                                        handleCheck(evt, v)
                                                    }
                                                />
                                            </td>
                                        )}

                                        <td>
                                            <span>{v.wname}</span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.carnum ? v.carnum : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.pay
                                                    ? v.pay.toLocaleString()
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.contdate ? v.contdate : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.bo_dateto
                                                    ? v.bo_dateto
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.exp_notice
                                                    ? '안내'
                                                    : '미안내'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.remark ? v.remark : '-'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {editable && (
                            <MyTableExtension
                                onClick={() => handleShowCreateModal('car')}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>일반보험 ({filteredGens.length})</strong>
                        {editable && (
                            <div>
                                <MyButton
                                    className="btn-danger btn-sm"
                                    onClick={handleDeleteGens}
                                >
                                    선택삭제
                                </MyButton>
                            </div>
                        )}
                    </div>
                    <div className="wr-table--normal">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    {editable && (
                                        <th style={{ width: '30px' }}>
                                            <MyCheckbox
                                                label=""
                                                onChange={handleAllCheckGens}
                                            />
                                        </th>
                                    )}

                                    <th style={{ width: '100px' }}>보험사</th>
                                    <th style={{ width: '200px' }}>상품</th>
                                    <th style={{ width: '100px' }}>보험료</th>
                                    <th style={{ width: '100px' }}>개시일자</th>
                                    <th style={{ width: '100px' }}>만기일자</th>
                                    <th style={{ width: '100px' }}>
                                        만기안내여부
                                    </th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredGens.length === 0 && (
                                    <tr>
                                        <td colSpan={editable ? 8 : 7}>
                                            내역이 없습니다.
                                        </td>
                                    </tr>
                                )}
                                {filteredGens.map((v) => (
                                    <tr key={`excontractGen${v.index}`}>
                                        {editable && (
                                            <td>
                                                <MyCheckbox
                                                    label=""
                                                    checked={v.checked}
                                                    onChange={(evt) =>
                                                        handleCheck(evt, v)
                                                    }
                                                />
                                            </td>
                                        )}

                                        <td>
                                            <span>{v.wname}</span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.title ? v.title : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.pay
                                                    ? v.pay.toLocaleString()
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.contdate ? v.contdate : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.bo_dateto
                                                    ? v.bo_dateto
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.exp_notice
                                                    ? '안내'
                                                    : '미안내'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.remark ? v.remark : '-'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {editable && (
                            <MyTableExtension
                                onClick={() => handleShowCreateModal('gen')}
                            />
                        )}
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
