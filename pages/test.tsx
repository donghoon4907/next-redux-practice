import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { DemoState } from '@reducers/demo';
import type { CoreSelectOption } from '@interfaces/core';
import type { ColumnDef } from '@tanstack/react-table';
import Head from 'next/head';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { LuSearch } from 'react-icons/lu';
import { MyTable } from '@components/table';
import { wrapper } from '@store/redux';
import { demoRequest, demoSuccess } from '@actions/demo/demo.action';
import { MySelect } from '@components/select';
import { MyLabel } from '@components/label';
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

// 임시
import { useDispatch } from 'react-redux';
import { WithLabel } from '@components/WithLabel';
import { SearchInput } from '@components/input/Search';

const Demo: NextPage = () => {
    const dispatch = useDispatch();

    const { fields, data, total } = useSelector<AppState, DemoState>(
        (props) => props.demo,
    );

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

                        return <span className={className}>{cellValue}</span>;
                    },
                };
            }),
        [fields],
    );

    const handleChangeDate = (value: [Date, Date] | null) => {
        setD(value);
    };

    return (
        <>
            <Head>
                <title>목록 페이지</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="wr-main__inner">
                {/* <Breadcrumb /> */}
                <div className="wr-search">
                    <div className="row wr-search__inner">
                        <div className="col-6">
                            <div className="row">
                                {X_SEARCH_SELECTS[0].map((v) => (
                                    <div
                                        className={`col-${v.colspan}`}
                                        key={v.id}
                                    >
                                        <WithLabel
                                            id={v.id}
                                            label={v.label}
                                            type="active"
                                        >
                                            <MySelect
                                                id={v.id}
                                                width={v.width}
                                                options={v.items}
                                                value={org}
                                                onChange={handleChange}
                                                placeholder={v.placeholder}
                                            />
                                        </WithLabel>
                                    </div>
                                ))}
                                {/* <div className="col-4"></div> */}
                            </div>

                            <div className="row">
                                <div className="col-4 d-flex flex-column">
                                    <MyLabel>기간</MyLabel>
                                    <DateRangePicker
                                        format="yyyy-MM-dd"
                                        placeholder="기간을 입력하세요"
                                        size="sm"
                                        // defaultCalendarValue={[
                                        //     new Date('2022-02-01'),
                                        //     new Date('2022-03-01'),
                                        // ]}
                                        value={d}
                                        onChange={handleChangeDate}
                                        // showMeridian
                                        style={{
                                            width: 255,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                {X_SEARCH_SELECTS[1].map((v) => (
                                    <div
                                        className={`col-${v.colspan}`}
                                        key={v.id}
                                    >
                                        <WithLabel
                                            id={v.id}
                                            label={v.label}
                                            type="active"
                                        >
                                            <MySelect
                                                id={v.id}
                                                width={v.width}
                                                options={v.items}
                                                value={org}
                                                onChange={handleChange}
                                                placeholder={v.placeholder}
                                            />
                                        </WithLabel>
                                    </div>
                                ))}
                                <div className="col-6">
                                    <WithLabel
                                        id="search"
                                        label={'검색'}
                                        type="disable"
                                    >
                                        <SearchInput
                                            id="search"
                                            value={''}
                                            onChange={() => {}}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col mt-2 wr-filter">
                                    {X_SEARCH_FILTERS.map((filter, index) => {
                                        return (
                                            <div
                                                className="wr-filter__block"
                                                key={`check${index}`}
                                            >
                                                {filter.map((v) => {
                                                    if (v.type === 'checkbox') {
                                                        return (
                                                            <MyCheckbox
                                                                key={v.id}
                                                                id={v.id}
                                                                label={v.label}
                                                            />
                                                        );
                                                    } else if (
                                                        v.type === 'radio'
                                                    ) {
                                                        return (
                                                            <MyRadio
                                                                key={v.id}
                                                                id={v.id}
                                                                label={v.label}
                                                            />
                                                        );
                                                    } else {
                                                        return null;
                                                    }
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="wr-table__wrap wr-table--border">
                        <MyTable columns={columns} data={data} />
                    </div>
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
                demoRequest({
                    successAction: demoSuccess,
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

export default Demo;