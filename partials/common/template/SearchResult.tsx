import type { FC } from 'react';
import { useRouter } from 'next/router';
import { IconWrapper } from '@components/IconWrapper';
import { LuPlusSquare } from 'react-icons/lu';

interface Props {
    total: number;
    pageName: string;
    description?: string;
    customUrl?: string;
}

export const SearchResultTemplate: FC<Props> = ({
    total,
    pageName,
    description = '',
    customUrl,
}) => {
    const displayName = 'wr-pages-list2';

    const { pathname, query, push } = useRouter();

    const pageSize = query.nums ? +query.nums : 25;

    const firstPage = query.page ? +query.page : 1;

    const lastPage = Math.ceil(total / pageSize);

    const handleCreate = () => {
        if (customUrl) {
            push(customUrl);
        } else {
            push(`${pathname}/create`);
        }
    };

    return (
        <div className={`${displayName}__toolbar wr-mt`}>
            <div className={`${displayName}__total`}>
                {pageName}&nbsp;
                {lastPage !== 0 && `(${firstPage}-${lastPage}) `}/&nbsp;
                {total.toLocaleString()}&nbsp;
                {description}
            </div>
            <div className={`${displayName}__tool`}>
                <IconWrapper onClick={handleCreate} title="추가">
                    <LuPlusSquare size={20} />
                </IconWrapper>
            </div>
        </div>
    );
};
