import { MyHelmet } from '@components/Helmet';
import type { NextPage } from 'next';

const Main: NextPage = () => {
    return (
        <>
            <MyHelmet />
        </>
    );
};

export async function getServerSideProps() {
    const redirectUrl = '/login';

    return {
        redirect: {
            destination: redirectUrl,
            permanent: false, // true로 설정하면 301 상태 코드로 리다이렉션
        },
    };
}

export default Main;
