import type { NextPage } from 'next';
import { MyLayout } from '@components/Layout';
import { wrapper } from '@store/redux';
import { pageMiddleware } from '@utils/middleware/page';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { CarCompareForm } from '@partials/car/CompareForm';
import { MyHelmet } from '@components/Helmet';

const ComparisonCar: NextPage = () => {
    return (
        <>
            <MyHelmet />
            <MyLayout>
                <CarCompareForm />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    pageMiddleware(async ({ dispatch }) => {
        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('car-use'));

        return null;
    }),
);

export default ComparisonCar;
