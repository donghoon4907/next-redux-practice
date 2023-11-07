import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CommonState } from '@reducers/common';
import type { ModalState } from '@reducers/modal';
import type { ContractState } from '@reducers/contract';
import type { CoreSelectOption } from '@interfaces/core';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { MySelect } from '@components/select';
import { GEN_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { MyFooter } from '@components/footer';
import { useSelect } from '@hooks/use-select';
import { GeneralPaysTabpanel } from '@partials/contract/long/tabpanels/GeneralPays';
// import { StateHistoryTabpanel } from '@partials/contract/long/tabpanels/StateHistory';
import { ChangeHistoryTabpanel } from '@partials/contract/long/tabpanels/ChangeHistory';
import { MyButton } from '@components/button';
import { CreateEtcModal } from '@components/modal/CreateEtc';
import { useTab } from '@hooks/use-tab';
import { useDatepicker } from '@hooks/use-datepicker';
import { MyDatepicker } from '@components/datepicker';
import { CustomerTabpanel } from '@partials/contract/common/tabpanels/Customer';
import { ContactTabpanel } from '@partials/customer/tabpanels/Contact';
import { CalcPerformTabpanel } from '@partials/contract/long/tabpanels/CalcPerform';
// import { CustomSettingAccordion } from '@components/accordion/CustomSetting';
import longConstants from '@constants/options/long';
import { ProductSearchModal } from '@components/modal/ProductSearch';
import { useApi } from '@hooks/use-api';
import { CustomerSearchModal } from '@components/modal/CustomerSearch';
import { CreateGeneralPayModal } from '@components/modal/CreateGeneralPay';
import { isEmpty } from '@utils/validator/common';
import { findSelectOption } from '@utils/getter';
import { getUsersRequest } from '@actions/hr/get-users';
import { SearchProductInput } from '../common/input/SearchProductInput';
import {
    CreateGeneralDTO,
    UpdateGeneralDTO,
} from '@dto/contractor/General.dto';
import { createGeneralRequest } from '@actions/contract/general/create-general.action';
import { updateGeneralRequest } from '@actions/contract/general/update-general.action';
import { LongManagerAccordion } from '@components/accordion/LongManagerHistory';
import { UserHistoryModal } from '@components/modal/UserHistory';

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
     * 보장시기 기본 값
     */
    defaultBodatefrom?: string;
    /**
     * 보장만기 기본 값
     */
    defaultBodateto?: string;
    /**
     * 계약상태 기본 값
     */
    defaultStatus?: CoreSelectOption;
    /**
     * 보종 기본 값
     */
    defaultSpec?: string;
    /**
     * 검증 여부 기본 값
     */
    defaultIsConfirm?: string;
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
    defaultBodatefrom = null,
    defaultContdate = null,
    defaultBodateto = '',
    defaultStatus = null,
    defaultSpec = '',
    defaultIsConfirm = 'N',
    defaultPayment = '',
}) => {
    const displayName = 'wr-pages-general-detail';

    const router = useRouter();

    const { contacts, removedContacts, newUserHistory } = useSelector<
        AppState,
        CommonState
    >((state) => state.common);

    const { genUseCompanies, orgas, users } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { selectedProduct, insureds, loadedContract, pays, removedPays } =
        useSelector<AppState, ContractState>((state) => state.contract);

    const { isShowContractorSearchModal, isShowInsuredSearchModal } =
        useSelector<AppState, ModalState>((state) => state.modal);

    const createGeneral = useApi(createGeneralRequest);

    const updateGeneral = useApi(updateGeneralRequest);

    const getUsers = useApi(getUsersRequest);
    // 탭 관리
    const [tab, setTab] = useTab(GEN_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    const labelType = editable ? 'active' : 'disable';
    // 조직
    const [orga] = useSelect(orgas, defaultOrga);
    // 담당자
    const [manager, setManager] = useSelect(users);
    // 보험사
    const [comp] = useSelect(genUseCompanies, defaultComp);
    // 계약번호
    const [cnum] = useInput(defaultCnum);
    // 계약일자
    const [contdate] = useDatepicker(
        defaultContdate ? new Date(defaultContdate) : new Date(),
    );
    // 보장시기
    const [boDatefrom] = useDatepicker(
        defaultBodatefrom ? new Date(defaultBodatefrom) : null,
    );
    // 보장만기
    const [boDateto] = useDatepicker(
        defaultBodateto ? new Date(defaultBodateto) : null,
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

        const createGeneralDto = new CreateGeneralDTO(payload);

        if (createGeneralDto.requiredValidate()) {
            createGeneral(createGeneralDto.getPayload());
        }
    };

    const handleUpdate = () => {
        const payload = createPayload();

        const updateLongDto = new UpdateGeneralDTO(payload);

        if (updateLongDto.requiredValidate()) {
            updateGeneral(updateLongDto.getPayload(), () => {
                router.replace(location.href);
            });
        }
    };

    const createPayload = () => {
        const payload: any = {
            wcode: -1,
            cnum: cnum.value,
            contdate: dayjs(contdate.value).format('YYYY-MM-DD'),
            payment: -1,
            p_persons: insureds,
            remove: {},
        };

        if (idx !== -1) {
            payload['idx'] = idx;
        }

        if (comp.value) {
            payload.wcode = comp.value.value;
        }

        if (!isEmpty(payment.value)) {
            payload.payment = +payment.value.replace(/,/g, '');
        }

        if (selectedProduct) {
            payload['p_code'] = selectedProduct.p_code;
            payload['title'] = selectedProduct.title;
            payload['spec'] = selectedProduct.spec;
            // payload['subcategory'] = selectedProduct.subcategory;
            // payload['cal_spec'] = selectedProduct.cal_spec;
        }

        if (!isEmpty(boDatefrom.value)) {
            payload['bo_datefrom'] = dayjs(boDatefrom.value).format(
                'YYYY-MM-DD',
            );
        }

        if (!isEmpty(boDateto.value)) {
            payload['bo_dateto'] = dayjs(boDateto.value).format('YYYY-MM-DD');
        }

        if (loadedContract) {
            payload['c_idx'] = loadedContract.idx;
            payload['c_name'] = loadedContract.name;
        }

        if (mode === 'create') {
            payload['userid'] = manager.value ? manager.value.value : null;
        } else if (mode === 'update') {
            if (newUserHistory) {
                payload['userid'] = newUserHistory.userid;
            } else {
                payload['userid'] = defaultUserid;
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
            <div className={`${displayName} wr-pages-detail`}>
                <div className={`${displayName}__left`}>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            {mode === 'create' ? (
                                <div className="row">
                                    <div className="col">
                                        <WithLabel
                                            id="orga"
                                            label="조직"
                                            type={labelType}
                                            // isRequired={editable}
                                        >
                                            <MySelect
                                                id="orga"
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                                {...orga}
                                            />
                                        </WithLabel>
                                    </div>
                                    <div className="col">
                                        <WithLabel
                                            id="manager"
                                            label="담당자"
                                            type={labelType}
                                            isRequired={editable}
                                        >
                                            <MySelect
                                                id="manager"
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                                {...manager}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                            ) : (
                                <LongManagerAccordion
                                    editable={editable}
                                    defaultTitle="test"
                                />
                            )}
                        </div>
                    </div>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="col">
                                    <WithLabel
                                        id="company"
                                        label="보험사"
                                        type={labelType}
                                        isRequired={editable}
                                    >
                                        <MySelect
                                            id="company"
                                            placeholder={'선택'}
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                            {...comp}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
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
                                            {defaultIsConfirm === 'Y' && (
                                                <div className="badge rounded-pill bg-warning wr-with__badge--right wr-badge">
                                                    검증
                                                </div>
                                            )}
                                        </div>
                                    </WithLabel>
                                </div>
                            </div>
                            <SearchProductInput
                                editable={editable}
                                wcode={comp.value?.value}
                                defaultTitle={defaultTitle}
                                defaultSpec={defaultSpec}
                                defaultSubcategory={null}
                                defaultCalSpec={null}
                                spe="gen"
                            />
                            <div className="row wr-mt">
                                <div className="col">
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
                                {mode === 'update' && (
                                    <div className="col">
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
                                            {/* <div className="wr-with__extension">
                                                    <MyButton
                                                        className="btn-primary btn-md"
                                                        disabled={!editable}
                                                    >
                                                        이력
                                                    </MyButton>
                                                </div> */}
                                        </WithLabel>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="col">
                                    <WithLabel
                                        id="bo_datefrom"
                                        label="보장시기"
                                        type={labelType}
                                    >
                                        <MyDatepicker
                                            id="bo_datefrom"
                                            size="md"
                                            placeholder="보장시기"
                                            disabled={!editable}
                                            hooks={boDatefrom}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="bo_dateto"
                                        label="보장만기"
                                        type={labelType}
                                        isRequired={editable}
                                    >
                                        <MyDatepicker
                                            id="bo_dateto"
                                            size="md"
                                            placeholder="보장만기"
                                            disabled={!editable}
                                            hooks={boDateto}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col">
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
                                <div className="col"></div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <CustomSettingAccordion data={[]} />
                                </div>
                            </div> */}
                </div>
                <div className="wr-pages-detail__right">
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
                    <div className="wr-pages-detail__body">
                        <CustomerTabpanel
                            id="tabpanelCustomer"
                            tabId="tabCustomer"
                            hidden={tab.id !== 'tabCustomer'}
                            editable={editable}
                            userid={defaultUserid}
                            spe="gen"
                        />
                        <GeneralPaysTabpanel
                            id="tabpanelPays"
                            tabId="tabPays"
                            hidden={tab.id !== 'tabPays'}
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
                            spe="gen"
                        />

                        <ChangeHistoryTabpanel
                            id="tabpanelChangeHis"
                            tabId="tabChangeHis"
                            hidden={tab.id !== 'tabChangeHis'}
                            editable={editable}
                        />
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
                                    editable ? handleUpdate : handleClickModify
                                }
                            >
                                {editable ? '변경 사항 적용' : '수정'}
                            </MyButton>
                        )}
                    </div>
                </div>
            </MyFooter>

            <ProductSearchModal spe="gen" />
            {isShowContractorSearchModal && (
                <CustomerSearchModal type="contractor" />
            )}
            {isShowInsuredSearchModal && (
                <CustomerSearchModal type="insured-person" />
            )}
            <CreateGeneralPayModal payment={payment.value} />
            <CreateEtcModal />
            {mode === 'update' && <UserHistoryModal type="contract" />}
        </>
    );
};
