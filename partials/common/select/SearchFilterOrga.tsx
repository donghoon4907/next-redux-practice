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

interface Props {
    activeUser?: boolean;
}

export const SearchFilterOrgaSelect: FC<Props> = ({ activeUser }) => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { orgas, loggedInUser } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    const getUsers = useApi(getUsersRequest);

    // 검색필터 - 조직
    const [orga, setOrga] = useSelect(orgas, null, {
        callbackOnChange: (next) => {
            if (next && activeUser) {
                getUsers({ idx: next.value });
            }
        },
    });

    useEffect(() => {
        const { orga } = router.query;
        // 검색한 경우
        if (orga) {
            setOrga(findSelectOption(orga, orgas));

            if (activeUser) {
                getUsers({ idx: orga });
            }
        } else {
            // 로그인 환경에서 기본 값을 내 영업조직으로 변경
            if (loggedInUser) {
                const orga_idx = loggedInUser.user_info.orga_idx;

                setOrga(findSelectOption(orga_idx, orgas));

                if (activeUser) {
                    getUsers({ idx: orga_idx });
                }
            }
        }
    }, [router, loggedInUser, activeUser]);

    return (
        <div className={`${displayName}__field`}>
            <label className={`${displayName}__label`} htmlFor="orga">
                영업조직
            </label>
            <div style={{ width: 320 }}>
                <MySelect
                    id="orga"
                    fontSize={13}
                    placeholder="선택"
                    {...orga}
                />
            </div>
        </div>
    );
};
