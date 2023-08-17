import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTable } from '@components/table';
import { useColumn } from '@hooks/use-column';
import { LONG_CHANGE_HISTORY } from '@constants/column';
import { MyTabpanel } from '@components/tab/Tabpanel';

interface Props extends MyTabpanelProps {
    data: any[];
    selectedData: any;
    editable: boolean;
}

export const ChangeHistoryTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    data,
    selectedData,
    editable,
}) => {
    const columns = useColumn(LONG_CHANGE_HISTORY);

    const handleShowSettingModal = () => {};

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col">
                    <div className="wr-table--normal">
                        <MyTable
                            columns={columns}
                            data={data}
                            showExtension={editable}
                            onClickAddRow={handleShowSettingModal}
                        />
                    </div>
                </div>
            </div>
            {selectedData && (
                <div className="row wr-mt">
                    <div className="col">
                        <textarea
                            value={selectedData}
                            style={{ width: '100%', height: '550px' }}
                            readOnly
                        />
                    </div>
                </div>
            )}
        </MyTabpanel>
    );
};
