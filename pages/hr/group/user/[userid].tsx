import type { NextPage } from 'next';
import type { HrState } from '@reducers/hr';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { getOrgasRequest } from '@actions/hr/get-orgas.action';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { UserForm } from '@partials/hr/user/UserForm';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import hrsService from '@services/hrsService';
import userConstants from '@constants/options/user';
import { updateDepart } from '@actions/hr/set-depart.action';
import { AppState } from '@reducers/index';
import { createCode } from '@actions/hr/set-code.action';
import { createGuarantee } from '@actions/hr/set-guarantee.action';
import { findSelectOption } from '@utils/getter';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';

const User: NextPage<HrState> = ({ user }) => {
    const { banks, allCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    // 탭 설정
    useInitTab(`영업가족상세 - ${user.fc}`);

    const defaultMobileCom = findSelectOption(
        user.mobile_com,
        userConstants.mobileCom,
    );

    let defaultEmail;
    let defaultEmailCom;
    if (user.email) {
        const [email, emailCom] = user.email.split('@');

        defaultEmail = email;

        defaultEmailCom = findSelectOption(emailCom, userConstants.emailCom);
    }

    const defaultUserType = findSelectOption(
        user.user_type,
        userConstants.type,
    );

    const defaultStatus = findSelectOption(user.status, userConstants.status);
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
            defaultEstComInputType = findSelectOption(
                user.est_val.comNm.kind,
                userConstants.estComInputType,
            );
        }

        if (user.est_val.salesNm) {
            defaultEstSalesNm = user.est_val.salesNm.val;
            defaultEstSalesNmInputType = findSelectOption(
                user.est_val.salesNm.kind,
                userConstants.estSalesNmInputType,
            );
        }

        if (user.est_val.phone) {
            defaultEstPhone = user.est_val.phone.val;
            defaultEstPhoneInputType = findSelectOption(
                user.est_val.phone.kind,
                userConstants.estPhoneInputType,
            );
        }

        if (user.est_val.fax) {
            defaultEstFax = user.est_val.fax.val;
            defaultEstFaxInputType = findSelectOption(
                user.est_val.fax.kind,
                userConstants.estFaxInputType,
            );
        }

        if (user.est_val.direct) {
            defaultEstDirect = user.est_val.direct.val;
            defaultEstDirectInputType = findSelectOption(
                user.est_val.direct.kind,
                userConstants.estDirectInputType,
            );
        }

        if (user.est_val.address) {
            defaultEstAddr = user.est_val.address.val;
            defaultEstAddrInputType = findSelectOption(
                user.est_val.address.kind,
                userConstants.estAddrInputType,
            );
        }
    }

    const defaultBank = findSelectOption(user.income_bank, banks);

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
        defaultGenBase = findSelectOption(
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
                defaultGiaComp = findSelectOption(ia.wcode, allCompanies);
                defaultGiaIndate = ia.indate;
                defaultGiaOutdate = ia.outdate;
                defaultGiaQualification = findSelectOption(
                    ia.qualification,
                    userConstants.qDivision,
                );
            } else if (iaType === '생보') {
                defaultLiaIdx = ia.idx;
                defaultLiaNo = ia.no;
                defaultLiaComp = findSelectOption(ia.wcode, allCompanies);
                defaultLiaIndate = ia.indate;
                defaultLiaOutdate = ia.outdate;
                defaultLiaQualification = findSelectOption(
                    ia.qualification,
                    userConstants.qDivision,
                );
            }
        }
    }

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <UserForm
                    mode="update"
                    idx={user.idx}
                    userid={user.userid}
                    defaultNick={user.nickname}
                    defaultName={user.fc}
                    defaultTitle={user.title}
                    defaultIdNum1={user.idnum1}
                    defaultBirthday={user.birthday}
                    defaultBirthType={user.birth_type}
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
                    defaultUseMobile={
                        user.permission.permission.system.use_mobile
                    }
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
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask, getState }, ctx) => {
        const { query } = ctx;

        const userid = query.userid as string;

        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('insu'));

        dispatch(getCompaniesRequest('bank'));

        const output: any = {
            props: {},
        };

        try {
            dispatch(END);

            await sagaTask?.toPromise();

            const { data } = await hrsService.getUser({ idx: userid });

            const user = data.data[0];

            output.props.user = user;

            dispatch(
                updateDepart({
                    label: `${user.orga} ${user.fc}`,
                    value: user.orga_idx,
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

        return output;
    }),
);

export default User;
