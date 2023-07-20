import type { NextPage } from 'next';
import type { CoreTabOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { UploadState } from '@reducers/upload';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { MySelect } from '@components/select';
import { HR_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { MyLayout } from '@components/Layout';
import { useInput } from '@hooks/use-input';
import { useApi } from '@hooks/use-api';
import { showDepartSearchModal } from '@actions/modal/depart-search.action';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { MyFooter } from '@components/footer';
import { MyButton } from '@components/button';
import { SelectDepartModal } from '@components/modal/SelectDepart';
import { ImageUploadModal } from '@components/modal/ImageUpload';
import { useSelect } from '@hooks/use-select';
import { showImageUploadModal } from '@actions/modal/image-upload.action';
import { wrapper } from '@store/redux';
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

const CreateUser: NextPage = () => {
    const dispatch = useDispatch();

    const { selectedOrga } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { lastUploadedPortraitImage } = useSelector<AppState, UploadState>(
        (state) => state.upload,
    );

    const open = useDaumPostcodePopup();

    const createUser = useApi(createUserRequest);

    const [tab, setTab] = useState<CoreTabOption>(HR_DETAIL_TABS[0]);
    // 별칭
    const [nick] = useInput('');
    // 이름
    const [name] = useInput('');
    // 직함
    const [title] = useInput('');
    // 주민번호
    const [idnum1] = useInput('');
    // 생년월일
    const [birthday] = useInput('');
    // 양력 or 음력
    const [birthType] = useSelect(BIRTH_TYPE);
    // 핸드폰
    const [mobile] = useInput('');
    // 통신사
    const [mobileCom] = useSelect(MOBILE_COM);
    // 내선번호
    const [telephone] = useInput('');
    // 직통번호
    const [telDirect] = useInput('');
    // 이메일
    const [email] = useInput('');
    const [emailCom] = useSelect(EMAIL_COM);
    // 우편번호
    const [postcode, setPostcode] = useInput('');
    // 주소 검색 1
    const [address1, setAddress1] = useInput('');
    // 주소 검색 상세
    const [address2, setAddress2] = useInput('');
    // 상세 주소
    const [address3] = useInput('');
    // 영업가족
    const [userType] = useSelect(USER_TYPE);
    // 재직현황
    const [status] = useSelect(EMP_STATUS);
    // 입사일
    const [indate] = useInput('');
    // 퇴사일
    const [outdate] = useInput('');
    // 비교견적 설정 - 회사명
    const [estComNm] = useInput('');
    const [estComInputType] = useSelect(ESTIMATE_COMP);
    // 비교견적 설정 - 영업명
    const [estSalesNm] = useInput('');
    const [estSalesNmInputType] = useSelect(ESTIMATE_SALES);
    // 비교견적 설정 - 대표전화
    const [estPhone] = useInput('');
    const [estPhoneInputType] = useSelect(ESTIMATE_PHONE);
    // 비교견적 설정 - 팩스번호
    const [estFax] = useInput('');
    const [estFaxInputType] = useSelect(ESTIMATE_FAX);
    // 비교견적 설정 - 직통전화
    const [estDirect] = useInput('');
    const [estDirectInputType] = useSelect(ESTIMATE_DIRECT);
    // 비교견적 설정 - 표기주소
    const [estAddr] = useInput('');
    const [estAddrInputType] = useSelect(ESTIMATE_ADDRESS);

    const handleClickTab = (tab: CoreTabOption) => {
        setTab(tab);
    };

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

    const handleClickPostcode = () => {
        open({ onComplete: handleCompletePostcode });
    };

    const handleSubmit = () => {
        if (name.value === '') {
            return alert('이름을 입력하세요.');
        }

        if (mobile.value === '') {
            return alert('핸드폰을 입력하세요.');
        } else {
            const phoneNumberRegex = /^01(?:0|1|[6-9])-(?:\d{3,4})-\d{4}$/;

            if (!phoneNumberRegex.test(mobile.value)) {
                return alert('핸드폰을 확인하세요.');
            }
        }

        if (selectedOrga.label === '') {
            return alert('부서를 선택하세요.');
        }

        const payload: CreateUserRequestPayload = {
            name: name.value,
            mobile: mobile.value,
            orga_idx: +selectedOrga.value,
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
            payload['nick'] = nick.value;
        }

        if (title.value !== '') {
            payload['title'] = title.value;
        }

        if (idnum1.value !== '') {
            payload['idnum1'] = idnum1.value;
        }

        if (birthday.value !== '') {
            payload['birthday'] = birthday.value;
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
            payload['email'] = `${email.value}@${emailCom?.value}`;
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

        if (indate.value !== '') {
            payload['indate'] = indate.value;
        }

        if (outdate.value !== '') {
            payload['outdate'] = outdate.value;
        }

        createUser(payload);
    };

    const handleClickDepart = () => {
        dispatch(showDepartSearchModal());
    };

    const handleClickImage = () => {
        dispatch(showImageUploadModal());
    };

    useEffect(() => {
        dispatch(
            getOrgasRequest({
                idx: '1',
            }),
        );
    }, [dispatch]);

    return (
        <>
            <Head>
                <title>사용자등록</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className="wr-pages-hr-detail wr-form row">
                    <div className="col wr-pages-hr-detail__left">
                        <div className="wr-frame__section">
                            <div className="wr-pages-hr-detail__block">
                                <div className="wr-pages-hr-detail__content">
                                    <div className="wr-group">
                                        <span className="wr-pages-hr-detail__department">
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
                            <div className="wr-pages-hr-detail__block">
                                <div className="wr-pages-hr-detail__content">
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
                                                    placeholder="000000-0000000"
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
                                                <div className="wr-pages-hr-detail__with">
                                                    <MyInput
                                                        type="text"
                                                        id="birthday"
                                                        placeholder="YYYY-MM-DD"
                                                        {...birthday}
                                                    />
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        {...birthType}
                                                    />
                                                </div>
                                            </WithLabel>
                                            <WithLabel
                                                id="mobile"
                                                label="핸드폰"
                                                type="active"
                                                isRequired
                                            >
                                                <div className="wr-pages-hr-detail__with">
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
                                                <div className="wr-pages-hr-detail__with">
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
                                                <div className="wr-pages-hr-detail__with">
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
                                                <div className="wr-pages-hr-detail__avatar wr-mb">
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
                                                        placeholder="W0000"
                                                        readOnly
                                                    />
                                                </WithLabel>
                                                <WithLabel
                                                    id="user_type"
                                                    label="영업가족"
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
                            <div className="wr-pages-hr-detail__block">
                                <div className="wr-pages-hr-detail__content">
                                    <div className="row wr-mb">
                                        <div className="col-6">
                                            <WithLabel
                                                label="주소"
                                                type="active"
                                            >
                                                <div className="wr-pages-hr-detail__with">
                                                    <MyInput
                                                        type="text"
                                                        placeholder="우편번호"
                                                        readOnly
                                                        onClick={
                                                            handleClickPostcode
                                                        }
                                                        {...postcode}
                                                        // button={{
                                                        //     type: 'button',
                                                        //     children: (
                                                        //         <>
                                                        //             <span>
                                                        //                 찾기
                                                        //             </span>
                                                        //         </>
                                                        //     ),
                                                        // }}
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <MyInput
                                                    type="text"
                                                    placeholder=""
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
                                                    placeholder=""
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
                                                <MyInput
                                                    type="text"
                                                    id="indate"
                                                    placeholder="YYYY-MM-DD"
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
                                                    <MyInput
                                                        type="text"
                                                        id="outdate"
                                                        placeholder="YYYY-MM-DD"
                                                        {...outdate}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-hr-detail__block">
                                <div className="wr-pages-hr-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            <WithLabel
                                                id="bank"
                                                label="은행명"
                                                type="disable"
                                            >
                                                <MySelect
                                                    inputId="bank"
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={true}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="account"
                                                    label="계좌번호"
                                                    type="disable"
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="account"
                                                        placeholder="계좌번호"
                                                        readOnly
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="holder"
                                                label="예금주"
                                                type="disable"
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="holder"
                                                    placeholder="예금주"
                                                    readOnly
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <MySelect
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-hr-detail__block">
                                <div className="wr-pages-hr-detail__title">
                                    <strong>비교견적 설정</strong>
                                </div>
                                <div className="wr-pages-hr-detail__content">
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
                    <div className="col wr-pages-hr-detail__right wr-ml">
                        <div className="wr-pages-hr-detail__lock">
                            <p>사용자 등록 후 이용할 수 있습니다.</p>
                        </div>
                        <ul className="wr-tab__wrap" role="tablist">
                            {HR_DETAIL_TABS.map((v) => (
                                <MyTab
                                    key={v.id}
                                    onClick={handleClickTab}
                                    isActive={v.id === tab.id}
                                    {...v}
                                />
                            ))}
                            <li className="wr-tab__line"></li>
                        </ul>
                        <div className="wr-pages-hr-detail__body wr-frame__tabbody"></div>
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-footer__between">
                        <div></div>
                        <div>
                            <MyButton
                                type="button"
                                className="btn-primary"
                                onClick={handleSubmit}
                            >
                                등록
                            </MyButton>
                        </div>
                    </div>
                </MyFooter>
            </MyLayout>
            <SelectDepartModal />
            <ImageUploadModal />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch, sagaTask }) =>
        async (_) => {
            dispatch(END);

            await sagaTask?.toPromise();

            return {
                props: {},
            };
        },
);

export default CreateUser;
