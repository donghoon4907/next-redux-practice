import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { UserForm } from '@partials/hr/user/UserForm';
import { showDepartSearchModal } from '@actions/modal/depart-search.action';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';

const CreateUser: NextPage = () => {
    const dispatch = useDispatch();

    useInitTab('영업가족 등록');

    useEffect(() => {
        // 부서 선택 모달 열기
        dispatch(showDepartSearchModal());
    }, []);

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
            </Head>
            <MyLayout>
                <UserForm mode="create" />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('insu'));

        dispatch(getCompaniesRequest('bank'));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default CreateUser;
