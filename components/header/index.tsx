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
            // logout();
        }
    };

    // const { loggedInUser } = useSelector<AppState, HrState>(
    //     (state) => state.hr,
    // );

    // const { onToggle } = useDrawer();

    // const [dCompanies] = useSelect(commonConstants.dCompanies, null, {
    //     callbackOnChange: (nextSelect) => {
    //         if (nextSelect) {
    //             // 새 창에서 URL 열기
    //             window.open(nextSelect.value, '_blank');
    //         }
    //     },
    // });

    // const [lCompanies] = useSelect(commonConstants.lCompanies, null, {
    //     callbackOnChange: (nextSelect) => {
    //         if (nextSelect) {
    //             // 새 창에서 URL 열기
    //             window.open(nextSelect.value, '_blank');
    //         }
    //     },
    // });

    return (
        <header className={`${displayName} wr-frame__header`}>
            <div className={`${displayName}__logo`}>
                <Link href="/">
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
            {/* <div className="wr-meta">
                <div className="wr-meta__inner">
                    <div className="wr-meta__left">
                        <div style={{ width: 250 }}>
                            <WithLabel
                                id="shortcut_d"
                                label="손보바로가기"
                                type="active"
                            >
                                <MySelect
                                    id="shortcut_d"
                                    {...dCompanies}
                                />
                            </WithLabel>
                        </div>
                        <div style={{ width: 250 }}>
                            <WithLabel
                                id="shortcut_l"
                                label="생보바로가기"
                                type="active"
                            >
                                <MySelect
                                    id="shortcut_l"
                                    {...lCompanies}
                                />
                            </WithLabel>
                        </div>
                    </div>
                    <div className="wr-meta__right">
                        {loggedInUser && (
                            <>
                                <span className="wr-meta__department">
                                    {loggedInUser.user_info.fulls}
                                </span>
                                <div className="wr-meta__username">
                                    {loggedInUser.user_info.name}&nbsp;
                                    {loggedInUser.user_info.title}
                                </div>
                                <div className="wr-meta__log">
                                    <span>
                                        접속시간:&nbsp;
                                        {
                                            loggedInUser.connection_info
                                                .datetime
                                        }{' '}
                                        &nbsp;
                                    </span>
                                    <span>
                                        접속IP:&nbsp;
                                        {loggedInUser.connection_info.ip}
                                    </span>
                                </div>
                            </>
                        )}

                        <div className="wr-meta__search">
                            <SearchInput
                                id="menu_search"
                                placeholder="메뉴 검색"
                                style={{ fontSize: 14 }}
                            />
                        </div>
                    </div>
                </div>
            </div> */}
        </header>
    );
};
