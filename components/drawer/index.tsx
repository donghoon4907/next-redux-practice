import type { FC } from 'react';
import Drawer from 'react-modern-drawer';
import { BsArrowLeft } from 'react-icons/bs';
import { IconWrapper } from '@components/IconWrapper';
import { useDrawer } from '@hooks/use-drawer';
// import { ASIDE_MENUS } from '@constants/gnb';

import { DrawerMenu } from './DrawerMenu';

interface Props {}

export const MyDrawer: FC<Props> = () => {
    const { isOpen, onToggle } = useDrawer();

    return (
        <Drawer
            open={isOpen}
            onClose={onToggle}
            direction="left"
            className="wr-drawer"
        >
            <div className="wr-drawer__header">
                <div></div>
                <div>
                    <IconWrapper onClick={onToggle}>
                        <BsArrowLeft size={30} color="white" />
                    </IconWrapper>
                </div>
            </div>
            {/* <DrawerMenu data={ASIDE_MENUS} /> */}
        </Drawer>
    );
};
