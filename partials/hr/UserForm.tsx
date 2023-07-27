import type { FC, ChangeEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { UploadState } from '@reducers/upload';
import type { CreateUserRequestPayload } from '@actions/hr/create-user.action';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDaumPostcodePopup } from 'react-daum-postcode';
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
import { useDatepicker } from '@hooks/use-datepicker';
import { CoreSelectOption } from '@interfaces/core';
import { isEmpty } from '@utils/validator/common';
import coreConstants from '@constants/core';
import userConstants from '@constants/options/user';
import { CreateUserDTO } from '@dto/hr/CreateUser.dto';
import { useCheckbox } from '@hooks/use-checkbox';
import { CodeSettingModal } from '@components/modal/CodeSetting';
import { createUserRequest } from '@actions/hr/create-user.action';
import { getOrgaRequest } from '@actions/hr/get-orga';
import { MyDatepicker } from '@components/datepicker';

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
    defaultBirthday?: string | null;
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
    defaultIndate?: string | null;
    /**
     * 퇴사일 기본 값
     */
    defaultOutdate?: string | null;
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
    /**
     * 권한 설정 - 웹 사용 기본 값
     */
    defaultUseWeb?: boolean;
    /**
     * 권한 설정 - 모바일 사용 기본 값
     */
    defaultUseMobile?: boolean;
    /**
     * 협회자격관리 - 손보협 등록번호 기본 값
     */
    defaultGiaNo?: string;
    /**
     * 협회자격관리 - 손보협 등록보험사 기본 값
     */
    defaultGiaComp?: CoreSelectOption;
    /**
     * 협회자격관리 - 손보협 등록일 기본 값
     */
    defaultGiaIndate?: string | null;
    /**
     * 협회자격관리 - 손보협 말소일 기본 값
     */
    defaultGiaOutdate?: string | null;
    /**
     * 협회자격관리 - 손보협 자격구분 기본 값
     */
    defaultGiaQualification?: CoreSelectOption;
    /**
     * 협회자격관리 - 생보협 등록번호 기본 값
     */
    defaultLiaNo?: string;
    /**
     * 협회자격관리 - 생보협 등록보험사 기본 값
     */
    defaultLiaComp?: CoreSelectOption;
    /**
     * 협회자격관리 - 생보협 등록일 기본 값
     */
    defaultLiaIndate?: string | null;
    /**
     * 협회자격관리 - 생보협 말소일 기본 값
     */
    defaultLiaOutdate?: string | null;
    /**
     * 협회자격관리 - 생보협 자격구분 기본 값
     */
    defaultLiaQualification?: CoreSelectOption;
}

