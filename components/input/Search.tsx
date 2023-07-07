import type { FC, FormEvent, InputHTMLAttributes } from 'react';
import { LuSearch } from 'react-icons/lu';
import { AccessibleText } from '@components/AccessibleText';

import { MyInput } from '.';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    onSearch?: () => void;
}

export const SearchInput: FC<Props> = ({ onSearch, ...rest }) => {
    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        onSearch?.();
    };

    return (
        <form role="search" className="wr-search__form" onSubmit={handleSubmit}>
            <MyInput
                type="search"
                {...rest}
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
