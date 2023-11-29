import type { CoreProps } from '@interfaces/core';
import type { FC } from 'react';
import Head from 'next/head';

interface Props extends CoreProps {}

export const MyHelmet: FC<Props> = ({ children }) => {
    return (
        <Head>
            <title>우리인슈맨라이프</title>
            {children}
        </Head>
    );
};
