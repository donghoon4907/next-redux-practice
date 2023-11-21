import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { MyTable } from '@components/table';
import { wrapper } from '@store/redux';
import { MyPagination } from '@components/pagination';
import { MyLayout } from '@components/Layout';
import { useColumn } from '@hooks/use-column';
import { getOrgasRequest } from '@actions/hr/get-orgas.action';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getLongsRequest } from '@actions/contract/long/get-longs.action';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { LongSearchFilter } from '@partials/contract/long/template/SearchFilter';
import { SearchResultTemplate } from '@partials/common/template/SearchResult';
import { generateListParams } from '@utils/generate';
import { getUsersRequest } from '@actions/hr/get-users.action';
// 장기계약 조회 페이지 컴포넌트
// 주석추가 - 목록 페이지 구조 이해
const LongBo: NextPage = () => {
    // 컴포넌트명, css class명과 연계
    // 목록 공통 스타일 styles/pages/list2.scss 참조
    const displayName = 'wr-pages-list2';
    // 라우팅 모듈 활성화
    const router = useRouter();
    // 장기계약 목록
    const { longs } = useSelector<AppState, LongState>((props) => props.long);
    // 서버에서 전달 받은 fields를 테이블의 columns로 변환
    const columns = useColumn(longs.fields);
    // 레코드 클릭 이벤트
    const handleClickRow = ({ idx }: any) => {
        router.push(`/contract/long/${idx}`);
    };

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
            </Head>
            <MyLayout>
                <div className={displayName}>
                    {/* 검색어 필터 컴포넌트 */}
                    <LongSearchFilter />
                    {/* 검색결과 메타데이터 컴포넌트 */}
                    <SearchResultTemplate
                        createUrl="/contract/long/create"
                        data={[
                            `계약건수:${longs.total.count.toLocaleString()}건`,
                            `보험료계:${
                                longs.total.pay
                                    ? longs.total.pay.toLocaleString()
                                    : 0
                            }`,
                        ]}
                    />
                    {/* 테이블 컴포넌트 */}
                    <div className={`${displayName}__body`}>
                        <div className="wr-table--scrollable wr-table--hover">
                            <MyTable
                                columns={columns}
                                data={longs.rows}
                                pageSize={longs.lastPayload?.nums}
                                onClickRow={handleClickRow}
                            />
                        </div>
                    </div>
                    {/* 페이지네이션 컴포넌트 */}
                    <div className={`${displayName}__footer`}>
                        <MyPagination total={longs.total.count}></MyPagination>
                    </div>
                </div>
            </MyLayout>
        </>
    );
};
// 서버사이드에서 필요한 정보 요청 및 처리
export const getServerSideProps = wrapper.getServerSideProps(
    // 권한 조회 미들웨어
    // 실패 시 로그인 페이지로 이동
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const condition = {};
        // URL에 포함된 qs정보를 서버요청에 필요한 params로 변환
        const params = generateListParams(condition, ctx.query);
        // 장기계약 목록 API 요청
        dispatch(getLongsRequest(params));
        // Finance Company(long-use) API 요청
        dispatch(getCompaniesRequest('long-view'));
        // 조직 목록 API 요청
        dispatch(getOrgasRequest({}));
        // 영업가족 목록 API 요청
        dispatch(
            getUsersRequest({
                idx: '1',
            }),
        );
        // 요청 종료 설정
        dispatch(END);
        // 요청이 끝날 때 까지 대기
        await sagaTask?.toPromise();

        return null;
    }),
);

export default LongBo;
