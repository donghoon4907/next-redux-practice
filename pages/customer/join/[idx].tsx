import type { NextPage } from 'next';
import type { CustomerState } from '@reducers/customer';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MySelect } from '@components/select';
import { CUSTOMER_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { MyLayout } from '@components/Layout';
import {
    useInput,
    useNumbericInput,
    usePhoneInput,
    useResidentNumberInput,
} from '@hooks/use-input';
import { MyFooter } from '@components/footer';
import { useSelect } from '@hooks/use-select';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { MyButton } from '@components/button';
import { showUserHistoryModal } from '@actions/modal/user-history.action';
import { useTab } from '@hooks/use-tab';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import { MyDatepicker } from '@components/datepicker';
import { usePostcode } from '@hooks/use-postcode';
import { ContactHisTabpanel } from '@partials/customer/tabpanels/Contact';
import { HoldingContractTabpanel } from '@partials/customer/tabpanels/HoldingContract';
import { OtherContractTabpanel } from '@partials/customer/tabpanels/Excontract';
import { SecuredDebtTabpanel } from '@partials/customer/tabpanels/Custcar';
import { FamilyTabpanel } from '@partials/customer/tabpanels/Family';
import { AnniversaryTabpanel } from '@partials/customer/tabpanels/Anniversary';
import customerConstants from '@constants/options/customer';
import userConstants from '@constants/options/user';
import { useDatepicker } from '@hooks/use-datepicker';

const Customer: NextPage<CustomerState> = ({ customer }) => {
    const displayName = 'wr-pages-customer-detail';

    const dispatch = useDispatch();

    // const createUser = useApi(createUserRequest);
    // 탭 관리
    const [tab, setTab] = useTab(CUSTOMER_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(false);
    // 고객명
    const [name] = useInput('', { noSpace: true });
    // 고객구분
    const [division] = useSelect(customerConstants.division);
    // 주민번호
    const [idnum1] = useResidentNumberInput('');
    // 사업자등록번호
    const [comRegNum] = useNumbericInput('');
    // 나이
    const [age] = useNumbericInput('');
    const [ageType] = useSelect(customerConstants.age);
    // 생년월일
    const [birthday] = useDatepicker(null);
    const [birthType] = useSelect(userConstants.birthType);
    // 법인설립일
    const [iDate] = useDatepicker(null);
    // 상령일
    const [sDay] = useDatepicker(null);
    // 핸드폰
    const [mobile] = usePhoneInput('');
    const [mobileCom] = useSelect(userConstants.mobileCom);
    // 대표전화
    const [phone] = usePhoneInput('');
    // 이메일
    const [email] = useInput('', { noSpace: true });
    const [emailCom] = useSelect(userConstants.emailCom);
    // 홈페이지
    const [homepage] = useInput('', { noSpace: true });
    // 우편번호
    const [postcode, address1, address2, onClickPostcode] = usePostcode(
        {
            postcode: '',
            address1: '',
            address2: '',
        },
        { disabled: !editable },
    );
    // 상세 주소
    const [address3] = useInput('');
    // 유입경로
    const [inflowPath] = useSelect(customerConstants.inflowPath);
    // 고객등급
    const [grade] = useSelect(customerConstants.grade);
    // 개인정보활용동의
    const [pia] = useSelect(customerConstants.pia);
    // 동의일시
    const [aDay] = useDatepicker(null);
    // 고객생성일시
    const [createDay] = useDatepicker(null);
    // 회사명
    const [company] = useInput('');
    // 부서/직함
    const [title] = useInput('');
    // 회사 전화번호
    const [comPhone] = usePhoneInput('');
    // 팩스
    const [cFax] = usePhoneInput('');
    // 회사 우편번호
    const [cPostcode, cAddress1, cAddress2, onClickCPostcode] = usePostcode(
        {
            postcode: '',
            address1: '',
            address2: '',
        },
        { disabled: !editable },
    );
    // 회사 상세 주소
    const [cAddress3] = useInput('');

    const handleClickChangeHistory = () => {
        dispatch(showUserHistoryModal());
    };

    const handleCancelModify = () => {
        const tf = confirm('수정을 취소하시겠습니까?');

        if (tf) {
            setEditable(false);
        }
    };

    const handleModify = () => {
        setEditable(true);
    };

    const labelType = editable ? 'active' : 'disable';
    // 개인 여부
    const isIndividual = division.value?.value === '개인';
    // 법인 여부
    const isCorporation = division.value?.value === '법인';

    // useEffect(() => {
    //     // 탭 추가
    //     const tab = new TabModule();

    //     const to = `/customer/join/${customer.idx}`;
    //     if (!tab.read(to)) {
    //         tab.create({
    //             id: to,
    //             label: `고객상세 - ${customer.cname}`,
    //             to,
    //         });
    //     }

    //     dispatch(initTab(tab.getAll()));
    // }, [dispatch, customer]);

    return (
        <>
            <Head>
                <title>고객상세</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className={`${displayName} row`}>
                    <div className="col-5">
                        <div
                            className={`${displayName}__left wr-frame__section`}
                        >
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="wr-group">
                                        <span
                                            className={`${displayName}__department`}
                                        >
                                            {/* {`${long.orga} ${long.fc}`} */}
                                            개인영업1 / 신노원사업단 / 업무보전
                                            양성태
                                        </span>
                                        <MyButton
                                            type="button"
                                            className="btn-primary"
                                            onClick={handleClickChangeHistory}
                                        >
                                            담당변경이력
                                        </MyButton>
                                    </div>
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
                                                    id="division"
                                                    label="고객구분"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="division"
                                                        placeholder="선택"
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...division}
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
                                                    isRequired={editable}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="idnum1"
                                                        placeholder="주민번호"
                                                        disabled={!editable}
                                                        {...idnum1}
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
                                                    <WithLabel
                                                        id="birthday"
                                                        label="생년월일"
                                                        type={labelType}
                                                    >
                                                        <MyDatepicker
                                                            id="birthday"
                                                            size="md"
                                                            placeholder="생년월일"
                                                            disabled={!editable}
                                                            hooks={birthday}
                                                        />
                                                        <div
                                                            style={{
                                                                width: 230,
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
                                                                placement="right"
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                {...birthType}
                                                            />
                                                        </div>
                                                    </WithLabel>
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
                                                    id="age"
                                                    label="나이"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="age"
                                                        placeholder="나이"
                                                        disabled={!editable}
                                                        {...age}
                                                    />
                                                    <div style={{ width: 230 }}>
                                                        <MySelect
                                                            placeholder="선택"
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
                                                            {...ageType}
                                                        />
                                                    </div>
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="sDay"
                                                        label="상령일"
                                                        type={labelType}
                                                    >
                                                        <MyDatepicker
                                                            id="sDay"
                                                            size="md"
                                                            placeholder="상령일"
                                                            disabled={!editable}
                                                            hooks={sDay}
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
                                                    <div style={{ width: 230 }}>
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
                                        <>
                                            <div className="row wr-mt">
                                                <div className="col-6">
                                                    <WithLabel
                                                        label="주소"
                                                        type={labelType}
                                                    >
                                                        <div className="wr-pages-detail__with">
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
                                                                        !editable,
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
                                                        id="addr3"
                                                        label="상세주소"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="addr3"
                                                            placeholder="상세주소"
                                                            disabled={!editable}
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
                                        </>
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
                                                        placeholder="고객등급"
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
                                                    placeholder="개인정보동의"
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
                                                    disabled={!editable}
                                                    hooks={createDay}
                                                />
                                            </WithLabel>
                                        </div>
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
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
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
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    label="회사주소"
                                                    type={labelType}
                                                >
                                                    <div className="wr-pages-detail__with">
                                                        <MyInput
                                                            type="text"
                                                            placeholder="우편번호"
                                                            disabled
                                                            onClick={
                                                                onClickCPostcode
                                                            }
                                                            {...cPostcode}
                                                            button={{
                                                                type: 'button',
                                                                disabled:
                                                                    !editable,
                                                                onClick:
                                                                    onClickCPostcode,
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
                                                        {...cAddress1}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="cAddr3"
                                                    label="상세주소"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="cAddr3"
                                                        placeholder="상세주소"
                                                        disabled={!editable}
                                                        {...cAddress3}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <MyInput
                                                        type="text"
                                                        placeholder="주소2"
                                                        disabled
                                                        {...cAddress2}
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
                                <ContactHisTabpanel
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
                                <OtherContractTabpanel
                                    id="tabpanelOtherContract"
                                    tabId="tabOtherContract"
                                    hidden={tab.id !== 'tabOtherContract'}
                                    editable={editable}
                                />
                                <SecuredDebtTabpanel
                                    id="tabpanelSecuredDebt"
                                    tabId="tabSecuredDebt"
                                    hidden={tab.id !== 'tabSecuredDebt'}
                                    editable={editable}
                                />
                                <FamilyTabpanel
                                    id="tabpanelFamily"
                                    tabId="tabFamily"
                                    hidden={tab.id !== 'tabFamily'}
                                    editable={editable}
                                />
                                <AnniversaryTabpanel
                                    id="tabpanelAnniversary"
                                    tabId="tabAnniversary"
                                    hidden={tab.id !== 'tabAnniversary'}
                                    editable={editable}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-footer__between">
                        <div>
                            <MyButton className="btn-warning">
                                다른 담당자 내용
                            </MyButton>
                        </div>
                        <div className={`${displayName}__submit`}>
                            {editable && (
                                <button
                                    className="btn btn-secondary btn-sm"
                                    type="button"
                                    onClick={handleCancelModify}
                                >
                                    취소
                                </button>
                            )}
                            <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                onClick={handleModify}
                            >
                                {editable ? '변경 사항 적용' : '수정'}
                            </button>
                        </div>
                    </div>
                </MyFooter>
            </MyLayout>

            {/* <UserHistoryModal user_his={long.user_his} /> */}
            {/* <CreateEtcModal /> */}
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async (_, ctx) => {
        const { query } = ctx;

        const idx = query.idx as string;

        const output: any = {
            props: {},
        };

        try {
            // const { data } = await longsService.getLong({ cidx });
            // output.props.long = data;
        } catch {
            output.redirect = {
                destination: '/404',
                permanent: true, // true로 설정하면 301 상태 코드로 리다이렉션
            };
        }

        return output;
    }),
);

export default Customer;
