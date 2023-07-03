import type { FC } from 'react';
import type {
    Column,
    PaginationState,
    ColumnDef,
    OnChangeFn,
    TableState,
    RowSelectionState,
    TableOptions,
} from '@tanstack/react-table';
import type { CoreSetState } from '@interfaces/core';
import { useRef, useEffect, useState, useCallback } from 'react';
import {
    // Table as ReactTable,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import {
    checkSeparatorNeeded,
    checkTextAlignRightNeeded,
    isNumeric,
} from '@utils/validation';
import { useTab } from '@hooks/use-tab';

interface Props {
    columns: ColumnDef<any, any>[];
    data: any[];
    rowSelection?: RowSelectionState;
    setRowSelection?: CoreSetState<RowSelectionState>;
    pageSize?: number;
}

export const MyTable: FC<Props> = ({
    columns,
    data,
    rowSelection,
    setRowSelection,
    pageSize = 20,
}) => {
    // const router = useRouter();
    const tab = useTab();

    const tableRef = useRef<HTMLTableElement>(null);

    const tableWrapRef = useRef<HTMLDivElement>(null);
    // 키보드 이벤트 활성화 여부
    const [keyEnabled, setKeyEnabled] = useState<boolean>(false);

    const table = useReactTable({
        data,
        columns,
        // defaultColumn,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            rowSelection,
            pagination: {
                pageIndex: 0,
                pageSize,
            },
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        columnResizeMode: 'onChange',
        debugTable: false,
    });

    const handleClickRow = (cidx: number, cname: string) => {
        tab.fire(`-detail-${cidx}`, `계약상세 - ${cname}`, `/detail/${cidx}`);
    };

    const handleTableScroll = useCallback(
        (evt: KeyboardEvent) => {
            if (keyEnabled) {
                const scrollAmount = 50;
                if (tableWrapRef.current) {
                    switch (evt.key) {
                        case 'ArrowUp':
                            tableWrapRef.current.scrollTop -= scrollAmount;
                            break;
                        case 'ArrowDown':
                            tableWrapRef.current.scrollTop += scrollAmount;
                            break;
                        case 'ArrowLeft':
                            tableWrapRef.current.scrollLeft -= scrollAmount;
                            break;
                        case 'ArrowRight':
                            tableWrapRef.current.scrollLeft += scrollAmount;
                            break;
                    }

                    evt.preventDefault();
                }
            }
        },
        [keyEnabled],
    );

    const handleMouseEnter = () => {
        setKeyEnabled(true);
    };

    const handleMouseLeave = () => {
        setKeyEnabled(false);
    };

    useEffect(() => {
        if (tableRef.current) {
            // 말 줄임표 처리 관련
            // const columns =
            //     tableRef.current.querySelectorAll<HTMLSpanElement>(
            //         'thead th span',
            //     );
            // const fields =
            //     tableRef.current.querySelectorAll<HTMLSpanElement>(
            //         'tbody td span',
            //     );

            // let colSpanWidth = -1;
            // Array.from(columns).some((span) => {
            //     let output = false;
            //     if (span.classList.contains('ellipsisTarget')) {
            //         colSpanWidth = span.offsetWidth;

            //         output = true;
            //     }

            //     return output;
            // });

            // const d = document.querySelectorAll(".text-truncate")

            // Array.from(fields).forEach((v) => {
            //     if (v.classList.contains('text-truncate')) {
            //         v.style.width = `${colSpanWidth + 150}px`;
            //     }
            // });
            // 테이블 내 마우스 오버 감지 관련 이벤트 추가
            document.addEventListener('keydown', handleTableScroll);
        }

        return () => {
            document.removeEventListener('keydown', handleTableScroll);
        };
    }, [handleTableScroll]);

    return (
        <div className="wr-table__wrap" ref={tableWrapRef}>
            <table
                className="wr-table table"
                ref={tableRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                // style={{ width: table.getCenterTotalSize() }}
            >
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    // style={{
                                    //     width: header.getSize(),
                                    // }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                    {/* <div
                                    {...{
                                        onMouseDown: header.getResizeHandler(),
                                        onTouchStart: header.getResizeHandler(),
                                        className: `resizer ${
                                            header.column.getIsResizing()
                                                ? 'isResizing'
                                                : ''
                                        }`,
                                    }}
                                /> */}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr
                                key={row.id}
                                onClick={() =>
                                    handleClickRow(
                                        row.original.cidx,
                                        row.original.cname,
                                    )
                                }
                            >
                                {row.getVisibleCells().map((cell) => {
                                    let className = '';

                                    // 숫자인 경우 콤마를 사용해 천단위로 나누고, 오른쪽 정렬
                                    if (
                                        isNumeric(cell.getValue()) &&
                                        checkSeparatorNeeded(cell.column.id) &&
                                        checkTextAlignRightNeeded(
                                            cell.column.id,
                                        )
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
                        );
                    })}
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
        </div>
    );
};
