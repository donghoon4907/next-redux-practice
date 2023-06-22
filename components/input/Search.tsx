import type { FC, FormEvent } from 'react';
import { LuSearch } from 'react-icons/lu';
import { useInput } from '@hooks/use-input';
import { AccessibleText } from '@components/AccessibleText';

import { MyInput } from '.';

interface Props {
    id: string;
}

export const SearchInput: FC<Props> = ({ id }) => {
    const search = useInput('', { includeSetState: false });

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (search.value === '') {
            alert('검색어를 입력하세요');

            return;
        }

        alert('검색 액션 발생');
    };

    return (
        <form role="search" className="wr-search__form" onSubmit={handleSubmit}>
            <MyInput
                type="search"
                id={id}
                placeholder="검색어를 입력하세요"
                aria-label="검색어를 입력하세요"
                {...search}
                button={{
                    type: 'submit',
                    children: (
                        <>
                            <AccessibleText>검색</AccessibleText>
                            <LuSearch size={15} />
                        </>
                    ),
                }}
            />
        </form>
    );
};
