import type { FC, InputHTMLAttributes, ButtonHTMLAttributes } from 'react';
import type { CoreProps } from '@interfaces/core';

export interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    button?: CoreProps & ButtonHTMLAttributes<HTMLButtonElement>;
    unit?: string;
    wrapClassName?: string;
}

export const MyInput: FC<MyInputProps> = ({
    className = '',
    button,
    unit,
    ...another
}) => {
    let btn = null;
    let unitTxt = null;

    if (button) {
        const { children, ...ano } = button;

        btn = (
            <button className="btn btn-primary btn-sm" {...ano}>
                {children}
            </button>
        );
    }

    if (unit) {
        unitTxt = <span className="wr-form__unit">{unit}</span>;
    }

    return (
        <div className="input-group">
            <input className={`form-control ${className}`} {...another} />
            {btn}
            {unitTxt}
        </div>
    );
};
