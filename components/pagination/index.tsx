import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';
import {
    LuChevronFirst,
    LuChevronLeft,
    LuChevronRight,
    LuChevronLast,
} from 'react-icons/lu';

interface Props extends CoreProps {}

export const Pagination: FC<Props> = () => {
    return (
        <div className="wr-pagination">
            <div>Total: 4,300</div>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#">
                            <LuChevronFirst size={17} />
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
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
                            <LuChevronRight size={17} />
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            <LuChevronLast size={17} />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
