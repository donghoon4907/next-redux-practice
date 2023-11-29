import type { NextPage } from 'next';
import type { CustomerState } from '@reducers/customer';
import { addMonths } from 'date-fns';
import dayjs from 'dayjs';
import { CustomerForm } from '@partials/customer/CustomerForm';
import { wrapper } from '@store/redux';
import { pageMiddleware } from '@utils/middleware/page';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { getUsersRequest } from '@actions/user/get-users.action';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import userConstants from '@constants/options/user';
import customerConstants from '@constants/options/customer';
import customersService from '@services/customersService';
import { createUserHistory } from '@actions/common/set-user-history.action';
import { createExcontract } from '@actions/customer/set-excontract.action';
import { createCustcar } from '@actions/customer/set-custcar.action';
import { createFamily } from '@actions/customer/set-family.action';
import { createEvent } from '@actions/customer/set-event.action';
import { findSelectOption } from '@utils/getter';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';
import { MyHelmet } from '@components/Helmet';
import {
    birthdayToAge,
    residentNumToAge,
    residentNumToBirthday,
} from '@utils/calculator';

const Customer: NextPage<CustomerState> = ({ customer }) => {
    // 탭 설정
    useInitTab(`고객상세 - ${customer.name}`);

    const defaultCusttype = findSelectOption(
        customer.custtype.toString(),
        customerConstants.division,
    );

    let defaultSday;
    let defaultAge;
    let defaultEmail;
    let defaultEmailCom;
    let defaultHomepage;
    let defaultPostCode;
    let defaultAddress1;
    let defaultAddress2;
    let defaultAddress3;
    let defaultCompany;
    let defaultTitle;
    let defaultComPhone;
    let defaultCfax;
    let defaultCpostcode;
    let defaultCaddress1;
    let defaultCaddress2;
    let defaultCaddress3;
    let defaultMname;
    let defaultMtitle;
    let defaultMphone;
    let defaultMemail;
    let defaultMemailCom;
    if (customer.custtype === 0) {
        defaultPostCode = customer.postcode;
        defaultAddress1 = customer.address1;
        defaultAddress2 = customer.address2;
        defaultAddress3 = customer.address3;

        if (customer.idnum) {
            // 생년월일
            const strbirthday = residentNumToBirthday(customer.idnum);

            defaultSday = dayjs(addMonths(new Date(strbirthday), 6)).format(
                'YYYY-MM-DD',
            );

            defaultAge = residentNumToAge(customer.idnum) - 1;
        } else {
            if (customer.birthday) {
                defaultSday = dayjs(
                    addMonths(new Date(customer.birthday), 6),
                ).format('YYYY-MM-DD');

                defaultAge = birthdayToAge(new Date(customer.birthday)) - 1;
            }
        }

        if (customer.emailhome) {
            const [email, emailCom] = customer.emailhome.split('@');

            defaultEmail = email;

            defaultEmailCom = findSelectOption(
                emailCom,
                userConstants.emailCom,
            );
        }

        if (customer.office) {
            defaultCompany = customer.office.comname;
            defaultTitle = customer.office.title;
            defaultComPhone = customer.office.tel;
            defaultCfax = customer.office.fax;
            defaultCpostcode = customer.office.postcode;
            defaultCaddress1 = customer.office.address1;
            defaultCaddress2 = customer.office.address2;
            defaultCaddress3 = customer.office.address3;
        }
    } else if (customer.custtype === 1) {
        defaultHomepage = customer.emailhome;

        if (customer.manager) {
            defaultMname = customer.manager.name;
            defaultMtitle = customer.manager.orgatitle;
            defaultMphone = customer.manager.tel;

            const [email, emailCom] = customer.manager.email.split('@');

            defaultMemail = email;

            defaultMemailCom = findSelectOption(
                emailCom,
                userConstants.emailCom,
            );
        }
    }

    const defaultMobileCom = findSelectOption(
        customer.mobile_com,
        userConstants.mobileCom,
    );

    const defaultInflowPath = findSelectOption(
        customer.sourceroot,
        customerConstants.inflowPath,
    );

    const defaultGrade = findSelectOption(
        customer.customer_rate,
        customerConstants.grade,
    );

    return (
        <>
            <MyHelmet />
            <MyLayout>
                <CustomerForm
                    mode="update"
                    spe="customer"
                    idx={customer.idx}
                    defaultName={customer.name}
                    defaultUserid={customer.userid}
                    defaultOrganize={`${customer.fulls} ${customer.username}`}
                    defaultCusttype={defaultCusttype}
                    defaultIdnum={customer.custtype === 0 ? customer.idnum : ''}
                    defaultComRegNum={
                        customer.custtype === 1 ? customer.idnum : ''
                    }
                    defaultBirthday={
                        customer.custtype === 0 ? customer.birthday : null
                    }
                    defaultBtype={customer.b_type}
                    defaultIdate={
                        customer.custtype === 1 ? customer.birthday : null
                    }
                    defaultAge={defaultAge?.toString()}
                    defaultSday={defaultSday}
                    defaultMobile={
                        customer.custtype === 0 ? customer.mobile : ''
                    }
                    defaultMobileCom={defaultMobileCom}
                    defaultPhone={
                        customer.custtype === 1 ? customer.mobile : ''
                    }
                    defaultEmail={defaultEmail}
                    defaultEmailCom={defaultEmailCom}
                    defaultHomepage={defaultHomepage}
                    defaultPostCode={defaultPostCode}
                    defaultAddress1={defaultAddress1}
                    defaultAddress2={defaultAddress2}
                    defaultAddress3={defaultAddress3}
                    defaultInflowPath={defaultInflowPath}
                    defaultGrade={defaultGrade}
                    defaultCreateDay={customer.insert_datetime}
                    defaultJob={customer.job}
                    defaultCompany={defaultCompany}
                    defaultTitle={defaultTitle}
                    defaultComPhone={defaultComPhone}
                    defaultCfax={defaultCfax}
                    defaultCpostcode={defaultCpostcode}
                    defaultCaddress1={defaultCaddress1}
                    defaultCaddress2={defaultCaddress2}
                    defaultCaddress3={defaultCaddress3}
                    defaultMname={defaultMname}
                    defaultMtitle={defaultMtitle}
                    defaultMphone={defaultMphone}
                    defaultMemail={defaultMemail}
                    defaultMemailCom={defaultMemailCom}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    pageMiddleware(async ({ getState, dispatch }, ctx) => {
        const { query } = ctx;

        const idx = query.idx as string;

        dispatch(getCompaniesRequest('insu'));

        dispatch(getOrgasRequest({}));

        dispatch(
            getUsersRequest({
                idx: '1',
            }),
        );

        const output: any = {
            props: {},
        };

        try {
            const { data } = await customersService.getCustomer({ idx });

            const customer = data.data;

            output.props.customer = customer;

            if (customer.userid_his) {
                for (let i = 0; i < customer.userid_his.length; i++) {
                    dispatch(
                        createUserHistory({
                            ...customer.userid_his[i],
                        }),
                    );
                }
            }

            if (customer.excontract) {
                const { hr } = getState();
                for (let i = 0; i < customer.excontract.length; i++) {
                    inner: for (let j = 0; j < hr.allCompanies.length; j++) {
                        if (
                            hr.allCompanies[j].value ===
                            customer.excontract[i].wcode
                        ) {
                            dispatch(
                                createExcontract({
                                    ...customer.excontract[i],
                                    wname: hr.allCompanies[j].label,
                                    index: i,
                                    checked: false,
                                }),
                            );

                            break inner;
                        }
                    }
                }
            }

            if (customer.custcar) {
                for (let i = 0; i < customer.custcar.length; i++) {
                    dispatch(
                        createCustcar({
                            ...customer.custcar[i],
                            index: i,
                            checked: false,
                        }),
                    );
                }
            }

            if (customer.family) {
                for (let i = 0; i < customer.family.length; i++) {
                    dispatch(
                        createFamily({
                            ...customer.family[i],
                            index: i,
                            checked: false,
                        }),
                    );
                }
            }

            if (customer.event) {
                for (let i = 0; i < customer.event.length; i++) {
                    dispatch(
                        createEvent({
                            ...customer.event[i],
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

export default Customer;
