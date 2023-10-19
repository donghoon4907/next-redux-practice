import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MyCheckbox } from '@components/checkbox';
import { useCheckbox } from '@hooks/use-checkbox';

interface Props {}

export const SearchFilterUserCheckbox: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const [checkUser, setCheckUser] = useCheckbox(false);

    useEffect(() => {
        const { check_user } = router.query;

        if (check_user === 'Y') {
            setCheckUser(true);
        }
    }, [router]);

    return (
        <div className={`${displayName}__checkboxfield`}>
            <div style={{ width: 80 }}>
                <MyCheckbox
                    id="check_user"
                    value="Y"
                    label="담당미지정"
                    {...checkUser}
                />
            </div>
        </div>
    );
};
