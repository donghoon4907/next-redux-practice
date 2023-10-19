import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { LuPlusSquare } from 'react-icons/lu';
import { IconWrapper } from '@components/IconWrapper';

interface Props {
    data: string[];
    createUrl?: string;
}

export const SearchResultTemplate: FC<Props> = ({ data, createUrl }) => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const handleCreate = () => {
        if (createUrl) {
            router.push(createUrl);
        } else {
            router.push(`${router.pathname}/create`);
        }
    };

    return (
        <div className={`${displayName}__toolbar wr-mt`}>
            <div className={`${displayName}__total`}>
                {data.map((v, i) => {
                    const [label, count] = v.split(':');

                    return (
                        <Fragment key={`total${i}`}>
                            <div className={`${displayName}__title`}>
                                {label}
                            </div>
                            <div className={`${displayName}__comma`}>:</div>
                            <div className={`${displayName}__count`}>
                                {count.toLocaleString()}
                            </div>
                        </Fragment>
                    );
                })}
            </div>
            <div className={`${displayName}__tool`}>
                <IconWrapper onClick={handleCreate} title="추가">
                    <LuPlusSquare size={20} />
                </IconWrapper>
            </div>
        </div>
    );
};
