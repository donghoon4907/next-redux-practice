import type { FC, ChangeEvent } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps {
    /**
     * 라디오 버튼 id, label과 연결하기 위한 고유값
     */
    id: string;
    /**
     * 라디오 버튼 설명, 라디오 버튼 기준 오른쪽에 위치
     */
    label: string;
    /**
     * 기본 체크 여부
     */
    defaultChecked?: boolean;
    /**
     * 기본 체크 여부
     */
    name?: string;
    // checked: boolean;
    // onChange: (checked: boolean) => void;
}

export const MyRadio: FC<Props> = ({
    id,
    label,
    defaultChecked,
    name,
    // checked,
    // onChange
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // onChange(event.target.checked);
    };

    return (
        <div className="form-check d-flex justify-content-center align-items-center">
            <input
                className="form-check-input"
                type="radio"
                id={id}
                defaultChecked={defaultChecked}
                name={name}
            />
            <label className="form-check-label ms-1" htmlFor={id}>
                {label}
            </label>
        </div>
    );
};
