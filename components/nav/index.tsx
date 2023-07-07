import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { GnbState } from '@reducers/gnb';
import Link from 'next/link';
import { DrawerMenu } from '@components/drawer/DrawerMenu';
import { useSelector } from 'react-redux';

interface Props {}

export const MyNav: FC<Props> = () => {
    const { activeGnb } = useSelector<AppState, GnbState>((state) => state.gnb);

    return (
        <div className="wr-nav">
            <div className="wr-nav__logo wr-frame__header">
                <Link href="/">
                    <a>
                        <h1 className="a11y-hidden">Wooriinsumanlife</h1>
                        <img
                            src="/static/images/logo.png"
                            alt="Wooriinsumanlife"
                            width={130}
                            height={80}
                        />
                    </a>
                </Link>
            </div>
            {/* <div className="wr-nav__header">
                <span className="wr-nav__name">김서윤&nbsp;</span>
                <span className="wr-nav__title">님</span>
            </div> */}
            <div
                className="wr-nav__body wr-drawer wr-frame__body"
                role="tablist"
                aria-multiselectable="true"
            >
                <DrawerMenu menu={activeGnb} />
            </div>
            {/* <div className="wr-nav__footer">
                <span>접속시간: 2023-12-23 14:23</span>
                <br />
                <span>접속IP: 202.68.223.123</span>
            </div> */}
        </div>
    );
};
