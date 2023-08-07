import type { FC } from 'react';
import type { AnyAction } from 'redux';
import type { CoreProps, CoreSelectOption } from '@interfaces/core';
import { useState, useMemo } from 'react';
import {
    LuChevronFirst,
    LuChevronLeft,
    LuChevronRight,
    LuChevronLast,
} from 'react-icons/lu';
import { MySelect } from '@components/select';
import { AccessibleText } from '@components/AccessibleText';
import { useApi } from '@hooks/use-api';

interface Props extends CoreProps {
    /**
     * 요청 action
     */
    requestAction: (payload: any) => AnyAction;
    /**
     * 성공 action
     */
    successAction: (payload: any) => AnyAction;
    /**
     * 마지막으로 요청한 payload 정보
     */
    payload: any;
    /**
     * 전체 레코드의 수
     */
    total: number;
}

const LIST_COUNTS: CoreSelectOption[] = [
    {
        label: '25개 보기',
        value: '25',
    },
    {
        label: '50개 보기',
        value: '50',
    },
    {
        label: '100개 보기',
        value: '100',
    },
    {
        label: '500개 보기',
        value: '500',
    },
];

function calculatePageButtons(
    totalCount: number,
    pageSize: number,
    currentPage: number,
    blockSize: number = 5,
) {
    let totalPages = Math.ceil(totalCount / pageSize);
    let currentBlock = Math.ceil(currentPage / blockSize);
    let startPage = (currentBlock - 1) * blockSize + 1;
    let endPage = Math.min(startPage + blockSize - 1, totalPages);

    let pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(i);
    }

    return pageButtons;
}

export const MyPagination: FC<Props> = ({
    children,
    requestAction,
    successAction,
    payload,
    total,
}) => {
    const fireApi = useApi(requestAction);

    const [showCounts, setShowCounts] = useState<CoreSelectOption | null>(
        LIST_COUNTS[0],
    );

    const pageSize = +showCounts!.value;

    const lastPage = Math.ceil(total / pageSize);

    const prevPage = payload.page === 1 ? 1 : payload.page - 1;

    const nextPage = payload.page === lastPage ? lastPage : payload.page + 1;

    const pageButtons = useMemo(
        () => calculatePageButtons(total, pageSize, payload.page),
        [total, pageSize, payload],
    );

    const handleChangeCount = (count: CoreSelectOption | null) => {
        setShowCounts(count);

        if (count) {
            callApi(+count.value, 1);
        }
    };

    const handlePaging = (pageNo: number) => {
        if (showCounts) {
            callApi(+showCounts.value, pageNo);
        }
    };

    const callApi = (pageSize: number, pageNo: number) => {
        fireApi({
            ...payload,
            nums: pageSize,
            page: pageNo,
            successAction,
        });
    };

    return (
        <div className="wr-pagination">
            <div className="wr-pagination__summary">{children}</div>
            <nav className="wr-pagination__body" aria-label="Page navigation">
                <div>
                    <MySelect
                        // width={150}
                        options={LIST_COUNTS}
                        value={showCounts}
                        onChange={handleChangeCount}
                        placeholder={'선택'}
                    />
                </div>
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            type="button"
                            className="page-link "
                            onClick={() => handlePaging(1)}
                        >
                            <AccessibleText>처음</AccessibleText>
                            <LuChevronFirst size={17} />
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            type="button"
                            className="page-link"
                            onClick={() => handlePaging(prevPage)}
                        >
                            <AccessibleText>이전</AccessibleText>
                            <LuChevronLeft size={17} />
                        </button>
                    </li>
                    {pageButtons.map((p) => (
                        <li className="page-item" key={`page${p}`}>
                            <button
                                type="button"
                                className={`page-link ${
                                    p === payload.page ? 'active' : ''
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
                            <AccessibleText>다음</AccessibleText>
                            <LuChevronRight size={17} />
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            type="button"
                            className="page-link"
                            onClick={() => handlePaging(lastPage)}
                        >
                            <AccessibleText>마지막</AccessibleText>
                            <LuChevronLast size={17} />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
