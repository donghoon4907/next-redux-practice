import type { FC } from 'react';
import type { CoreSelectOption, CoreTabOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { UserState } from '@reducers/hr';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MySelect } from '@components/select';
import { DETAIL_PAGE_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
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
import { useSelect } from '@hooks/use-select';
import { MyLayout } from '@components/Layout';

interface Props {
    type: 'create' | 'update';
    submitBtnText: string;
    defaultName?: string;
    defaultTitle?: string;
    defaultIdnum1?: string;
    defaultBirthDay?: string;
    defaultBirthType?: CoreSelectOption;
    defaultMobile?: string;
    defaultMobileCom?: CoreSelectOption;
    defaultTelephone?: string;
    defaultTelDirect?: string;
    defaultEmail?: string;
    defaultEmailCom?: CoreSelectOption;
    defaultPostcode?: string;
    defaultAdress1?: string;
    defaultAdress2?: string;
    defaultAdress3?: string;
    defaultUserType?: CoreSelectOption;
    defaultStatus?: CoreSelectOption;
    defaultIndate?: string;
    defaultOutdate?: string;
}

export const PartialUserMeta: FC<Props> = ({
    type,
    submitBtnText,
    defaultName = '홍길동',
    defaultTitle = '실장',
    defaultIdnum1 = '900512-2183512',
    defaultBirthDay = '1990-05-12',
    defaultBirthType = BIRTH_TYPE[0],
    defaultMobile = '010-1234-5678',
    defaultMobileCom = MOBILE_COM[0],
    defaultTelephone = '070-4881-6052',
    defaultTelDirect = '6052',
    defaultEmail = 'tester',
    defaultEmailCom = EMAIL_COM[0],
    defaultPostcode = '08195',
    defaultAdress1 = '경기도 안양시 동안구 시민대로 383',
    defaultAdress2 = '(관양동, 디지털엠파이어빌딩)',
    defaultAdress3 = 'B동 1102호',
    defaultUserType = USER_TYPE[0],
    defaultStatus = EMP_STATUS[0],
    defaultIndate = '2023-01-01',
    defaultOutdate = '2023-12-31',
}) => {
    const dispatch = useDispatch();

    const { selectedDepart } = useSelector<AppState, UserState>(
        (state) => state.user,
    );

    const callApi = useApi(
        type === 'create' ? createUserRequest : createUserRequest,
    );
    // 탭 관리
    const [tab, setTab] = useState<CoreTabOption>(DETAIL_PAGE_TABS[0]);
    // 고객명
    const name = useInput(defaultName);
    // 직함
    const title = useInput(defaultTitle);
    // 주민번호
    const idnum1 = useInput(defaultIdnum1);
    // 생년월일
    const birthday = useInput(defaultBirthDay);
    // 양력 or 음력
    const birthType = useSelect(defaultBirthType);
    // 핸드폰
    const mobile = useInput(defaultMobile);
    // 통신사
    const mobileCom = useSelect(defaultMobileCom);
    // 내선번호
    const telephone = useInput(defaultTelephone);
    // 직통번호
    const telDirect = useInput(defaultTelDirect);
    // 이메일
    const email = useInput(defaultEmail);
    // 이메일2
    const emailCom = useSelect(defaultEmailCom);
    // 우편번호
    const postcode = useInput(defaultPostcode);
    // 주소 검색 1
    const address1 = useInput(defaultAdress1);
    // 주소 검색 상세
    const address2 = useInput(defaultAdress2);
    // 상세 주소
    const address3 = useInput(defaultAdress3);
    // 영업가족
    const userType = useSelect(defaultUserType);
    // 재직현황
    const status = useSelect(defaultStatus);
    // 입사일
    const indate = useInput(defaultIndate);
    // 퇴사일
    const outdate = useInput(defaultOutdate);

    const handleClickTab = (tab: CoreTabOption) => {
        setTab(tab);
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

        callApi(payload);
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
        <MyLayout
            footer={
                <div className="wr-pages-detail__footer">
                    <div></div>
                    <div>
                        <button
                            className="btn btn-primary btn-sm"
                            type="button"
                            onClick={handleSubmit}
                        >
                            {submitBtnText}
                        </button>
                    </div>
                </div>
            }
        >
            <div className="wr-pages-detail wr-form row">
                <div className="col-4">
                    <div className="wr-pages-detail__left">
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
                                                options={EMP_STATUS}
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
                                    <div className="row wr-mt">
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
                                                    placeholder={'근로 + 사업'}
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
                                                        placeHolderFontSize={16}
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
                                                    placeholder={'기본 + 성과'}
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
                        {type === 'create' && (
                            <div className="wr-pages-detail__lock">
                                <p>사용자 등록 후 이용할 수 있습니다.</p>
                            </div>
                        )}

                        <ul className="wr-tab__wrap" role="tablist">
                            {DETAIL_PAGE_TABS.map((v) => (
                                <MyTab
                                    key={v.id}
                                    onClick={handleClickTab}
                                    isActive={v.id === tab.id}
                                    {...v}
                                />
                            ))}
                            <li className="wr-tab__line"></li>
                        </ul>
                        <div className="wr-pages-detail__body">
                            {/* <IncomeSettings
                                    hidden={tab.id !== 'tabIncome'}
                                    {...tab}
                                /> */}
                            {/* <GuaranteeSettings
                                    hidden={tab.id !== 'tabGuarantee'}
                                    {...tab}
                                /> */}
                            {/* <AuthoritySettings
                                    hidden={tab.id !== 'tabAuthority'}
                                    {...tab}
                                /> */}
                            {/* <QualSettings
                                    hidden={tab.id !== 'tabQual'}
                                    {...tab}
                                /> */}
                        </div>
                    </div>
                </div>
            </div>
        </MyLayout>
    );
};
