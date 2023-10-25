import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelect } from '@hooks/use-select';
import { MySelect } from '@components/select';
import { findSelectOption } from '@utils/getter';
import longConstants from '@constants/options/long';

interface Props {}

export const SearchFilterLongSpecSelect: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    // 검색필터 - 보종
    const [spec, setSpec] = useSelect(longConstants.productType2);

    useEffect(() => {
        const { spec } = router.query;

        if (spec) {
            setSpec(findSelectOption(spec, longConstants.productType2));
        }
    }, [router]);

    return (
        <div className={`${displayName}__field`}>
            <label className={`${displayName}__label`} htmlFor="spec">
                보종
            </label>
            <div style={{ width: 110 }}>
                <MySelect id="spec" placeholder="선택" {...spec} />
            </div>
        </div>
    );
};
