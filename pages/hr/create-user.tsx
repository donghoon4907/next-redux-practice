import type { NextPage } from 'next';
import type { CoreSelectOption, CoreTabOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { UserState } from '@reducers/hr';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getOrgasRequest } from '@actions/user/get-orgas';
import {
    BIRTH_TYPE,
    EMAIL_COM,
    EMP_STATUS,
    MOBILE_COM,
    USER_TYPE,
} from '@constants/selectOption';
import {
    CreateUserRequestPayload,
    createUserRequest,
} from '@actions/user/create.action';
import { MyFooter } from '@components/footer';

const CreateUser: NextPage = () => {
    const dispatch = useDispatch();

    const { selectedDepart } = useSelector<AppState, UserState>(
        (state) => state.user,
    );

    const createUser = useApi(createUserRequest);

    const [tab, setTab] = useState<CoreTabOption>(HR_DETAIL_TABS[0]);
    // 고객명
    const name = useInput('홍길동');
    // 직함
    const title = useInput('실장');
    // 주민번호
    const idnum1 = useInput('900512-2183512');
    // 생년월일
    const birthday = useInput('1990-05-12');
    // 양력 or 음력
    const [birthType, setBirthType] = useState<CoreSelectOption | null>(
        BIRTH_TYPE[0],
    );
    // 핸드폰
    const mobile = useInput('010-1234-5678');
    // 통신사
    const [mobileCom, setMobileCom] = useState<CoreSelectOption | null>(
        MOBILE_COM[0],
    );
    // 내선번호
    const telephone = useInput('070-4881-6052');
    // 직통번호
    const telDirect = useInput('6052');
    // 이메일
    const email = useInput('tester');
    // 이메일2
    const [emailCom, setEmailCom] = useState<CoreSelectOption | null>(
        EMAIL_COM[0],
    );
    // 우편번호
    const postcode = useInput('08195');
    // 주소 검색 1
    const address1 = useInput('경기도 안양시 동안구 시민대로 383');
    // 주소 검색 상세
    const address2 = useInput('(관양동, 디지털엠파이어빌딩)');
    // 상세 주소
    const address3 = useInput('B동 1102호');
    // 영업가족
    const [userType, setUserType] = useState<CoreSelectOption | null>(
        USER_TYPE[0],
    );
    // 재직현황
    const [status, setStatus] = useState<CoreSelectOption | null>(
        EMP_STATUS[0],
    );
    // 입사일
    const indate = useInput('2023-01-01');
    // 퇴사일
    const outdate = useInput('2023-12-31');

    const handleClickTab = (tab: CoreTabOption) => {
        setTab(tab);
    };

    const handleChangeBirthType = (birthType: CoreSelectOption | null) => {
        setBirthType(birthType);
    };

    const handleChangeMobileCom = (mobileCom: CoreSelectOption | null) => {
        setMobileCom(mobileCom);
    };

    const handleChangeEmailCom = (emailCom: CoreSelectOption | null) => {
        setEmailCom(emailCom);
    };

    const handleChangeUserType = (emailCom: CoreSelectOption | null) => {
        setUserType(emailCom);
    };

    const handleChangeStatus = (userType: CoreSelectOption | null) => {
        setStatus(userType);
    };

    const handleSubmit = () => {
        if (name.value === '') {
            return alert('고객명을 입력하세요.');
        }

        if (mobile.value === '') {
            return alert('핸드폰을 입력하세요.');
        }

        if (selectedDepart.label === '') {
            return alert('부서를 선택하세요.');
        }

        const payload: CreateUserRequestPayload = {
            name: name.value,
            mobile: mobile.value,
            orga_idx: +selectedDepart.value,
        };

        if (title.value !== '') {
            payload['title'] = title.value;
        }

        if (idnum1.value !== '') {
            payload['idnum1'] = idnum1.value;
        }

        if (birthday.value !== '') {
            payload['birthday'] = birthday.value;
        }

        if (birthType?.value === 'Y') {
            payload['birth_type'] = true;
        } else if (birthType?.value === 'N') {
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

        if (userType?.value) {
            payload['user_type'] = userType.value;
        }

        if (status?.value) {
            payload['status'] = status.value;
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

    useEffect(() => {
        dispatch(
            getOrgasRequest({
                idx: 1,
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
                <div className="wr-pages-detail wr-form row">
                    <div className="col-4">
                        <div className="wr-pages-detail__left wr-frame__section">
                            <div className="wr-pages-detail__block">
                                <div className="wr-group">
                                    <span className="wr-pages-detail__department">
                                        {selectedDepart.label
                                            ? selectedDepart.label
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
                            <div className="wr-pages-detail__block">
                                <div className="row">
                                    <div className="col-8">
                                        <WithLabel
                                            id="name"
                                            label="고객명"
                                            type="active"
                                            isRequired
                                        >
                                            <MyInput
                                                type="text"
                                                id="name"
                                                placeholder="고객명"
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
                                            <div className="wr-pages-detail__with">
                                                <MyInput
                                                    type="text"
                                                    id="birthday"
                                                    placeholder="생년월일"
                                                    {...birthday}
                                                />
                                                <MySelect
                                                    options={BIRTH_TYPE}
                                                    value={birthType}
                                                    onChange={
                                                        handleChangeBirthType
                                                    }
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                />
                                            </div>
                                        </WithLabel>
                                        <WithLabel
                                            id="mobile"
                                            label="핸드폰"
                                            type="active"
                                            isRequired
                                        >
                                            <div className="wr-pages-detail__with">
                                                <MyInput
                                                    type="text"
                                                    id="mobile"
                                                    placeholder="핸드폰"
                                                    {...mobile}
                                                />
                                                <MySelect
                                                    options={MOBILE_COM}
                                                    value={mobileCom}
                                                    onChange={
                                                        handleChangeMobileCom
                                                    }
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                />
                                            </div>
                                        </WithLabel>
                                        <WithLabel
                                            id="telephone"
                                            label="내선번호"
                                            type="active"
                                        >
                                            <div className="wr-pages-detail__with">
                                                <MyInput
                                                    type="text"
                                                    id="telephone"
                                                    placeholder="내선번호"
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
                                            <div className="wr-pages-detail__with">
                                                <MyInput
                                                    type="text"
                                                    id="email"
                                                    placeholder="이메일"
                                                    {...email}
                                                />
                                                <MySelect
                                                    options={EMAIL_COM}
                                                    value={emailCom}
                                                    onChange={
                                                        handleChangeEmailCom
                                                    }
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                />
                                            </div>
                                        </WithLabel>
                                    </div>
                                    <div className="col-4">
                                        <div className="wr-ml">
                                            <div className="wr-pages-detail__avatar">
                                                <img
                                                    src="http://via.placeholder.com/200x255"
                                                    className="img-thumbnail"
                                                    alt="..."
                                                />
                                            </div>
                                            <WithLabel
                                                id="user_type"
                                                label="영업가족"
                                                type="active"
                                            >
                                                <MySelect
                                                    inputId="user_type"
                                                    options={USER_TYPE}
                                                    value={userType}
                                                    onChange={
                                                        handleChangeUserType
                                                    }
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="status"
                                                label="재직현황"
                                                type="active"
                                            >
                                                <MySelect
                                                    inputId="status"
                                                    options={EMP_STATUS}
                                                    value={status}
                                                    onChange={
                                                        handleChangeStatus
                                                    }
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="row">
                                    <div className="col">
                                        <div className="row wr-mb">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="postcode"
                                                    label="주소"
                                                    type="active"
                                                >
                                                    <div className="wr-pages-detail__with">
                                                        <MyInput
                                                            type="text"
                                                            id="postcode"
                                                            placeholder="우편번호"
                                                            readOnly
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
                                                        type="email"
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
                                                        readOnly
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
                                                        <MyInput
                                                            type="text"
                                                            id="outdate"
                                                            placeholder="퇴사일"
                                                            {...outdate}
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <WithLabel
                                            id="attractor"
                                            label="유치자"
                                            type="active"
                                        >
                                            <MyInput
                                                type="text"
                                                id="attractor"
                                                placeholder="홍길순 (W0010)"
                                                readOnly
                                                button={{
                                                    type: 'button',
                                                    children: (
                                                        <>
                                                            <span>찾기</span>
                                                        </>
                                                    ),
                                                }}
                                            />
                                        </WithLabel> */}
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="row">
                                    <div className="col">
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
                                                        placeholder={'국민은행'}
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
                                                            value="123456-01-32423934"
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
                                                        value="홍길동"
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
                                                        placeholder={'과세'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="incomeCategory"
                                                    label="소득구분"
                                                    type="disable"
                                                >
                                                    <MySelect
                                                        inputId="incomeCategory"
                                                        options={[]}
                                                        value={null}
                                                        onChange={() => {}}
                                                        placeholder={
                                                            '근로 + 사업'
                                                        }
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
                                                        id="paymentSystem"
                                                        label="지급제도"
                                                        type="disable"
                                                    >
                                                        <MySelect
                                                            inputId="paymentSystem"
                                                            options={[]}
                                                            value={null}
                                                            onChange={() => {}}
                                                            placeholder={'S3-2'}
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                            height={
                                                                variables.detailFilterHeight
                                                            }
                                                            isDisabled={true}
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="payoutRate"
                                                    label="지급율"
                                                    type="disable"
                                                >
                                                    <MySelect
                                                        inputId="payoutRate"
                                                        options={[]}
                                                        value={null}
                                                        onChange={() => {}}
                                                        placeholder={
                                                            '기본 + 성과'
                                                        }
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
                                                    <MyInput
                                                        type="number"
                                                        placeholder="지급율 수치"
                                                        value="85"
                                                        unit="%"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="wr-pages-detail__right">
                            <div className="wr-pages-detail__lock">
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
                            <div className="wr-pages-detail__body wr-frame__tabbody"></div>
                        </div>
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-pages-detail__footer">
                        <div></div>
                        <div>
                            <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                onClick={handleSubmit}
                            >
                                등록
                            </button>
                        </div>
                    </div>
                </MyFooter>
            </MyLayout>
        </>
    );
};

export default CreateUser;
