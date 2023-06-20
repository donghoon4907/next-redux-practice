import type { FC } from 'react';

interface Props {
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

export const MyInput: FC<Props> = ({ value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};
