import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { OrgaState } from '@reducers/orga';
import type { UserState } from '@reducers/user';
import { useSelector } from 'react-redux';
import { wrapper } from '@store/redux';
import { pageMiddleware } from '@utils/middleware/page';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { findSelectOption } from '@utils/getter';
import { CarForm } from '@partials/car/CarForm';
import { MyLayout } from '@components/Layout';
import { MyHelmet } from '@components/Helmet';

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
            <MyHelmet />
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
    pageMiddleware(async ({ dispatch }) => {
        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('long-use'));

        return null;
    }),
);

export default CreateCar;
