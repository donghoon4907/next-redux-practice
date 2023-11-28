import type { FC, ButtonHTMLAttributes } from 'react';
import { LuSearch } from 'react-icons/lu';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const InputSearchButton: FC<Props> = (props) => {
    const displayName = 'wr-detail-input';

    return (
        <button className={`${displayName}__button`} {...props}>
            <LuSearch size={18} />
            <span className="visually-hidden">검색</span>
        </button>
    );
};
