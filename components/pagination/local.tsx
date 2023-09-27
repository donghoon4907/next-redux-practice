import type { FC } from 'react';
import type { CoreProps, CoreSetState } from '@interfaces/core';
import { useEffect, useMemo, useState } from 'react';
import {
    LuChevronFirst,
    LuChevronLeft,
    LuChevronRight,
    LuChevronLast,
} from 'react-icons/lu';
import { MySelect } from '@components/select';

import { useSelect } from '@hooks/use-select';
import commonContstants from '@constants/options/common';
import { createPageButtons } from '@utils/paging';

interface Props extends CoreProps {
    data: any[];
    setDisplayData: CoreSetState<any[]>;
}

export const MyLocalPagination: FC<Props> = ({
    children,
    data,
    setDisplayData,
}) => {
    const [page, setPage] = useState(1);

    const [listCount] = useSelect(commonContstants.listCounts);

    const total = data.length;

    const pageSize = +listCount.value!.value;

    const lastPage = Math.ceil(total / pageSize);

    const prevPage = page === 1 ? 1 : page - 1;

    const nextPage = page === lastPage ? lastPage : page + 1;

    const pageButtons = useMemo(
        () => createPageButtons(total, pageSize, page),
        [total, pageSize, page],
    );

    const handlePaging = (pageNo: number) => {
        if (listCount.value) {
            setPage(pageNo);

            setDisplayData(
                data.slice((pageNo - 1) * pageSize, pageNo * pageSize),
            );
        }
    };

    useEffect(() => {
        if (data.length > 0) {
            setPage(1);

            setDisplayData(data.slice(0, pageSize));
        }
    }, [data, pageSize]);

    return (
        <div className="wr-footer__between wr-pagination">
            <div className="wr-pagination__summary">{children}</div>
            {pageButtons.length > 0 && (
                <nav
                    className="wr-pagination__body"
                    aria-label="Page navigation"
                >
                    <div>
                        <MySelect {...listCount} />
                    </div>
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                type="button"
                                className="page-link "
                                onClick={() => handlePaging(1)}
                            >
                                <span className="visually-hidden">처음</span>
                                <LuChevronFirst size={17} />
                            </button>
                        </li>
                        <li className="page-item">
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => handlePaging(prevPage)}
                            >
                                <span className="visually-hidden">이전</span>
                                <LuChevronLeft size={17} />
                            </button>
                        </li>
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
                        <li className="page-item">
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => handlePaging(nextPage)}
                            >
                                <span className="visually-hidden">다음</span>
                                <LuChevronRight size={17} />
                            </button>
                        </li>
                        <li className="page-item">
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
