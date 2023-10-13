import type { FC, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LuSearch } from 'react-icons/lu';
import { WithLabel } from '@components/WithLabel';
import { useInput } from '@hooks/use-input';
import { isEmpty } from '@utils/validator/common';
import { useSearch } from '@hooks/use-search';
import { MyInput } from '@components/input';
import { MyButton } from '@components/button';
import { MySelect } from '@components/select';

interface Props {}

export const OrgaSearchFilterTemplate: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

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
            <div className={`${displayName}__filters`}>
                <div className={`${displayName}__filter`}>
                    <div className={`${displayName}__field`}>
                        <label className={`${displayName}__label`}>
                            필터명 1
                        </label>
                        <div style={{ width: 350 }}>
                            <MySelect
                                placeHolderFontSize={13}
                                placeholder="회사 > 개인영업1 > 1경기광주사업단 > 업무보전"
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__field`}>
                        <label className={`${displayName}__label`}>
                            필터명 2
                        </label>
                        <div style={{ width: 120 }}>
                            <MySelect
                                placeHolderFontSize={13}
                                placeholder="테스트이름"
                            />
                        </div>
                    </div>
                </div>
                <div className={`${displayName}__divider`}></div>
                <div className={`${displayName}__filter`}>
                    <div className={`${displayName}__field`}>
                        <label className={`${displayName}__label`}>
                            필터명 3
                        </label>
                        <div style={{ width: 120 }}>
                            <MySelect
                                placeHolderFontSize={13}
                                placeholder="테스트이름"
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__field`}>
                        <label className={`${displayName}__label`}>
                            필터명 4
                        </label>
                        <div style={{ width: 120 }}>
                            <MySelect
                                placeHolderFontSize={13}
                                placeholder="테스트이름"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${displayName}__search`}>
                <button type="submit">조회</button>
            </div>
        </>
    );
};
