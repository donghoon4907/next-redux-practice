import type { FC } from 'react';
import { AiOutlineFolder } from 'react-icons/ai';
// import { LuMenu } from 'react-icons/lu';
import { GNBS } from '@constants/gnb';
// import { useDrawer } from '@hooks/use-drawer';

import { GnbMenuItem } from './GnbMenuItem';
import { GnbSubMenuItem } from './GnbSubMenuItem';
import { HeaderNav } from './Nav';
import { SearchInput } from '@components/input/Search';
import { MdLogout } from 'react-icons/md';

interface Props {}

export const MyHeader: FC<Props> = () => {
    // const { onToggle } = useDrawer();

    return (
        <header className="wr-header wr-frame__header">
            <div className="wr-meta">
                <div className="wr-meta__inner">
                    <div className="wr-meta__right">
                        <span className="wr-meta__department">
                            직할 영업 / 5회사임직원 / 전산개발실
                        </span>
                        <div className="wr-meta__username">김서윤</div>
                        <div className="wr-meta__log">
                            <span>접속시간: 2023-12-23 14:23 &nbsp;</span>
                            <span>접속IP: 202.68.223.123</span>
                        </div>
                        <div className="wr-meta__search">
                            <SearchInput
                                id="search"
                                placeholder="메뉴 검색"
                                style={{ fontSize: 14 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="wr-gnb">
                <div className="wr-gnb__inner">
                    <div className="wr-gnb__both">
                        <nav className="wr-gnb__left">
                            {/* <span onClick={onToggle}>
                                <IconWrapper>
                                    <LuMenu size={30} color="white" />
                                </IconWrapper>
                            </span> */}
                            <h2 className="a11y-hidden">서비스메뉴</h2>
                            <ul className="wr-gnb__menu" role="menubar">
                                {GNBS.map(({ id, ...gnb }) => (
                                    <GnbMenuItem key={id} {...gnb} />
                                ))}
                            </ul>
                        </nav>
                        <div className="wr-gnb__right">
                            <h2 className="a11y-hidden">사용자서비스</h2>
                            <ul className="wr-gnb__services">
                                <GnbSubMenuItem to="#">통합검색</GnbSubMenuItem>
                                <GnbSubMenuItem to="#">
                                    주요연락처
                                </GnbSubMenuItem>
                                <GnbSubMenuItem to="/board/list">
                                    <div className="wr-badge__wrap">
                                        <span>게시판</span>
                                        <span className="badge bg-danger">
                                            23
                                        </span>
                                    </div>
                                </GnbSubMenuItem>
                                <GnbSubMenuItem to="#">일정관리</GnbSubMenuItem>
                                <GnbSubMenuItem to="#">SMS/Fax</GnbSubMenuItem>
                                <GnbSubMenuItem to="#">Mypage</GnbSubMenuItem>
                                <GnbSubMenuItem to="#">
                                    <AiOutlineFolder size={20} />
                                </GnbSubMenuItem>
                                <GnbSubMenuItem to="#">
                                    <MdLogout size={20} />
                                </GnbSubMenuItem>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wr-lnb">
                <div className="wr-lnb__inner">
                    <strong className="a11y-hidden">탭 목록</strong>
                    <HeaderNav />
                    <div className="wr-tab__line"></div>
                </div>
            </div>
        </header>
    );
};
