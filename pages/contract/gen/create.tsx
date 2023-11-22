import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { OrgaState } from '@reducers/orga';
import type { UserState } from '@reducers/user';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getCompaniesRequest } from '@actions/hr/common/get-companies.action';
import { getOrgasRequest } from '@actions/hr/orga/get-orgas.action';
import { findSelectOption } from '@utils/getter';
import { GeneralForm } from '@partials/contract/general/GeneralForm';
import { MyLayout } from '@components/Layout';
// 현재 사용되지 않음
const CreateGeneral: NextPage = () => {
    const { orgas } = useSelector<AppState, OrgaState>((state) => state.orga);

    const { loggedInUser } = useSelector<AppState, UserState>(
        (state) => state.user,
    );

    const defaultOrga = findSelectOption(
        loggedInUser.user_info.orga_idx,
        orgas,
    );

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
            </Head>
            <MyLayout>
                <GeneralForm
                    mode="create"
                    // defaultUserid="test"
                    defaultUserid={loggedInUser.userid}
                    defaultOrga={defaultOrga}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('gen-use'));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default CreateGeneral;
