import type { FC } from 'react';
import { useRef, useEffect } from 'react';
import {
    Column,
    Table as ReactTable,
    PaginationState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    ColumnDef,
    OnChangeFn,
    flexRender,
} from '@tanstack/react-table';
import { checkSeparatorNeeded, isNumeric } from '@utils/validation';

interface Props {
    columns: ColumnDef<any, any>[];
    data: any[];
}

export const MyTable: FC<Props> = ({ columns, data }) => {
    const tableRef = useRef<HTMLTableElement>(null);

    const table = useReactTable({
        data,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: false,
        state: {
            pagination: {
                pageIndex: 0,
                pageSize: 25,
            },
        },
    });

    useEffect(() => {
        const table = tableRef.current;

        if (table) {
            const columns =
                table.querySelectorAll<HTMLSpanElement>('thead th span');
            const fields =
                table.querySelectorAll<HTMLSpanElement>('tbody td span');

            let columnSpanWidth = -1;
            Array.from(columns).some((span) => {
                let output = false;
                if (span.classList.contains('ellipsisTarget')) {
                    columnSpanWidth = span.offsetWidth;

                    output = true;
                }

                return output;
            });

            Array.from(fields).forEach((v) => {
                if (v.classList.contains('text-truncate')) {
                    v.style.width = `${columnSpanWidth + 100}px`;
                }
            });
        }
    }, []);

    return (
        <table className="wr-table table" ref={tableRef}>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext(),
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody style={{ width: 1200 }}>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                            let className = '';

                            // 숫자인 경우 콤마를 사용해 천단위로 나누고, 오른쪽 정렬
                            if (
                                isNumeric(cell.getValue()) &&
                                checkSeparatorNeeded(cell.column.id)
                            ) {
                                className += 'text-end';
                            }

                            return (
                                <td key={cell.id} className={className}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
            {/* <tfoot>
                {table.getFooterGroups().map((footerGroup) => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.footer,
                                          header.getContext(),
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </tfoot> */}
        </table>
    );
};