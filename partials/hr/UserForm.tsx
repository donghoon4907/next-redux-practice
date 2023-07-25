import type { FC, ChangeEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { UploadState } from '@reducers/upload';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { DatePicker } from 'rsuite';
import dayjs from 'dayjs';
import { MySelect } from '@components/select';
import { HR_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { MyLayout } from '@components/Layout';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useApi } from '@hooks/use-api';
import { showDepartSearchModal } from '@actions/modal/depart-search.action';
import { MyFooter } from '@components/footer';
import { MyButton } from '@components/button';
import { SelectDepartModal } from '@components/modal/SelectDepart';
import { ImageUploadModal } from '@components/modal/ImageUpload';
import { useSelect } from '@hooks/use-select';
import { showImageUploadModal } from '@actions/modal/image-upload.action';
import { IncomeTabpanel } from '@partials/hr/tabpanels/Income';
import { GuaranteeTabpanel } from '@partials/hr/tabpanels/Guarantee';
import { GuaranteeSettingModal } from '@components/modal/GuaranteeSetting';
import { AuthorityTabpanel } from '@partials/hr/tabpanels/Authority';
import { QualManageTabpanel } from '@partials/hr/tabpanels/QualManage';
import { useTab } from '@hooks/use-tab';
import {
    CreateUserRequestPayload,
    createUserRequest,
} from '@actions/hr/create.action';
import {
    BIRTH_TYPE,
    EMAIL_COM,
    EMP_STATUS,
    MOBILE_COM,
    USER_TYPE,
} from '@constants/selectOption';
import {
    CALC_STANDARD,
    ESTIMATE_ADDRESS,
    ESTIMATE_COMP,
    ESTIMATE_DIRECT,
    ESTIMATE_FAX,
    ESTIMATE_PHONE,
    ESTIMATE_SALES,
} from '@constants/options/user';
import { useDatepicker } from '@hooks/use-datepicker';
import { CoreSelectOption } from '@interfaces/core';
import { isEmpty } from '@utils/validator/common';
import coreConstants from '@constants/core';
import { CreateUserDTO } from 'dto/hr/CreateUser.dto';

type Mode = 'create' | 'update';
interface Props {
    /**
     * 모드: true(수정) / false(등록)
     */
    mode: Mode;
    /**
     * 사원번호
     */
    id?: string;
    /**
     * 별칭 기본 값
     */
    defaultNick?: string;
    /**
     * 이름 기본 값
     */
    defaultName?: string;
    /**
     * 직함 기본 값
     */
    defaultTitle?: string;
    /**
     * 주민번호 기본 값
     */
    defaultIdNum1?: string;
    /**
     * 생년월일 기본 값
     */
    defaultBirthday?: Date;
    /**
     * 생일 타입 기본 값
     */
    defaultBirthType?: CoreSelectOption;
    /**
     * 핸드폰 기본 값
     */
    defaultPhone?: string;
    /**
     * 핸드폰 회사 기본 값
     */
    defaultMobileCom?: CoreSelectOption;
    /**
     * 내선번호 기본 값
     */
    defaultTelephone?: string;
    /**
     * 직통번호 기본 값
     */
    defaultTelDirect?: string;
    /**
     * 이메일 기본 값
     */
    defaultEmail?: string;
    /**
     * 이메일 회사 기본 값
     */
    defaultEmailCom?: CoreSelectOption;
    /**
     * 우편번호 기본 값
     */
    defaultPostCode?: string;
    /**
     * 주소1 기본 값
     */
    defaultAddress1?: string;
    /**
     * 주소2 기본 값
     */
    defaultAddress2?: string;
    /**
     * 상세주소 기본 값
     */
    defaultAddress3?: string;
    /**
     * 영업 구분 기본 값
     */
    defaultUserType?: CoreSelectOption;
    /**
     * 재직 현황 기본 값
     */
    defaultStatus?: CoreSelectOption;
    /**
     * 입사일 기본 값
     */
    defaultIndate?: Date;
    /**
     * 퇴사일 기본 값
     */
    defaultOutdate?: Date;
    /**
     * 비교견적 설정 - 회사명 기본 값
     */
    defaultEstComNm?: string;
    /**
     * 비교견적 설정 - 회사명 타입 기본 값
     */
    defaultEstComInputType?: CoreSelectOption;
    /**
     * 비교견적 설정 - 영업명 기본 값
     */
    defaultEstSalesNm?: string;
    /**
     * 비교견적 설정 - 영업명 타입 기본 값
     */
    defaultEstSalesNmInputType?: CoreSelectOption;
    /**
     * 비교견적 설정 - 대표전화 기본 값
     */
    defaultEstPhone?: string;
    /**
     * 비교견적 설정 - 대표전화 타입 기본 값
     */
    defaultEstPhoneInputType?: CoreSelectOption;
    /**
     * 비교견적 설정 - 팩스번호 기본 값
     */
    defaultEstFax?: string;
    /**
     * 비교견적 설정 - 팩스번호 타입 기본 값
     */
    defaultEstFaxInputType?: CoreSelectOption;
    /**
     * 비교견적 설정 - 직통전화 기본 값
     */
    defaultEstDirect?: string;
    /**
     * 비교견적 설정 - 직통전화 타입 기본 값
     */
    defaultEstDirectInputType?: CoreSelectOption;
    /**
     * 비교견적 설정 - 표기주소 기본 값
     */
    defaultEstAddr?: string;
    /**
     * 비교견적 설정 - 표기주소 타입 기본 값
     */
    defaultEstAddrInputType?: CoreSelectOption;
    /**
     * 소득 설정 - 은행명 기본 값
     */
    defaultBank?: CoreSelectOption;
    /**
     * 소득 설정 - 계좌번호 기본 값
     */
    defaultAccount?: string;
    /**
     * 소득 설정 - 예금주 기본 값
     */
    defaultHolder?: string;
    /**
     * 소득 설정 - 자동차 규정 라디오(테이블, 비례) 기본 값
     */
    defaultCarType?: string;
    /**
     * 소득 설정 - 자동차 규정 셀렉트 기본 값(현재 미구현)
     */
    defaultCarIdx?: CoreSelectOption;
    /**
     * 소득 설정 - 일반 규정 체크(지급율, 비례) 기본 값
     */
    defaultGenType?: string;
    /**
     * 소득 설정 - 산출 기준 기본 값
     */
    defaultGenBase?: CoreSelectOption;
    /**
     * 소득 설정 - 지급율 기본 값
     */
    defaultGenRate?: string;
    /**
     * 소득 설정 - 일반규정 기본 값(현재 미구현)
     */
    defaultGenIdx?: CoreSelectOption;
    /**
     * 소득 설정 - 일반규정 기본 값(현재 미구현)
     */
    defaultLongGrade?: boolean;
}

export const UserForm: FC<Props> = ({
    mode,
    id = '',
    defaultNick = '',
    defaultName = '',
    defaultTitle = '',
    defaultIdNum1 = '',
    defaultBirthday = new Date(),
    defaultBirthType = BIRTH_TYPE[0],
    defaultPhone = '',
    defaultMobileCom = MOBILE_COM[0],
    defaultTelephone = '',
    defaultTelDirect = '',
    defaultEmail = '',
    defaultEmailCom = EMAIL_COM[0],
    defaultPostCode = '',
    defaultAddress1 = '',
    defaultAddress2 = '',
    defaultAddress3 = '',
    defaultUserType = USER_TYPE[0],
    defaultStatus = EMP_STATUS[0],
    defaultIndate = new Date(),
    defaultOutdate = new Date(),
    defaultEstComNm = coreConstants.COMP_NAME,
    defaultEstComInputType = ESTIMATE_COMP[0],
    defaultEstSalesNm = '',
    defaultEstSalesNmInputType = ESTIMATE_SALES[0],
    defaultEstPhone = coreConstants.COMP_PHONE,
    defaultEstPhoneInputType = ESTIMATE_PHONE[0],
    defaultEstFax = '',
    defaultEstFaxInputType = ESTIMATE_FAX[0],
    defaultEstDirect = coreConstants.COMP_PHONE,
    defaultEstDirectInputType = ESTIMATE_DIRECT[0],
    defaultEstAddr = coreConstants.COMP_ADDR,
    defaultEstAddrInputType = ESTIMATE_ADDRESS[0],
    defaultBank = null,
    defaultAccount = '',
    defaultHolder = '',
    defaultCarType = '',
    // defaultCarIdx
    defaultGenType = '',
    defaultGenBase = CALC_STANDARD[0],
    defaultGenRate = '',
    // defaultGenIdx
    defaultLongGrade = false,
}) => {
    const displayName = 'wr-pages-hr-detail';

    const dispatch = useDispatch();

    const { selectedOrga, banks } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { lastUploadedPortraitImage } = useSelector<AppState, UploadState>(
        (state) => state.upload,
    );
    // 우편번호 팝업
    const open = useDaumPostcodePopup();

    const createUser = useApi(createUserRequest);

    // const updateUser = useApi(updateUserRequest);
    // 탭 관리
    const [tab, setTab] = useTab(HR_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(false);
    const isEditable = mode === 'create' ? true : editable;
    const labelType = isEditable ? 'active' : 'disable';
    // 별칭
    const [nick] = useInput(defaultNick, { noSpace: true });
    // 이름
    const [name] = useInput(defaultName, { noSpace: true });
    // 직함
    const [title] = useInput(defaultTitle, { noSpace: true });
    // 주민번호
    const [idnum1] = useNumbericInput(defaultIdNum1);
    // 생년월일
    const [birthday] = useDatepicker(defaultBirthday);
    // 양력 or 음력
    const [birthType] = useSelect(BIRTH_TYPE, defaultBirthType);
    // 핸드폰
    const [mobile] = useInput(defaultPhone, { isNumWithHyphen: true });
    // 통신사
    const [mobileCom] = useSelect(MOBILE_COM, defaultMobileCom);
    // 내선번호
    const [telephone] = useInput(defaultTelephone, { isNumWithHyphen: true });
    // 직통번호
    const [telDirect] = useInput(defaultTelDirect, { isNumWithHyphen: true });
    // 이메일
    const [email] = useInput(defaultEmail, { noSpace: true });
    const [emailCom] = useSelect(EMAIL_COM, defaultEmailCom);
    // 우편번호
    const [postcode, setPostcode] = useInput(defaultPostCode);
    // 주소 검색 1
    const [address1, setAddress1] = useInput(defaultAddress1);
    // 주소 검색 상세
    const [address2, setAddress2] = useInput(defaultAddress2);
    // 상세 주소
    const [address3] = useInput(defaultAddress3);
    // 영업구분
    const [userType] = useSelect(USER_TYPE, defaultUserType);
    // 재직현황
    const [status] = useSelect(EMP_STATUS, defaultStatus);
    // 입사일
    const [indate] = useDatepicker(defaultIndate);
    // 퇴사일
    const [outdate] = useDatepicker(defaultOutdate);
    // 비교견적 설정 - 회사명
    const [estComNm, setEstComNm] = useInput(defaultEstComNm);
    const [estComInputType, setEstComInputType] =
        useState<CoreSelectOption | null>(defaultEstComInputType);
    // 비교견적 설정 - 간접영업명
    const [estSalesNm, setEstSalesNm] = useInput(defaultEstSalesNm);
    const [estSalesNmInputType, setEstSalesNmInputType] =
        useState<CoreSelectOption | null>(defaultEstSalesNmInputType);
    // 비교견적 설정 - 대표전화
    const [estPhone, setEstPhone] = useInput(defaultEstPhone, {
        isNumWithHyphen: true,
    });
    const [estPhoneInputType, setEstPhoneInputType] =
        useState<CoreSelectOption | null>(defaultEstPhoneInputType);
    // 비교견적 설정 - 팩스번호
    const [estFax, setEstFax] = useInput(defaultEstFax, {
        isNumWithHyphen: true,
    });
    const [estFaxInputType, setEstFaxInputType] =
        useState<CoreSelectOption | null>(defaultEstFaxInputType);
    // 비교견적 설정 - 직통전화
    const [estDirect, setEstDirect] = useInput(defaultEstDirect, {
        isNumWithHyphen: true,
    });
    const [estDirectInputType, setEstDirectInputType] =
        useState<CoreSelectOption | null>(defaultEstDirectInputType);
    // 비교견적 설정 - 표기주소
    const [estAddr, setEstAddr] = useInput(defaultEstAddr);
    const [estAddrInputType, setEstAddrInputType] =
        useState<CoreSelectOption | null>(defaultEstAddrInputType);
    // 소득 설정 - 은행명
    const [bank] = useSelect(banks, defaultBank);
    // 소득 설정 - 계좌번호
    const [account] = useInput(defaultAccount, { isNumWithHyphen: true });
    // 소득 설정 - 예금주
    const [holder] = useInput(defaultHolder, { noSpace: true });
    // 소득 설정 - 자동차 규정 라디오(테이블, 비례)
    const [carType, setCarType] = useState(defaultCarType);
    // 소득 설정 - 일반 규정 라디오(테이블, 비례)
    const [genType, setGenType] = useState(defaultGenType);
    // 소득 설정 - 산출기준(테이블, 비례)
    const [genBase] = useSelect(CALC_STANDARD, defaultGenBase);
    // 소득 설정 - 지급율 기본 값
    const [genRate] = useNumbericInput(defaultGenRate);
    // 소득 설정 - 구간적용
    const [longGrade, setLongGrade] = useState(defaultLongGrade);
    // 소득 설정 - 자동차 규정 라디오 변경 핸들러
    const handleChangeCarType = (evt: ChangeEvent<HTMLInputElement>) => {
        setCarType(evt.target.value);
    };
    // 소득 설정 - 일반 규정 라디오 변경 핸들러
    const handleChangeGenType = (evt: ChangeEvent<HTMLInputElement>) => {
        setCarType(evt.target.value);
    };
    // 소득 설정 - 구간적용 체크 변경 핸들러
    const handleChangeLongGrade = (evt: ChangeEvent<HTMLInputElement>) => {
        setLongGrade(evt.target.checked);
    };
    // 이름 입력창 blur 핸들러
    const handleBlurName = () => {
        if (estSalesNmInputType?.value === '01') {
            setEstSalesNm(name.value);
        }
    };
    // 핸드폰 입력창 blur 핸들러
    const handleBlurMobile = () => {
        if (estPhoneInputType?.value === '03') {
            setEstPhone(mobile.value);
        }
        if (estDirectInputType?.value === '02') {
            setEstDirect(mobile.value);
        }
    };
    // 내선번호 입력창 blur 핸들러
    const handleBlurTelephone = () => {
        if (estPhoneInputType?.value === '04') {
            setEstPhone(telephone.value);
        }
        if (estDirectInputType?.value === '03') {
            setEstDirect(telephone.value);
        }
    };

    // 비교견적 설정 - 회사명 타입 변경 핸들러
    const handleChangeEstComInputType = (option: CoreSelectOption | null) => {
        if (option !== null) {
            if (option.value === '01') {
                setEstComNm(coreConstants.COMP_NAME);
            } else if (option.value === '02') {
                // 지점명 예정
            }
        }

        setEstComInputType(option);
    };
    // 비교견적 설정 - 간접영업명 변경 핸들러
    const handleChangeEstSalesNmInputType = (
        option: CoreSelectOption | null,
    ) => {
        if (option !== null) {
            if (option.value === '01') {
                setEstSalesNm(name.value);
            } else if (option.value === '02') {
                // 지점명 예정
            } else if (option.value === '03') {
                setEstSalesNm('');
            }
        }

        setEstSalesNmInputType(option);
    };
    // 비교견적 설정 - 대표전화 변경 핸들러
    const handleChangeEstPhoneInputType = (option: CoreSelectOption | null) => {
        if (option !== null) {
            if (option.value === '01') {
                setEstPhone(coreConstants.COMP_PHONE);
            } else if (option.value === '02') {
                // 지점명 예정
            } else if (option.value === '03') {
                setEstPhone(mobile.value);
            } else if (option.value === '04') {
                setEstPhone(telephone.value);
            }
        }

        setEstPhoneInputType(option);
    };
    // 비교견적 설정 - 팩스번호 변경 핸들러
    const handleChangeEstFaxInputType = (option: CoreSelectOption | null) => {
        if (option !== null) {
            if (option.value === '01') {
                // 지점명 예정
            }
        }

        setEstFaxInputType(option);
    };
    // 비교견적 설정 - 직통전화 변경 핸들러
    const handleChangeEstDirectInputType = (
        option: CoreSelectOption | null,
    ) => {
        if (option !== null) {
            if (option.value === '01') {
                setEstDirect(coreConstants.COMP_PHONE);
            } else if (option.value === '02') {
                setEstDirect(mobile.value);
            } else if (option.value === '03') {
                setEstDirect(telephone.value);
            }
        }

        setEstDirectInputType(option);
    };
    // 비교견적 설정 - 표기주소 변경 핸들러
    const handleChangeEstAddrInputType = (option: CoreSelectOption | null) => {
        if (option !== null) {
            if (option.value === '01') {
                setEstAddr(coreConstants.COMP_ADDR);
            } else if (option.value === '02') {
                // 지점명 예정
            }
        }

        setEstAddrInputType(option);
    };

    // 우편번호 클릭 핸들러
    const handleClickPostcode = () => {
        open({ onComplete: handleCompletePostcode });
    };
    // 우편번호 선택 완료 핸들러
    const handleCompletePostcode = (data: any) => {
        // let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }

            if (data.buildingName !== '') {
                extraAddress +=
                    extraAddress !== ''
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }

            // fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setPostcode(data.zonecode);

        setAddress1(data.jibunAddress);

        setAddress2(`(${extraAddress})`);
    };
    // 부서변경 클릭 핸들러
    const handleClickDepart = () => {
        dispatch(showDepartSearchModal());
    };
    // 프로필 사진 클릭 핸들러
    const handleClickImage = () => {
        dispatch(showImageUploadModal());
    };
    // 수정 버튼 클릭 핸들러
    const handleClickModify = () => {
        setEditable(true);
    };
    // 취소 버튼 클릭 핸들러
    const handleClickCancel = () => {
        const tf = confirm('수정을 취소하시겠습니까?');

        if (tf) {
            setEditable(false);
        }
    };

    const handleCreate = () => {
        const payload = createPayload();

        const createUserDto = new CreateUserDTO(payload);

        if (createUserDto.requiredValidate()) {
            createUser(createUserDto, () => {
                alert('등록 성공');
            });
        }
    };

    const handleUpdate = () => {};

    const createPayload = () => {
        const payload: CreateUserRequestPayload = {
            name: name.value,
            mobile: mobile.value,
            orga_idx: +selectedOrga.value,
            idnum1: idnum1.value,
            est_val: {
                comNm: {
                    kind: estComInputType!.label,
                    val: estComNm.value,
                },
                salesNm: {
                    kind: estSalesNmInputType!.label,
                    val: estSalesNm.value,
                },
                phone: {
                    kind: estSalesNmInputType!.label,
                    val: estSalesNm.value,
                },
                fax: {
                    kind: estFaxInputType!.label,
                    val: estFax.value,
                },
                direct: {
                    kind: estDirectInputType!.label,
                    val: estDirect.value,
                },
                address: {
                    kind: estAddrInputType!.label,
                    val: estAddr.value,
                },
            },
            cal: {},
        };

        if (!isEmpty(nick.value)) {
            payload['nickname'] = nick.value;
        }

        if (!isEmpty(title.value)) {
            payload['title'] = title.value;
        }

        if (!isEmpty(birthday.value)) {
            payload['birthday'] = dayjs(birthday.value).format('YYYY-MM-DD');
        }

        if (birthType.value?.value === 'Y') {
            payload['birth_type'] = true;
        } else if (birthType.value?.value === 'N') {
            payload['birth_type'] = false;
        }

        if (!isEmpty(telephone.value)) {
            payload['telephone'] = telephone.value;
        }

        if (!isEmpty(telDirect.value)) {
            payload['tel_direct'] = telDirect.value;
        }

        if (!isEmpty(email.value)) {
            payload['email'] = `${email.value}@${emailCom.value?.value}`;
        }

        if (userType.value) {
            payload['user_type'] = userType.value.value;
        }

        if (status.value) {
            payload['status'] = status.value.value;
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

        if (indate.value) {
            payload['indate'] = dayjs(indate.value).format('YYYY-MM-DD');
        }

        if (outdate.value) {
            payload['outdate'] = dayjs(outdate.value).format('YYYY-MM-DD');
        }

        if (bank.value) {
            payload['income_bank'] = bank.value.value;
        }

        if (!isEmpty(account.value)) {
            payload['income_account'] = account.value;
        }

        if (!isEmpty(holder.value)) {
            payload['income_name'] = holder.value;
        }

        if (!isEmpty(carType)) {
            payload.cal['car_cal_type'] = carType;
        }

        if (!isEmpty(genType)) {
            payload.cal['gen_cal_type'] = genType;
        }

        if (genBase.value) {
            payload.cal['gen_cal_base'] = +genBase.value.value;
        }

        if (!isEmpty(genRate)) {
            payload.cal['gen_cal_ratio'] = +genRate.value;
        }

        return payload;
    };

    return (
        <>
            <MyLayout>
                <div className={`${displayName} row`}>
                    <div className={`${displayName}__left col`}>
                        <div className="wr-frame__section">
                            <div className={`${displayName}__block`}>
                                <div className={`${displayName}__content`}>
                                    <div className="wr-group">
                                        <span
                                            className={`${displayName}__department`}
                                        >
                                            {selectedOrga.label
                                                ? selectedOrga.label
                                                : '부서를 선택하세요'}
                                        </span>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            type="button"
                                            onClick={handleClickDepart}
                                        >
                                            부서변경
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={`${displayName}__block`}>
                                <div className={`${displayName}__content`}>
                                    <div className="row">
                                        <div className="col-8">
                                            <WithLabel
                                                id="nick"
                                                label="영업명"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="nick"
                                                    placeholder="영업명"
                                                    {...nick}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="name"
                                                label="이름"
                                                type={labelType}
                                                isRequired
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="name"
                                                    placeholder="이름"
                                                    onBlur={handleBlurName}
                                                    {...name}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="title"
                                                label="직함"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="title"
                                                    placeholder="직함"
                                                    {...title}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="sNum"
                                                label="주민번호"
                                                type={labelType}
                                                isRequired
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="sNum"
                                                    placeholder="주민번호"
                                                    {...idnum1}
                                                    // button={{
                                                    //     type: 'button',
                                                    //     children: (
                                                    //         <>
                                                    //             <span>보기</span>
                                                    //         </>
                                                    //     ),
                                                    // }}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="birthday"
                                                label="생년월일"
                                                type={labelType}
                                            >
                                                <div
                                                    className={`${displayName}__with`}
                                                >
                                                    <DatePicker
                                                        oneTap
                                                        format="yyyy-MM-dd"
                                                        style={{ width: 160 }}
                                                        size="md"
                                                        placeholder="생년월일"
                                                        {...birthday}
                                                    />
                                                    <div style={{ width: 160 }}>
                                                        <MySelect
                                                            placeholder={'선택'}
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                            height={
                                                                variables.detailFilterHeight
                                                            }
                                                            {...birthType}
                                                        />
                                                    </div>
                                                </div>
                                            </WithLabel>
                                            <WithLabel
                                                id="mobile"
                                                label="핸드폰"
                                                type={labelType}
                                                isRequired
                                            >
                                                <div
                                                    className={`${displayName}__with`}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="mobile"
                                                        placeholder="000-0000-0000"
                                                        onBlur={
                                                            handleBlurMobile
                                                        }
                                                        {...mobile}
                                                    />
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        {...mobileCom}
                                                    />
                                                </div>
                                            </WithLabel>
                                            <WithLabel
                                                id="telephone"
                                                label="내선번호"
                                                type={labelType}
                                            >
                                                <div
                                                    className={`${displayName}__with`}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="telephone"
                                                        placeholder="내선번호"
                                                        onBlur={
                                                            handleBlurTelephone
                                                        }
                                                        {...telephone}
                                                    />
                                                    <MyInput
                                                        type="text"
                                                        placeholder="직통번호"
                                                        {...telDirect}
                                                    />
                                                </div>
                                            </WithLabel>
                                            <WithLabel
                                                id="email"
                                                label="이메일"
                                                type={labelType}
                                            >
                                                <div
                                                    className={`${displayName}__with`}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="email"
                                                        placeholder="이메일"
                                                        {...email}
                                                    />
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        {...emailCom}
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                        <div className="col-4">
                                            <div className="wr-ml">
                                                <div
                                                    className={`${displayName}__avatar wr-mb`}
                                                >
                                                    <img
                                                        src={
                                                            lastUploadedPortraitImage
                                                                ? `${process.env.STORAGE_PATH}/${lastUploadedPortraitImage}`
                                                                : 'http://via.placeholder.com/200x220'
                                                        }
                                                        alt="Avatar"
                                                        onClick={
                                                            handleClickImage
                                                        }
                                                    />
                                                </div>
                                                <WithLabel
                                                    label="사원번호"
                                                    type="disable"
                                                >
                                                    <MyInput
                                                        type="text"
                                                        placeholder="사원번호"
                                                        value={id}
                                                        readOnly
                                                    />
                                                </WithLabel>
                                                <WithLabel
                                                    id="user_type"
                                                    label="영업구분"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="user_type"
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        {...userType}
                                                    />
                                                </WithLabel>
                                                <WithLabel
                                                    id="status"
                                                    label="재직현황"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="status"
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        {...status}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${displayName}__block`}>
                                <div className={`${displayName}__content`}>
                                    <div className="row wr-mb">
                                        <div className="col-6">
                                            <WithLabel
                                                label="주소"
                                                type={labelType}
                                            >
                                                <div
                                                    className={`${displayName}__with`}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        placeholder="우편번호"
                                                        readOnly
                                                        onClick={
                                                            handleClickPostcode
                                                        }
                                                        {...postcode}
                                                        button={{
                                                            type: 'button',
                                                            onClick:
                                                                handleClickPostcode,
                                                            children: (
                                                                <>
                                                                    <span>
                                                                        찾기
                                                                    </span>
                                                                </>
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <MyInput
                                                    type="text"
                                                    placeholder="주소1"
                                                    readOnly
                                                    {...address1}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="addr2"
                                                label="상세주소"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="addr2"
                                                    placeholder="상세주소"
                                                    {...address3}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <MyInput
                                                    type="text"
                                                    placeholder="주소2"
                                                    readOnly
                                                    {...address2}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="indate"
                                                label="입사일"
                                                type={labelType}
                                            >
                                                <DatePicker
                                                    oneTap
                                                    format="yyyy-MM-dd"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    size="md"
                                                    placeholder="입사일"
                                                    {...indate}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="outdate"
                                                    label="퇴사일"
                                                    type={labelType}
                                                >
                                                    <DatePicker
                                                        oneTap
                                                        format="yyyy-MM-dd"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        size="md"
                                                        placeholder="퇴사일"
                                                        {...outdate}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${displayName}__block`}>
                                <div className="wr-pages-hr-detail__title">
                                    <strong>비교견적 설정</strong>
                                </div>
                                <div className={`${displayName}__content`}>
                                    <div className="row">
                                        <div className="col">
                                            <WithLabel
                                                id="estComNm"
                                                label="회사명"
                                                type={labelType}
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        options={ESTIMATE_COMP}
                                                        value={estComInputType}
                                                        onChange={
                                                            handleChangeEstComInputType
                                                        }
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estComNm"
                                                    placeholder="회사명"
                                                    readOnly={
                                                        estComInputType?.value !==
                                                        '03'
                                                    }
                                                    {...estComNm}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col">
                                            <WithLabel
                                                id="estSalesNm"
                                                label="견적영업명"
                                                type={labelType}
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        options={ESTIMATE_SALES}
                                                        value={
                                                            estSalesNmInputType
                                                        }
                                                        onChange={
                                                            handleChangeEstSalesNmInputType
                                                        }
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estSalesNm"
                                                    placeholder="견적영업명"
                                                    readOnly={
                                                        estSalesNmInputType?.value !==
                                                        '04'
                                                    }
                                                    {...estSalesNm}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col">
                                            <WithLabel
                                                id="estPhone"
                                                label="대표전화"
                                                type={labelType}
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        options={ESTIMATE_PHONE}
                                                        value={
                                                            estPhoneInputType
                                                        }
                                                        onChange={
                                                            handleChangeEstPhoneInputType
                                                        }
                                                    />
                                                </div>
                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estPhone"
                                                    placeholder="대표전화"
                                                    readOnly={
                                                        estPhoneInputType?.value !==
                                                        '05'
                                                    }
                                                    {...estPhone}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col">
                                            <WithLabel
                                                id="estFax"
                                                label="팩스번호"
                                                type={labelType}
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        options={ESTIMATE_FAX}
                                                        value={estFaxInputType}
                                                        onChange={
                                                            handleChangeEstFaxInputType
                                                        }
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estFax"
                                                    placeholder="팩스번호"
                                                    readOnly={
                                                        estFaxInputType?.value !==
                                                        '02'
                                                    }
                                                    {...estFax}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col">
                                            <WithLabel
                                                id="direct"
                                                label="직통전화"
                                                type={labelType}
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        options={
                                                            ESTIMATE_DIRECT
                                                        }
                                                        value={
                                                            estDirectInputType
                                                        }
                                                        onChange={
                                                            handleChangeEstDirectInputType
                                                        }
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="direct"
                                                    placeholder="직통전화"
                                                    readOnly={
                                                        estDirectInputType?.value !==
                                                        '04'
                                                    }
                                                    {...estDirect}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col">
                                            <WithLabel
                                                id="estAddress"
                                                label="표기주소"
                                                type={labelType}
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        options={
                                                            ESTIMATE_ADDRESS
                                                        }
                                                        value={estAddrInputType}
                                                        onChange={
                                                            handleChangeEstAddrInputType
                                                        }
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estAddress"
                                                    placeholder="표기주소"
                                                    readOnly={
                                                        estAddrInputType?.value !==
                                                        '03'
                                                    }
                                                    {...estAddr}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${displayName}__right col`}>
                        <div className="wr-ml position-relative">
                            <ul className="wr-tab__wrap" role="tablist">
                                {HR_DETAIL_TABS.map((v) => (
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
                                <IncomeTabpanel
                                    id="tabpanelIncome"
                                    tabId="tabIncome"
                                    hidden={tab.id !== 'tabIncome'}
                                    editable={isEditable}
                                    bank={bank}
                                    account={account}
                                    holder={holder}
                                    carType={carType}
                                    onChangeCarType={handleChangeCarType}
                                    genType={genType}
                                    onChangeGenType={handleChangeGenType}
                                    genBase={genBase}
                                    genRate={genRate}
                                    longGrade={longGrade}
                                    onChangeLongGrade={handleChangeLongGrade}
                                />
                                <GuaranteeTabpanel
                                    id="tabpanelGuarantee"
                                    tabId="tabGuarantee"
                                    hidden={tab.id !== 'tabGuarantee'}
                                    // data={long.pays}
                                    editable={isEditable}
                                    // addCount={paysAddCount}
                                    // onAddCount={handleIncrementPaysAddCount}
                                />
                                {/* <AuthorityTabpanel
                                    id="tabpanelAuthority"
                                    tabId="tabAuthority"
                                    hidden={tab.id !== 'tabAuthority'}
                                    // data={long.pays}
                                    editable={isEditable}
                                    // addCount={paysAddCount}
                                    // onAddCount={handleIncrementPaysAddCount}
                                />
                                <QualManageTabpanel
                                    id="tabpanelQualManage"
                                    tabId="tabQualManage"
                                    hidden={tab.id !== 'tabQualManage'}
                                    // data={long.pays}
                                    editable={isEditable}
                                    // addCount={paysAddCount}
                                    // onAddCount={handleIncrementPaysAddCount}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-footer__between">
                        <div></div>
                        <div className={`${displayName}__buttons`}>
                            {editable && (
                                <MyButton
                                    className="btn-secondary"
                                    onClick={handleClickCancel}
                                >
                                    취소
                                </MyButton>
                            )}
                            {mode === 'create' && (
                                <MyButton
                                    type="button"
                                    className="btn-primary"
                                    onClick={handleCreate}
                                >
                                    등록
                                </MyButton>
                            )}
                            {mode === 'update' && (
                                <MyButton
                                    type="button"
                                    className="btn-primary"
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
            <SelectDepartModal />
            <ImageUploadModal />
            <GuaranteeSettingModal />
        </>
    );
};
