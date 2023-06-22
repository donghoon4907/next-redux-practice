import type { CoreProps } from '@interfaces/core';
import type { FC } from 'react';

interface Props extends CoreProps {}

export const AccessibleText: FC<Props> = ({ children }) => {
    return <span className="a11y-hidden">{children}</span>;
};
