import type { FC } from 'react';
import Link from 'next/link';
import { deleteCookie } from 'cookies-next';
import { GNBS, SUBMENUS } from '@constants/gnb';

import { GnbMenuItem } from './GnbMenuItem';
import { GnbSubMenuItem } from './GnbSubMenuItem';

interface Props {}

export const MyHeader: FC<Props> = () => {
    const displayName = 'wr-header';
    // const logout = useApi(logoutRequest);

    const handleLogout = () => {
        const tf = confirm('로그아웃 하시겠습니까?');

        if (tf) {
            const cookieKey = process.env.COOKIE_TOKEN_KEY || '';

            deleteCookie(cookieKey);

            location.replace('/login');
        }
    };

    return (
        <header className={`${displayName} wr-frame__header`}>
            <div className={`${displayName}__logo`}>
                {/* 임시로 장기보유계약 페이지로 설정 */}
                <Link href="/contract/long/bo">
                    <div className={`${displayName}__title`} role="link">
                        <span>우리인슈맨라이프</span>
                        <br />
                        <span>영업포탈</span>
                    </div>
                </Link>
            </div>
            <div className={`${displayName}__gnb`}>
                <ul className="wr-gnb__menu" role="menubar">
                    {GNBS.map((gnb, i) => (
                        <GnbMenuItem
                            key={`gnb${i}`}
                            activeDivider={i < 2}
                            {...gnb}
                        />
                    ))}
                </ul>
            </div>
            <div className={`${displayName}__submenu`}>
                <ul className="wr-gnb__menu" role="menubar">
                    {SUBMENUS.map((menu, i) => (
                        <GnbSubMenuItem key={`submenu${i}`} {...menu} />
                    ))}
                </ul>
                <div className={`${displayName}__extension`}></div>
            </div>
        </header>
    );
};
