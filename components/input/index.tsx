import type { FC } from 'react';

export interface MyInputProps {
    id?: string;
    /**
     * 외부 상태값
     *
     */
    value: string;
    /**
     * 외부 상태를 변경하는 핸들러
     *
     */
    onChange: (value: string) => void;
}

export const MyInput: FC<MyInputProps> = ({ id, value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="input-group">
            <input
                id={id}
                type="text"
                className="form-control"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};
