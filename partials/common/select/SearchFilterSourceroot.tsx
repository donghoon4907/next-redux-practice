import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelect } from '@hooks/use-select';
import { MySelect } from '@components/select';
import { findSelectOption } from '@utils/getter';
import longConstants from '@constants/options/long';

interface Props {}

export const SearchFilterSourcerootSelect: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    // 검색필터 - 고객경로
    const [sourceroot, setSourceroot] = useSelect(longConstants.sourceroot);

    useEffect(() => {
        const { sourceroot } = router.query;

        if (sourceroot) {
            setSourceroot(
                findSelectOption(sourceroot, longConstants.sourceroot),
            );
        }
    }, [router]);

    return (
        <div className={`${displayName}__field`}>
            <label className={`${displayName}__label`} htmlFor="sourceroot">
                고객경로
            </label>
            <div style={{ width: 100 }}>
                <MySelect id="sourceroot" placeholder="선택" {...sourceroot} />
            </div>
        </div>
    );
};
