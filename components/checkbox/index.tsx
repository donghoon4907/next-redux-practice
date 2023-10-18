import type { FC, InputHTMLAttributes } from 'react';
import type { CoreProps } from '@interfaces/core';
// import variables from '@styles/_variables.module.scss';

interface Props extends CoreProps, InputHTMLAttributes<HTMLInputElement> {
    /**
     * 체크박스 설명, 체크박스 기준 오른쪽에 위치
     */
    label: string;
    /**
     * 필수 이펙트 추가 여부
     */
    isRequired?: boolean;
    /**
     * 레이블 폰트 크기
     */
    // labelFontSize: number;
}

export const MyCheckbox: FC<Props> = ({
    label,
    id,
    isRequired,
    // labelFontSize = variables.defaultFontSize,
    ...rest
}) => {
    return (
        <div className="wr-checkbox">
            <input
                type="checkbox"
                className="form-check-input"
                // checked={checked}
                // onChange={handleChange}
                id={id}
                name={id}
                {...rest}
            />
            <label
                className={`form-check-label ${
                    isRequired ? 'wr-label--required' : ''
                }`}
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
};
