import type { NextPage } from 'next';
import { wrapper } from '@store/redux';
import { pageMiddleware } from '@utils/middleware/page';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { MyLayout } from '@components/Layout';
import { OrgaForm } from '@partials/orga/OrgaForm';
import { getUsersRequest } from '@actions/user/get-users.action';
import { useInitTab } from '@hooks/use-initialize';
import { MyHelmet } from '@components/Helmet';

const CreateOrga: NextPage = () => {
    useInitTab('조직 등록');

    return (
        <>
            <MyHelmet />
            <MyLayout>
                <OrgaForm mode="create" />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    pageMiddleware(async ({ dispatch }) => {
        dispatch(getCompaniesRequest('bank'));

        dispatch(getCompaniesRequest('woori'));

        dispatch(getUsersRequest({ idx: '1' }));

        return null;
    }),
);

export default CreateOrga;
