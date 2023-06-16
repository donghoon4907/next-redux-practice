import type { FC, ChangeEvent } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps {
    /**
     * 체크박스 id, label과 연결하기 위한 고유값
     */
    id: string;
    /**
     * 체크박스 설명, 체크박스 기준 오른쪽에 위치
     */
    label: string;
    // checked: boolean;
    // onChange: (checked: boolean) => void;
}

export const MyCheckbox: FC<Props> = ({
    id,
    label,
    // checked,
    // onChange
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // onChange(event.target.checked);
    };

    return (
        <div className="form-check">
            <input
                type="checkbox"
                className="form-check-input"
                // checked={checked}
                // onChange={handleChange}
                id={id}
            />
            <label className="form-check-label wr-label" htmlFor={id}>
                {label}
            </label>
        </div>
    );
};
