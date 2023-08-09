import type { FC } from 'react';
import type { CoreProps, CoreTabpanelOption } from '@interfaces/core';

export interface MyTabpanelProps extends CoreProps, CoreTabpanelOption {}

export const MyTabpanel: FC<MyTabpanelProps> = ({
    id,
    tabId,
    hidden,
    children,
}) => {
    return (
        <div
            className="wr-tabpanel position-relative"
            role="tabpanel"
            id={id}
            aria-labelledby={tabId}
            hidden={hidden}
        >
            {children}
        </div>
    );
};
