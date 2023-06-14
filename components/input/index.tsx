import type { FC } from 'react';

interface Props {
    value: string;
    onChange: (value: string) => void;
}
/**
 * 기본 입력창 컴포넌트
 *
 */
export const Input: FC<Props> = ({ value, onChange }) => {
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
