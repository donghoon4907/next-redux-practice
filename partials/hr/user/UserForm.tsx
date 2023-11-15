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
import { updateUserRequest } from '@actions/hr/update-user.action';
import { usePostcode } from '@hooks/use-postcode';
import { convertPhoneNumber } from '@utils/converter';
import { uploadPortraitRequest } from '@actions/upload/portrait.action';
import {
    useInput,
    useNumbericInput,
    usePhoneInput,
    useResidentNumberInput,
} from '@hooks/use-input';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { MyUnit } from '@components/Unit';
import { SetPostcodeInput } from '@partials/common/input/SetPostcode';
import { FloatSelect } from '@components/select/Float';
import { UserEstimateAccordion } from '@components/accordion/UserEstimate';
import { OrgaQualManageTabpanel } from '../orga/tabpanels/QualManage';

interface Props {
    /**
     * 모드: 등록 / 수정
     */
    mode: 'create' | 'update';
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
    defaultBirthType?: boolean;
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
    defaultBirthType = true,
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
    defaultUserType = userConstants.type[0],
    defaultStatus = userConstants.status[0],
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
        allCompanies,
        orga,
        guarantees,
        codes,
        removedGuarantees,
        removedCodes,
    } = useSelector<AppState, HrState>((state) => state.hr);

    const { lastSetPortraitImageFile, lastSetPortraitImagePreview } =
        useSelector<AppState, UploadState>((state) => state.upload);

    const getSimpleOrga = useApi(getOrgaRequest);

    const createUser = useApi(createUserRequest);

    const updateUser = useApi(updateUserRequest);

    const upload = useApi(uploadPortraitRequest);
    // 탭 관리
    const [tab, setTab] = useTab(HR_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    const labelType = editable ? 'active' : 'disable';
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
    const [birthType, setBirthType] = useState(defaultBirthType);
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
        { disabled: !editable },
    );
    // 상세 주소
    const [address3] = useInput(defaultAddress3);
    // 영업구분
    const [userType] = useSelect(userConstants.type, defaultUserType);
    // 재직현황
    const [status] = useSelect(userConstants.status.slice(1), defaultStatus);
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
        allCompanies.filter((v) => v.origin.dist === '손해'),
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
        allCompanies.filter((v) => v.origin.dist === '생명'),
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
    // 썸네일
    let thumbnail = 'http://via.placeholder.com/195x206';
    if (userid) {
        thumbnail = `${process.env.STORAGE_PATH}/user/${userid}.jpg`;
    }

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
    // 음/양력 클릭 핸들러
    const handleClickBirthType = () => {
        setBirthType(!birthType);
    };
    // 프로필 사진 클릭 핸들러
    const handleClickImage = () => {
        if (editable) {
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
            location.reload();
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
            payload['birth_type'] = birthType;
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
            getSimpleOrga({ idx: selectedOrga.value });
        }
    }, [selectedOrga]);

    useEffect(() => {
        if (orga) {
            if (orga.fax) {
                if (estFaxInputType.value?.value === '지점팩스') {
                    setEstFax(convertPhoneNumber(orga.fax));
                }
            }
        }
    }, [orga, estFaxInputType.value]);

    return (
        <>
            <div className={`${displayName} wr-pages-detail wr-frame__tabbody`}>
                <div
                    className={`${displayName}__left wr-pages-detail__left wr-pages-detail__applydatepicker`}
                >
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content p-15">
                            <div className="wr-group">
                                <span
                                    className={`${displayName}__department ${
                                        selectedOrga ? '' : 'wr-label--required'
                                    }`}
                                >
                                    {selectedOrga
                                        ? selectedOrga.label
                                        : '부서를 선택하세요'}
                                </span>
                                {editable && (
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
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="flex-fill">
                                    <FloatInput
                                        label="이름"
                                        readOnly={!editable}
                                        isRequired
                                        {...name}
                                    />
                                    <div className="wr-mt">
                                        <FloatInput
                                            label="영업명"
                                            readOnly={!editable}
                                            isRequired
                                            {...nick}
                                        />
                                    </div>
                                    <div className="wr-mt">
                                        <FloatInput
                                            label="직함"
                                            readOnly={!editable}
                                            isRequired
                                            {...title}
                                        />
                                    </div>
                                    <div className="wr-mt">
                                        <FloatInput
                                            label="주민번호"
                                            readOnly={!editable}
                                            isRequired
                                            {...idnum1}
                                        />
                                    </div>
                                    <div className="wr-mt">
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
                                                    {birthType
                                                        ? '양력'
                                                        : '음력'}
                                                </MyUnit>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <FloatInput
                                        label="사원번호"
                                        readOnly={!editable}
                                        isRequired
                                        value={userid}
                                        disabled
                                    />
                                    <div
                                        className={`${displayName}__avatar wr-mt ${
                                            editable ? 'wr-cursor--pointer' : ''
                                        }`}
                                        role="button"
                                        onClick={handleClickImage}
                                    >
                                        {lastSetPortraitImagePreview && (
                                            <img
                                                src={
                                                    lastSetPortraitImagePreview
                                                }
                                                alt="Avatar"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="flex-fill">
                                    <FloatSelect
                                        label="영업구분"
                                        isDisabled={!editable}
                                        {...userType}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <FloatSelect
                                        label="재직현황"
                                        isDisabled={!editable}
                                        {...status}
                                    />
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="flex-fill">
                                    <FloatDatepicker
                                        label="입사일"
                                        readOnly={!editable}
                                        isRequired
                                        hooks={indate}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <FloatDatepicker
                                        label="퇴사일"
                                        readOnly={!editable}
                                        hooks={outdate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="flex-fill d-flex">
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
                                            label="통신사"
                                            isDisabled={!editable}
                                            isConnectBefore
                                            {...mobileCom}
                                        />
                                    </div>
                                </div>
                                <div className="flex-fill d-flex">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="내선번호"
                                            readOnly={!editable}
                                            isConnectAfter
                                            {...telephone}
                                        />
                                    </div>

                                    <div style={{ width: 80 }}>
                                        <FloatInput
                                            label="직통번호"
                                            readOnly={!editable}
                                            isConnectBefore
                                            {...telDirect}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <WithSelectInput
                                        id="email"
                                        label="이메일"
                                        selectWidth={140}
                                        labelType={labelType}
                                        inputHooks={email}
                                        selectHooks={emailCom}
                                        disabled={!editable}
                                    />  */}
                            <div className="row wr-mt">
                                <div className="flex-fill d-flex">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="이메일"
                                            readOnly={!editable}
                                            isConnectAfter
                                            {...mobile}
                                        />
                                    </div>
                                    <div style={{ width: 130 }}>
                                        <FloatSelect
                                            label="플랫폼"
                                            isDisabled={!editable}
                                            isConnectBefore
                                            {...emailCom}
                                        />
                                    </div>
                                </div>
                                <div className="flex-fill d-flex"></div>
                            </div>
                            <SetPostcodeInput
                                activeMarginTop
                                disabled={!editable}
                                postcodeHooks={postcode}
                                address1Hooks={address1}
                                address2Hooks={address2}
                                address3Hooks={address3}
                                onClickPostcode={onClickPostcode}
                            />
                        </div>
                    </div>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="flex-fill">
                                    <FloatSelect
                                        label="은행명"
                                        isDisabled={!editable}
                                        {...bank}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <FloatInput
                                        label="예금주"
                                        readOnly={!editable}
                                        {...holder}
                                    />
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="flex-fill">
                                    <FloatInput
                                        label="계좌번호"
                                        readOnly={!editable}
                                        {...account}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content p-15">
                            <UserEstimateAccordion
                                editable={editable}
                                comNmHooks={estComNm}
                                comTypeHooks={estComInputType}
                                salesNmHooks={estSalesNm}
                                salesTypeHooks={estSalesNmInputType}
                                phoneHooks={estPhone}
                                phoneTypeHooks={estPhoneInputType}
                                faxHooks={estFax}
                                faxTypeHooks={estFaxInputType}
                                directHooks={estDirect}
                                directTypeHooks={estDirectInputType}
                                addressHooks={estAddr}
                                addressTypeHooks={estAddrInputType}
                            />
                        </div>
                    </div>
                </div>
                <div className="wr-pages-detail__right">
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
                    <div className="wr-pages-detail__body">
                        <IncomeTabpanel
                            id="tabpanelIncome"
                            tabId="tabIncome"
                            hidden={tab.id !== 'tabIncome'}
                            editable={editable}
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
                            editable={editable}
                        />
                        <AuthorityTabpanel
                            id="tabpanelAuthority"
                            tabId="tabAuthority"
                            hidden={tab.id !== 'tabAuthority'}
                            editable={editable}
                            useWeb={useWeb}
                            useMobile={useMobile}
                        />
                        <OrgaQualManageTabpanel
                            id="tabpanelAsso"
                            tabId="tabAsso"
                            hidden={tab.id !== 'tabAsso'}
                            editable={editable}
                            d_no={giaNo}
                            d_company={giaComp}
                            d_indate={giaIndate}
                            d_outdate={giaOutdate}
                            d_manager={giaQualification}
                            l_no={liaNo}
                            l_company={liaComp}
                            l_indate={liaIndate}
                            l_outdate={liaOutdate}
                            l_manager={liaQualification}
                        />
                    </div>
                </div>
            </div>
            <MyFooter>
                <div className="wr-footer__between">
                    <div></div>
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
            <SelectDepartModal />
            <ImageUploadModal />
            <GuaranteeSettingModal />
            <CodeSettingModal />
        </>
    );
};
