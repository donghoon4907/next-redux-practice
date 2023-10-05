import '@styles/main.scss';
// import 'react-modern-drawer/dist/index.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'rsuite/dist/rsuite.css';
import 'cropperjs/dist/cropper.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wrapper } from '@store/redux';
// import { MyDrawer } from '@components/drawer';
import { MyProvider } from '@components/Provider';
import { MyLoading } from '@components/loading';
import { updateGnb } from '@actions/gnb/gnb.action';
import { ASIDE_MENU } from '@constants/gnb';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';

function MyApp({ Component, pageProps }: AppProps) {
    const { events, asPath, route, pathname } = useRouter();

    const dispatch = useDispatch();

    // 라우팅 시 탭 및 GNB 갱신
    useEffect(() => {
        onRouteChange();

        // 탭 활성화
        function initializeTab(url: string) {
            const [_, gnb, ...lnbs] = url.split('/');

            let target = ASIDE_MENU[gnb];
            for (let i = 0; i < lnbs.length; i++) {
                target = target[lnbs[i]];
            }

            // 상세페이지인 경우 제외
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

        function onRouteChange(url?: string) {
            // 404, 500 페이지 제한
            if (
                [
                    '/404',
                    '/500',
                    '/test',
                    '/select-upload',
                    '/etc/shop_list',
                    '/calculate',
                    '/calendar',
                ].includes(route)
            ) {
                const tab = new TabModule();

                dispatch(initTab(tab.getAll()));
            } else {
                const [_, gnb] = asPath.split('/');

                // 로그인 페이지 추가 제한
                if (gnb !== 'login') {
                    initializeTab(pathname);
                    // 게시판 페이지 추가 제한
                    if (gnb !== 'board') {
                        dispatch(updateGnb(ASIDE_MENU[gnb]));
                    }
                }
            }
        }

        events.on('routeChangeComplete', onRouteChange);

        return () => {
            events.off('routeChangeComplete', onRouteChange);
        };
    }, [route, asPath]);

    return (
        <MyProvider>
            <Component {...pageProps} />

            {/* <MyDrawer /> */}
            <MyLoading />
        </MyProvider>
    );
}

export default wrapper.withRedux(MyApp);