export const UserForm: FC<Props> = ({
    mode,
    id = '',
    defaultNick = '',
    defaultName = '',
    defaultTitle = '',
    defaultIdNum1 = '',
    defaultBirthday = null,
    defaultBirthType = userConstants.birthType[0],
    defaultPhone = '',
    defaultMobileCom = userConstants.mobileCom[0],
    defaultTelephone = '',
    defaultTelDirect = '',
    defaultEmail = '',
    defaultEmailCom = userConstants.emailCom[0],
    defaultPostCode = '',
    defaultAddress1 = '',
    defaultAddress2 = '',
    defaultAddress3 = '',
    defaultUserType = userConstants.userType[0],
    defaultStatus = userConstants.empStatus[0],
    defaultIndate = null,
    defaultOutdate = null,
    defaultEstComNm = coreConstants.myCompNm,
    defaultEstComInputType = userConstants.estComInputType[0],
    defaultEstSalesNm = '',
    defaultEstSalesNmInputType = userConstants.estSalesNmInputType[0],
    defaultEstPhone = coreConstants.myCompPhone,
    defaultEstPhoneInputType = userConstants.estPhoneInputType[0],
    defaultEstFax = '',
    defaultEstFaxInputType = userConstants.estFaxInputType[0],
    defaultEstDirect = coreConstants.myCompPhone,
    defaultEstDirectInputType = userConstants.estDirectInputType[0],
    defaultEstAddr = coreConstants.myCompAddr,
    defaultEstAddrInputType = userConstants.estAddrInputType[0],
    defaultBank = null,
    defaultAccount = '',
    defaultHolder = '',
    defaultCarType = '',
    // defaultCarIdx
    defaultGenType = '',
    defaultGenBase = userConstants.calcStandard[0],
    defaultGenRate = '',
    // defaultGenIdx
    defaultLongGrade = false,
    defaultUseWeb = false,
    defaultUseMobile = false,
    defaultGiaNo = '',
    defaultGiaComp = null,
    defaultGiaIndate = null,
    defaultGiaOutdate = null,
    defaultGiaQualification = userConstants.qDivision[0],
    defaultLiaNo = '',
    defaultLiaComp = null,
    defaultLiaIndate = null,
    defaultLiaOutdate = null,
    defaultLiaQualification = userConstants.qDivision[0],
}) => {
    const displayName = 'wr-pages-hr-detail';

    const dispatch = useDispatch();

    const { selectedOrga, banks, companies, orga, guarantees, codes } =
        useSelector<AppState, HrState>((state) => state.hr);

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
    const [idnum1] = useNumbericInput(defaultIdNum1, { limit: 13 });
    // 생년월일
    const [birthday] = useDatepicker(
        defaultBirthday ? new Date(defaultBirthday) : new Date(),
    );
    // 양력 or 음력
    const [birthType] = useSelect(userConstants.birthType, defaultBirthType);
    // 핸드폰
    const [mobile] = useNumbericInput(defaultPhone, { limit: 11 });
    // 통신사
    const [mobileCom] = useSelect(userConstants.mobileCom, defaultMobileCom);
    // 내선번호
    const [telephone] = useNumbericInput(defaultTelephone, { limit: 11 });
    // 직통번호
    const [telDirect] = useNumbericInput(defaultTelDirect, { limit: 11 });
    // 이메일
    const [email] = useInput(defaultEmail, { noSpace: true });
    const [emailCom] = useSelect(userConstants.emailCom, defaultEmailCom);
    // 우편번호
    const [postcode, setPostcode] = useInput(defaultPostCode);
    // 주소 검색 1
    const [address1, setAddress1] = useInput(defaultAddress1);
    // 주소 검색 상세
    const [address2, setAddress2] = useInput(defaultAddress2);
    // 상세 주소
    const [address3] = useInput(defaultAddress3);
    // 영업구분
    const [userType] = useSelect(userConstants.userType, defaultUserType);
    // 재직현황
    const [status] = useSelect(userConstants.empStatus, defaultStatus);
    // 입사일
    const [indate] = useDatepicker(
        defaultIndate ? new Date(defaultIndate) : new Date(),
    );
    // 퇴사일
    const [outdate] = useDatepicker(
        defaultOutdate ? new Date(defaultOutdate) : new Date(),
    );
    // 비교견적 설정 - 회사명
    const [estComNm, setEstComNm] = useInput(defaultEstComNm);
    const [estComInputType, setEstComInputType] =
        useState<CoreSelectOption | null>(defaultEstComInputType);
    // 비교견적 설정 - 간접영업명
    const [estSalesNm, setEstSalesNm] = useInput(defaultEstSalesNm);
    const [estSalesNmInputType, setEstSalesNmInputType] =
        useState<CoreSelectOption | null>(defaultEstSalesNmInputType);
    // 비교견적 설정 - 대표전화
    const [estPhone, setEstPhone] = useNumbericInput(defaultEstPhone);
    const [estPhoneInputType, setEstPhoneInputType] =
        useState<CoreSelectOption | null>(defaultEstPhoneInputType);
    // 비교견적 설정 - 팩스번호
    const [estFax, setEstFax] = useNumbericInput(defaultEstFax);
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
    const [genBase] = useSelect(userConstants.calcStandard, defaultGenBase);
    // 소득 설정 - 지급율 기본 값
    const [genRate] = useNumbericInput(defaultGenRate);
    // 소득 설정 - 구간적용
    const [longGrade] = useCheckbox(defaultLongGrade);
    // 권한 설정 - 웹
    const [useWeb] = useCheckbox(defaultUseWeb);
    // 권한 설정 - 모바일
    const [useMobile] = useCheckbox(defaultUseMobile);
    // 협회자격관리 - 손보협 등록번호
    const [giaNo] = useInput(defaultGiaNo, { noSpace: true });
    // 협회자격관리 - 손보협 등록보험사
    const [giaComp] = useSelect(companies, defaultGiaComp);
    // 협회자격관리 - 손보협 등록일
    const [giaIndate] = useDatepicker(
        defaultGiaIndate ? new Date(defaultGiaIndate) : new Date(),
    );
    // 협회자격관리 - 손보협 말소일
    const [giaOutdate] = useDatepicker(
        defaultGiaOutdate ? new Date(defaultGiaOutdate) : new Date(),
    );
    // 협회자격관리 - 손보협 자격구분
    const [giaQualification] = useSelect(
        userConstants.qDivision,
        defaultGiaQualification,
    );
    // 협회자격관리 - 생보협 등록번호
    const [liaNo] = useInput(defaultLiaNo, { noSpace: true });
    // 협회자격관리 - 생보협 등록보험사
    const [liaComp] = useSelect(companies, defaultLiaComp);
    // 협회자격관리 - 생보협 등록일
    const [liaIndate] = useDatepicker(
        defaultLiaIndate ? new Date(defaultLiaIndate) : new Date(),
    );
    // 협회자격관리 - 생보협 말소일
    const [liaOutdate] = useDatepicker(
        defaultLiaOutdate ? new Date(defaultLiaOutdate) : new Date(),
    );
    // 협회자격관리 - 생보협 자격구분
    const [liaQualification] = useSelect(
        userConstants.qDivision,
        defaultLiaQualification,
    );

    // 소득 설정 - 자동차 규정 라디오 변경 핸들러
    const handleChangeCarType = (evt: ChangeEvent<HTMLInputElement>) => {
        setCarType(evt.target.value);
    };
    // 소득 설정 - 일반 규정 라디오 변경 핸들러
    const handleChangeGenType = (evt: ChangeEvent<HTMLInputElement>) => {
        setGenType(evt.target.value);
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
                setEstComNm(coreConstants.myCompNm);
            } else if (option.value === '02') {
                if (orga) {
                    setEstComNm(orga.orga_name);
                } else {
                    return alert('먼저 부서를 선택해주세요.');
                }
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
                if (orga) {
                    setEstSalesNm(orga.orga_name);
                } else {
                    return alert('먼저 부서를 선택해주세요.');
                }
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
                setEstPhone(coreConstants.myCompPhone);
            } else if (option.value === '02') {
                // 지점명 예정
                if (orga) {
                    setEstPhone(orga.tel);
                } else {
                    return alert('먼저 부서를 선택해주세요.');
                }
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
                if (orga) {
                    setEstFax(orga.fax);
                } else {
                    return alert('먼저 부서를 선택해주세요.');
                }
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
                setEstDirect(coreConstants.myCompPhone);
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
                setEstAddr(coreConstants.myCompAddr);
            } else if (option.value === '02') {
                if (orga) {
                    setEstAddr(orga.address);
                } else {
                    return alert('먼저 부서를 선택해주세요.');
                }
            }
        }

        setEstAddrInputType(option);
    };

    // 우편번호 클릭 핸들러
    const handleClickPostcode = () => {
        if (isEditable) {
            open({ onComplete: handleCompletePostcode });
        }
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
        if (isEditable) {
            dispatch(showImageUploadModal());
        }
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
            createUser(createUserDto.getPayload());
        }
    };

    const handleUpdate = () => {};

    const createPayload = () => {
        const payload: CreateUserRequestPayload = {
            name: name.value,
            mobile: mobile.value,
            mobile_com: mobileCom.value!.value,
            idnum1: idnum1.value,
            orga_idx: -1,
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
            cal: {
                long_grade: longGrade.checked,
            },
            guarantee: guarantees,
            fccode: codes,
            permission: {
                permission: {
                    use_web: useWeb.checked,
                    use_mobile: useMobile.checked,
                },
            },
            associate: [
                {
                    type: '손보',
                    no: giaNo.value,
                    wcode: giaComp.value ? +giaComp.value.value : null,
                    indate: dayjs(giaIndate.value).format('YYYY-MM-DD'),
                    outdate: dayjs(giaOutdate.value).format('YYYY-MM-DD'),
                    qulification: giaQualification.value!.label,
                },
                {
                    type: '생보',
                    no: liaNo.value,
                    wcode: liaComp.value ? +liaComp.value.value : null,
                    indate: dayjs(liaIndate.value).format('YYYY-MM-DD'),
                    outdate: dayjs(liaOutdate.value).format('YYYY-MM-DD'),
                    qulification: liaQualification.value!.label,
                },
            ],
        };

        if (selectedOrga) {
            payload['orga_idx'] = +selectedOrga.value;
        }

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

        if (!isEmpty(genRate.value)) {
            payload.cal['gen_cal_ratio'] = +genRate.value;
        }

        return payload;
    };

    useEffect(() => {
        if (selectedOrga) {
            dispatch(getOrgaRequest({ idx: selectedOrga.value }));
        }
    }, [dispatch, selectedOrga]);

    useEffect(() => {
        if (orga) {
            if (estAddrInputType?.value === '01') {
                setEstFax(orga.fax || '');
            }
        }
    }, [dispatch, orga, estAddrInputType, setEstFax]);

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
                                            className={`${displayName}__department ${
                                                selectedOrga
                                                    ? ''
                                                    : 'wr-label--required'
                                            }`}
                                        >
                                            {selectedOrga
                                                ? selectedOrga.label
                                                : '부서를 선택하세요'}
                                        </span>
                                        {isEditable && (
                                            <button
                                                className="btn btn-primary btn-sm"
                                                type="button"
                                                onClick={handleClickDepart}
                                            >
                                                부서변경
                                            </button>
                                        )}
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
                                                    readOnly={!isEditable}
                                                    {...nick}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="name"
                                                label="이름"
                                                type={labelType}
                                                isRequired={isEditable}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="name"
                                                    placeholder="이름"
                                                    onBlur={handleBlurName}
                                                    readOnly={!isEditable}
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
                                                    readOnly={!isEditable}
                                                    {...title}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="sNum"
                                                label="주민번호"
                                                type={labelType}
                                                isRequired={isEditable}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="sNum"
                                                    placeholder="주민번호"
                                                    readOnly={!isEditable}
                                                    {...idnum1}
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
                                                    <div style={{ width: 160 }}>
                                                        <MyDatepicker
                                                            id="birthday"
                                                            size="md"
                                                            placeholder="생년월일"
                                                            readOnly={
                                                                !isEditable
                                                            }
                                                            hooks={birthday}
                                                        />
                                                    </div>

                                                    <div style={{ width: 160 }}>
                                                        <MySelect
                                                            placeholder={'선택'}
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                            height={
                                                                variables.detailFilterHeight
                                                            }
                                                            isDisabled={
                                                                !isEditable
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
                                                isRequired={isEditable}
                                            >
                                                <div
                                                    className={`${displayName}__with`}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="mobile"
                                                        placeholder="핸드폰"
                                                        onBlur={
                                                            handleBlurMobile
                                                        }
                                                        readOnly={!isEditable}
                                                        {...mobile}
                                                    />
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!isEditable}
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
                                                        readOnly={!isEditable}
                                                        {...telephone}
                                                    />
                                                    <MyInput
                                                        type="text"
                                                        placeholder="직통번호"
                                                        readOnly={!isEditable}
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
                                                        readOnly={!isEditable}
                                                        {...email}
                                                    />
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!isEditable}
                                                        {...emailCom}
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                        <div className="col-4">
                                            <div className="wr-ml">
                                                <div
                                                    className={`${displayName}__avatar wr-mb ${
                                                        isEditable
                                                            ? 'wr-cursor--pointer'
                                                            : ''
                                                    }`}
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
                                                        isDisabled={!isEditable}
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
                                                        isDisabled={!isEditable}
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
                                                            disabled:
                                                                !isEditable,
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
                                                    readOnly={!isEditable}
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
                                                <MyDatepicker
                                                    id="indate"
                                                    size="md"
                                                    placeholder="입사일"
                                                    readOnly={!isEditable}
                                                    hooks={indate}
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
                                                    <MyDatepicker
                                                        id="outdate"
                                                        size="md"
                                                        placeholder="퇴사일"
                                                        readOnly={!isEditable}
                                                        hooks={outdate}
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
                                                        isDisabled={!isEditable}
                                                        options={
                                                            userConstants.estComInputType
                                                        }
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
                                                        isEditable
                                                            ? estComInputType?.value !==
                                                              '03'
                                                            : true
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
                                                        isDisabled={!isEditable}
                                                        options={
                                                            userConstants.estSalesNmInputType
                                                        }
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
                                                        isEditable
                                                            ? estSalesNmInputType?.value !==
                                                              '04'
                                                            : true
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
                                                        isDisabled={!isEditable}
                                                        options={
                                                            userConstants.estPhoneInputType
                                                        }
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
                                                        isEditable
                                                            ? estPhoneInputType?.value !==
                                                              '05'
                                                            : true
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
                                                        isDisabled={!isEditable}
                                                        options={
                                                            userConstants.estFaxInputType
                                                        }
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
                                                        isEditable
                                                            ? estFaxInputType?.value !==
                                                              '02'
                                                            : true
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
                                                        isDisabled={!isEditable}
                                                        options={
                                                            userConstants.estDirectInputType
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
                                                        isEditable
                                                            ? estDirectInputType?.value !==
                                                              '04'
                                                            : true
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
                                                        isDisabled={!isEditable}
                                                        options={
                                                            userConstants.estAddrInputType
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
                                                        isEditable
                                                            ? estAddrInputType?.value !==
                                                              '03'
                                                            : true
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
                                />
                                <GuaranteeTabpanel
                                    id="tabpanelGuarantee"
                                    tabId="tabGuarantee"
                                    hidden={tab.id !== 'tabGuarantee'}
                                    editable={isEditable}
                                />
                                <AuthorityTabpanel
                                    id="tabpanelAuthority"
                                    tabId="tabAuthority"
                                    hidden={tab.id !== 'tabAuthority'}
                                    editable={isEditable}
                                    useWeb={useWeb}
                                    useMobile={useMobile}
                                />
                                <QualManageTabpanel
                                    id="tabpanelQualManage"
                                    tabId="tabQualManage"
                                    hidden={tab.id !== 'tabQualManage'}
                                    editable={isEditable}
                                    giaNo={giaNo}
                                    giaComp={giaComp}
                                    giaIndate={giaIndate}
                                    giaOutdate={giaOutdate}
                                    giaQualification={giaQualification}
                                    liaNo={liaNo}
                                    liaComp={liaComp}
                                    liaIndate={liaIndate}
                                    liaOutdate={liaOutdate}
                                    liaQualification={liaQualification}
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
            <CodeSettingModal />
        </>
    );
};
