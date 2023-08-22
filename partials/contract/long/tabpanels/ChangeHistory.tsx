import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { CoreEditableComponent } from '@interfaces/core';
import { MyTableExtension } from '@components/table/Extension';

interface Props extends MyTabpanelProps, CoreEditableComponent {}

export const ChangeHistoryTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const handleShowCreateModal = () => {};

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-table--normal wr-mb">
                <table className="wr-table table">
                    <thead>
                        <tr>
                            <th style={{ width: '100px' }}>
                                <strong>구분</strong>
                            </th>
                            <th>
                                <strong>내용</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>변경사항</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>일시</strong>
                            </th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {endorsements.length === 0 && (
                            <tr>
                                <td colSpan={editable ? 14 : 13}>
                                    배서 정보가 없습니다.
                                </td>
                            </tr>
                        )}
                        {endorsements.map((v, i) => (
                            <tr key={`endorsement${i}`}>
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
                                    <span>{v.dist ? v.dist : '-'}</span>
                                </td>
                                <td>
                                    <span>{v.whoi ? v.whoi : '-'}</span>
                                </td>
                                <td>
                                    <span>{v.paydate ? v.paydate : '-'}</span>
                                </td>
                                <td>
                                    <span>{v.gdate ? v.gdate : '-'}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>
                {editable && (
                    <MyTableExtension onClick={() => handleShowCreateModal()} />
                )}
            </div>
            {/* {selectedData && (
                <div className="row wr-mt">
                    <div className="col">
                        <textarea
                            value={selectedData}
                            style={{ width: '100%', height: '550px' }}
                            readOnly
                        />
                    </div>
                </div>
            )} */}
        </MyTabpanel>
    );
};
