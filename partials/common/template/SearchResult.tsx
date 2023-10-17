import type { FC } from 'react';
import { useRouter } from 'next/router';
import { IconWrapper } from '@components/IconWrapper';
import { AiOutlinePlusSquare } from 'react-icons/ai';

interface Props {
    total: number;
    pageName: string;
}

export const SearchResultTemplate: FC<Props> = ({ total, pageName }) => {
    const displayName = 'wr-pages-list2';

    const { pathname, query, replace } = useRouter();

    const pageSize = query.nums ? +query.nums : 25;

    const firstPage = query.page ? +query.page : 1;

    const lastPage = Math.ceil(total / pageSize);

    const handleCreate = () => {
        replace(`${pathname}/create`);
    };

    return (
        <div className={`${displayName}__toolbar wr-mt`}>
            <div className={`${displayName}__total`}>
                {pageName}&nbsp;
                {lastPage !== 0 && `(${firstPage}-${lastPage})&nbsp;`}/&nbsp;
                {total.toLocaleString()}
            </div>
            <div className={`${displayName}__tool`}>
                <IconWrapper onClick={handleCreate} title="추가">
                    <AiOutlinePlusSquare size={20} />
                </IconWrapper>
            </div>
        </div>
    );
};
