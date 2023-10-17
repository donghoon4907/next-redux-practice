import type { FC, FormEvent } from 'react';
import type { CoreProps } from '@interfaces/core';
import { useRouter } from 'next/router';
import { useSearch } from '@hooks/use-search';
import { isEmpty } from '@utils/validator/common';

interface Props extends CoreProps {}

export const SearchFilterForm: FC<Props> = ({ children }) => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const search = useSearch();

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const { nums } = router.query;

        const formData = new FormData(evt.currentTarget);

        const searchParams = new URLSearchParams();

        searchParams.append('page', '1');

        if (nums) {
            searchParams.append('nums', nums as string);
        } else {
            searchParams.append('nums', '25');
        }

        for (const [key, value] of formData.entries()) {
            if (!isEmpty(value)) {
                searchParams.append(key, value as string);
            }
        }

        search(searchParams.toString());
    };

    return (
        <form className={`${displayName}__header`} onSubmit={handleSubmit}>
            {children}
            <div className={`${displayName}__search`}>
                <button type="submit">조회</button>
            </div>
        </form>
    );
};
