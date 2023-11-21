import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { getOrgasRequest } from '@actions/hr/get-orgas.action';
import { findSelectOption } from '@utils/getter';
import { CarForm } from '@partials/contract/car/CarForm';
import { MyLayout } from '@components/Layout';

const CreateCar: NextPage = () => {
    const { loggedInUser, orgas } = useSelector<AppState, HrState>(
        (state) => state.hr,
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
