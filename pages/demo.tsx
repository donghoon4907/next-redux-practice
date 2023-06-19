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
import { Header } from '@components/header';
import { Table } from '@components/table';
import { wrapper } from '@store/redux';
import { demoRequest, demoSuccess } from '@actions/demo/demo.action';
// import { SHOW_COUNTS } from '@constants/selectOption';
import { MySelect } from '@components/select';
import { Label } from '@components/label';
import { X_SEARCH_FILTERS, X_SEARCH_SELECTS } from '@constants/filter';
import { DateRangePicker } from 'rsuite';

// 임시
import { useDispatch } from 'react-redux';
import { MyCheckbox } from '@components/checkbox';
import { Breadcrumb } from '@components/breadcrumb';
import { IconWrapper } from '@components/IconWrapper';
import { MyRadio } from '@components/radio';
import {
    isNumeric,
    checkEllipsisNeeded,
    checkSeparatorNeeded,
} from '@utils/validation';
import { Pagination } from '@components/pagination';
import { DrawerMenu } from '@components/drawer/DrawerMenu';
import { ASIDE_MENUS } from '@constants/gnb';
// import { ValueType } from 'rsuite/esm/DateRangePicker';

const Demo: NextPage = () => {
    const dispatch = useDispatch();

    const { fields, data, total } = useSelector<AppState, DemoState>(
        (props) => props.demo,
    );

    const [showCounts, setShowCounts] = useState<readonly CoreSelectOption[]>(
        [],
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
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="row">
                <div className="col-1 gutter--disable">
                    <div className="wr-nav">
                        <div className="wr-nav__logo">
                            <img src="http://via.placeholder.com/150x50" />
                        </div>
                        <div className="wr-drawer">
                            <DrawerMenu data={ASIDE_MENUS} />
                        </div>
                    </div>
                </div>
                <div className="col-11 gutter--disable">
                    <Header />
                    <section>
                        <div className="wr-main__wrap">
                            <main className="wr-main">
                                <div className="wr-main__inner">
                                    {/* <Breadcrumb /> */}
                                    <div className="wr-search">
                                        <div className="row wr-search__inner">
                                            <div className="col-6 gutter--disable">
                                                <div className="row">
                                                    {X_SEARCH_SELECTS[0].map(
                                                        (v) => (
                                                            <div
                                                                className="col-4 gutter--disable"
                                                                key={v.id}
                                                            >
                                                                <Label>
                                                                    {v.label}
                                                                </Label>
                                                                <MySelect
                                                                    width={
                                                                        v.width
                                                                    }
                                                                    options={
                                                                        v.items
                                                                    }
                                                                    value={org}
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    placeholder={
                                                                        v.placeholder
                                                                    }
                                                                />
                                                            </div>
                                                        ),
                                                    )}
                                                    {/* <div className="col-4"></div> */}
                                                </div>

                                                <div className="row">
                                                    <div className="col-4 d-flex flex-column gutter--disable">
                                                        <Label>기간</Label>
                                                        <DateRangePicker
                                                            format="yyyy-MM-dd"
                                                            placeholder="기간을 입력하세요"
                                                            size="sm"
                                                            // defaultCalendarValue={[
                                                            //     new Date('2022-02-01'),
                                                            //     new Date('2022-03-01'),
                                                            // ]}
                                                            value={d}
                                                            onChange={
                                                                handleChangeDate
                                                            }
                                                            // showMeridian
                                                            style={{
                                                                width: 255,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 gutter--disable">
                                                <div className="row row-cols-6">
                                                    {X_SEARCH_SELECTS[1].map(
                                                        (v) => (
                                                            <div
                                                                className="col gutter--disable"
                                                                key={v.id}
                                                            >
                                                                <Label>
                                                                    {v.label}
                                                                </Label>
                                                                <MySelect
                                                                    width={
                                                                        v.width
                                                                    }
                                                                    options={
                                                                        v.items
                                                                    }
                                                                    value={org}
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    placeholder={
                                                                        v.placeholder
                                                                    }
                                                                />
                                                            </div>
                                                        ),
                                                    )}
                                                    <div className="col-6 gutter--disable">
                                                        <Label>검색</Label>
                                                        <form
                                                            className="wr-search__bar"
                                                            role="search"
                                                        >
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="검색어를 입력하세요"
                                                                    aria-label="검색어를 입력하세요"
                                                                />
                                                                <button
                                                                    className="btn btn-primary"
                                                                    type="button"
                                                                >
                                                                    <LuSearch
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col mt-2 wr-filter gutter--disable">
                                                        {X_SEARCH_FILTERS.map(
                                                            (filter, index) => {
                                                                return (
                                                                    <div
                                                                        className="wr-filter__block"
                                                                        key={`check${index}`}
                                                                    >
                                                                        {filter.map(
                                                                            (
                                                                                v,
                                                                            ) => {
                                                                                if (
                                                                                    v.type ===
                                                                                    'checkbox'
                                                                                ) {
                                                                                    return (
                                                                                        <MyCheckbox
                                                                                            key={
                                                                                                v.id
                                                                                            }
                                                                                            id={
                                                                                                v.id
                                                                                            }
                                                                                            label={
                                                                                                v.label
                                                                                            }
                                                                                        />
                                                                                    );
                                                                                } else if (
                                                                                    v.type ===
                                                                                    'radio'
                                                                                ) {
                                                                                    return (
                                                                                        <MyRadio
                                                                                            key={
                                                                                                v.id
                                                                                            }
                                                                                            id={
                                                                                                v.id
                                                                                            }
                                                                                            label={
                                                                                                v.label
                                                                                            }
                                                                                        />
                                                                                    );
                                                                                } else {
                                                                                    return null;
                                                                                }
                                                                            },
                                                                        )}
                                                                    </div>
                                                                );
                                                            },
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wr-table__wrap mt-3">
                                        <Table columns={columns} data={data} />
                                    </div>
                                    <Pagination />
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
                            </main>
                        </div>
                    </section>
                </div>
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
