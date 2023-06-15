import type { ReactElement } from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render(): ReactElement {
        return (
            <Html>
                <Head>
                    <meta name="theme-color" content="#ffffff" />
                    <meta charSet="utf-8" />
                    <meta httpEquiv="cache-control" content="no-store" />
                    {/* <meta name="description" content="" />
                    <meta name="keywords" content="" />
                    <meta property="og:title" content="" />
                    <meta property="og:description" content="" />
                    <meta property="og:image" content="/thumbnail.png" />
                    <meta property="og:image:width" content="" />
                    <meta property="og:image:height" content="" />
                    <meta property="og:site_name" content="" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="" />
                    <meta name="twitter:title" content="" />
                    <meta name="twitter:description" content="" />
                    <meta name="twitter:image" content="/thumbnail.png" /> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
