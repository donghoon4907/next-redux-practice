import type { FC } from 'react';
import Image from 'next/image';
import { DrawerMenu } from '@components/drawer/DrawerMenu';
import { ASIDE_MENUS } from '@constants/gnb';

interface Props {}

export const MyNav: FC<Props> = () => {
    return (
        <div className="wr-nav">
            <div className="wr-nav__logo">
                <Image
                    src="/images/logo2.png"
                    alt="Logo"
                    width={130}
                    height={80}
                />
            </div>
            <div className="wr-nav__header">
                <span className="wr-nav__name">김서윤&nbsp;</span>
                <span className="wr-nav__title">님</span>
            </div>
            <div className="wr-nav__body wr-drawer">
                {Array.from({ length: 0 }).map((_, i) => (
                    <DrawerMenu key={`DummyNav${i}`} data={ASIDE_MENUS} />
                ))}
                <DrawerMenu data={ASIDE_MENUS} />
            </div>
            <div className="wr-nav__footer">
                <span>접속시간: 2023-12-23 14:23</span>
                <br />
                <span>접속IP: 202.68.223.123</span>
            </div>
        </div>
    );
};
