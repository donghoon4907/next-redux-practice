import type { NextPage } from 'next';
import type { LongState } from '@reducers/long';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import longConstants from '@constants/options/long';
import commonConstants from '@constants/options/common';
import longsService from '@services/longsService';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { findSelectOption, findSelectOptionByLabel } from '@utils/getter';
import { LongForm } from '@partials/contract/long/LongForm';
import { createUserHistory } from '@actions/common/set-user-history.action';
import { createPay } from '@actions/contract/set-pay.action';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { updateProduct } from '@actions/contract/set-product.action';
import { MyLayout } from '@components/Layout';
import { useInitCustomer, useInitTab } from '@hooks/use-initialize';
import { createInfoCust } from '@actions/contract/set-info-cust.action';
import { createInfoProduct } from '@actions/contract/set-info-product.action';
import { createBaeseo } from '@actions/contract/set-baeseo.action';
// 장기계약 상세 페이지 컴포넌트
// 주석추가 - 상세 페이지 구조 이해
const Long: NextPage<LongState> = ({ long }) => {
    // Finance Company(long-use) 목록
    const { longUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );
    // 탭 추가 - ASIDE_MENU에 없는 경우 수동으로 추가 필요
    useInitTab(`장기계약상세${long.c_name ? ` - ${long.c_name}` : ''}`);
    // 계약자 정보 로드
    useInitCustomer(long.c_idx);
    // default~ - 셀렉트 박스 기본 값 설정
    const defaultComp = findSelectOption(long.wcode, longUseCompanies);

    const defaultPayCycle = findSelectOptionByLabel(
        long.pay_cycle,
        longConstants.payCycle,
    );

    const defaultStatus = findSelectOption(long.status, longConstants.status);

    const defaultCalType = findSelectOption(
        long.cal_type,
        longConstants.calType,
    );

    const defaultSulDist = findSelectOption(
        long.sul_dist,
        commonConstants.sulDist,
    );

    const defaultSubsSubmission = findSelectOption(
        long.subs_submission,
        longConstants.subsSubmission,
    );

    let defaultFamily;
    let defaultSubsSign;
    if (long.hasOwnProperty('family')) {
        defaultFamily = findSelectOption(
            long.family ? 'Y' : 'N',
            longConstants.family,
        );
    }

    if (long.hasOwnProperty('subs_sign')) {
        defaultSubsSign = findSelectOption(
            long.subs_sign ? 'Y' : 'N',
            commonConstants.yn,
        );
    }

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
            </Head>
            <MyLayout>
                <LongForm
                    mode="update"
                    idx={long.idx}
                    defaultOrganize={long.organize}
                    defaultUserid={long.userid}
                    defaultComp={defaultComp}
                    defaultCnum={long.cnum}
                    defaultContdate={long.contdate}
                    defaultBodateto={long.bo_dateto}
                    defaultPayCycle={defaultPayCycle}
                    defaultPayDateto={long.pay_dateto}
                    defaultStatus={defaultStatus}
                    defaultPayStatus={long.pay_status}
                    defaultStatusDate={long.status_date}
                    defaultLastMonth={long.lastmonth}
                    defaultLastWhoi={long.lastwhoi}
                    defaultIsConfirm={long.confirm}
                    defaultPayment={long.payment.toString()}
                    defaultTp={long.tp ? long.tp.toString() : ''}
                    defaultTp2={long.tp2 ? long.tp2.toString() : ''}
                    defaultTp3={long.tp3 ? long.tp3.toString() : ''}
                    defaultTpu={long.tpu ? long.tpu.toString() : ''}
                    defaultPayBo={long.pay_bo ? long.pay_bo.toString() : ''}
                    defaultPayJ={long.pay_j ? long.pay_j.toString() : ''}
                    defaultPayS={long.pay_s ? long.pay_s.toString() : ''}
                    defaultCalType={defaultCalType}
                    defaultCalDatefrom={long.cal_datefrom}
                    defaultFamily={defaultFamily}
                    defaultSulDist={defaultSulDist}
                    defaultSubsSign={defaultSubsSign}
                    defaultSubsSubmission={defaultSubsSubmission}
                />
            </MyLayout>
        </>
    );
};
// 서버사이드에서 필요한 정보 요청 및 처리
export const getServerSideProps = wrapper.getServerSideProps(
    // 권한 조회 미들웨어
    // 실패 시 로그인 페이지로 이동
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const { query } = ctx;

        const idx = query.idx as string;
        // 조직 목록 API 요청
        dispatch(getOrgasRequest({}));
        // Finance Company(long-use) API 요청
        dispatch(getCompaniesRequest('long-use'));

        const output: any = {
            props: {},
        };

        try {
            // 장기 상세 API 요청
            const { data } = await longsService.getLong({ idx });

            const long = data.data;
            // 서버에서 전달 받은 정보를 컴포넌트에 추가
            output.props.long = long;
            // 상품명 설정
            dispatch(
                updateProduct({
                    p_code: long.p_code,
                    title: long.title,
                    spec: long.spec,
                    subcategory: long.subcategory ? long.subcategory : '',
                    cal_spec: long.cal_spec ? long.cal_spec : '',
                }),
            );
            // 담당자 설정
            if (long.userid_his) {
                for (let i = 0; i < long.userid_his.length; i++) {
                    dispatch(
                        createUserHistory({
                            index: i,
                            checked: false,
                            gdate: long.userid_his[i].gdate,
                            group: long.userid_his[i].group
                                ? long.userid_his[i].group
                                : '',
                            userid: long.userid_his[i].userid,
                            username: long.userid_his[i].fcname,
                        }),
                    );
                }
            }
            // 관리 정보 설정
            if (long.info_custom) {
                for (let i = 0; i < long.info_custom.length; i++) {
                    const info_custom = long.info_custom[i];

                    dispatch(
                        createInfoCust({
                            index: i,
                            checked: false,
                            key: info_custom.key,
                            value: info_custom.value,
                        }),
                    );
                }
            }
            // 기타 계약정보 설정
            if (long.info_product) {
                for (let i = 0; i < long.info_product.length; i++) {
                    const info_product = long.info_product[i];

                    dispatch(
                        createInfoProduct({
                            index: i,
                            checked: false,
                            key: info_product.key,
                            value: info_product.value,
                        }),
                    );
                }
            }
            // 납입 실적 설정
            if (long.pays) {
                // 최근등록순으로 변경
                const reversedPays = long.pays.reverse();
                for (let i = 0; i < reversedPays.length; i++) {
                    const pay = reversedPays[i];

                    dispatch(
                        createPay({
                            index: i,
                            checked: false,
                            idx: pay.idx,
                            paydate: pay.paydate,
                            whoi: pay.whoi,
                            dist: pay.dist,
                            pay: pay.pay,
                            method: pay.method,
                            insert_datetime: pay.insert_datetime,
                            insert_userid: pay.insert_userid,
                            confirm: pay.confirm,
                            cals: pay.cals,
                        }),
                    );
                }
            }
            // 미유지/부활 설정
            if (long.baeseos) {
                // 최근등록순으로 변경
                const reversedBaeseos = long.baeseos.reverse();
                for (let i = 0; i < long.baeseos.length; i++) {
                    const baeseo = reversedBaeseos[i];

                    dispatch(
                        createBaeseo({
                            index: i,
                            checked: false,
                            idx: baeseo.idx,
                            date: baeseo.date,
                            gdate: baeseo.gdate,
                            whoi: baeseo.whoi,
                            dist: baeseo.dist,
                            pay_point: baeseo.pay_point,
                            tp_point: baeseo.tp_point,
                            insert_datetime: baeseo.insert_datetime,
                            insert_userid: baeseo.insert_userid,
                            confirm: baeseo.confirm,
                            cals: baeseo.cals,
                        }),
                    );
                }
            }
            // 요청 종료 설정
            dispatch(END);
            // 요청이 끝날 때 까지 대기
            await sagaTask?.toPromise();
        } catch {
            // 오류 시 404 페이지로 리다이렉션
            output.redirect = {
                destination: '/404',
                permanent: true, // true로 설정하면 301 상태 코드로 리다이렉션
            };
        }

        return output;
    }),
);

export default Long;
