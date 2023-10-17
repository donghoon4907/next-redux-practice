import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MyInput } from '@components/input';
import { useInput } from '@hooks/use-input';

interface Props {}

export const SearchFilterKeywordInput: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    // 검색필터 - 검색어
    const [keyword, setKeyword] = useInput('');

    useEffect(() => {
        const { search } = router.query;

        if (search) {
            setKeyword(search as string);
        }
    }, [router]);

    return (
        <div className={`${displayName}__field`}>
            <label className={`${displayName}__label`} htmlFor="search">
                검색
            </label>
            <div style={{ width: 235 }}>
                <MyInput
                    id="search"
                    name="search"
                    type="search"
                    placeholder="검색어를 입력하세요."
                    {...keyword}
                />
            </div>
        </div>
    );
};
