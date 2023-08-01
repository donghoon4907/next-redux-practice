import type { FC, ChangeEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { UploadState } from '@reducers/upload';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { MySelect } from '@components/select';
import { HR_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { MyLayout } from '@components/Layout';
import { useApi } from '@hooks/use-api';
import { showDepartSearchModal } from '@actions/modal/depart-search.action';
import { MyFooter } from '@components/footer';
import { MyButton } from '@components/button';
import { SelectDepartModal } from '@components/modal/SelectDepart';
import { ImageUploadModal } from '@components/modal/ImageUpload';
import { useSelect } from '@hooks/use-select';
import { showImageUploadModal } from '@actions/modal/image-upload.action';
import { IncomeTabpanel } from '@partials/hr/user/tabpanels/Income';
import { GuaranteeTabpanel } from '@partials/hr/user/tabpanels/Guarantee';
import { GuaranteeSettingModal } from '@components/modal/GuaranteeSetting';
import { AuthorityTabpanel } from '@partials/hr/user/tabpanels/Authority';
import { QualManageTabpanel } from '@partials/hr/user/tabpanels/QualManage';
import { useTab } from '@hooks/use-tab';
import { useDatepicker } from '@hooks/use-datepicker';
import { CoreSelectOption } from '@interfaces/core';
import { isEmpty } from '@utils/validator/common';
import coreConstants from '@constants/core';
import userConstants from '@constants/options/user';
import { CreateUserDTO, UpdateUserDTO } from '@dto/hr/User.dto';
import { useCheckbox } from '@hooks/use-checkbox';
import { CodeSettingModal } from '@components/modal/CodeSetting';
import { createUserRequest } from '@actions/hr/create-user.action';
import { getOrgaRequest } from '@actions/hr/get-orga';
import { MyDatepicker } from '@components/datepicker';
import { updateUserRequest } from '@actions/hr/update-user.action';
import { usePostcode } from '@hooks/use-postcode';
import { convertPhoneNumber, convertResidentNumber } from '@utils/converter';
import { uploadPortraitRequest } from '@actions/upload/portrait.action';
import {
    useInput,
    useNumbericInput,
    usePhoneInput,
    useResidentNumberInput,
} from '@hooks/use-input';

type Mode = 'create' | 'update';
interface Props {
    /**
     * 모드: true(수정) / false(등록)
     */
    mode: Mode;
    /**
     * 사원번호
     */
    userid?: string;
    /**
     * PK
     */
    idx?: string;
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
     * 소득 설정 - id
     */
    defaultCalIdx?: number;
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
     * 권한 설정 - id
     */
    defaultPermissionIdx?: number;
    /**
     * 권한 설정 - 웹 사용 기본 값
     */
    defaultUseWeb?: boolean;
    /**
     * 권한 설정 - 모바일 사용 기본 값
     */
    defaultUseMobile?: boolean;
    /**
     * 협회자격관리 - 손보협 idx
     */
    defaultGiaIdx?: number;
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
     * 협회자격관리 - 생보협 idx
     */
    defaultLiaIdx?: number;
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
    userid = '',
    idx = -1,
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
    defaultCalIdx,
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
    defaultPermissionIdx,
    defaultUseWeb = true,
    defaultUseMobile = true,
    defaultGiaIdx,
    defaultGiaNo = '',
    defaultGiaComp = null,
    defaultGiaIndate = null,
    defaultGiaOutdate = null,
    defaultGiaQualification = userConstants.qDivision[0],
    defaultLiaIdx,
    defaultLiaNo = '',
    defaultLiaComp = null,
    defaultLiaIndate = null,
    defaultLiaOutdate = null,
    defaultLiaQualification = userConstants.qDivision[0],
}) => {
    const displayName = 'wr-pages-hr-detail';

    const dispatch = useDispatch();

    const {
        selectedOrga,
        banks,
        companies,
        orga,
        guarantees,
        codes,
        removedGuarantees,
        removedCodes,
    } = useSelector<AppState, HrState>((state) => state.hr);

    const { lastSetPortraitImageFile, lastSetPortraitImagePreview } =
        useSelector<AppState, UploadState>((state) => state.upload);

    const createUser = useApi(createUserRequest);

    const updateUser = useApi(updateUserRequest);

    const upload = useApi(uploadPortraitRequest);
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
    const [idnum1] = useResidentNumberInput(defaultIdNum1);
    // 생년월일
    const [birthday] = useDatepicker(
        defaultBirthday ? new Date(defaultBirthday) : null,
    );
    // 양력 or 음력
    const [birthType] = useSelect(userConstants.birthType, defaultBirthType);
    // 핸드폰
    const [mobile] = usePhoneInput(defaultPhone, {
        callbackOnBlur: (convertedVal) => {
            if (estPhoneInputType.value?.value === '핸드폰') {
                setEstPhone(convertedVal);
            }
            if (estDirectInputType.value?.value === '핸드폰') {
                setEstDirect(convertedVal);
            }
        },
    });
    // 통신사
    const [mobileCom] = useSelect(userConstants.mobileCom, defaultMobileCom);
    // 내선번호
    const [telephone] = usePhoneInput(defaultTelephone, {
        callbackOnBlur: (convertedVal) => {
            if (estPhoneInputType.value?.value === '내선번호') {
                setEstPhone(convertedVal);
            }
            if (estDirectInputType.value?.value === '내선번호') {
                setEstDirect(convertedVal);
            }
        },
    });
    // 직통번호
    const [telDirect] = usePhoneInput(defaultTelDirect);
    // 이메일
    const [email] = useInput(defaultEmail, { noSpace: true });
    const [emailCom] = useSelect(userConstants.emailCom, defaultEmailCom);
    // 우편번호
    const [postcode, address1, address2, onClickPostcode] = usePostcode(
        {
            postcode: defaultPostCode,
            address1: defaultAddress1,
            address2: defaultAddress2,
        },
        { disabled: !isEditable },
    );
    // 상세 주소
    const [address3] = useInput(defaultAddress3);
    // 영업구분
    const [userType] = useSelect(userConstants.userType, defaultUserType);
    // 재직현황
    const [status] = useSelect(userConstants.empStatus, defaultStatus);
    // 입사일
    const [indate] = useDatepicker(
        defaultIndate ? new Date(defaultIndate) : null,
    );
    // 퇴사일
    const [outdate] = useDatepicker(
        defaultOutdate ? new Date(defaultOutdate) : null,
    );
    // 비교견적 설정 - 회사명
    const [estComNm, setEstComNm] = useInput(defaultEstComNm);
    const [estComInputType] = useSelect(
        userConstants.estComInputType,
        defaultEstComInputType,
        {
            callbackOnChange: (option) => {
                if (option !== null) {
                    if (option.value === '회사명') {
                        setEstComNm(coreConstants.myCompNm);
                    } else if (option.value === '지점명') {
                        if (orga) {
                            setEstComNm(orga.orga_name);
                        } else {
                            return alert('먼저 부서를 선택해주세요.');
                        }
                    }
                }
            },
        },
    );
    // 비교견적 설정 - 간접영업명
    const [estSalesNm, setEstSalesNm] = useInput(defaultEstSalesNm);
    const [estSalesNmInputType] = useSelect(
        userConstants.estSalesNmInputType,
        defaultEstSalesNmInputType,
        {
            callbackOnChange: (option) => {
                if (option !== null) {
                    if (option.value === '본인이름') {
                        setEstSalesNm(name.value);
                    } else if (option.value === '지점명') {
                        if (orga) {
                            setEstSalesNm(orga.orga_name);
                        } else {
                            return alert('먼저 부서를 선택해주세요.');
                        }
                    } else if (option.value === '표기안함') {
                        setEstSalesNm('');
                    }
                }
            },
        },
    );
    // 비교견적 설정 - 대표전화
    const [estPhone, setEstPhone] = usePhoneInput(defaultEstPhone);
    const [estPhoneInputType] = useSelect(
        userConstants.estPhoneInputType,
        defaultEstPhoneInputType,
        {
            callbackOnChange: (option) => {
                if (option !== null) {
                    if (option.value === '회사전화') {
                        setEstPhone(coreConstants.myCompPhone);
                    } else if (option.value === '지점전화') {
                        // 지점명 예정
                        if (orga) {
                            setEstPhone(orga.tel);
                        } else {
                            return alert('먼저 부서를 선택해주세요.');
                        }
                    } else if (option.value === '핸드폰') {
                        setEstPhone(mobile.value);
                    } else if (option.value === '내선번호') {
                        setEstPhone(telephone.value);
                    }
                }
            },
        },
    );
    // 비교견적 설정 - 팩스번호
    const [estFax, setEstFax] = usePhoneInput(defaultEstFax);
    const [estFaxInputType] = useSelect(
        userConstants.estFaxInputType,
        defaultEstFaxInputType,
        {
            callbackOnChange: (option) => {
                if (option !== null) {
                    if (option.value === '지점팩스') {
                        if (orga) {
                            setEstFax(orga.fax);
                        } else {
                            return alert('먼저 부서를 선택해주세요.');
                        }
                    }
                }
            },
        },
    );
    // 비교견적 설정 - 직통전화
    const [estDirect, setEstDirect] = usePhoneInput(defaultEstDirect);
    const [estDirectInputType] = useSelect(
        userConstants.estDirectInputType,
        defaultEstDirectInputType,
        {
            callbackOnChange: (option) => {
                if (option !== null) {
                    if (option.value === '회사전화') {
                        setEstDirect(coreConstants.myCompPhone);
                    } else if (option.value === '핸드폰') {
                        setEstDirect(mobile.value);
                    } else if (option.value === '내선번호') {
                        setEstDirect(telephone.value);
                    }
                }
            },
        },
    );
    // 비교견적 설정 - 표기주소
    const [estAddr, setEstAddr] = useInput(defaultEstAddr);
    const [estAddrInputType] = useSelect(
        userConstants.estAddrInputType,
        defaultEstAddrInputType,
        {
            callbackOnChange: (option) => {
                if (option !== null) {
                    if (option.value === '회사주소') {
                        setEstAddr(coreConstants.myCompAddr);
                    } else if (option.value === '지점주소') {
                        if (orga) {
                            setEstAddr(orga.address || '');
                        } else {
                            return alert('먼저 부서를 선택해주세요.');
                        }
                    }
                }
            },
        },
    );
    // 소득 설정 - 은행명
    const [bank] = useSelect(banks, defaultBank);
    // 소득 설정 - 계좌번호
    const [account] = useNumbericInput(defaultAccount);
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
    const [giaComp] = useSelect(
        companies.filter((v) => v.origin.dist === '손해'),
        defaultGiaComp,
    );
    // 협회자격관리 - 손보협 등록일
    const [giaIndate] = useDatepicker(
        defaultGiaIndate ? new Date(defaultGiaIndate) : null,
    );
    // 협회자격관리 - 손보협 말소일
    const [giaOutdate] = useDatepicker(
        defaultGiaOutdate ? new Date(defaultGiaOutdate) : null,
    );

    // 협회자격관리 - 손보협 자격구분
    const [giaQualification] = useSelect(
        userConstants.qDivision,
        defaultGiaQualification,
    );
    // 협회자격관리 - 생보협 등록번호
    const [liaNo] = useInput(defaultLiaNo, { noSpace: true });
    // 협회자격관리 - 생보협 등록보험사
    const [liaComp] = useSelect(
        companies.filter((v) => v.origin.dist === '생명'),
        defaultLiaComp,
    );
    // 협회자격관리 - 생보협 등록일
    const [liaIndate] = useDatepicker(
        defaultLiaIndate ? new Date(defaultLiaIndate) : null,
    );
    // 협회자격관리 - 생보협 말소일
    const [liaOutdate] = useDatepicker(
        defaultLiaOutdate ? new Date(defaultLiaOutdate) : null,
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
        if (estSalesNmInputType.value?.value === '본인이름') {
            setEstSalesNm(name.value);
        }
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
            createUser(createUserDto.getPayload(), ({ userid }) => {
                if (userid) {
                    // 프로필 사진을 설정한 경우
                    if (lastSetPortraitImageFile) {
                        const formData = new FormData();

                        formData.append('file', lastSetPortraitImageFile);

                        upload(
                            {
                                userid,
                                formData,
                            },
                            () => {
                                alert('사용자가 등록되었습니다.');
                            },
                        );
                    } else {
                        alert('사용자가 등록되었습니다.');
                    }
                }
            });
        }
    };

    const handleUpdate = () => {
        const payload = createPayload();

        const updateUserDto = new UpdateUserDTO(payload);

        if (updateUserDto.requiredValidate()) {
            updateUser(updateUserDto.getPayload(), ({ Message }) => {
                if (Message === 'Success') {
                    // 프로필 사진을 설정한 경우
                    if (lastSetPortraitImageFile) {
                        const formData = new FormData();

                        formData.append('file', lastSetPortraitImageFile);

                        upload(
                            {
                                userid,
                                formData,
                            },
                            () => {
                                alert('수정되었습니다.');
                            },
                        );
                    } else {
                        alert('수정되었습니다.');
                    }
                }
            });
        }
    };

    const createPayload = () => {
        const payload: any = {
            name: name.value,
            mobile: mobile.value.replace(/-/g, ''),
            mobile_com: mobileCom.value!.value,
            idnum1: idnum1.value.replace(/-/g, ''),
            orga_idx: -1,
            remove: {},
            est_val: {
                comNm: {
                    kind: estComInputType.value?.value,
                    val: estComNm.value,
                },
                salesNm: {
                    kind: estSalesNmInputType.value?.value,
                    val: estSalesNm.value,
                },
                phone: {
                    kind: estPhoneInputType.value?.value,
                    val: estPhone.value.replace(/-/g, ''),
                },
                fax: {
                    kind: estFaxInputType.value?.value,
                    val: estFax.value.replace(/-/g, ''),
                },
                direct: {
                    kind: estDirectInputType.value?.value,
                    val: estDirect.value.replace(/-/g, ''),
                },
                address: {
                    kind: estAddrInputType.value?.value,
                    val: estAddr.value,
                },
            },
            cal: {
                idx: defaultCalIdx,
                long_grade: longGrade.checked,
            },
            guarantee: guarantees.map(({ available, ...rest }) => ({
                ...rest,
            })),
            fccode: codes,
            permission: {
                idx: defaultPermissionIdx,
                permission: {
                    system: {
                        use_web: useWeb.checked,
                        use_mobile: useMobile.checked,
                    },
                },
            },
            associate: [
                {
                    idx: defaultGiaIdx,
                    type: '손보',
                    no: giaNo.value,
                    wcode: giaComp.value ? +giaComp.value.value : null,
                    indate: giaIndate.value
                        ? dayjs(giaIndate.value).format('YYYY-MM-DD')
                        : null,
                    outdate: giaOutdate.value
                        ? dayjs(giaOutdate.value).format('YYYY-MM-DD')
                        : null,
                    qualification: giaQualification.value!.label,
                },
                {
                    idx: defaultLiaIdx,
                    type: '생보',
                    no: liaNo.value,
                    wcode: liaComp.value ? +liaComp.value.value : null,
                    indate: liaIndate.value
                        ? dayjs(liaIndate.value).format('YYYY-MM-DD')
                        : null,
                    outdate: liaOutdate.value
                        ? dayjs(liaOutdate.value).format('YYYY-MM-DD')
                        : null,
                    qualification: liaQualification.value!.label,
                },
            ],
        };

        if (idx !== -1) {
            payload['idx'] = idx;
        }

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
            payload['telephone'] = telephone.value.replace(/-/g, '');
        }

        if (!isEmpty(telDirect.value)) {
            payload['tel_direct'] = telDirect.value.replace(/-/g, '');
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
            payload.cal!['car_cal_type'] = carType;
        }

        if (!isEmpty(genType)) {
            payload.cal!['gen_cal_type'] = genType;
        }

        if (genBase.value) {
            payload.cal!['gen_cal_base'] = +genBase.value.value;
        }

        if (!isEmpty(genRate.value)) {
            payload.cal!['gen_cal_ratio'] = +genRate.value;
        }

        if (removedGuarantees.length > 0) {
            payload['remove'].guarantee = removedGuarantees.map((v) => v.idx);
        }

        if (removedCodes.length > 0) {
            payload['remove'].fccode = removedCodes.map((v) => v.idx);
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
            if (orga.fax) {
                if (estFaxInputType.value?.value === '지점팩스') {
                    setEstFax(convertPhoneNumber(orga.fax));
                }
            }
        }
    }, [orga, estFaxInputType, setEstFax]);

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
                                                    disabled={!isEditable}
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
                                                    disabled={!isEditable}
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
                                                    disabled={!isEditable}
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
                                                    disabled={!isEditable}
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
                                                        disabled={!isEditable}
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
                                                        disabled={!isEditable}
                                                        {...telephone}
                                                    />
                                                    <MyInput
                                                        type="text"
                                                        placeholder="직통번호"
                                                        disabled={!isEditable}
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
                                                        disabled={!isEditable}
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
                                                            lastSetPortraitImagePreview
                                                                ? lastSetPortraitImagePreview
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
                                                        value={userid}
                                                        disabled
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
                                                        disabled
                                                        onClick={
                                                            onClickPostcode
                                                        }
                                                        {...postcode}
                                                        button={{
                                                            type: 'button',
                                                            disabled:
                                                                !isEditable,
                                                            onClick:
                                                                onClickPostcode,
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
                                                    disabled
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
                                                    disabled={!isEditable}
                                                    {...address3}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <MyInput
                                                    type="text"
                                                    placeholder="주소2"
                                                    disabled
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
                                                        {...estComInputType}
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estComNm"
                                                    placeholder="회사명"
                                                    disabled={
                                                        isEditable
                                                            ? estComInputType
                                                                  .value
                                                                  ?.value !==
                                                              '직접입력'
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
                                                        {...estSalesNmInputType}
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estSalesNm"
                                                    placeholder="견적영업명"
                                                    disabled={
                                                        isEditable
                                                            ? estSalesNmInputType
                                                                  .value
                                                                  ?.value !==
                                                              '직접입력'
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
                                                        {...estPhoneInputType}
                                                    />
                                                </div>
                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estPhone"
                                                    placeholder="대표전화"
                                                    disabled={
                                                        isEditable
                                                            ? estPhoneInputType
                                                                  .value
                                                                  ?.value !==
                                                              '직접입력'
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
                                                        {...estFaxInputType}
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estFax"
                                                    placeholder="팩스번호"
                                                    disabled={
                                                        isEditable
                                                            ? estFaxInputType
                                                                  .value
                                                                  ?.value !==
                                                              '직접입력'
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
                                                        {...estDirectInputType}
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="direct"
                                                    placeholder="직통전화"
                                                    disabled={
                                                        isEditable
                                                            ? estDirectInputType
                                                                  .value
                                                                  ?.value !==
                                                              '직접입력'
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
                                                        {...estAddrInputType}
                                                    />
                                                </div>

                                                <MyInput
                                                    type="text"
                                                    className="wr-border-l--hide"
                                                    id="estAddress"
                                                    placeholder="표기주소"
                                                    disabled={
                                                        isEditable
                                                            ? estAddrInputType
                                                                  .value
                                                                  ?.value !==
                                                              '직접입력'
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
