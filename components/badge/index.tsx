import type { FC, InputHTMLAttributes, ButtonHTMLAttributes } from 'react';
import type { CoreProps } from '@interfaces/core';

export interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * 입력창 옆 버튼 설정
     */
    button?: CoreProps & ButtonHTMLAttributes<HTMLButtonElement>;
    /**
     * 입력창 단위 설정
     */
    unit?: string;
}

export const MyInput: FC<MyInputProps> = ({ button, unit }) => {
    let btn = null;
    let unitTxt = null;

    if (button) {
        const { children, className = 'btn-primary', ...ano } = button;

        btn = (
            <button className={`btn btn-sm ${className}`} {...ano}>
                {children}
            </button>
        );
    }

    if (unit) {
        unitTxt = <span className="wr-form__unit">{unit}</span>;
    }

    return (
        <span className="badge rounded-pill bg-danger">
            99+
            <span className="visually-hidden">unread messages</span>
        </span>
    );
};
