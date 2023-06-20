import type { FC } from 'react';
import { DrawerMenu } from '@components/drawer/DrawerMenu';
import { ASIDE_MENUS } from '@constants/gnb';

interface Props {}

export const MyNav: FC<Props> = () => {
    return (
        <div className="wr-nav">
            <div className="wr-nav__logo">
                <img src="http://via.placeholder.com/140x50" />
            </div>
            <div className="wr-nav__header">
                <span>김서윤 님</span>
            </div>
            <div className="wr-nav__body wr-drawer">
                {Array.from({ length: 30 }).map((_, i) => (
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
