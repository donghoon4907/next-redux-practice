import type { ReactElement } from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render(): ReactElement {
        return (
            <Html>
                <Head>
                    <meta name="theme-color" content="#ffffff" />
                    <meta httpEquiv="cache-control" content="no-store" />
                    <link rel="icon" href="/static/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
