import type { FC } from 'react';
import { Fragment } from 'react';
import { BsList } from 'react-icons/bs';
import { IconWrapper } from '@components/IconWrapper';

interface Props {}

export const Logo: FC<Props> = () => {
    const handleClick = () => {};
    const handleToggleSidebar = () => {};

    return (
        <Fragment>
            <div className="app-header__logo">
                <div className="logo-src" onClick={handleClick} />
                <div className="header__pane ml-auto">
                    <IconWrapper onClick={handleToggleSidebar}>
                        <BsList size={30} color="white" />
                    </IconWrapper>
                </div>
            </div>
        </Fragment>
    );
};
