import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps {}

export const DisconnectedLabel: FC<Props> = ({ children }) => {
    return <span className="wr-label">{children}</span>;
};
