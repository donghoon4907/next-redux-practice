import '@styles/main.scss';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'rsuite/dist/rsuite.css';
import 'cropperjs/dist/cropper.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCookie } from 'cookies-next';
import { wrapper } from '@store/redux';
import { MyProvider } from '@components/Provider';
import { MyLoading } from '@components/loading';
import { updateGnb } from '@actions/gnb/gnb.action';
import { ASIDE_MENU } from '@constants/gnb';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import { hideDrawer } from '@actions/drawer/drawer.action';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const dispatch = useDispatch();

    // 페이지 이동 시마다 탭 및 네비게이션 바 내 목록 갱신
    useEffect(() => {
        const tab = new TabModule();

        const url = router.pathname;

        const [_, root, ...children] = url.split('/');
        // ASIDE_MENU에 명세된 페이지 정보가 있는지 찾습니다.
        let page = ASIDE_MENU[root];
        for (let i = 0; i < children.length; i++) {
            page = page[children[i]];
        }
        // 페이지 정보가 있는 경우
        if (page) {
            // 탭 목록에 존재하지 않는 경우 새 탭 추가
            if (!tab.read(url)) {
                tab.create({
                    id: url,
                    label: page.label,
                    to: url,
                });
            }
            // 네비게이션 바 내 목록 갱신
            dispatch(
                updateGnb({
                    id: root,
                    menu: ASIDE_MENU[root],
                }),
            );
        }
        // 탭 목록 갱신
        dispatch(initTab(tab.getAll()));
    }, [router]);

    return (
        <MyProvider>
            {/* 페이지 컴포넌트에 서버 사이드에서 발생한 정보 주입*/}
            <Component {...pageProps} />
            {/* 로딩 컴포넌트 */}
            <MyLoading />
        </MyProvider>
    );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
    ({ dispatch }) =>
        async ({ Component, ctx }) => {
            const { req, res } = ctx;
            // 서버에서만 실행
            if (req && res) {
                const navKey = process.env.COOKIE_NAV_COLLAPSE_KEY || '';
                // 네비게이션 바 업데이트
                const isOpen = getCookie(navKey, {
                    req,
                    res,
                });
                if (isOpen === 'N') {
                    dispatch(hideDrawer());
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
