import { MyLayout } from '@components/Layout';
import { MyHelmet } from '@components/Helmet';

export default function My404() {
    return (
        <>
            <MyHelmet />
            <MyLayout>
                <h2>페이지를 찾을 수 없습니다.</h2>
            </MyLayout>
        </>
    );
}
