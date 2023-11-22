import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { UserState } from '@reducers/user';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { MyTable } from '@components/table';
import { wrapper } from '@store/redux';
import { MyPagination } from '@components/pagination';
import { MyLayout } from '@components/Layout';
import { useColumn } from '@hooks/use-column';
import { permissionMiddleware } from '@utils/middleware/permission';
import { UserSearchFilter } from '@partials/hr/user/template/SearchFilter';
import { searchUsersRequest } from '@actions/hr/user/search-users.action';
import { SearchResultTemplate } from '@partials/common/template/SearchResult';
import { getOrgasRequest } from '@actions/hr/orga/get-orgas.action';
import { generateListParams } from '@utils/generate';

const Users: NextPage = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { searchUsers } = useSelector<AppState, UserState>(
        (props) => props.user,
    );

    const columns = useColumn(searchUsers.fields);

    const handleClickRow = ({ userid }: any) => {
        router.push(`${router.pathname}/${userid}`);
    };

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
            </Head>
            <MyLayout>
                <div className={displayName}>
                    <UserSearchFilter />
                    <SearchResultTemplate
                        data={[
                            `영업가족수:${searchUsers.total.count.toLocaleString()}`,
                        ]}
                    />
                    <div className={`${displayName}__body`}>
                        <div className="wr-table--scrollable wr-table--hover">
                            <MyTable
                                columns={columns}
                                data={searchUsers.rows}
                                pageSize={searchUsers.lastPayload?.nums}
                                onClickRow={handleClickRow}
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__footer`}>
                        <MyPagination
                            total={searchUsers.total.count}
                        ></MyPagination>
                    </div>
                </div>
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const condition = {
            status: ['상근', '비상근', '기타'],
        };

        const params = generateListParams(condition, ctx.query);

        dispatch(getOrgasRequest({}));

        dispatch(searchUsersRequest(params));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default Users;
