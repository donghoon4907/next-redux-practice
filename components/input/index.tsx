import type { FC, InputHTMLAttributes, ButtonHTMLAttributes } from 'react';
import type { CoreProps } from '@interfaces/core';

export interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    button?: CoreProps & ButtonHTMLAttributes<HTMLButtonElement>;
}

export const MyInput: FC<MyInputProps> = ({
    className,
    button,
    ...another
}) => {
    let btn = <></>;

    if (button) {
        const { children, ...ano } = button;

        btn = (
            <button className="btn btn-primary" {...ano}>
                {children}
            </button>
        );
    }

    return (
        <div className="input-group">
            <input className={`form-control ${className}`} {...another} />
            {btn}
        </div>
    );
};
