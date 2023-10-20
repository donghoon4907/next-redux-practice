import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSelect } from '@hooks/use-select';
import { AppState } from '@reducers/index';
import { HrState } from '@reducers/hr';
import { useApi } from '@hooks/use-api';
import { getUsersRequest } from '@actions/hr/get-users';
import { findSelectOption } from '@utils/getter';
import { MySelect } from '@components/select';
import { generateAllOption } from '@utils/generate';

interface Props {
    activeUser?: boolean;
}

export const SearchFilterOrgaSelect: FC<Props> = ({ activeUser }) => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { orgas } = useSelector<AppState, HrState>((props) => props.hr);

    const getUsers = useApi(getUsersRequest);

    // 검색필터 - 조직
    const [orga, setOrga] = useSelect(generateAllOption(orgas), undefined, {
        callbackOnChange: (next) => {
            if (next && activeUser) {
                getUsers({ idx: next.value });
            }
        },
    });

    useEffect(() => {
        const { orga_idx } = router.query;
        // 검색한 경우
        if (orga_idx) {
            setOrga(findSelectOption(orga_idx, orgas));

            if (activeUser) {
                getUsers({ idx: orga_idx });
            }
        }
    }, [router, activeUser]);

    return (
        <div className={`${displayName}__field`}>
            <label className={`${displayName}__label`} htmlFor="orga_idx">
                영업조직
            </label>
            <div style={{ minWidth: 276 }}>
                <MySelect id="orga_idx" placeholder="선택" {...orga} />
            </div>
        </div>
    );
};
