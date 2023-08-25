import type { FC } from 'react';
import type { LongState } from '@reducers/long';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CommonState } from '@reducers/common';
import type { ModalState } from '@reducers/modal';
import type { ContractState } from '@reducers/contract';
import type { CoreSelectOption } from '@interfaces/core';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import addYears from 'date-fns/addYears';
import { MySelect } from '@components/select';
import { GEN_DETAIL_TABS, LONG_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { MyLayout } from '@components/Layout';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { MyFooter } from '@components/footer';
import { useSelect } from '@hooks/use-select';
import { PaysTabpanel } from '@partials/contract/long/tabpanels/Pays';
// import { StateHistoryTabpanel } from '@partials/contract/long/tabpanels/StateHistory';
import { ChangeHistoryTabpanel } from '@partials/contract/long/tabpanels/ChangeHistory';
import { MyButton } from '@components/button';
import { CreateEtcModal } from '@components/modal/CreateEtc';
import { useTab } from '@hooks/use-tab';
import { useDatepicker } from '@hooks/use-datepicker';
import { MyDatepicker } from '@components/datepicker';
import { CustomerTabpanel } from '@partials/contract/long/tabpanels/Customer';
import { EndorsementTabpanel } from '@partials/contract/long/tabpanels/Endorsement';
import { ContactTabpanel } from '@partials/customer/tabpanels/Contact';
import { CalcPerformTabpanel } from '@partials/contract/long/tabpanels/CalcPerform';
// import { CustomSettingAccordion } from '@components/accordion/CustomSetting';
import longConstants from '@constants/options/long';
import { ProductSearchModal } from '@components/modal/ProductSearch';
import { useApi } from '@hooks/use-api';
import { CustomerSearchModal } from '@components/modal/CustomerSearch';
import { CreatePayModal } from '@components/modal/CreatePay';
import { CreateEndorsementModal } from '@components/modal/CreateEndorsement';
import { isEmpty } from '@utils/validator/common';
import { findSelectOption } from '@utils/getter';
import { getUsersRequest } from '@actions/hr/get-users';
import { CreateLongDTO, UpdateLongDTO } from '@dto/long/Long.dto';
import { createLongRequest } from '@actions/long/create-long.action';
import { UserHistoryModal } from '@components/modal/UserHistory';
import { updateLongRequest } from '@actions/long/update-long.action';
import { SearchProductInput } from '../SearchProductInput';

interface Props {
    /**
     * 모드: 등록 / 수정
     */
    mode: 'create' | 'update';
    /**
     * PK
     */
    idx?: number;
    /**
     * 담당자 기본 ID
     */
    defaultUserid: string;
    /**
     * 담당자 조직 기본 ID
     */
    defaultOrga?: CoreSelectOption;
    /**
     * 보험사 기본 값
     */
    defaultComp?: CoreSelectOption;
    /**
     * 계약번호 기본 값
     */
    defaultCnum?: string;
    /**
     * 상품명 기본 값
     */
    defaultTitle?: string;
    /**
     * 계약일자 기본 값
     */
    defaultContdate?: string;
    /**
     * 보장만기 기본 값
     */
    defaultBodateto?: string;
    defaultBoDu?: number;
    /**
     * 납입기간 기본 값
     */
    defaultPayDateto?: string;
    defaultPayDu?: number;
    /**
     * 계약상태 기본 값
     */
    defaultStatus?: CoreSelectOption;
    /**
     * 보종 기본 값
     */
    defaultSpec?: string;
    /**
     * 상품보종 기본 값
     */
    defaultSubCategory?: string;
    /**
     * 검증 여부 기본 값
     */
    defaultIsConfirm?: string;
    /**
     * 정산보종 기본 값
     */
    defaultCalSpec?: string;
    /**
     * 실적보험료 기본 값
     */
    defaultPayment?: string;
}

export const GeneralForm: FC<Props> = ({
    mode,
    idx = -1,
    defaultUserid,
    defaultOrga = null,
    defaultComp = null,
    defaultCnum = '',
    defaultTitle = '',
    defaultContdate = null,
    defaultBodateto = '',
    defaultBoDu = -1,
    defaultPayDateto = '',
    defaultPayDu = -1,
    defaultStatus = null,
    defaultSpec = '',
    defaultSubCategory = '',
    defaultIsConfirm = 'N',
    defaultCalSpec = '',
    defaultPayment = '',
}) => {
    const displayName = 'wr-pages-general-detail';

    const duSelectOptions = Array.from({ length: 50 }).map((_, i) => ({
        label: `${i + 1}년`,
        value: `${i + 1}`,
    }));

    const { contacts, removedContacts, newUserHistory } = useSelector<
        AppState,
        CommonState
    >((state) => state.common);

    const { longUseCompanies, orgas, users } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { selectedProduct, insuredPeople, loadedContract } = useSelector<
        AppState,
        ContractState
    >((state) => state.contract);

    const { pays, removedPays } = useSelector<AppState, LongState>(
        (state) => state.long,
    );

    const { isShowContractorSearchModal, isShowInsuredPersonSearchModal } =
        useSelector<AppState, ModalState>((state) => state.modal);

    const createLong = useApi(createLongRequest);

    const updateLong = useApi(updateLongRequest);

    const getUsers = useApi(getUsersRequest);
    // 탭 관리
    const [tab, setTab] = useTab(LONG_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    const labelType = editable ? 'active' : 'disable';
    // 조직
    const [orga] = useSelect(orgas, defaultOrga);
    // 담당자
    const [manager, setManager] = useSelect(users);
    // 보험사
    const [comp] = useSelect(longUseCompanies, defaultComp);
    // 계약번호
    const [cnum] = useInput(defaultCnum);
    // 계약일자
    const [contdate] = useDatepicker(
        defaultContdate ? new Date(defaultContdate) : new Date(),
        {
            callbackOnChange: (next) => {
                if (next) {
                    if (payDu.value) {
                        const date = addYears(next, +payDu.value.value);

                        setPayDateto(dayjs(date).format('YYYY-MM-DD'));
                    }

                    if (boDu.value) {
                        const date = addYears(next, +boDu.value.value);

                        setBoDateto(dayjs(date).format('YYYY-MM-DD'));
                    }
                }
            },
        },
    );
    // 보장만기
    const [boDateto, setBoDateto] = useInput(defaultBodateto);
    const [boDu] = useSelect(
        duSelectOptions,
        findSelectOption(defaultBoDu.toString(), duSelectOptions),
        {
            callbackOnChange: (next) => {
                if (next) {
                    if (contdate.value) {
                        const date = addYears(contdate.value, +next.value);

                        setBoDateto(dayjs(date).format('YYYY-MM-DD'));
                    } else {
                        alert('계약일을 입력해주세요');
                    }
                }
            },
        },
    );
    // 납입기간
    const [payDateto, setPayDateto] = useInput(defaultPayDateto);
    const [payDu] = useSelect(
        duSelectOptions,
        findSelectOption(defaultPayDu.toString(), duSelectOptions),
        {
            callbackOnChange: (next) => {
                if (next) {
                    if (contdate.value) {
                        const date = addYears(contdate.value, +next.value);

                        setPayDateto(dayjs(date).format('YYYY-MM-DD'));
                    } else {
                        alert('계약일을 입력해주세요');
                    }
                }
            },
        },
    );
    // 계약상태
    const [status] = useSelect(longConstants.status, defaultStatus);
    // 실적보험료
    const [payment] = useNumbericInput(defaultPayment, { addComma: true });
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

        const createLongDto = new CreateLongDTO(payload);

        if (createLongDto.requiredValidate()) {
            createLong(createLongDto.getPayload());
        }
    };

    const handleUpdate = () => {
        const payload = createPayload();

        const updateLongDto = new UpdateLongDTO(payload);

        if (updateLongDto.requiredValidate()) {
            updateLong(updateLongDto.getPayload(), ({ Message }) => {
                if (Message === 'Success') {
                    alert('수정되었습니다.');
                }
            });
        }
    };

    const createPayload = () => {
        const payload: any = {
            wcode: -1,
            cnum: cnum.value,
            contdate: dayjs(contdate.value).format('YYYY-MM-DD'),
            pay_cycle: -1,
            pay_dateto: null,
            payment: -1,
            remove: {},
        };

        if (idx !== -1) {
            payload['idx'] = idx;
        }

        if (comp.value) {
            payload.wcode = comp.value.value;
        }

        if (!isEmpty(payDateto.value)) {
            payload.pay_dateto = payDateto.value;
            payload['pay_du'] = payDu.value!.value;
        }

        if (!isEmpty(payment.value)) {
            payload.payment = +payment.value.replace(/,/g, '');
        }

        if (selectedProduct) {
            payload['p_code'] = selectedProduct.p_code;
            payload['title'] = selectedProduct.title;
            payload['spec'] = selectedProduct.spec;
            payload['subcategory'] = selectedProduct.subcategory;
            payload['cal_spec'] = selectedProduct.cal_spec;
        }

        if (!isEmpty(boDateto.value)) {
            payload['bo_dateto'] = boDateto.value;
            payload['bo_du'] = boDu.value!.value;
        }

        // if (status.value) {
        //     payload['status'] = status.value.value;
        // }

        // if (payStatus.value) {
        //     payload['pay_status'] = payStatus.value.value;
        // }

        // if (statusDate.value) {
        //     payload['status_date'] = statusDate.value;
        // }

        if (loadedContract) {
            payload['c_idx'] = loadedContract.idx;
            payload['c_name'] = loadedContract.name;
        }

        if (mode === 'create') {
            payload['userid'] = manager.value!.value;
        } else if (mode === 'update') {
            if (newUserHistory) {
                payload['userid'] = newUserHistory.userid;
                // payload['userid_his'] = [
                //     ...userHistories,
                //     {
                //         ...newUserHistory,
                //     },
                // ];
            }

            if (removedContacts.length > 0) {
                payload['remove']['contacts'] = removedContacts.map(
                    (v) => v.idx,
                );
            }

            if (removedPays.length > 0) {
                payload['remove']['pays'] = removedPays.map((v) => v.idx);
            }
        }

        if (contacts.length > 0) {
            payload['contacts'] = contacts;
        }

        if (insuredPeople.length > 0) {
            payload['p_persons'] = insuredPeople;
        }

        if (pays.length > 0) {
            payload['pays'] = pays;
        }

        return payload;
    };

    useEffect(() => {
        if (orga.value) {
            getUsers(
                {
                    idx: orga.value.value,
                },
                (users) => {
                    setManager(findSelectOption(defaultUserid, users));
                },
            );
        }
    }, [defaultUserid, orga.value]);

    return (
        <>
            <MyLayout>
                <div className={`${displayName} wr-pages-detail row`}>
                    <div className={`${displayName}__left col`}>
                        <div className="wr-frame__section">
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            <WithLabel
                                                id="orga"
                                                label="조직"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="orga"
                                                    placeholder="선택"
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...orga}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="manager"
                                                    label="담당자"
                                                    type={labelType}
                                                    isRequired={editable}
                                                >
                                                    <MySelect
                                                        inputId="manager"
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...manager}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            <WithLabel
                                                id="company"
                                                label="보험사"
                                                type={labelType}
                                                isRequired={editable}
                                            >
                                                <MySelect
                                                    inputId="company"
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...comp}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="cnum"
                                                    label="계약번호"
                                                    type={labelType}
                                                    isRequired={editable}
                                                >
                                                    <div className="wr-with__badge">
                                                        <MyInput
                                                            type="text"
                                                            id="cnum"
                                                            placeholder="계약번호"
                                                            disabled={!editable}
                                                            className="wr-with__badge--inside-right-1"
                                                            {...cnum}
                                                        />
                                                        {defaultIsConfirm ===
                                                            'Y' && (
                                                            <div className="badge rounded-pill bg-warning wr-with__badge--right wr-badge">
                                                                검증
                                                                <span className="visually-hidden">
                                                                    검증
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <SearchProductInput
                                        editable={editable}
                                        wcode={comp.value?.value}
                                        title={defaultTitle}
                                        spec={defaultSpec}
                                        subcategory={defaultSubCategory}
                                        calSpec={defaultCalSpec}
                                        spe="gen"
                                    />
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="contdate"
                                                label="계약일자"
                                                type={labelType}
                                                isRequired={editable}
                                            >
                                                <MyDatepicker
                                                    id="contdate"
                                                    size="md"
                                                    placeholder="계약일자"
                                                    disabled={!editable}
                                                    hooks={contdate}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    label="계약상태"
                                                    type={labelType}
                                                >
                                                    <MyDatepicker
                                                        id=""
                                                        size="md"
                                                        placeholder="계약상태"
                                                        disabled={!editable}
                                                    />
                                                    <div className="wr-with__extension">
                                                        <MyButton
                                                            className="btn-primary btn-md"
                                                            disabled={!editable}
                                                        >
                                                            이력
                                                        </MyButton>
                                                    </div>
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            <WithLabel
                                                label="보장만기"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    placeholder="보장만기일"
                                                    disabled={true}
                                                    className="wr-with__badge--inside-right-1"
                                                    {...boDateto}
                                                />
                                                <div
                                                    className="wr-with__extension"
                                                    style={{ width: 100 }}
                                                >
                                                    <MySelect
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        placement="right"
                                                        {...boDu}
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    label="납입만기"
                                                    type={labelType}
                                                    isRequired={editable}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        placeholder="납입만기"
                                                        disabled={true}
                                                        className="wr-with__badge--inside-right-1"
                                                        {...payDateto}
                                                    />
                                                    <div
                                                        className="wr-with__extension"
                                                        style={{ width: 100 }}
                                                    >
                                                        <MySelect
                                                            placeholder="선택"
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
                                                            {...payDu}
                                                        />
                                                    </div>
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="payment"
                                                label="실적보험료"
                                                type={labelType}
                                                isRequired={editable}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="payment"
                                                    className="text-end"
                                                    placeholder="0"
                                                    disabled={!editable}
                                                    {...payment}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <CustomSettingAccordion data={[]} />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className={`${displayName}__right col`}>
                        <ul className="wr-tab__wrap" role="tablist">
                            {GEN_DETAIL_TABS.map((v) => (
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
                            <CustomerTabpanel
                                id="tabpanelCustomer"
                                tabId="tabCustomer"
                                hidden={tab.id !== 'tabCustomer'}
                                editable={editable}
                                userid={defaultUserid}
                            />
                            <PaysTabpanel
                                id="tabpanelPays"
                                tabId="tabPays"
                                hidden={tab.id !== 'tabPays'}
                                editable={editable}
                                spe="gen"
                            />
                            <EndorsementTabpanel
                                id="tabpanelEndorsement"
                                tabId="tabEndorsement"
                                hidden={tab.id !== 'tabEndorsement'}
                                editable={editable}
                            />
                            <CalcPerformTabpanel
                                id="tabpanelCalcPerform"
                                tabId="tabCalcPerform"
                                hidden={tab.id !== 'tabCalcPerform'}
                                editable={editable}
                            />
                            <ContactTabpanel
                                id="tabpanelContactHis"
                                tabId="tabContactHis"
                                hidden={tab.id !== 'tabContactHis'}
                                editable={editable}
                                spe="long"
                            />

                            <ChangeHistoryTabpanel
                                id="tabpanelChangeHis"
                                tabId="tabChangeHis"
                                hidden={tab.id !== 'tabChangeHis'}
                                editable={editable}
                            />
                            {/* <EtcsTabpanel
                                    id="tabpanelEtcs"
                                    tabId="tabEtcs"
                                    hidden={tab.id !== 'tabEtcs'}
                                    editable={editable}
                                    etcs={long.etcs}
                                /> */}
                        </div>
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-footer__between">
                        <div></div>
                        <div className="wr-pages-detail__buttons">
                            {editable && mode === 'update' && (
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
            <ProductSearchModal />
            {isShowContractorSearchModal && (
                <CustomerSearchModal type="contractor" />
            )}
            {isShowInsuredPersonSearchModal && (
                <CustomerSearchModal type="insured-person" />
            )}
            <CreatePayModal
                contdate={contdate.value!}
                payment={payment.value}
            />
            <CreateEndorsementModal />
            <CreateEtcModal />
            <UserHistoryModal type="long" />
        </>
    );
};
