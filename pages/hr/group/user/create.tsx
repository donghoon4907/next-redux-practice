import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { wrapper } from '@store/redux';
import { pageMiddleware } from '@utils/middleware/page';
import { UserForm } from '@partials/user/UserForm';
import { showDepartSearchModal } from '@actions/modal/depart-search.action';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';
import { MyHelmet } from '@components/Helmet';

const CreateUser: NextPage = () => {
    const dispatch = useDispatch();

    useInitTab('영업가족 등록');

    useEffect(() => {
        // 부서 선택 모달 열기
        dispatch(showDepartSearchModal());
    }, []);

    return (
        <>
            <MyHelmet />
            <MyLayout>
                <UserForm mode="create" />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    pageMiddleware(async ({ dispatch }) => {
        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('woori'));

        dispatch(getCompaniesRequest('bank'));

        return null;
    }),
);

export default CreateUser;
