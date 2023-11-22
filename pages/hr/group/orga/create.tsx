import type { NextPage } from 'next';
import Head from 'next/head';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { MyLayout } from '@components/Layout';
import { OrgaForm } from '@partials/hr/orga/OrgaForm';
import { getUsersRequest } from '@actions/user/get-users.action';
import { useInitTab } from '@hooks/use-initialize';

const CreateOrga: NextPage = () => {
    useInitTab('조직 등록');

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
            </Head>
            <MyLayout>
                <OrgaForm mode="create" />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(getCompaniesRequest('bank'));

        dispatch(getCompaniesRequest('woori'));

        dispatch(getUsersRequest({ idx: '1' }));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default CreateOrga;
