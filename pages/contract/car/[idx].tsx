import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CarState } from '@reducers/car';
import { useSelector } from 'react-redux';
import { wrapper } from '@store/redux';
import { pageMiddleware } from '@utils/middleware/page';
import carsService from '@services/carsService';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { findSelectOption } from '@utils/getter';
import carConstants from '@constants/options/car';
import commonConstants from '@constants/options/common';
import { createUserHistory } from '@actions/common/set-user-history.action';
import { createPay } from '@actions/contract/set-pay.action';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { updateProduct } from '@actions/contract/set-product.action';
import { MyLayout } from '@components/Layout';
import { CarForm } from '@partials/car/CarForm';
import { useInitCustomer, useInitTab } from '@hooks/use-initialize';
import { createInfoCust } from '@actions/contract/set-info-cust.action';
import { createInfoProduct } from '@actions/contract/set-info-product.action';
import { getEstimateRequest } from '@actions/car/get-estimate.action';
import { MyHelmet } from '@components/Helmet';

const Car: NextPage<CarState> = ({ car }) => {
    const { longUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    // 탭 설정
    useInitTab(`자동차계약상세${car.c_name ? ` - ${car.c_name}` : ''}`);
    // 계약자 설정
    useInitCustomer(car.c_idx);

    const defaultComp = findSelectOption(car.wcode, longUseCompanies);

    // const defaultPreComp = findSelectOption(car.pre_wcode, longUseCompanies);

    const defaultStatus = findSelectOption(car.status, carConstants.status);

    const defaultBodesc = findSelectOption(car.bo_desc, carConstants.shortDist);

    const defaultInsu = findSelectOption(car.insu, carConstants.dist);

    let calType;
    if (typeof car.cal_type === 'boolean') {
        if (car.cal_type) {
            calType = 'Y';
        } else {
            calType = 'N';
        }
    }
    const defaultCalType = findSelectOption(calType, carConstants.calType);

    const defaultRate = findSelectOption(car.rate, carConstants.cGrade);

    const defaultSulDist = findSelectOption(
        car.sul_dist,
        commonConstants.sulDist,
    );

    const defaultCycle = findSelectOption(car.cycle, carConstants.payMethod);

    const defaultCarfamily = findSelectOption(
        car.carfamily,
        carConstants.driverRange,
    );

    const defaultCarage = findSelectOption(car.carage, carConstants.minAge);

    return (
        <>
            <MyHelmet />
            <MyLayout>
                <CarForm
                    mode="update"
                    idx={car.idx}
                    defaultOrganize={car.organize}
                    defaultUserid={car.userid}
                    defaultComp={defaultComp}
                    defaultPreComp={car.pre_company}
                    defaultCnum={car.cnum}
                    defaultPreCnum={car.pre_cnum}
                    defaultBodatefrom={car.bo_datefrom}
                    defaultBodateto={car.bo_dateto}
                    defaultBodesc={defaultBodesc}
                    defaultStatus={defaultStatus}
                    defaultIsConfirm={car.confirm ? 'Y' : 'N'}
                    defaultInsu={defaultInsu}
                    defaultRate={defaultRate}
                    defaultCalType={defaultCalType}
                    defaultSulDist={defaultSulDist}
                    defaultCarNum={car.carnum}
                    defaultCycle={defaultCycle}
                    defaultPname={car.p_name}
                    defaultCarfamily={defaultCarfamily}
                    defaultCarage={defaultCarage}
                    defaultBboxDate={car.blackbox_date}
                    defaultBboxPrice={car.blackbox_price}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    pageMiddleware(async ({ dispatch }, ctx) => {
        const { query } = ctx;

        const idx = query.idx as string;

        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('long-use'));

        const output: any = {
            props: {},
        };

        try {
            const { data } = await carsService.getCar({ idx });

            const car = data.data;

            output.props.car = car;

            if (car.est_idx) {
                dispatch(getEstimateRequest({ idx: car.est_idx }));
            }

            dispatch(
                updateProduct({
                    p_code: car.p_code,
                    title: car.title,
                    spec: car.spec,
                    subcategory: null,
                    cal_spec: car.cal_spec,
                }),
            );

            if (car.userid_his) {
                for (let i = 0; i < car.userid_his.length; i++) {
                    dispatch(
                        createUserHistory({
                            index: i,
                            checked: false,
                            gdate: car.userid_his[i].gdate,
                            group: car.userid_his[i].group,
                            userid: car.userid_his[i].userid,
                            username: car.userid_his[i].fcname,
                        }),
                    );
                }
            }

            if (car.info_custom) {
                for (let i = 0; i < car.info_custom.length; i++) {
                    const info_custom = car.info_custom[i];

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

            if (car.info_product) {
                for (let i = 0; i < car.info_product.length; i++) {
                    const info_product = car.info_product[i];

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

            if (car.pays) {
                for (let i = 0; i < car.pays.length; i++) {
                    const pay = car.pays[i];

                    dispatch(
                        createPay({
                            index: i,
                            checked: false,
                            idx: pay.idx,
                            paydate: pay.paydate,
                            dist: pay.dist,
                            pay: pay.pay,
                            pay1: pay.pay1,
                            pay2: pay.pay2,
                            method: pay.method,
                            insert_datetime: pay.insert_datetime,
                            insert_userid: pay.insert_userid,
                            confirm: pay.confirm,
                            cals: pay.cals,
                        }),
                    );
                }
            }
        } catch {
            output.redirect = {
                destination: '/404',
                permanent: true, // true로 설정하면 301 상태 코드로 리다이렉션
            };
        }

        return output;
    }),
);

export default Car;
