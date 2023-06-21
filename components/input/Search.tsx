import type { FC, FormEvent } from 'react';
import type { MyInputProps } from '.';
import { LuSearch } from 'react-icons/lu';

interface Props extends MyInputProps {
    onSubmit?: () => void;
}

export const SearchInput: FC<Props> = ({ id, value, onChange, onSubmit }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    };

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        onSubmit?.();
    };

    return (
        <form role="search" className="wr-search__form" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="search"
                    className="form-control"
                    placeholder="검색어를 입력하세요"
                    aria-label="검색어를 입력하세요"
                    value={value}
                    onChange={handleChange}
                    id={id}
                />
                <button className="btn btn-primary" type="submit">
                    <LuSearch size={15} />
                </button>
            </div>
        </form>
    );
};
