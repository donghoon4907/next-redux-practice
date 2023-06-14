import '@styles/main.scss';

import type { AppProps } from 'next/app';
import { wrapper } from '@store/redux';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
