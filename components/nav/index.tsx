import type { FC } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import Link from 'next/link';
import { DrawerMenu } from '@components/drawer/DrawerMenu';

interface Props {
    menu: CoreMenuOption[];
}

export const MyNav: FC<Props> = ({ menu }) => {
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
            <div
                className="wr-nav__body wr-drawer wr-frame__body"
                role="tablist"
                aria-multiselectable="true"
            >
                <DrawerMenu menu={menu} />
            </div>
        </div>
    );
};
