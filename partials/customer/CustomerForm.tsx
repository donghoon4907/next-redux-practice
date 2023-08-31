import type { FC } from 'react';
import type { Spe } from '@models/spe';
import type { CoreSelectOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CustomerState } from '@reducers/customer';
import type { CommonState } from '@reducers/common';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import addMonths from 'date-fns/addMonths';
import { MySelect } from '@components/select';
import { CUSTOMER_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { MyLayout } from '@components/Layout';
import { MyFooter } from '@components/footer';
import { useSelect } from '@hooks/use-select';
import { MyButton } from '@components/button';
import { useTab } from '@hooks/use-tab';
import { MyDatepicker } from '@components/datepicker';
import { usePostcode } from '@hooks/use-postcode';
import { ContactTabpanel } from '@partials/customer/tabpanels/Contact';
import { HoldingContractTabpanel } from '@partials/customer/tabpanels/HoldingContract';
import { ExcontractTabpanel } from '@partials/customer/tabpanels/Excontract';
import { CustcarTabpanel } from '@partials/customer/tabpanels/Custcar';
import { FamilyTabpanel } from '@partials/customer/tabpanels/Family';
import { EventTabpanel } from '@partials/customer/tabpanels/Event';
import customerConstants from '@constants/options/customer';
import userConstants from '@constants/options/user';
import { useDatepicker } from '@hooks/use-datepicker';
import { isEmpty } from '@utils/validator/common';
import { CustomerManagerAccordion } from '@components/accordion/CustomerManagerHistory';
import { CreateExcontractLongModal } from '@components/modal/CreateExcontractLong';
import { CreateExcontractCarModal } from '@components/modal/CreateExcontractCar';
import { CreateExcontractGenModal } from '@components/modal/CreateExcontractGen';
import { CreateCustcarCarModal } from '@components/modal/CreateCustcarCar';
import { CreateCustcarCustModal } from '@components/modal/CreateCustcarCust';
import { DateAndSLInput } from '@partials/common/input/DateAndSL';
import { CreateFamilyModal } from '@components/modal/CreateFamily';
import { PostcodeInput } from '@partials/common/input/Postcode';
import { CreateEventModal } from '@components/modal/CreateEvent';
import { createCustomerRequest } from '@actions/customer/create-customer.action';
import { useApi } from '@hooks/use-api';
import {
    CreateCustomerDTO,
    UpdateCustomerDTO,
} from '@dto/customer/Customer.dto';
import { WithSelectInput } from '@partials/common/input/WithSelect';
import { UserHistoryModal } from '@components/modal/UserHistory';
import { getCompanyRegNumRequest } from '@actions/hr/get-company-regnum';
import {
    useInput,
    useNumbericInput,
    usePhoneInput,
    useResidentNumberInput,
} from '@hooks/use-input';
import {
    birthdayToAge,
    residentNumToAge,
    residentNumToBirthday,
} from '@utils/calculator';
import { updateCustomerRequest } from '@actions/customer/update-customer.action';

interface Props {
    /**
     * 모드: true(수정) / false(등록)
     */
    mode: 'create' | 'update';
    /**
     *
     */
    spe: Spe;
    /**
     * PK
     */
    idx?: number;
    /**
     * 담당자 기본 ID
     */
    defaultUserid: string;
    /**
     * 담당자 기본 값
     */
    defaultUsername: string;
    /**
     * 담당자 기본 부서 값
     */
    defaultUserFulls: string;
    /**
     * 고객명 기본 값
     */
    defaultName?: string;
    /**
     * 고객구분 기본 값
     */
    defaultCusttype?: CoreSelectOption;
    /**
     * 주민번호 기본 값
     */
    defaultIdnum?: string;
    /**
     * 사업자등록번호 기본 값
     */
    defaultComRegNum?: string;
    /**
     * 나이 기본 값
     */
    defaultAge?: string;
    // defaultAgeType?: CoreSelectOption;
    /**
     * 생년월일 기본 값
     */
    defaultBirthday?: string;
    defaultBtype?: boolean;
    /**
     * 법인설립일 기본 값
     */
    defaultIdate?: string;
    /**
     * 상령일 기본 값
     */
    defaultSday?: string;
    /**
     * 핸드폰 기본 값
     */
    defaultMobile?: string;
    defaultMobileCom?: CoreSelectOption;
    /**
     * 대표전화 기본 값
     */
    defaultPhone?: string;
    /**
     * 이메일 기본 값
     */
    defaultEmail?: string;
    defaultEmailCom?: CoreSelectOption;
    /**
     * 홈페이지 기본 값
     */
    defaultHomepage?: string;
    /**
     * 우편번호 기본 값
     */
    defaultPostCode?: string;
    defaultAddress1?: string;
    defaultAddress2?: string;
    defaultAddress3?: string;
    /**
     * 유입경로 기본 값
     */
    defaultInflowPath?: CoreSelectOption;
    /**
     * 고객등급 기본 값
     */
    defaultGrade?: CoreSelectOption;
    /**
     * 개인정보활용동의 기본 값
     */
    defaultPia?: CoreSelectOption;
    /**
     * 동의일시 기본 값
     */
    defaultAday?: string;
    /**
     * 고객생성일시 기본 값
     */
    defaultCreateDay?: string;
    /**
     * 직업 기본 값
     */
    defaultJob?: string;
    /**
     * 회사명 기본 값
     */
    defaultCompany?: string;
    /**
     * 부서/직함 기본 값
     */
    defaultTitle?: string;
    /**
     * 회사 전화번호 기본 값
     */
    defaultComPhone?: string;
    /**
     * 팩스 기본 값
     */
    defaultCfax?: string;
    /**
     * 회사 우편번호 기본 값
     */
    defaultCpostcode?: string;
    defaultCaddress1?: string;
    defaultCaddress2?: string;
    defaultCaddress3?: string;
    /**
     * 담당자 이름 기본 값
     */
    defaultMname?: string;
    /**
     * 담당자 직함 기본 값
     */
    defaultMtitle?: string;
    /**
     * 담당자 전화번호 기본 값
     */
    defaultMphone?: string;
    /**
     * 담당자 이메일 기본 값
     */
    defaultMemail?: string;
    defaultMemailCom?: CoreSelectOption;
}

export const CustomerForm: FC<Props> = ({
    mode,
    spe,
    idx = -1,
    defaultUserid,
    defaultUsername,
    defaultUserFulls,
    defaultName = '',
    defaultCusttype = customerConstants.division[0],
    defaultIdnum = '',
    defaultComRegNum = '',
    defaultAge = '',
    // defaultAgeType = customerConstants.age[0],
    defaultBirthday = null,
    defaultBtype = true,
    defaultIdate = null,
    defaultSday = '',
    defaultMobile = '',
    defaultMobileCom = userConstants.mobileCom[0],
    defaultPhone = '',
    defaultEmail = '',
    defaultEmailCom = userConstants.emailCom[0],
    defaultHomepage = '',
    defaultPostCode = '',
    defaultAddress1 = '',
    defaultAddress2 = '',
    defaultAddress3 = '',
    defaultInflowPath = customerConstants.inflowPath[0],
    defaultGrade = null,
    defaultPia = null,
    defaultAday = null,
    defaultCreateDay = null,
    defaultJob = '',
    defaultCompany = '',
    defaultTitle = '',
    defaultComPhone = '',
    defaultCfax = '',
    defaultCpostcode = '',
    defaultCaddress1 = '',
    defaultCaddress2 = '',
    defaultCaddress3 = '',
    defaultMname = '',
    defaultMtitle = '',
    defaultMphone = '',
    defaultMemail = '',
    defaultMemailCom = userConstants.emailCom[0],
}) => {
    const displayName = 'wr-pages-customer-detail';

    const router = useRouter();

    const { loggedInUser } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const {
        excontracts,
        custcars,
        family,
        events,
        removedExcontracts,
        removedCustcars,
        removedFamily,
        removedEvents,
    } = useSelector<AppState, CustomerState>((state) => state.customer);

    const { contacts, removedContacts, userHistories, newUserHistory } =
        useSelector<AppState, CommonState>((state) => state.common);

    const createCustomer = useApi(createCustomerRequest);

    const updateCustomer = useApi(updateCustomerRequest);

    const getCompanyRegNum = useApi(getCompanyRegNumRequest);
    // 탭 관리
    const [tab, setTab] = useTab(CUSTOMER_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    const labelType = editable ? 'active' : 'disable';
    // 고객명
    const [name] = useInput(defaultName, { noSpace: true });
    // 회사명
    const [cname, setCname] = useInput(defaultName, { noSpace: true });
    // 고객구분
    const [custtype] = useSelect(customerConstants.division, defaultCusttype);
    // 개인 여부
    const isIndividual = custtype.value?.value === '0';
    // 법인 여부
    const isCorporation = custtype.value?.value === '1';
    // 나이
    const [age, setAge] = useState(defaultAge);
    const [ageType] = useSelect(customerConstants.age, undefined, {
        callbackOnChange: (option) => {
            if (isEmpty(idnum.value)) {
                if (birthday.value) {
                    if (isEmpty(idnum.value)) {
                        // 상령일
                        const sday = addMonths(birthday.value, 6);

                        setSday(dayjs(sday).format('YYYY-MM-DD'));
                        // 일반나이
                        const age = birthdayToAge(birthday.value);
                        if (option!.value === '만나이') {
                            setAge(`${age - 1}`);
                        } else if (option!.value === '보험나이') {
                            setAge(birthdayToAge(sday).toString());
                        } else if (option!.value === '일반나이') {
                            setAge(`${age}`);
                        }
                    }
                }
            } else {
                const pureIdnum = idnum.value.replace(/-/g, '');

                if (pureIdnum.length === 13) {
                    // 생년월일
                    const strbirthday = residentNumToBirthday(pureIdnum);
                    // 상령일
                    const sday = addMonths(new Date(strbirthday), 6);

                    setBirthday(new Date(strbirthday));

                    setSday(dayjs(sday).format('YYYY-MM-DD'));
                    // 일반나이
                    const age = residentNumToAge(idnum.value!);
                    if (option!.value === '만나이') {
                        setAge(`${age - 1}`);
                    } else if (option!.value === '보험나이') {
                        setAge(birthdayToAge(sday).toString());
                    } else if (option!.value === '일반나이') {
                        setAge(`${age}`);
                    }
                }
            }
        },
    });
    // 생년월일
    const [birthday, setBirthday] = useDatepicker(
        defaultBirthday ? new Date(defaultBirthday) : null,
        {
            callbackOnChange: (nextdate) => {
                if (nextdate) {
                    if (isEmpty(idnum.value)) {
                        // 상령일
                        const sday = addMonths(new Date(nextdate), 6);

                        setSday(dayjs(sday).format('YYYY-MM-DD'));
                        // 일반나이
                        const age = birthdayToAge(nextdate);
                        if (ageType.value!.value === '만나이') {
                            setAge(`${age - 1}`);
                        } else if (ageType.value!.value === '보험나이') {
                            setAge(birthdayToAge(sday).toString());
                        } else if (ageType.value!.value === '일반나이') {
                            setAge(`${age}`);
                        }
                    }
                }
            },
        },
    );
    const [bType, setBtype] = useState(defaultBtype);
    // 상령일
    const [sDay, setSday] = useState(defaultSday);
    // 주민번호
    const [idnum] = useResidentNumberInput(defaultIdnum, {
        callbackOnChange: (nextval) => {
            if (!isEmpty(nextval)) {
                if (nextval!.length === 13) {
                    // 생년월일
                    const strbirthday = residentNumToBirthday(nextval!);
                    // 상령일
                    const sday = addMonths(new Date(strbirthday), 6);

                    setBirthday(new Date(strbirthday));

                    setSday(dayjs(sday).format('YYYY-MM-DD'));
                    // 일반나이
                    const age = residentNumToAge(nextval!);
                    if (ageType.value!.value === '만나이') {
                        setAge(`${age - 1}`);
                    } else if (ageType.value!.value === '보험나이') {
                        setAge(birthdayToAge(sday).toString());
                    } else if (ageType.value!.value === '일반나이') {
                        setAge(`${age}`);
                    }
                }
            }
        },
    });
    // 사업자등록번호
    const [comRegNum] = useNumbericInput(defaultComRegNum);
    // 법인설립일
    const [iDate] = useDatepicker(defaultIdate ? new Date(defaultIdate) : null);
    // 핸드폰
    const [mobile] = usePhoneInput(defaultMobile);
    const [mobileCom] = useSelect(userConstants.mobileCom, defaultMobileCom);
    // 대표전화
    const [phone] = usePhoneInput(defaultPhone);
    // 이메일
    const [email] = useInput(defaultEmail, { noSpace: true });
    const [emailCom] = useSelect(userConstants.emailCom, defaultEmailCom);
    // 홈페이지
    const [homepage] = useInput(defaultHomepage, { noSpace: true });
    // 우편번호
    const [postcode, address1, address2, onClickPostcode] = usePostcode(
        {
            postcode: defaultPostCode,
            address1: defaultAddress1,
            address2: defaultAddress2,
        },
        { disabled: !editable },
    );
    // 상세 주소
    const [address3] = useInput(defaultAddress3);
    // 유입경로
    const [inflowPath] = useSelect(
        customerConstants.inflowPath,
        defaultInflowPath,
    );
    // 고객등급
    const [grade] = useSelect(customerConstants.grade, defaultGrade);
    // 개인정보활용동의
    const [pia] = useSelect(customerConstants.pia, defaultPia);
    // 동의일시
    const [aDay] = useDatepicker(defaultAday ? new Date(defaultAday) : null);
    // 고객생성일시
    const [createDay] = useDatepicker(
        defaultCreateDay ? new Date(defaultCreateDay) : null,
    );
    // 직업
    const [job] = useInput(defaultJob);
    // 회사명
    const [company] = useInput(defaultCompany);
    // 부서/직함
    const [title] = useInput(defaultTitle);
    // 회사 전화번호
    const [comPhone] = usePhoneInput(defaultComPhone);
    // 팩스
    const [cFax] = usePhoneInput(defaultCfax);
    // 회사 우편번호
    const [cPostcode, cAddress1, cAddress2, onClickCPostcode] = usePostcode(
        {
            postcode: defaultCpostcode,
            address1: defaultCaddress1,
            address2: defaultCaddress2,
        },
        { disabled: !editable },
    );
    // 회사 상세 주소
    const [cAddress3] = useInput(defaultCaddress3);
    // 담당자명
    const [mName] = useInput(defaultMname);
    // 담당자 부서/직함
    const [mTitle] = useInput(defaultMtitle);
    // 담당자 전화번호
    const [mPhone] = usePhoneInput(defaultMphone);
    // 담당자 이메일
    const [mEmail] = useInput(defaultMemail, { noSpace: true });
    const [mEmailCom] = useSelect(userConstants.emailCom, defaultMemailCom);

    const handleBlurComRegNum = () => {
        if (!isEmpty(comRegNum.value)) {
            getCompanyRegNum(
                {
                    num: comRegNum.value,
                },
                ({ company_name }) => {
                    const tf = confirm(
                        `입력하신 사업자등록번호의 회사명은 ${company_name}입니다. 변경하시겠습니까?`,
                    );
                    if (tf) {
                        setCname(company_name);
                    }
                },
            );
        }
    };

    // 취소 버튼 클릭 핸들러
    const handleClickCancel = () => {
        const tf = confirm('수정을 취소하시겠습니까?');

        if (tf) {
            location.reload();
        }
    };

    const handleClickModify = () => {
        setEditable(true);
    };

    const handleCreate = () => {
        const payload = createPayload();

        const createCustomerDto = new CreateCustomerDTO(payload);

        if (createCustomerDto.requiredValidate()) {
            createCustomer(createCustomerDto.getPayload());
        }
    };

    const handleUpdate = () => {
        const payload = createPayload();

        const updateCustomerDto = new UpdateCustomerDTO(payload);

        if (updateCustomerDto.requiredValidate()) {
            updateCustomer(updateCustomerDto.getPayload(), () => {
                router.replace(location.href);
            });
        }
    };

    const createPayload = () => {
        const payload: any = {
            name: isIndividual ? name.value : cname.value,
            custtype: +custtype.value!.value,
            userid: newUserHistory ? newUserHistory.userid : defaultUserid,
            remove: {},
        };

        if (idx !== -1) {
            payload['idx'] = idx;
        }

        if (newUserHistory) {
            payload['userid_his'] = [
                ...userHistories,
                {
                    ...newUserHistory,
                    insert_date: dayjs().format('YYYY-MM-DD'),
                },
            ];
        }

        if (contacts.length > 0) {
            payload['contacts'] = contacts;
        }

        if (excontracts.length > 0) {
            payload['excontract'] = excontracts;
        }

        if (custcars.length > 0) {
            payload['custcar'] = custcars;
        }

        if (family.length > 0) {
            payload['family'] = family;
        }

        if (events.length > 0) {
            payload['event'] = events;
        }

        if (inflowPath.value) {
            payload['sourceroot'] = inflowPath.value.value;
        }

        if (grade.value) {
            payload['customer_rate'] = grade.value.value;
        }

        if (removedContacts.length > 0) {
            payload['remove']['contacts'] = removedContacts.map((v) => v.idx);
        }

        if (removedExcontracts.length > 0) {
            payload['remove']['excontract'] = removedExcontracts.map(
                (v) => v.idx,
            );
        }

        if (removedCustcars.length > 0) {
            payload['remove']['custcar'] = removedCustcars.map((v) => v.idx);
        }

        if (removedFamily.length > 0) {
            payload['remove']['family'] = removedFamily.map((v) => v.idx);
        }

        if (removedEvents.length > 0) {
            payload['remove']['event'] = removedEvents.map((v) => v.idx);
        }

        // if (pia.value) {
        //     payload['privacyinfo'] = {
        //         type: pia.value.value,
        //     };

        //     if (aDay.value) {
        //         payload.privacyinfo['insert_datetime'] = dayjs(
        //             aDay.value,
        //         ).format('YYYY-MM-DD HH:mm');
        //     }
        // }

        // 개인: 나이 상령일 X
        if (isIndividual) {
            if (!isEmpty(idnum.value)) {
                payload['idnum'] = idnum.value.replace(/-/g, '');
            }

            if (birthday.value) {
                payload['birthday'] = dayjs(birthday.value).format(
                    'YYYY-MM-DD',
                );

                payload['b_type'] = bType;
            }

            if (!isEmpty(mobile.value)) {
                payload['mobile'] = mobile.value.replace(/-/g, '');
                payload['mobile_com'] = mobileCom.value!.value;
            }

            if (!isEmpty(email.value)) {
                payload['emailhome'] = `${email.value}@${
                    emailCom.value!.value
                }`;
            }

            if (!isEmpty(postcode.value)) {
                payload['postcode'] = postcode.value;
            }

            if (!isEmpty(address1.value)) {
                payload['address1'] = address1.value;
            }

            if (!isEmpty(address2.value)) {
                payload['address2'] = address2.value;
            }

            if (!isEmpty(address3.value)) {
                payload['address3'] = address3.value;
            }

            if (!isEmpty(job.value)) {
                payload['job'] = job.value;
            }

            payload['office'] = {
                comname: company.value,
                title: title.value,
                tel: comPhone.value.replace(/-/g, ''),
                fax: cFax.value.replace(/-/g, ''),
                postcode: cPostcode.value,
                address1: cAddress1.value,
                address2: cAddress2.value,
                address3: cAddress3.value,
            };
        }
        // 법인
        if (isCorporation) {
            if (!isEmpty(comRegNum.value)) {
                payload['idnum'] = comRegNum.value;
            }

            if (iDate.value) {
                payload['birthday'] = dayjs(iDate.value).format('YYYY-MM-DD');
            }

            if (!isEmpty(phone.value)) {
                payload['mobile'] = phone.value.replace(/-/g, '');
            }

            if (!isEmpty(homepage.value)) {
                payload['emailhome'] = homepage.value;
            }

            payload['manager'] = {
                name: mName.value,
                orgatitle: mTitle.value,
                tel: mPhone.value.replace(/-/g, ''),
                email: `${mEmail.value}@${mEmailCom.value!.value}`,
            };
        }

        return payload;
    };

    return (
        <>
            <MyLayout>
                <div className={`${displayName} wr-pages-detail row`}>
                    <div className={`${displayName}__left col`}>
                        <div className="wr-frame__section">
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <CustomerManagerAccordion
                                        defaultTitle={
                                            defaultUserid
                                                ? `${defaultUserFulls} ${defaultUsername}`
                                                : `${loggedInUser.user_info.fulls} ${loggedInUser.user_info.name}`
                                        }
                                        editable={editable}
                                    />
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            {isIndividual && (
                                                <WithLabel
                                                    id="name"
                                                    label="고객명"
                                                    type={labelType}
                                                    isRequired={editable}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="name"
                                                        placeholder="고객명"
                                                        disabled={!editable}
                                                        {...name}
                                                    />
                                                </WithLabel>
                                            )}
                                            {isCorporation && (
                                                <WithLabel
                                                    id="cname"
                                                    label="회사명"
                                                    type={labelType}
                                                    isRequired={editable}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="cname"
                                                        placeholder="회사명"
                                                        disabled={!editable}
                                                        {...cname}
                                                    />
                                                </WithLabel>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="custtype"
                                                    label="고객구분"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="custtype"
                                                        placeholder="선택"
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...custtype}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            {isIndividual && (
                                                <WithLabel
                                                    id="idnum1"
                                                    label="주민번호"
                                                    type={labelType}
                                                    isRequired={editable}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="idnum1"
                                                        placeholder="주민번호"
                                                        disabled={!editable}
                                                        {...idnum}
                                                    />
                                                </WithLabel>
                                            )}
                                            {isCorporation && (
                                                <WithLabel
                                                    id="comRegNum"
                                                    label="사업자등록번호"
                                                    type={labelType}
                                                    isRequired={editable}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="comRegNum"
                                                        placeholder="사업자등록번호"
                                                        disabled={!editable}
                                                        onBlur={
                                                            handleBlurComRegNum
                                                        }
                                                        {...comRegNum}
                                                    />
                                                </WithLabel>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                {isIndividual && (
                                                    <DateAndSLInput
                                                        id="birthday"
                                                        label="생년월일"
                                                        disabled={!editable}
                                                        dateHooks={birthday}
                                                        type={bType}
                                                        setType={setBtype}
                                                        labelType={labelType}
                                                        size="md"
                                                    />
                                                )}
                                                {isCorporation && (
                                                    <WithLabel
                                                        id="iDate"
                                                        label="법인설립일"
                                                        type={labelType}
                                                    >
                                                        <MyDatepicker
                                                            id="iDate"
                                                            size="md"
                                                            placeholder="법인설립일"
                                                            disabled={!editable}
                                                            hooks={iDate}
                                                        />
                                                    </WithLabel>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {isIndividual && (
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    label="나이"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        placeholder="나이"
                                                        disabled={true}
                                                        value={age}
                                                    />
                                                    <div
                                                        className="wr-with__extension"
                                                        style={{ width: 140 }}
                                                    >
                                                        <MySelect
                                                            placeholder="선택"
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                            height={
                                                                variables.detailFilterHeight
                                                            }
                                                            placement="right"
                                                            {...ageType}
                                                        />
                                                    </div>
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        label="상령일"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            placeholder="상령일"
                                                            disabled={true}
                                                            value={sDay}
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            {isIndividual && (
                                                <WithSelectInput
                                                    id="mobile"
                                                    label="핸드폰"
                                                    selectWidth={140}
                                                    labelType={labelType}
                                                    inputHooks={mobile}
                                                    selectHooks={mobileCom}
                                                    disabled={!editable}
                                                />
                                            )}
                                            {isCorporation && (
                                                <WithLabel
                                                    id="phone"
                                                    label="대표전화"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="phone"
                                                        placeholder="대표전화"
                                                        disabled={!editable}
                                                        {...phone}
                                                    />
                                                </WithLabel>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                {isIndividual && (
                                                    <WithSelectInput
                                                        id="email"
                                                        label="이메일"
                                                        selectWidth={140}
                                                        labelType={labelType}
                                                        inputHooks={email}
                                                        selectHooks={emailCom}
                                                        disabled={!editable}
                                                    />
                                                )}
                                                {isCorporation && (
                                                    <WithLabel
                                                        id="homepage"
                                                        label="홈페이지"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="homepage"
                                                            placeholder="홈페이지"
                                                            disabled={!editable}
                                                            {...homepage}
                                                        />
                                                    </WithLabel>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {isIndividual && (
                                        <PostcodeInput
                                            isMt={true}
                                            disabled={!editable}
                                            labelType={labelType}
                                            size="md"
                                            postcodeHooks={postcode}
                                            address1Hooks={address1}
                                            address2Hooks={address2}
                                            address3Hooks={address3}
                                            onClickPostcode={onClickPostcode}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            <WithLabel
                                                id="inflowPath"
                                                label="유입경로"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="inflowPath"
                                                    placeholder="유입경로"
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...inflowPath}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="grade"
                                                    label="고객등급"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="grade"
                                                        placeholder="선택"
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...grade}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6 position-relative">
                                            <div className="wr-pages-detail__lock">
                                                <span>준비중입니다.</span>
                                            </div>
                                            <WithLabel
                                                id="pia"
                                                label="개인정보동의"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="pia"
                                                    placeholder="선택"
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...pia}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6 position-relative">
                                            <div className="wr-pages-detail__lock">
                                                <span>준비중입니다.</span>
                                            </div>
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="aDay"
                                                    label="동의일시"
                                                    type={labelType}
                                                >
                                                    <MyDatepicker
                                                        id="aDay"
                                                        size="md"
                                                        placeholder="동의일시"
                                                        format="yyyy-MM-dd HH:mm"
                                                        disabled={!editable}
                                                        hooks={aDay}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="createDay"
                                                label="고객생성일시"
                                                type={labelType}
                                            >
                                                <MyDatepicker
                                                    id="createDay"
                                                    size="md"
                                                    placeholder="고객생성일시"
                                                    format="yyyy-MM-dd HH:mm"
                                                    disabled={true}
                                                    hooks={createDay}
                                                />
                                            </WithLabel>
                                        </div>
                                        {isIndividual && (
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="job"
                                                        label="직업"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="job"
                                                            placeholder="직업"
                                                            disabled={!editable}
                                                            {...job}
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {isIndividual && (
                                <div className="wr-pages-detail__block">
                                    <div className="wr-pages-detail__title">
                                        <strong>직장</strong>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="company"
                                                    label="회사명"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="company"
                                                        placeholder="회사명"
                                                        disabled={!editable}
                                                        {...company}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="title"
                                                        label="부서/직함"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="title"
                                                            placeholder="부서/직함"
                                                            disabled={!editable}
                                                            {...title}
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="comPhone"
                                                    label="전화번호"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="cPhone"
                                                        placeholder="전화번호"
                                                        disabled={!editable}
                                                        {...comPhone}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="cFax"
                                                        label="팩스"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="cFax"
                                                            placeholder="팩스"
                                                            disabled={!editable}
                                                            {...cFax}
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                        <PostcodeInput
                                            isMt={true}
                                            idPrefix="c"
                                            disabled={!editable}
                                            labelType={labelType}
                                            size="md"
                                            postcodeHooks={cPostcode}
                                            address1Hooks={cAddress1}
                                            address2Hooks={cAddress2}
                                            address3Hooks={cAddress3}
                                            onClickPostcode={onClickCPostcode}
                                        />
                                    </div>
                                </div>
                            )}
                            {isCorporation && (
                                <div className="wr-pages-detail__block">
                                    <div className="wr-pages-detail__title">
                                        <strong>담당자</strong>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="mName"
                                                    label="담당자명"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="mName"
                                                        placeholder="담당자명"
                                                        disabled={!editable}
                                                        {...mName}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="mTitle"
                                                        label="부서/직함"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="mTitle"
                                                            placeholder="부서/직함"
                                                            disabled={!editable}
                                                            {...mTitle}
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="comPhone"
                                                    label="전화번호"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="cPhone"
                                                        placeholder="전화번호"
                                                        disabled={!editable}
                                                        {...mPhone}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithSelectInput
                                                        id="mEmail"
                                                        label="이메일"
                                                        selectWidth={140}
                                                        labelType={labelType}
                                                        inputHooks={mEmail}
                                                        selectHooks={mEmailCom}
                                                        disabled={!editable}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`${displayName}__right col`}>
                        <ul className="wr-tab__wrap" role="tablist">
                            {CUSTOMER_DETAIL_TABS.map((v) => (
                                <MyTab
                                    key={v.id}
                                    onClick={setTab}
                                    isActive={v.id === tab.id}
                                    {...v}
                                />
                            ))}
                            <li className="wr-tab__line"></li>
                        </ul>
                        <div
                            className={`${displayName}__body wr-frame__tabbody`}
                        >
                            <ContactTabpanel
                                id="tabpanelContactHis"
                                tabId="tabContactHis"
                                hidden={tab.id !== 'tabContactHis'}
                                editable={editable}
                                spe={spe}
                            />
                            <HoldingContractTabpanel
                                id="tabpanelHoldingContract"
                                tabId="tabHoldingContract"
                                hidden={tab.id !== 'tabHoldingContract'}
                                editable={editable}
                            />
                            <ExcontractTabpanel
                                id="tabpanelExcontract"
                                tabId="tabExcontract"
                                hidden={tab.id !== 'tabExcontract'}
                                editable={editable}
                            />
                            <CustcarTabpanel
                                id="tabpanelCustcar"
                                tabId="tabCustcar"
                                hidden={tab.id !== 'tabCustcar'}
                                editable={editable}
                            />
                            <FamilyTabpanel
                                id="tabpanelFamily"
                                tabId="tabFamily"
                                hidden={tab.id !== 'tabFamily'}
                                editable={editable}
                            />
                            <EventTabpanel
                                id="tabpanelEvent"
                                tabId="tabEvent"
                                hidden={tab.id !== 'tabEvent'}
                                editable={editable}
                            />
                        </div>
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-footer__between">
                        <div>
                            <MyButton className="btn-warning btn-sm">
                                다른 담당자 내용
                            </MyButton>
                        </div>
                        <div className="wr-pages-detail__buttons">
                            {editable && (
                                <MyButton
                                    className="btn-secondary btn-sm"
                                    onClick={handleClickCancel}
                                >
                                    취소
                                </MyButton>
                            )}
                            {mode === 'create' && (
                                <MyButton
                                    type="button"
                                    className="btn-primary btn-sm"
                                    onClick={handleCreate}
                                >
                                    등록
                                </MyButton>
                            )}
                            {mode === 'update' && (
                                <MyButton
                                    type="button"
                                    className="btn-primary btn-sm"
                                    onClick={
                                        editable
                                            ? handleUpdate
                                            : handleClickModify
                                    }
                                >
                                    {editable ? '변경 사항 적용' : '수정'}
                                </MyButton>
                            )}
                        </div>
                    </div>
                </MyFooter>
            </MyLayout>
            <UserHistoryModal type="customer" />
            <CreateExcontractLongModal />
            <CreateExcontractCarModal />
            <CreateExcontractGenModal />
            <CreateCustcarCarModal />
            <CreateCustcarCustModal />
            <CreateFamilyModal />
            <CreateEventModal />
        </>
    );
};
