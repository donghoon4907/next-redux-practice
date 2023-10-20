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

    const { users } = useSelector<AppState, HrState>((props) => props.hr);

    const [user, setUser] = useSelect(users, null);

    useEffect(() => {
        const { userid } = router.query;

        if (userid && users.length > 0) {
            setUser(findSelectOption(userid, users));
        }
    }, [router, users]);

    return (
        <div className={`${displayName}__field`}>
            <label className={`${displayName}__label`} htmlFor="userid">
                영업가족
            </label>
            <div style={{ width: 162 }}>
                <MySelect id="userid" placeholder="선택" {...user} />
            </div>
        </div>
    );
};
