import type { FC } from 'react';
import React from 'react';
import { Fragment, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { NavItem } from './components/NavItem';
import {
    GNB_MENU,
    GNB_COMPONENTS,
    GNB_WIDGETS,
    GNB_FORMS,
    GNB_CHARTS,
} from './nav.constants';

interface Props {}

export const Nav: FC<Props> = () => {
    return (
        <Fragment>
            <h5 className="app-sidebar__heading">MENU</h5>
            {GNB_MENU.map((gnb) => (
                <NavItem key={gnb.id} {...gnb} />
            ))}
            <h5 className="app-sidebar__heading">UI COMPONENTS</h5>
            {GNB_COMPONENTS.map((gnb) => (
                <NavItem key={gnb.id} {...gnb} />
            ))}
            <h5 className="app-sidebar__heading">WIDGETS</h5>
            {GNB_WIDGETS.map((gnb) => (
                <NavItem key={gnb.id} {...gnb} />
            ))}
            <h5 className="app-sidebar__heading">FORMS</h5>
            {GNB_FORMS.map((gnb) => (
                <NavItem key={gnb.id} {...gnb} />
            ))}
            <h5 className="app-sidebar__heading">CHARTS</h5>
            {GNB_CHARTS.map((gnb) => (
                <NavItem key={gnb.id} {...gnb} />
            ))}
        </Fragment>
    );
};
