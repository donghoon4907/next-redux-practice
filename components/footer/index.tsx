import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps {}

export const MyFooter: FC<Props> = ({ children }) => {
    return <footer className="wr-footer wr-frame__footer">{children}</footer>;
};
