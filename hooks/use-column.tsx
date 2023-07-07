import type { ColumnDef } from '@tanstack/react-table';
import type { CoreColumnOption } from '@interfaces/core';
import { useMemo } from 'react';
import {
    checkEllipsisNeeded,
    checkSeparatorNeeded,
    isNumberic,
} from '@utils/validation';
import { MyButton } from '@components/button';

export type MyColumnDef = ColumnDef<any> & {
    headerText: string;
    headerKey: string;
};

export const useColumn = (fields: CoreColumnOption) => {
    const columns = useMemo<MyColumnDef[]>(
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
                    headerText: value,
                    headerKey: key,
                    cell: (info: any) => {
                        let className = '';
                        let cellValue = info.getValue();
                        let output = null;

                        if (
                            isNumberic(cellValue) &&
                            checkSeparatorNeeded(info.column.id)
                        ) {
                            cellValue = Number(cellValue).toLocaleString();
                        }

                        // 말줄임표가 필요한 경우
                        if (checkEllipsisNeeded(info.column.id)) {
                            className += 'text-truncate d-block';
                        }

                        if (Array.isArray(cellValue)) {
                            const [element, text, handler] = cellValue;

                            if (element === 'button') {
                                output = (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <MyButton
                                            type="button"
                                            className={`btn-primary ${className}`}
                                            onClick={handler}
                                        >
                                            {text}
                                        </MyButton>
                                    </div>
                                );
                            }
                        } else {
                            output = (
                                <span className={className}>{cellValue}</span>
                            );
                        }

                        return output;
                    },
                };
            }),
        [fields],
    );

    return columns;
};
