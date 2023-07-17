import type { InputHTMLAttributes, ButtonHTMLAttributes } from 'react';
import type { CoreProps } from '@interfaces/core';
import { forwardRef } from 'react';

export interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    button?: CoreProps & ButtonHTMLAttributes<HTMLButtonElement>;
    unit?: string;
    wrapClassName?: string;
}

export const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
    ({ className = '', button, unit, ...another }, ref) => {
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
            <div className="input-group">
                <input
                    className={`form-control ${className}`}
                    {...another}
                    ref={ref}
                />
                {btn}
                {unitTxt}
            </div>
        );
    },
);
