import type { FC } from 'react';
import { Fragment } from 'react';
import Image from 'next/image';

import { Logo } from '@layouts/logo/Logo';
import { HeaderSearchBox } from './components/SearchBox';
import { HeaderUserBox } from './components/UserBox';

interface Props {}

export const Header: FC<Props> = () => (
    <header className="app-header bg-strong-bliss header-text-light header-shadow">
        <Logo />
        <div className="app-header__content">
            <div className="app-header-left">
                <HeaderSearchBox />
            </div>
            <div className="app-header-right">
                <HeaderUserBox />
            </div>
        </div>
    </header>
);
