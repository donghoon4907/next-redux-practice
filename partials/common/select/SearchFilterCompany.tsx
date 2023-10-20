import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useSelect } from '@hooks/use-select';
import { MySelect } from '@components/select';
import { findSelectOption } from '@utils/getter';
import { generateAllOption, generateAllOptionWcode } from '@utils/generate';

interface Props {
    options: CoreSelectOption[];
}

export const SearchFilterCompanySelect: FC<Props> = ({ options }) => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const memorizedCompany = useMemo(
        () => generateAllOption(generateAllOptionWcode(options)),
        [options],
    );

    // 검색필터 - 보험사
    const [company, setCompany] = useSelect(memorizedCompany);

    useEffect(() => {
        const { company } = router.query;

        if (company) {
            setCompany(findSelectOption(company, memorizedCompany));
        }
    }, [router]);

    return (
        <div className={`${displayName}__field`}>
            <label className={`${displayName}__label`} htmlFor="company">
                보험사
            </label>
            <div style={{ width: 120 }}>
                <MySelect id="company" placeholder="선택" {...company} />
            </div>
        </div>
    );
};
