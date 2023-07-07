import '@styles/main.scss';
// import 'react-modern-drawer/dist/index.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'rsuite/dist/rsuite.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCookie } from 'cookies-next';
import { wrapper } from '@store/redux';
// import { MyDrawer } from '@components/drawer';
import { MyProvider } from '@components/Provider';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import { MyLoading } from '@components/loading';
import { updateGnb } from '@actions/gnb/gnb.action';
import { ASIDE_MENU } from '@constants/gnb';
import { initialzeAxios } from '@utils/axios';

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

        function onRouteChange(url: string) {
            tab.initialize();

            dispatch(initTab(tab.getAll()));
        }

        events.on('routeChangeComplete', onRouteChange);

        return () => {
            events.off('routeChangeComplete', onRouteChange);
        };
    }, [events, asPath, dispatch]);

    return (
        <MyProvider>
            <Component {...pageProps} />

            {/* <MyDrawer /> */}
            <MyLoading />
        </MyProvider>
    );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
    () =>
        async ({ Component, ctx }) => {
            const { req, res } = ctx;

            const isServer = !!req && !!res;

            if (isServer) {
                const token = getCookie(process.env.COOKIE_TOKEN_KEY || '', {
                    req,
                    res,
                });

                initialzeAxios(token);
            }

            let pageProps = {};
            if (Component.getInitialProps) {
                pageProps = await Component.getInitialProps(ctx);
            }

            return { pageProps };
        },
);

export default wrapper.withRedux(MyApp);
