import type { FC } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import type { MyColumnDef } from '@hooks/use-column';
import type { CoreSetState } from '@interfaces/core';
import { useRef, useEffect, useState, useCallback } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';

import { AdditionalTd, EmptyTd, MyTd } from './Td';
import { MyTh } from './Th';
import { MyTableExtension } from './Extension';

interface Props {
    /**
     * 테이블 컬럼 목록
     */
    columns: MyColumnDef[];
    /**
     * 테이블 데이터 목록
     */
    data: any[];
    /**
     * 레코드 내 체크박스 관련
     */
    rowSelection?: RowSelectionState;
    setRowSelection?: CoreSetState<RowSelectionState>;
    /**
     * 페이지네이션 - 레코드 수
     */
    pageSize?: number;
    /**
     * 레코드 클릭 이벤트
     */
    onClickRow?: (row: any) => void;
    /**
     * 익스텐션 보이기 여부
     */
    showExtension?: boolean;
    /**
     * 새롭게 추가된 레코드의 수
     */
    // addCount?: number;
    /**
     * 새로운 레코드 추가 외부 이벤트
     */
    onClickAddRow?: () => void;
}

export const MyTable: FC<Props> = ({
    columns,
    data,
    rowSelection,
    setRowSelection,
    pageSize = 25,
    onClickRow,
    showExtension,
    // addCount = 0,
    onClickAddRow,
}) => {
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

    const handleClickRow = (row: any) => {
        onClickRow?.(row);
    };

    const handleKeyDown = useCallback(
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
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    // useEffect(() => {
    //     if (tableRef.current) {
    //         // 말 줄임표 처리 관련
    //         const columns =
    //             tableRef.current.querySelectorAll<HTMLSpanElement>(
    //                 'thead th span',
    //             );
    //         const fields =
    //             tableRef.current.querySelectorAll<HTMLSpanElement>(
    //                 'tbody td span',
    //             );
    //         let colSpanWidth = -1;
    //         Array.from(columns).some((span) => {
    //             let output = false;
    //             if (span.classList.contains('ellipsisTarget')) {
    //                 colSpanWidth = span.offsetWidth;
    //                 output = true;
    //             }
    //             return output;
    //         });
    //         const d = document.querySelectorAll(".text-truncate")
    //         Array.from(fields).forEach((v) => {
    //             if (v.classList.contains('text-truncate')) {
    //                 v.style.width = `${colSpanWidth + 150}px`;
    //             }
    //         });
    //     }
    // }, []);
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
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <MyTh key={header.id} {...header} />
                                ))}
                            </tr>
                        );
                    })}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length === 0 && (
                        <tr>
                            <EmptyTd colSpan={columns.length} />
                        </tr>
                    )}
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr
                                key={row.id}
                                onClick={() => handleClickRow(row.original)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <MyTd key={cell.id} {...cell} />
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
                {/* {addCount > 0 && (
                    <tfoot>
                        {Array.from({ length: addCount }).map((_, index) => (
                            <tr key={`additionalRow${index}`}>
                                {columns.map((col, i) => {
                                    return (
                                        <AdditionalTd
                                            key={`additionalCell${i}`}
                                            {...col}
                                        />
                                    );
                                })}
                            </tr>
                        ))}
                    </tfoot>
                )} */}
            </table>
            {showExtension && <MyTableExtension onClick={onClickAddRow} />}
        </div>
    );
};
