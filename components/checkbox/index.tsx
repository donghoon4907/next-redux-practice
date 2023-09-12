import type { FC, ChangeEvent, InputHTMLAttributes } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps, InputHTMLAttributes<HTMLInputElement> {
    /**
     * 체크박스 설명, 체크박스 기준 오른쪽에 위치
     */
    label: string;
    /**
     * 필수 이펙트 추가 여부
     */
    isRequired?: boolean;
}

export const MyCheckbox: FC<Props> = ({ label, id, isRequired, ...rest }) => {
    return (
        <div className="wr-checkbox form-check">
            <input
                type="checkbox"
                className="form-check-input"
                // checked={checked}
                // onChange={handleChange}
                id={id}
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
