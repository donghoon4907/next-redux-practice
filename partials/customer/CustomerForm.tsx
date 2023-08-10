import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CustomerState } from '@reducers/customer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {
    CreateCustomerRequestPayload,
    createCustomerRequest,
} from '@actions/customer/create-customer.action';
import { useApi } from '@hooks/use-api';
import {
    useInput,
    useNumbericInput,
    usePhoneInput,
    useResidentNumberInput,
} from '@hooks/use-input';
import { CreateCustomerDTO } from '@dto/customer/Customer.dto';
import {
    birthdayToAge,
    residentNumToAge,
    residentNumToBirthday,
} from '@utils/calculator';

interface Props {
    /**
     * 모드: true(수정) / false(등록)
     */
    mode: 'create' | 'update';
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
    // defaultAge?: string;
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
    // defaultSday?: string;
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
    defaultName = '',
    defaultCusttype = customerConstants.division[0],
    defaultIdnum = '',
    defaultComRegNum = '',
    // defaultAge = '',
    // defaultAgeType = customerConstants.age[0],
    defaultBirthday = null,
    defaultBtype = true,
    defaultIdate = null,
    // defaultSday = null,
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

    const dispatch = useDispatch();

    const { loggedInUser, selectedUser } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { contacts, excontracts, custcars, family, events, userid_his } =
        useSelector<AppState, CustomerState>((state) => state.customer);

    const createCustomer = useApi(createCustomerRequest);
    // 탭 관리
    const [tab, setTab] = useTab(CUSTOMER_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    const labelType = editable ? 'active' : 'disable';
    // 고객명
    const [name] = useInput(defaultName, { noSpace: true });
    // 고객구분
    const [custtype] = useSelect(customerConstants.division, defaultCusttype);
    // 개인 여부
    const isIndividual = custtype.value?.value === '0';
    // 법인 여부
    const isCorporation = custtype.value?.value === '1';
    // 나이
    const [age, setAge] = useState('');
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
    const [sDay, setSday] = useState('');
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
    const [mPhone] = useInput(defaultMphone);
    // 담당자 이메일
    const [mEmail] = useInput(defaultMemail, { noSpace: true });
    const [mEmailCom] = useSelect(userConstants.emailCom, defaultMemailCom);

    // 취소 버튼 클릭 핸들러
    const handleClickCancel = () => {
        const tf = confirm('수정을 취소하시겠습니까?');

        if (tf) {
            setEditable(false);
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

        // const updateUserDto = new UpdateUserDTO(payload);

        // if (updateUserDto.requiredValidate()) {
        //     updateUser(updateUserDto.getPayload(), ({ Message }) => {
        //         if (Message === 'Success') {
        //             // 프로필 사진을 설정한 경우
        //             if (lastSetPortraitImageFile) {
        //                 const formData = new FormData();

        //                 formData.append('file', lastSetPortraitImageFile);

        //                 upload(
        //                     {
        //                         userid,
        //                         formData,
        //                     },
        //                     () => {
        //                         alert('수정되었습니다.');
        //                     },
        //                 );
        //             } else {
        //                 alert('수정되었습니다.');
        //             }
        //         }
        //     });
        // }
    };

    const createPayload = () => {
        const payload: CreateCustomerRequestPayload = {
            name: name.value,
            custtype: +custtype.value!.value,
            userid: selectedUser ? selectedUser.userid : loggedInUser.userid,
        };

        if (selectedUser) {
            payload['userid_his'] = [...userid_his, selectedUser];
        } else {
            if (userid_his.length > 0) {
                payload['userid_his'] = userid_his;
            }
        }

        if (contacts.length > 0) {
            payload['contacts'] = contacts;
        }

        if (excontracts.length > 0) {
            payload['excontracts'] = excontracts;
        }

        if (custcars.length > 0) {
            payload['custcars'] = custcars;
        }

        if (family.length > 0) {
            payload['family'] = family;
        }

        if (events.length > 0) {
            payload['events'] = events;
        }

        if (inflowPath.value) {
            payload['sourceroot'] = inflowPath.value.value;
        }

        if (grade.value) {
            payload['customer_rate'] = grade.value.value;
        }

        if (pia.value) {
            payload['privacyinfo'] = {
                type: pia.value.value,
            };

            if (aDay.value) {
                payload.privacyinfo['insert_datetime'] = dayjs(
                    aDay.value,
                ).format('YYYY-MM-DD HH:mm');
            }
        }

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
                payload['mobile'] = mobile.value;
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
                tel: comPhone.value,
                fax: cFax.value,
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
                payload['mobile'] = phone.value;
            }

            if (!isEmpty(homepage.value)) {
                payload['emailhome'] = homepage.value;
            }

            payload['manager'] = {
                name: mName.value,
                orgatitle: mTitle.value,
                tel: mPhone.value,
                email: `${mEmail.value}@${mEmailCom.value!.value}`,
            };
        }

        return payload;
    };

    return (
        <>
            <MyLayout>
                <div className={`${displayName} row`}>
                    <div className="col-5">
                        <div
                            className={`${displayName}__left wr-frame__section`}
                        >
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <CustomerManagerAccordion
                                        defaultTitle={`${loggedInUser.user_info.fulls} ${loggedInUser.user_info.name}`}
                                        data={[]}
                                    />
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
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
                                                    // isRequired={editable}
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
                                                    <div style={{ width: 300 }}>
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
                                                <WithLabel
                                                    id="mobile"
                                                    label="핸드폰"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="mobile"
                                                        placeholder="핸드폰"
                                                        disabled={!editable}
                                                        {...mobile}
                                                    />
                                                    <div style={{ width: 300 }}>
                                                        <MySelect
                                                            placeholder={'선택'}
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                            height={
                                                                variables.detailFilterHeight
                                                            }
                                                            placement="right"
                                                            isDisabled={
                                                                !editable
                                                            }
                                                            {...mobileCom}
                                                        />
                                                    </div>
                                                </WithLabel>
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
                                                    <WithLabel
                                                        id="email"
                                                        label="이메일"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="email"
                                                            placeholder="이메일"
                                                            disabled={!editable}
                                                            {...email}
                                                        />
                                                        <div
                                                            style={{
                                                                width: 350,
                                                            }}
                                                        >
                                                            <MySelect
                                                                placeholder={
                                                                    '선택'
                                                                }
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                placement="right"
                                                                {...emailCom}
                                                            />
                                                        </div>
                                                    </WithLabel>
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
                                        <div className="col-6">
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
                                        <div className="col-6">
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
                                                        // {...company}
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
                                                            // {...title}
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
                                                        // {...comPhone}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="mEmail"
                                                        label="이메일"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="mEmail"
                                                            placeholder="이메일"
                                                            disabled={!editable}
                                                            // {...email}
                                                        />
                                                        <div
                                                            style={{
                                                                width: 350,
                                                            }}
                                                        >
                                                            <MySelect
                                                                placeholder={
                                                                    '선택'
                                                                }
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                placement="right"
                                                                // {...emailCom}
                                                            />
                                                        </div>
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-7">
                        <div className={`${displayName}__right`}>
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
