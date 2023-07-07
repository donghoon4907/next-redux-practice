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
            className="wr-tabpanel"
            role="tabpanel"
            id={id}
            aria-labelledby={tabId}
            hidden={hidden}
        >
            {children}
        </div>
    );
};
