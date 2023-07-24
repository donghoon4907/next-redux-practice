import type { FC } from 'react';
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
    ESTIMATE_ADDRESS,
    ESTIMATE_COMP,
    ESTIMATE_DIRECT,
    ESTIMATE_FAX,
    ESTIMATE_PHONE,
    ESTIMATE_SALES,
} from '@constants/options/user';
import { useDatepicker } from '@hooks/use-datepicker';
import { CoreSelectOption } from '@interfaces/core';

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
    defaultEstComNm = '',
    defaultEstComInputType = ESTIMATE_COMP[0],
    defaultEstSalesNm = '',
    defaultEstSalesNmInputType = ESTIMATE_SALES[0],
    defaultEstPhone = '',
    defaultEstPhoneInputType = ESTIMATE_PHONE[0],
    defaultEstFax = '',
    defaultEstFaxInputType = ESTIMATE_FAX[0],
    defaultEstDirect = '',
    defaultEstDirectInputType = ESTIMATE_DIRECT[0],
    defaultEstAddr = '',
    defaultEstAddrInputType = ESTIMATE_ADDRESS[0],
}) => {
    const displayName = 'wr-pages-hr-detail';

    const dispatch = useDispatch();

    const { selectedOrga } = useSelector<AppState, HrState>(
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
    // 별칭
    const [nick] = useInput(defaultNick);
    // 이름
    const [name] = useInput(defaultName);
    // 직함
    const [title] = useInput(defaultTitle);
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
    const [email] = useInput(defaultEmail);
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
    const [estComNm] = useInput(defaultEstComNm);
    const [estComInputType] = useSelect(ESTIMATE_COMP, defaultEstComInputType);
    // 비교견적 설정 - 영업명
    const [estSalesNm] = useInput(defaultEstSalesNm);
    const [estSalesNmInputType] = useSelect(
        ESTIMATE_SALES,
        defaultEstSalesNmInputType,
    );
    // 비교견적 설정 - 대표전화
    const [estPhone] = useInput(defaultEstPhone, { isNumWithHyphen: true });
    const [estPhoneInputType] = useSelect(
        ESTIMATE_PHONE,
        defaultEstPhoneInputType,
    );
    // 비교견적 설정 - 팩스번호
    const [estFax] = useInput(defaultEstFax, { isNumWithHyphen: true });
    const [estFaxInputType] = useSelect(ESTIMATE_FAX, defaultEstFaxInputType);
    // 비교견적 설정 - 직통전화
    const [estDirect] = useInput(defaultEstDirect, { isNumWithHyphen: true });
    const [estDirectInputType] = useSelect(
        ESTIMATE_DIRECT,
        defaultEstDirectInputType,
    );
    // 비교견적 설정 - 표기주소
    const [estAddr] = useInput(defaultEstAddr);
    const [estAddrInputType] = useSelect(
        ESTIMATE_ADDRESS,
        defaultEstAddrInputType,
    );
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

    const handleCreate = () => {};

    const handleUpdate = () => {};

    const createPayload = () => {
        const phoneNumberRegex = /^01(?:0|1|[6-9])-(?:\d{3,4})-\d{4}$/;

        if (name.value === '') {
            return alert('이름을 입력하세요.');
        }

        if (mobile.value === '') {
            return alert('핸드폰을 입력하세요.');
        } else {
            if (!phoneNumberRegex.test(mobile.value)) {
                return alert('핸드폰을 확인하세요.');
            }
        }

        if (selectedOrga.label === '') {
            return alert('부서를 선택하세요.');
        }

        if (idnum1.value === '' || idnum1.value.length === 13) {
            return alert('주민번호를 확인하세요.');
        }

        const payload: CreateUserRequestPayload = {
            name: name.value,
            mobile: mobile.value,
            orga_idx: +selectedOrga.value,
            idnum1: idnum1.value,
            est_val: {
                comNm: estComNm.value,
                salesNm: estSalesNm.value,
                phone: estPhone.value,
                fax: estFax.value,
                direct: estDirect.value,
                address: estAddr.value,
            },
        };

        if (nick.value !== '') {
            payload['nickname'] = nick.value;
        }

        if (title.value !== '') {
            payload['title'] = title.value;
        }

        if (idnum1.value !== '') {
            payload['idnum1'] = idnum1.value;
        }

        if (birthday.value) {
            payload['birthday'] = dayjs(birthday.value).format('YYYY-MM-DD');
        }

        if (birthType.value?.value === 'Y') {
            payload['birth_type'] = true;
        } else if (birthType.value?.value === 'N') {
            payload['birth_type'] = false;
        }

        if (telephone.value !== '') {
            payload['telephone'] = telephone.value;
        }

        if (telDirect.value !== '') {
            payload['tel_direct'] = telDirect.value;
        }

        if (email.value === '') {
            return;
        } else {
            payload['email'] = `${email.value}@${emailCom.value?.value}`;
        }

        if (userType.value) {
            payload['user_type'] = userType.value.value;
        }

        if (status.value) {
            payload['status'] = status.value.value;
        }

        if (postcode.value !== '') {
            payload['postcode'] = postcode.value;
        }

        if (address1.value !== '') {
            payload['address1'] = address1.value;
        }

        if (address2.value !== '') {
            payload['address2'] = address2.value;
        }

        if (address3.value !== '') {
            payload['address3'] = address3.value;
        }

        if (indate.value) {
            payload['indate'] = dayjs(indate.value).format('YYYY-MM-DD');
        }

        if (outdate.value) {
            payload['outdate'] = dayjs(outdate.value).format('YYYY-MM-DD');
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
                                                label="별칭"
                                                type="active"
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="nick"
                                                    placeholder="별칭"
                                                    {...nick}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="name"
                                                label="이름"
                                                type="active"
                                                isRequired
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="name"
                                                    placeholder="이름"
                                                    {...name}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="title"
                                                label="직함"
                                                type="active"
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
                                                type="active"
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
                                                type="active"
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
                                                type="active"
                                                isRequired
                                            >
                                                <div
                                                    className={`${displayName}__with`}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="mobile"
                                                        placeholder="000-0000-0000"
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
                                                type="active"
                                            >
                                                <div
                                                    className={`${displayName}__with`}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="telephone"
                                                        placeholder="000-0000-0000"
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
                                                type="active"
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
                                                    type="active"
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
                                                    type="active"
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
                                                type="active"
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
                                                type="active"
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
                                                type="active"
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
                                                    type="active"
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
                                                type="active"
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        {...estComInputType}
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estComNm"
                                                    placeholder="회사명"
                                                    {...estComNm}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col">
                                            <WithLabel
                                                id="estSalesNm"
                                                label="영업명"
                                                type="active"
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        {...estSalesNmInputType}
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estSalesNm"
                                                    placeholder="영업명"
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
                                                type="active"
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        {...estPhoneInputType}
                                                    />
                                                </div>
                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estPhone"
                                                    placeholder="대표전화"
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
                                                type="active"
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        {...estFaxInputType}
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estFax"
                                                    placeholder="팩스번호"
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
                                                type="active"
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        {...estDirectInputType}
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="direct"
                                                    placeholder="직통전화"
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
                                                type="active"
                                            >
                                                <div style={{ width: 200 }}>
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        {...estAddrInputType}
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estAddress"
                                                    placeholder="표기주소"
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
                                    // data={long.pays}
                                    editable={editable}
                                    // addCount={paysAddCount}
                                    // onAddCount={handleIncrementPaysAddCount}
                                />
                                <GuaranteeTabpanel
                                    id="tabpanelGuarantee"
                                    tabId="tabGuarantee"
                                    hidden={tab.id !== 'tabGuarantee'}
                                    // data={long.pays}
                                    editable={editable}
                                    // addCount={paysAddCount}
                                    // onAddCount={handleIncrementPaysAddCount}
                                />
                                <AuthorityTabpanel
                                    id="tabpanelAuthority"
                                    tabId="tabAuthority"
                                    hidden={tab.id !== 'tabAuthority'}
                                    // data={long.pays}
                                    editable={editable}
                                    // addCount={paysAddCount}
                                    // onAddCount={handleIncrementPaysAddCount}
                                />
                                <QualManageTabpanel
                                    id="tabpanelQualManage"
                                    tabId="tabQualManage"
                                    hidden={tab.id !== 'tabQualManage'}
                                    // data={long.pays}
                                    editable={editable}
                                    // addCount={paysAddCount}
                                    // onAddCount={handleIncrementPaysAddCount}
                                />
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
