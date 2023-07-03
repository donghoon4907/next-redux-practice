import '@styles/main.scss';
// import 'react-modern-drawer/dist/index.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'rsuite/dist/rsuite.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wrapper } from '@store/redux';
// import { MyDrawer } from '@components/drawer';
import { MyProvider } from '@components/Provider';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import { MyLoading } from '@components/loading';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const dispatch = useDispatch();
    // 라우팅 시 탭을 갱신
    useEffect(() => {
        const tab = new TabModule();
        // Update tab state
        dispatch(initTab(tab.getAll()));

        const handleRouteChange = (url: string) => {
            tab.initialize();
            // Update tab state
            dispatch(initTab(tab.getAll()));
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events, dispatch]);

    return (
        <MyProvider>
            <Component {...pageProps} />

            {/* <MyDrawer /> */}
            <MyLoading />
        </MyProvider>
    );
}

export default wrapper.withRedux(MyApp);
