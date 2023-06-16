import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps {}

export const Breadcrumb: FC<Props> = () => {
    return (
        <div className="wr-breadcrumb">
            <div className="breadcrumb-wrap">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">개인영업 1</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#">신노원사업단</a>
                        </li>
                        <li
                            className="breadcrumb-item active"
                            aria-current="page"
                        >
                            업무보전
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    );
};
