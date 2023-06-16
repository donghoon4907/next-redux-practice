import '@styles/main.scss';
import 'react-modern-drawer/dist/index.css';
import 'rsuite/dist/rsuite.css';

import type { AppProps } from 'next/app';
import { wrapper } from '@store/redux';
import { MyDrawer } from '@components/drawer';
import { MyProvider } from '@components/Provider';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MyProvider>
            <Component {...pageProps} />
            <MyDrawer />
        </MyProvider>
    );
}

export default wrapper.withRedux(MyApp);
