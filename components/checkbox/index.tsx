import type { FC, ChangeEvent } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps {
    id: string;
    label: string;
    // checked: boolean;
    // onChange: (checked: boolean) => void;
}
/**
 * 체크박스 컴포넌트
 *
 */
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
            <label className="form-check-label" htmlFor={id}>
                {label}
            </label>
        </div>
    );
};
