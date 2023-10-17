import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSelect } from '@hooks/use-select';
import { MySelect } from '@components/select';
import { AppState } from '@reducers/index';
import { HrState } from '@reducers/hr';
import { findSelectOption } from '@utils/getter';

interface Props {}

export const SearchFilterUserSelect: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { users, loggedInUser } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    const [user, setUser] = useSelect(users, null);

    useEffect(() => {
        const { user } = router.query;
        if (users.length > 0) {
            // 검색한 경우
            if (user) {
                setUser(findSelectOption(user, users));
            } else {
                // 로그인 환경에서 기본 값을 사용자 정보로 변경
                if (users && loggedInUser) {
                    setUser(findSelectOption(loggedInUser.userid, users));
                }
            }
        }
    }, [router, users, loggedInUser]);

    return (
        <div className={`${displayName}__field`}>
            <label className={`${displayName}__label`} htmlFor="userid">
                영업가족
            </label>
            <div style={{ width: 160 }}>
                <MySelect
                    id="userid"
                    fontSize={13}
                    placeholder="선택"
                    {...user}
                />
            </div>
        </div>
    );
};
