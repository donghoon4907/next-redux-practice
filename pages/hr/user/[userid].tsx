import type { NextPage } from 'next';
import type { HrState } from '@reducers/hr';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { UserForm } from '@partials/hr/user/UserForm';
import { getBanksRequest } from '@actions/hr/get-banks';
import { getAgenciesRequest } from '@actions/hr/get-agencys';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import hrsService from '@services/hrsService';
import userConstants from '@constants/options/user';
import { updateDepart } from '@actions/hr/set-depart.action';
import { AppState } from '@reducers/index';
import { createCode } from '@actions/hr/set-code.action';
import { createGuarantee } from '@actions/hr/set-guarantee.action';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';

function makeSelectOption(value: any, arr: any[]) {
    let output;
    if (value) {
        const findIndex = arr.findIndex((v) => v.value == value);

        if (findIndex !== -1) {
            output = arr[findIndex];
        }
    }

    return output;
}

const User: NextPage<HrState> = ({ user }) => {
    const dispatch = useDispatch();

    const { banks, companies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    let defaultBirthType;
    if (user.birth_type) {
        defaultBirthType = userConstants.birthType[0];
    } else {
        defaultBirthType = userConstants.birthType[1];
    }

    const defaultMobileCom = makeSelectOption(
        user.mobile_com,
        userConstants.mobileCom,
    );

    let defaultEmail;
    let defaultEmailCom;
    if (user.email) {
        const [email, emailCom] = user.email.split('@');

        defaultEmail = email;

        defaultEmailCom = makeSelectOption(emailCom, userConstants.emailCom);
    }

    const defaultUserType = makeSelectOption(
        user.user_type,
        userConstants.userType,
    );

    const defaultStatus = makeSelectOption(
        user.status,
        userConstants.empStatus,
    );
    let defaultEstComNm;
    let defaultEstComInputType;
    let defaultEstSalesNm;
    let defaultEstSalesNmInputType;
    let defaultEstPhone;
    let defaultEstPhoneInputType;
    let defaultEstFax;
    let defaultEstFaxInputType;
    let defaultEstDirect;
    let defaultEstDirectInputType;
    let defaultEstAddr;
    let defaultEstAddrInputType;
    if (user.est_val) {
        if (user.est_val.comNm) {
            defaultEstComNm = user.est_val.comNm.val;
            defaultEstComInputType = makeSelectOption(
                user.est_val.comNm.kind,
                userConstants.estComInputType,
            );
        }

        if (user.est_val.salesNm) {
            defaultEstSalesNm = user.est_val.salesNm.val;
            defaultEstSalesNmInputType = makeSelectOption(
                user.est_val.salesNm.kind,
                userConstants.estSalesNmInputType,
            );
        }

        if (user.est_val.phone) {
            defaultEstPhone = user.est_val.phone.val;
            defaultEstPhoneInputType = makeSelectOption(
                user.est_val.phone.kind,
                userConstants.estPhoneInputType,
            );
        }

        if (user.est_val.fax) {
            defaultEstFax = user.est_val.fax.val;
            defaultEstFaxInputType = makeSelectOption(
                user.est_val.fax.kind,
                userConstants.estFaxInputType,
            );
        }

        if (user.est_val.direct) {
            defaultEstDirect = user.est_val.direct.val;
            defaultEstDirectInputType = makeSelectOption(
                user.est_val.direct.kind,
                userConstants.estDirectInputType,
            );
        }

        if (user.est_val.address) {
            defaultEstAddr = user.est_val.address.val;
            defaultEstAddrInputType = makeSelectOption(
                user.est_val.address.kind,
                userConstants.estAddrInputType,
            );
        }
    }

    const defaultBank = makeSelectOption(user.income_bank, banks);

    let defaultCalIdx;
    let defaultGenBase;
    let defaultCarType;
    let defaultGenType;
    let defaultGenRate;
    let defaultLongGrade;

    if (user.cal?.idx) {
        defaultCalIdx = user.cal.idx;
    }

    if (user.cal?.gen_cal_base) {
        defaultGenBase = makeSelectOption(
            user.cal.gen_cal_base,
            userConstants.calcStandard,
        );
    }

    if (user.cal?.car_cal_type) {
        defaultCarType = user.cal.car_cal_type;
    }

    if (user.cal?.gen_cal_type) {
        defaultGenType = user.cal.gen_cal_type;
    }

    if (user.cal?.gen_cal_ratio) {
        defaultGenRate = user.cal.gen_cal_ratio;
    }

    if (user.cal?.long_grade) {
        defaultLongGrade = user.cal.long_grade;
    }

    let defaultGiaIdx;
    let defaultGiaNo;
    let defaultGiaComp;
    let defaultGiaIndate;
    let defaultGiaOutdate;
    let defaultGiaQualification;
    let defaultLiaIdx;
    let defaultLiaNo;
    let defaultLiaComp;
    let defaultLiaIndate;
    let defaultLiaOutdate;
    let defaultLiaQualification;
    if (Array.isArray(user.associate)) {
        for (let i = 0; i < user.associate.length; i++) {
            const ia = user.associate[i];
            const iaType = ia.type;

            if (iaType === '손보') {
                defaultGiaIdx = ia.idx;
                defaultGiaNo = ia.no;
                defaultGiaComp = makeSelectOption(ia.wcode, companies);
                defaultGiaIndate = ia.indate;
                defaultGiaOutdate = ia.outdate;
                defaultGiaQualification = makeSelectOption(
                    ia.qualification,
                    userConstants.qDivision,
                );
            } else if (iaType === '생보') {
                defaultLiaIdx = ia.idx;
                defaultLiaNo = ia.no;
                defaultLiaComp = makeSelectOption(ia.wcode, companies);
                defaultLiaIndate = ia.indate;
                defaultLiaOutdate = ia.outdate;
                defaultLiaQualification = makeSelectOption(
                    ia.qualification,
                    userConstants.qDivision,
                );
            }
        }
    }

    useEffect(() => {
        // 탭 추가
        const tab = new TabModule();

        console.log(user.userid);
        const tabKey = `tab:hr-user_${user.userid}`;
        if (!tab.read(tabKey)) {
            tab.create({
                id: tabKey,
                label: `영업가족상세 - ${user.name}`,
                to: `/hr/user/${user.userid}`,
            });
        }

        dispatch(initTab(tab.getAll()));
    }, [dispatch, user]);

    return (
        <>
            <Head>
                <title>영업가족상세</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <UserForm
                mode="update"
                idx={user.idx}
                userid={user.userid}
                defaultNick={user.nickname}
                defaultName={user.name}
                defaultTitle={user.title}
                defaultIdNum1={user.idnum1}
                defaultBirthday={user.birthday}
                defaultBirthType={defaultBirthType}
                defaultPhone={user.mobile}
                defaultMobileCom={defaultMobileCom}
                defaultTelephone={user.telephone}
                defaultTelDirect={user.tel_direct}
                defaultEmail={defaultEmail}
                defaultEmailCom={defaultEmailCom}
                defaultPostCode={user.postcode}
                defaultAddress1={user.address1}
                defaultAddress2={user.address2}
                defaultAddress3={user.address3}
                defaultUserType={defaultUserType}
                defaultStatus={defaultStatus}
                defaultIndate={user.indate}
                defaultOutdate={user.outdate}
                defaultCalIdx={defaultCalIdx}
                defaultEstComNm={defaultEstComNm}
                defaultEstComInputType={defaultEstComInputType}
                defaultEstSalesNm={defaultEstSalesNm}
                defaultEstSalesNmInputType={defaultEstSalesNmInputType}
                defaultEstPhone={defaultEstPhone}
                defaultEstPhoneInputType={defaultEstPhoneInputType}
                defaultEstFax={defaultEstFax}
                defaultEstFaxInputType={defaultEstFaxInputType}
                defaultEstDirect={defaultEstDirect}
                defaultEstDirectInputType={defaultEstDirectInputType}
                defaultEstAddr={defaultEstAddr}
                defaultEstAddrInputType={defaultEstAddrInputType}
                defaultBank={defaultBank}
                defaultAccount={user.income_account}
                defaultHolder={user.income_name}
                defaultCarType={defaultCarType}
                defaultGenType={defaultGenType}
                defaultGenBase={defaultGenBase}
                defaultGenRate={defaultGenRate}
                defaultLongGrade={defaultLongGrade}
                defaultPermissionIdx={user.permission.idx}
                defaultUseWeb={user.permission.permission.system.use_web}
                defaultUseMobile={user.permission.permission.system.use_mobile}
                defaultGiaIdx={defaultGiaIdx}
                defaultGiaNo={defaultGiaNo}
                defaultGiaComp={defaultGiaComp}
                defaultGiaIndate={defaultGiaIndate}
                defaultGiaOutdate={defaultGiaOutdate}
                defaultGiaQualification={defaultGiaQualification}
                defaultLiaIdx={defaultLiaIdx}
                defaultLiaNo={defaultLiaNo}
                defaultLiaComp={defaultLiaComp}
                defaultLiaIndate={defaultLiaIndate}
                defaultLiaOutdate={defaultLiaOutdate}
                defaultLiaQualification={defaultLiaQualification}
            />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const { query } = ctx;

        const userid = query.userid as string;

        dispatch(getBanksRequest());

        dispatch(getAgenciesRequest());

        dispatch(getCompaniesRequest());

        const output: any = {
            props: {},
        };

        try {
            const { data } = await hrsService.getUser({ idx: userid });

            const user = data.data[0];

            output.props.user = user;

            dispatch(
                getOrgasRequest({
                    idx: '1',
                    callback: (res) => {
                        const findIndex = res.findIndex(
                            (v: any) => v.idx === user.orga_idx,
                        );

                        if (findIndex !== -1) {
                            const selected = res[findIndex];

                            dispatch(
                                updateDepart({
                                    label: selected.fulls,
                                    value: selected.idx,
                                }),
                            );
                        }
                    },
                }),
            );

            if (user.guarantee) {
                for (let i = 0; i < user.guarantee.length; i++) {
                    dispatch(
                        createGuarantee({
                            ...user.guarantee[i],
                            index: i,
                            checked: false,
                        }),
                    );
                }
            }

            if (user.fccode) {
                for (let i = 0; i < user.fccode.length; i++) {
                    dispatch(
                        createCode({
                            ...user.fccode[i],
                            index: i,
                            checked: false,
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

        dispatch(END);

        await sagaTask?.toPromise();

        return output;
    }),
);

export default User;
