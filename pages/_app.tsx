import '@styles/main.scss';
import 'react-modern-drawer/dist/index.css';

import type { AppProps } from 'next/app';
import { wrapper } from '@store/redux';
import { MyDrawer } from '@components/drawer';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <MyDrawer />
        </>
    );
}

export default wrapper.withRedux(MyApp);
