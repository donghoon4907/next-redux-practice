import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from 'react-icons/md';

interface Props extends CoreProps {
    collapse: boolean;
    headerText: string;
    onClickHeader: () => void;
}

export const MyMultipleAccordion: FC<Props> = ({
    children,
    collapse,
    headerText,
    onClickHeader,
}) => {
    return (
        <div className="accordion">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        type="button"
                        className={`accordion-button ${
                            collapse ? 'collapsed' : ''
                        }`}
                        onClick={onClickHeader}
                    >
                        <span>{headerText}</span>
                        <span className="d-flex justify-content-center align-items-center">
                            {collapse ? (
                                <MdOutlineKeyboardArrowUp size={30} />
                            ) : (
                                <MdOutlineKeyboardArrowDown size={30} />
                            )}
                        </span>
                    </button>
                </h2>
                <div
                    className={`accordion-collapse collapse ${
                        collapse ? 'show' : ''
                    }`}
                >
                    <div className="accordion-body">{children}</div>
                </div>
            </div>
        </div>
    );
};
