import type { FC } from 'react';
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

interface Props extends CoreProps {}

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

export const MyPagination: FC<Props> = () => {
    const [showCounts, setShowCounts] = useState<CoreSelectOption | null>(
        LIST_COUNTS[0],
    );

    const handleChangeCount = (value: CoreSelectOption | null) => {
        setShowCounts(value);
    };

    return (
        <div className="wr-pagination">
            <div>Total: 4,300</div>
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
                        <a className="page-link" href="#">
                            <AccessibleText>처음</AccessibleText>
                            <LuChevronFirst size={17} />
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            <AccessibleText>이전</AccessibleText>
                            <LuChevronLeft size={17} />
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            1
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            2
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            3
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            4
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            5
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            <AccessibleText>다음</AccessibleText>
                            <LuChevronRight size={17} />
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            <AccessibleText>마지막</AccessibleText>
                            <LuChevronLast size={17} />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
