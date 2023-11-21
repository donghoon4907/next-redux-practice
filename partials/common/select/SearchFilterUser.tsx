import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { UserState } from '@reducers/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSelect } from '@hooks/use-select';
import { MySelect } from '@components/select';
import { findSelectOption } from '@utils/getter';
import { generateAllOption } from '@utils/generate';

interface Props {}

export const SearchFilterUserSelect: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { users } = useSelector<AppState, UserState>((state) => state.user);

    const [user, setUser] = useSelect(generateAllOption(users), undefined);

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
