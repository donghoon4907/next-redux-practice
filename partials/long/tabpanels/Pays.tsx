import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTable } from '@components/table';
import { useColumn } from '@hooks/use-column';
import { LONG_COL_PERFORMANCE } from '@constants/column';
import { MyTabpanel } from '@components/tab/Tabpanel';

interface Props extends MyTabpanelProps {
    data: any[];
    editable: boolean;
    addCount: number;
    onAddCount: () => void;
}

export const PaysTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    data,
    editable,
    addCount,
    onAddCount,
}) => {
    const columns = useColumn(LONG_COL_PERFORMANCE);

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col">
                    <div className="wr-pages-long-detail__tablewrap">
                        <MyTable
                            columns={columns}
                            data={data}
                            showExtension={editable}
                            addCount={addCount}
                            onAddCount={onAddCount}
                        />
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
