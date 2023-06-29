import type { NextPage } from 'next';
import type { HTMLProps } from 'react';
import type { AppState } from '@reducers/index';
import type { CoreSelectOption } from '@interfaces/core';
import type { ColumnDef } from '@tanstack/react-table';
import Head from 'next/head';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { MyTable } from '@components/table';
import { wrapper } from '@store/redux';
import { MySelect } from '@components/select';
import { X_SEARCH_FILTERS, X_SEARCH_SELECTS } from '@constants/filter';
import { DateRangePicker } from 'rsuite';
import { MyCheckbox } from '@components/checkbox';
import { MyRadio } from '@components/radio';
import { MyPagination } from '@components/pagination';
import {
    isNumeric,
    checkEllipsisNeeded,
    checkSeparatorNeeded,
} from '@utils/validation';
import variables from '@styles/_variables.module.scss';

// 임시
import { useDispatch } from 'react-redux';
import { WithLabel } from '@components/WithLabel';
import { SearchInput } from '@components/input/Search';
import {
    getPostsRequest,
    getPostsSuccess,
} from '@actions/board/get-posts.action';
import { BoardState } from '@reducers/board';

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate, rest.checked]);

    return <input type="checkbox" ref={ref} className={className} {...rest} />;
}

const Board: NextPage = () => {
    const dispatch = useDispatch();

    const tableWrapRef = useRef<HTMLDivElement>(null);

    const { boards } = useSelector<AppState, BoardState>(
        (props) => props.board,
    );

    const [rowSelection, setRowSelection] = useState({});

    const [d, setD] = useState<[Date, Date] | null>([
        new Date('2022-02-01'),
        new Date('2022-03-01'),
    ]);

    const [org, setOrg] = useState<CoreSelectOption | null>(null);

    const handleChange = (org: CoreSelectOption | null) => {
        setOrg(org);
    };

    const columns = useMemo<ColumnDef<any>[]>(
        () =>
            Object.entries(boards.fields)
                .map(([key, value], i) => {
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
                                    {key}
                                </strong>
                            );
                        },
                        accessorKey: value,
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

                            return (
                                <span className={className}>{cellValue}</span>
                            );
                        },
                    };
                })
                .concat({
                    accessorKey: 'select',
                    header: ({ table }) => (
                        <IndeterminateCheckbox
                            {...{
                                checked: table.getIsAllRowsSelected(),
                                indeterminate: table.getIsSomeRowsSelected(),
                                onChange:
                                    table.getToggleAllRowsSelectedHandler(),
                            }}
                        />
                    ),
                    cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox
                                {...{
                                    checked: row.getIsSelected(),
                                    disabled: !row.getCanSelect(),
                                    indeterminate: row.getIsSomeSelected(),
                                    onChange: row.getToggleSelectedHandler(),
                                }}
                            />
                        </div>
                    ),
                }),
        [boards.fields],
    );

    const handleChangeDate = (value: [Date, Date] | null) => {
        setD(value);
    };

    // 테이블 높이 계산
    useEffect(() => {
        const headerHeight = +variables.headerHeight.split('px')[0];

        const filterHeight = 55;

        const padding = +variables.gutterSize.split('px')[0] * 4;

        const pagingHeight = 55;

        if (tableWrapRef.current) {
            const tableHeight =
                window.innerHeight -
                headerHeight -
                filterHeight -
                padding -
                pagingHeight;

            tableWrapRef.current.style.maxHeight = `${tableHeight}px`;
        }
    }, []);

    return (
        <>
            <Head>
                <title>게시판 목록페이지</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="wr-pages-board">
                {/* <Breadcrumb /> */}
                <div>
                    <h2>제목</h2>
                </div>
                <div
                    className="wr-table__wrap wr-table--border"
                    ref={tableWrapRef}
                >
                    <MyTable
                        columns={columns}
                        data={boards.data}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        pageSize={10}
                    />
                </div>

                <MyPagination />
                {/* <div className="flex items-center gap-2">
                                    <button
                                        className="border rounded p-1"
                                        // onClick={() => table.setPageIndex(0)}
                                        // disabled={!table.getCanPreviousPage()}
                                    >
                                        {'<<'}
                                    </button>
                                    <button
                                        className="border rounded p-1"
                                        // onClick={() => table.previousPage()}
                                        // disabled={!table.getCanPreviousPage()}
                                    >
                                        {'<'}
                                    </button>
                                    <button
                                        className="border rounded p-1"
                                        // onClick={() => table.nextPage()}
                                        // disabled={!table.getCanNextPage()}
                                    >
                                        {'>'}
                                    </button>
                                    <button
                                        className="border rounded p-1"
                                        // onClick={() =>
                                        //     table.setPageIndex(
                                        //         table.getPageCount() - 1,
                                        //     )
                                        // }
                                        // disabled={!table.getCanNextPage()}
                                    >
                                        {'>>'}
                                    </button>
                                </div> */}
            </div>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch, sagaTask }) =>
        async (_) => {
            dispatch(
                getPostsRequest({
                    successAction: getPostsSuccess,
                    callback: () => {},
                }),
            );

            dispatch(END);

            await sagaTask?.toPromise();

            return {
                props: {},
            };
        },
);

export default Board;
