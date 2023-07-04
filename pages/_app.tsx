import '@styles/main.scss';
// import 'react-modern-drawer/dist/index.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'rsuite/dist/rsuite.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { wrapper } from '@store/redux';
// import { MyDrawer } from '@components/drawer';
import { MyProvider } from '@components/Provider';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import { MyLoading } from '@components/loading';
import { updateGnb } from '@actions/gnb/gnb.action';
import { ASIDE_MENU } from '@constants/gnb';
import { SelectDepartModal } from '@components/modal/SelectDepart';

function MyApp({ Component, pageProps }: AppProps) {
    const { events, asPath } = useRouter();

    const dispatch = useDispatch();
    // 라우팅 시 탭 및 GNB 갱신
    useEffect(() => {
        // 탭 처리
        const tab = new TabModule();

        dispatch(initTab(tab.getAll()));
        // GNB 처리
        const [_, gnb] = asPath.split('/');

        if (gnb !== 'login') {
            dispatch(updateGnb(ASIDE_MENU[gnb]));
        }

        const handleRouteChange = (url: string) => {
            tab.initialize();
            // Update tab state
            dispatch(initTab(tab.getAll()));
        };

        events.on('routeChangeComplete', handleRouteChange);

        return () => {
            events.off('routeChangeComplete', handleRouteChange);
        };
    }, [events, asPath, dispatch]);

    return (
        <MyProvider>
            <Component {...pageProps} />

            {/* <MyDrawer /> */}
            <MyLoading />
            <SelectDepartModal />
        </MyProvider>
    );
}

// MyApp.getInitialProps = wrapper.getInitialAppProps(
//     ({ dispatch, getState, sagaTask }) =>
//         async ({ Component, ctx, router }) => {
//             const { req, res } = ctx;

//             let pageProps = {};
//             if (Component.getInitialProps) {
//                 pageProps = await Component.getInitialProps(ctx);
//             }

//             return { pageProps };
//         },
// );

export default wrapper.withRedux(MyApp);
