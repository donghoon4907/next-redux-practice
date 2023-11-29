import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { UserState } from '@reducers/user';
import { useSelector } from 'react-redux';
import { CustomerForm } from '@partials/customer/CustomerForm';
import { wrapper } from '@store/redux';
import { pageMiddleware } from '@utils/middleware/page';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { getUsersRequest } from '@actions/user/get-users.action';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';
import { MyHelmet } from '@components/Helmet';

const CreateCustomer: NextPage = () => {
    const { loggedInUser } = useSelector<AppState, UserState>(
        (state) => state.user,
    );

    // 탭 설정
    useInitTab('고객등록');

    return (
        <>
            <MyHelmet />
            <MyLayout>
                <CustomerForm
                    mode="create"
                    spe="customer"
                    defaultUserid={loggedInUser.userid}
                    defaultOrganize={`${loggedInUser.user_info.orga} ${loggedInUser.user_info.name}`}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    pageMiddleware(async ({ dispatch }) => {
        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('long-view'));

        dispatch(getCompaniesRequest('car-view'));

        dispatch(getCompaniesRequest('gen-view'));

        dispatch(
            getUsersRequest({
                idx: '1',
            }),
        );

        return null;
    }),
);

export default CreateCustomer;
