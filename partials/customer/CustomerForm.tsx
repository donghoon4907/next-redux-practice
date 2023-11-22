import type { FC } from 'react';
import type { Spe } from '@models/spe';
import type { CoreSelectOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { CustomerState } from '@reducers/customer';
import type { CommonState } from '@reducers/common';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { addMonths } from 'date-fns';
import { CUSTOMER_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { MyFooter } from '@components/footer';
import { useSelect } from '@hooks/use-select';
import { MyButton } from '@components/button';
import { useTab } from '@hooks/use-tab';
import { usePostcode } from '@hooks/use-postcode';
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
import { CreateFamilyModal } from '@components/modal/CreateFamily';
import { CreateEventModal } from '@components/modal/CreateEvent';
import { createCustomerRequest } from '@actions/customer/create-customer.action';
import { useApi } from '@hooks/use-api';
import {
    CreateCustomerDTO,
    UpdateCustomerDTO,
} from '@dto/customer/Customer.dto';
import { UserHistoryModal } from '@components/modal/UserHistory';
import { getCompanyRegNumRequest } from '@actions/hr/get-company-regnum.action';
import {
    useInput,
    useNumbericInput,
    usePhoneInput,
    useResidentNumberInput,
} from '@hooks/use-input';
import {
    birthdayToAge,
    birthdayToInternationalAge,
    residentNumToBirthday,
} from '@utils/calculator';
import { updateCustomerRequest } from '@actions/customer/update-customer.action';
import { FloatSelect } from '@components/select/Float';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { MyUnit } from '@components/Unit';
import { SetPostcodeInput } from '@partials/common/input/SetPostcode';

// import { SingleContactTabpanel } from './tabpanels/SingleContact';

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
     * 담당자 조직
     */
    defaultOrganize?: string;
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
    defaultOrganize = '',
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
                        setAgeAsOption(birthday.value, option!.value);
                    }
                }
            } else {
                const pureIdnum = idnum.value.replace(/-/g, '');

                if (pureIdnum.length === 13) {
                    // 생년월일
                    const birthday = new Date(residentNumToBirthday(pureIdnum));

                    setBirthday(birthday);

                    setAgeAsOption(birthday, option!.value);
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
                        setAgeAsOption(
                            new Date(nextdate),
                            ageType.value!.value,
                        );
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
                    const birthday = new Date(residentNumToBirthday(nextval!));

                    setBirthday(birthday);

                    setAgeAsOption(birthday, ageType.value!.value);
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

    // 음/양력 클릭 핸들러
    const handleClickBirthType = () => {
        setBtype(!bType);
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

    const setAgeAsOption = (birthday: Date, option: string) => {
        // 상령일
        const sday = addMonths(birthday, 6);

        setSday(dayjs(sday).format('YYYY-MM-DD'));

        if (option === '만나이') {
            setAge(birthdayToInternationalAge(birthday).toString());
        } else if (option === '보험나이') {
            setAge(birthdayToAge(sday).toString());
        } else if (option === '일반나이') {
            setAge(birthdayToAge(birthday).toString());
        }
    };

    return (
        <>
            <div className={`${displayName} wr-pages-detail wr-frame__tabbody`}>
                <div
                    className={`${displayName}__left wr-pages-detail__left wr-pages-detail__applydatepicker`}
                >
                    <div className="wr-pages-detail__inner">
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content p-15">
                                <CustomerManagerAccordion
                                    defaultTitle={defaultOrganize}
                                    editable={editable}
                                />
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        {isIndividual && (
                                            <FloatInput
                                                label="고객명"
                                                readOnly={!editable}
                                                isRequired
                                                {...name}
                                            />
                                        )}
                                        {isCorporation && (
                                            <FloatInput
                                                label="회사명"
                                                readOnly={!editable}
                                                isRequired
                                                {...cname}
                                            />
                                        )}
                                    </div>
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="고객구분"
                                            isDisabled={!editable}
                                            isRequired
                                            {...custtype}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        {isIndividual && (
                                            <FloatInput
                                                label="주민번호"
                                                readOnly={!editable}
                                                {...idnum}
                                            />
                                        )}
                                        {isCorporation && (
                                            <FloatInput
                                                label="사업자등록번호"
                                                readOnly={!editable}
                                                {...comRegNum}
                                            />
                                        )}
                                    </div>
                                    <div className="flex-fill">
                                        {isIndividual && (
                                            <FloatDatepicker
                                                label="생년월일"
                                                readOnly={!editable}
                                                isRequired
                                                hooks={birthday}
                                                after={
                                                    <MyUnit
                                                        placement="button"
                                                        role="button"
                                                        onClick={
                                                            handleClickBirthType
                                                        }
                                                    >
                                                        {bType
                                                            ? '양력'
                                                            : '음력'}
                                                    </MyUnit>
                                                }
                                            />
                                        )}
                                        {isCorporation && (
                                            <FloatDatepicker
                                                label="법인설립일"
                                                readOnly={!editable}
                                                hooks={iDate}
                                            />
                                        )}
                                    </div>
                                </div>
                                {isIndividual && (
                                    <div className="row wr-mt">
                                        <div className="flex-fill d-flex">
                                            <div className="flex-fill">
                                                <FloatInput
                                                    label="나이"
                                                    readOnly
                                                    isConnectAfter
                                                    value={age}
                                                />
                                            </div>
                                            <div style={{ width: 130 }}>
                                                <FloatSelect
                                                    label=""
                                                    isDisabled={!editable}
                                                    isConnectBefore
                                                    {...ageType}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-fill">
                                            <FloatInput
                                                label="상령일"
                                                readOnly
                                                value={sDay}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill d-flex">
                                        {isIndividual && (
                                            <>
                                                <div className="flex-fill">
                                                    <FloatInput
                                                        label="핸드폰"
                                                        readOnly={!editable}
                                                        isConnectAfter
                                                        {...mobile}
                                                    />
                                                </div>
                                                <div style={{ width: 130 }}>
                                                    <FloatSelect
                                                        label=""
                                                        isDisabled={!editable}
                                                        isConnectBefore
                                                        {...mobileCom}
                                                    />
                                                </div>
                                            </>
                                        )}
                                        {isCorporation && (
                                            <div className="flex-fill">
                                                <FloatInput
                                                    label="대표전화"
                                                    readOnly={!editable}
                                                    {...phone}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-fill d-flex">
                                        {isIndividual && (
                                            <>
                                                <div className="flex-fill">
                                                    <FloatInput
                                                        label="이메일"
                                                        readOnly={!editable}
                                                        isConnectAfter
                                                        {...email}
                                                    />
                                                </div>
                                                <div style={{ width: 130 }}>
                                                    <FloatSelect
                                                        label=""
                                                        isDisabled={!editable}
                                                        isConnectBefore
                                                        {...emailCom}
                                                    />
                                                </div>
                                            </>
                                        )}
                                        {isCorporation && (
                                            <FloatInput
                                                label="홈페이지"
                                                readOnly={!editable}
                                                {...homepage}
                                            />
                                        )}
                                    </div>
                                </div>
                                {isIndividual && (
                                    <SetPostcodeInput
                                        activeMarginTop
                                        disabled={!editable}
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
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="유입경로"
                                            isDisabled={!editable}
                                            {...inflowPath}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="고객등급"
                                            isDisabled={!editable}
                                            {...grade}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            label="고객생성일시"
                                            readOnly
                                            format="yyyy-MM-dd HH:mm"
                                            hooks={createDay}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        {isIndividual && (
                                            <FloatInput
                                                label="직업"
                                                readOnly={!editable}
                                                {...job}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isIndividual && (
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="flex-fill">
                                            <FloatInput
                                                label="회사명"
                                                readOnly={!editable}
                                                {...company}
                                            />
                                        </div>
                                        <div className="flex-fill">
                                            <FloatInput
                                                label="부서/직함"
                                                readOnly={!editable}
                                                {...title}
                                            />
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="flex-fill">
                                            <FloatInput
                                                label="전화번호"
                                                readOnly={!editable}
                                                {...comPhone}
                                            />
                                        </div>
                                        <div className="flex-fill">
                                            <FloatInput
                                                label="팩스"
                                                readOnly={!editable}
                                                {...cFax}
                                            />
                                        </div>
                                    </div>
                                    <SetPostcodeInput
                                        activeMarginTop
                                        disabled={!editable}
                                        postcodeHooks={cPostcode}
                                        address1Hooks={cAddress1}
                                        address2Hooks={cAddress2}
                                        address3Hooks={cAddress3}
                                        onClickPostcode={onClickPostcode}
                                    />
                                </div>
                            </div>
                        )}
                        {isCorporation && (
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="flex-fill">
                                            <FloatInput
                                                label="담당자명"
                                                readOnly={!editable}
                                                {...mName}
                                            />
                                        </div>
                                        <div className="flex-fill">
                                            <FloatInput
                                                label="부서/직함"
                                                readOnly={!editable}
                                                {...mTitle}
                                            />
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="flex-fill">
                                            <FloatInput
                                                label="전화번호"
                                                readOnly={!editable}
                                                {...mPhone}
                                            />
                                        </div>
                                        <div className="flex-fill d-flex">
                                            <div className="flex-fill">
                                                <FloatInput
                                                    label="이메일"
                                                    readOnly={!editable}
                                                    isConnectAfter
                                                    {...mEmail}
                                                />
                                            </div>
                                            <div style={{ width: 130 }}>
                                                <FloatSelect
                                                    label=""
                                                    isDisabled={!editable}
                                                    isConnectBefore
                                                    {...mEmailCom}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="wr-pages-detail__right">
                    <ul className="wr-tab__wrap" role="tablist">
                        {CUSTOMER_DETAIL_TABS.map((v) => (
                            <MyTab
                                key={v.id}
                                onClick={setTab}
                                isActive={v.id === tab.id}
                                hidden={v.isHideMode === mode}
                                {...v}
                            />
                        ))}
                        <li className="wr-tab__line"></li>
                    </ul>
                    <div className="wr-pages-detail__body">
                        {/* {tab.id === 'tabContact' && (
                            <SingleContactTabpanel
                                id="tabpanelContact"
                                tabId="tabContact"
                                hidden={false}
                                spe_idx={idx}
                                spe="long"
                                cnum={cnum.value}
                            />
                        )} */}
                        {/* <HoldingContractTabpanel
                            id="tabpanelHoldingContract"
                            tabId="tabHoldingContract"
                            hidden={tab.id !== 'tabHoldingContract'}
                            editable={editable}
                        /> */}
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
                        {/* <MyButton className="btn-warning btn-sm">
                            다른 담당자 내용
                        </MyButton> */}
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
                                    editable ? handleUpdate : handleClickModify
                                }
                            >
                                {editable ? '변경 사항 적용' : '수정'}
                            </MyButton>
                        )}
                    </div>
                </div>
            </MyFooter>
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
