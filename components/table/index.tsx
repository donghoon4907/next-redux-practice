import type { FC } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import type { MyColumnDef } from '@hooks/use-column';
import type { CoreSetState } from '@interfaces/core';
import { useRouter } from 'next/router';
import { useRef, useEffect, useState, useCallback } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';

import { EmptyTd, MyTd } from './Td';
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
    const router = useRouter();

    const tableRef = useRef<HTMLTableElement>(null);

    const tableWrapRef = useRef<HTMLDivElement>(null);
    // 키보드 이벤트 활성화 여부
    const [keyEnabled, setKeyEnabled] = useState<boolean>(false);
    // order header id
    const [order, setOrder] = useState('');

    const table = useReactTable({
        data,
        columns,
        // defaultColumn,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            // rowSelection,
            pagination: {
                pageIndex: 0,
                pageSize,
            },
        },
        // enableRowSelection: true,
        // onRowSelectionChange: setRowSelection,
        // columnResizeMode: 'onChange',
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

    useEffect(() => {
        if (router.query.order) {
            setOrder(router.query.order as string);
        } else {
            setOrder('');
        }
    }, [router]);

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
                                    <MyTh
                                        key={header.id}
                                        order={order}
                                        setOrder={setOrder}
                                        {...header}
                                    />
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
                                className="wr-border-b"
                                onClick={() => handleClickRow(row.original)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <MyTd key={cell.id} {...cell} />
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {showExtension && <MyTableExtension onClick={onClickAddRow} />}
        </div>
    );
};
