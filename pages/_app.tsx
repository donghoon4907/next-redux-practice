import '@styles/main.scss';
// import 'react-modern-drawer/dist/index.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'rsuite/dist/rsuite.css';
import 'cropperjs/dist/cropper.css';

// import '@uppy/core/dist/style.min.css';
// import '@uppy/dashboard/dist/style.min.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCookie } from 'cookies-next';
import { wrapper } from '@store/redux';
// import { MyDrawer } from '@components/drawer';
import { MyProvider } from '@components/Provider';
// import { TabModule } from '@utils/storage';
// import { initTab } from '@actions/tab/tab.action';
import { MyLoading } from '@components/loading';
import { updateGnb } from '@actions/gnb/gnb.action';
import { ASIDE_MENU } from '@constants/gnb';
import { initialzeBackendAxios } from '@utils/axios/backend';
import hrsService from '@services/hrsService';
import { updatePermission } from '@actions/hr/set-permission.action';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';

function MyApp({ Component, pageProps }: AppProps) {
    const { events, asPath, route } = useRouter();

    const dispatch = useDispatch();

    // 라우팅 시 탭 및 GNB 갱신
    useEffect(() => {
        // 404, 500 페이지 제한
        if (['/404', '/500', '/test', '/etc/shop_list'].includes(route)) {
            const tab = new TabModule();

            dispatch(initTab(tab.getAll()));
        } else {
            const [_, gnb] = asPath.split('/');

            // 로그인 페이지 추가 제한
            if (gnb !== 'login') {
                initializeTab(asPath);
                // 게시판 페이지 추가 제한
                if (gnb !== 'board') {
                    dispatch(updateGnb(ASIDE_MENU[gnb]));
                }
            }
        }

        // 탭 활성화
        function initializeTab(url: string) {
            const [_, gnb, ...lnbs] = url.split('/');

            let target = ASIDE_MENU[gnb];
            for (let i = 0; i < lnbs.length; i++) {
                target = target[lnbs[i]];
            }

            // 상세페이지인 경우
            if (!target) {
                return;
            }

            const tab = new TabModule();

            if (!tab.read(url)) {
                tab.create({
                    id: url,
                    label: target.label,
                    to: url,
                });
            }

            dispatch(initTab(tab.getAll()));
        }

        // function onRouteChange(url: string) {
        //     initializeTab(url);
        // }

        // events.on('routeChangeComplete', onRouteChange);

        return () => {
            // events.off('routeChangeComplete', onRouteChange);
        };
    }, [dispatch, route, asPath]);

    return (
        <MyProvider>
            <Component {...pageProps} />

            {/* <MyDrawer /> */}
            <MyLoading />
        </MyProvider>
    );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
    ({ dispatch }) =>
        async ({ Component, ctx, router }) => {
            const { req, res } = ctx;
            // 서버에서만 실행
            if (req && res) {
                const token = getCookie(process.env.COOKIE_TOKEN_KEY || '', {
                    req,
                    res,
                });
                // axios 초기화
                initialzeBackendAxios(token);
                // permission 제외 페이지
                const excludePermissionPages = ['/', '/login'];
                // permission
                if (!excludePermissionPages.includes(router.route)) {
                    try {
                        const { data } = await hrsService.getPermission({
                            division: 'system',
                        });
                        const { user_info } = data;
                        // 특정 권한 정보가 있는 경우
                        if (user_info) {
                            dispatch(updatePermission(data));
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            }

            let pageProps = {};
            if (Component.getInitialProps) {
                pageProps = await Component.getInitialProps(ctx);
            }

            return { pageProps };
        },
);

export default wrapper.withRedux(MyApp);
