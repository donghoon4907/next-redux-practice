import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import {
    LuChevronFirst,
    LuChevronLeft,
    LuChevronRight,
    LuChevronLast,
} from 'react-icons/lu';
import { useSelect } from '@hooks/use-select';
import { findSelectOption } from '@utils/getter';
import commonContstants from '@constants/options/common';
import { createPageButtons } from '@utils/paging';
import { useSearch } from '@hooks/use-search';
import { PageSizeSelect } from '@components/select/PageSize';

interface Props extends CoreProps {
    /**
     * 전체 레코드의 수
     */
    total: number;
}

export const MyPagination: FC<Props> = ({ children, total }) => {
    const router = useRouter();

    const search = useSearch();

    const [listCount, setListCount] = useSelect(
        commonContstants.listCounts,
        commonContstants.listCounts[0],
        {
            callbackOnChange: (nextOption) => {
                if (nextOption) {
                    callApi(+nextOption.value, 1);
                }
            },
        },
    );

    const [page, setPage] = useState(1);

    const pageSize = +listCount.value!.value;

    const lastPage = Math.ceil(total / pageSize);

    const prevPage = page === 1 ? 1 : page - 1;

    const nextPage = page === lastPage ? lastPage : page + 1;

    // const pageButtons = useMemo(
    //     () => createPageButtons(total, pageSize, page),
    //     [total, pageSize, page],
    // );

    const pageButtons = useMemo(
        () => createPageButtons(lastPage, page, 3),
        [total, pageSize, page],
    );

    const handlePaging = (pageNo: number) => {
        setPage(pageNo);

        if (listCount.value) {
            callApi(pageSize, pageNo);
        }
    };

    const callApi = (pageSize: number, pageNo: number) => {
        const searchParams = new URLSearchParams(location.search);

        searchParams.set('page', pageNo.toString());

        searchParams.set('nums', pageSize.toString());

        search(searchParams.toString());
    };

    useEffect(() => {
        const { page, nums } = router.query;

        if (nums) {
            setListCount(findSelectOption(nums, commonContstants.listCounts));
        } else {
            setListCount(commonContstants.listCounts[0]);
        }

        if (page) {
            setPage(+page);
        } else {
            setPage(1);
        }
    }, [router]);

    return (
        <div className="wr-footer__between wr-pagination">
            <div className="wr-pagination__summary">{children}</div>
            {pageButtons.length > 0 && (
                <nav
                    className="wr-pagination__body"
                    aria-label="Page navigation"
                >
                    <div style={{ width: 120 }}>
                        <PageSizeSelect {...listCount} />
                    </div>
                    <ul className="pagination">
                        <li className="page-item icon">
                            <button
                                type="button"
                                className="page-link "
                                onClick={() => handlePaging(1)}
                            >
                                <span className="visually-hidden">처음</span>
                                <LuChevronFirst size={17} />
                            </button>
                        </li>
                        <li className="page-item icon">
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => handlePaging(prevPage)}
                            >
                                <span className="visually-hidden">이전</span>
                                <LuChevronLeft size={17} />
                            </button>
                        </li>
                        {pageButtons[0] !== 1 && (
                            <>
                                <li className="page-item">
                                    <button
                                        type="button"
                                        className="page-link"
                                        onClick={() => handlePaging(1)}
                                    >
                                        1
                                    </button>
                                </li>
                                <li className="page-item">. . .</li>
                            </>
                        )}

                        {pageButtons.map((p) => (
                            <li className="page-item" key={`page${p}`}>
                                <button
                                    type="button"
                                    className={`page-link ${
                                        p === page ? 'active' : ''
                                    }`}
                                    onClick={() => handlePaging(p)}
                                >
                                    {p}
                                </button>
                            </li>
                        ))}
                        {pageButtons[pageButtons.length - 1] !== lastPage && (
                            <>
                                <li className="page-item">. . .</li>
                                <li className="page-item">
                                    <button
                                        type="button"
                                        className="page-link"
                                        onClick={() => handlePaging(lastPage)}
                                    >
                                        {lastPage}
                                    </button>
                                </li>
                            </>
                        )}

                        <li className="page-item icon">
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => handlePaging(nextPage)}
                            >
                                <span className="visually-hidden">다음</span>
                                <LuChevronRight size={17} />
                            </button>
                        </li>
                        <li className="page-item icon">
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => handlePaging(lastPage)}
                            >
                                <span className="visually-hidden">마지막</span>
                                <LuChevronLast size={17} />
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};
