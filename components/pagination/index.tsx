import type { FC } from 'react';
import type { AnyAction } from 'redux';
import type { CoreProps, CoreSelectOption } from '@interfaces/core';
import { useState } from 'react';
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
    requestAction: (payload: any) => AnyAction;
    successAction: (payload: any) => AnyAction;
    payload: any;
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

export const MyPagination: FC<Props> = ({
    children,
    requestAction,
    successAction,
    payload,
}) => {
    const fireApi = useApi(requestAction);

    const [showCounts, setShowCounts] = useState<CoreSelectOption | null>(
        LIST_COUNTS[0],
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
        fireApi({ ...payload, nums: pageSize, page: pageNo, successAction });
    };

    return (
        <div className="wr-pagination">
            <div className="wr-pagination__summary">{children}</div>
            <nav className="wr-pagination__body" aria-label="Page navigation">
                <div>
                    <MySelect
                        width={150}
                        options={LIST_COUNTS}
                        value={showCounts}
                        onChange={handleChangeCount}
                        placeholder={'25개 보기'}
                    />
                </div>
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            type="button"
                            className="page-link"
                            onClick={() => handlePaging(1)}
                        >
                            <AccessibleText>처음</AccessibleText>
                            <LuChevronFirst size={17} />
                        </button>
                    </li>
                    <li className="page-item">
                        <button className="page-link">
                            <AccessibleText>이전</AccessibleText>
                            <LuChevronLeft size={17} />
                        </button>
                    </li>
                    <li className="page-item">
                        <button type="button" className="page-link">
                            1
                        </button>
                    </li>
                    <li className="page-item">
                        <button type="button" className="page-link">
                            2
                        </button>
                    </li>
                    <li className="page-item">
                        <button type="button" className="page-link">
                            3
                        </button>
                    </li>
                    <li className="page-item">
                        <button type="button" className="page-link">
                            4
                        </button>
                    </li>
                    <li className="page-item">
                        <button type="button" className="page-link">
                            5
                        </button>
                    </li>
                    <li className="page-item">
                        <button type="button" className="page-link">
                            <AccessibleText>다음</AccessibleText>
                            <LuChevronRight size={17} />
                        </button>
                    </li>
                    <li className="page-item">
                        <button type="button" className="page-link">
                            <AccessibleText>마지막</AccessibleText>
                            <LuChevronLast size={17} />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
