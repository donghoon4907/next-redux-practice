import type { FC, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LuSearch } from 'react-icons/lu';
import { WithLabel } from '@components/WithLabel';
import { useInput } from '@hooks/use-input';
import { isEmpty } from '@utils/validator/common';
import { useSearch } from '@hooks/use-search';
import { MyInput } from '@components/input';

interface Props {}

export const UserSearchFilterTemplate: FC<Props> = () => {
    const displayName = 'wr-pages-list';

    const router = useRouter();

    const search = useSearch();

    // 검색필터 - 검색어
    const [keyword, setKeyword] = useInput('');
    // 검색필터 - 검색종류
    // const [type, setType] = useSelect(searchConstants.userSearchTypes);

    const handleSearch = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const { nums } = router.query;

        const searchParams = new URLSearchParams();

        if (!isEmpty(keyword.value)) {
            searchParams.append('search', keyword.value);
            // if (type.value) {
            //     searchParams.append('type', type.value.value);
            // }
        }

        searchParams.append('page', '1');

        if (nums) {
            searchParams.append('nums', nums as string);
        }

        search(searchParams.toString());
    };

    useEffect(() => {
        const searchKeyword = router.query.search as string;
        // const searchType = router.query.type as string;

        if (!isEmpty(searchKeyword)) {
            setKeyword(searchKeyword);
        }

        // if (!isEmpty(searchType)) {
        //     setType(
        //         findSelectOption(searchType, searchConstants.userSearchTypes),
        //     );
        // }
    }, [router]);

    return (
        <>
            <div className={`${displayName}__filter`}></div>
            <div className={`${displayName}__filter`}></div>
            <div className={`${displayName}__filter`}></div>
            <div className={`${displayName}__filter`}>
                <WithLabel id="searchKeyword" label="검색" type="active">
                    {/* <div
                        className="wr-with__extension"
                        style={{
                            width: 130,
                        }}
                    >
                        <MySelect placeholder="선택" {...type} />
                    </div> */}
                    <form
                        role="search"
                        className="wr-search__form"
                        onSubmit={handleSearch}
                    >
                        <MyInput
                            type="search"
                            // className="wr-border-l--hide"
                            button={{
                                type: 'submit',
                                className: 'btn-primary',
                                children: (
                                    <>
                                        <span className="visually-hidden">
                                            검색
                                        </span>
                                        <LuSearch size={15} />
                                    </>
                                ),
                            }}
                            {...keyword}
                        />
                    </form>
                </WithLabel>
            </div>
        </>
    );
};
