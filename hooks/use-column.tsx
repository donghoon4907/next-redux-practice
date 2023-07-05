import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import {
    checkEllipsisNeeded,
    checkSeparatorNeeded,
    isNumeric,
} from '@utils/validation';

export const useEllipsisColumn = (fields: Array<any>) => {
    const columns = useMemo<ColumnDef<any>[]>(
        () =>
            Object.entries(fields).map(([key, value]) => {
                return {
                    header: (info: any) => {
                        return (
                            <strong
                                className={
                                    checkEllipsisNeeded(info.column.id)
                                        ? 'ellipsisTarget'
                                        : ''
                                }
                            >
                                {value}
                            </strong>
                        );
                    },
                    accessorKey: key,
                    cell: (info: any) => {
                        let className = '';
                        let cellValue = info.getValue();

                        if (
                            isNumeric(cellValue) &&
                            checkSeparatorNeeded(info.column.id)
                        ) {
                            cellValue = Number(cellValue).toLocaleString();
                        }

                        // 말줄임표가 필요한 경우
                        if (checkEllipsisNeeded(info.column.id)) {
                            className += 'text-truncate d-block';
                        }

                        return <span className={className}>{cellValue}</span>;
                    },
                };
            }),
        [fields],
    );

    return columns;
};
