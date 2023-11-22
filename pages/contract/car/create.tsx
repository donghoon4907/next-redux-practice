import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { OrgaState } from '@reducers/orga';
import type { UserState } from '@reducers/user';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { findSelectOption } from '@utils/getter';
import { CarForm } from '@partials/contract/car/CarForm';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';

const CreateCar: NextPage = () => {
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
                <CarForm
                    mode="create"
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

        dispatch(getCompaniesRequest('long-use'));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default CreateCar;
