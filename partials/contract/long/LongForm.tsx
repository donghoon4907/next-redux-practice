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
import { differenceInMonths, addYears } from 'date-fns';
import { MySelect } from '@components/select';
import { LONG_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { MyFooter } from '@components/footer';
import { useSelect } from '@hooks/use-select';
import { LongPaysTabpanel } from '@partials/contract/long/tabpanels/LongPays';
// import { StateHistoryTabpanel } from '@partials/contract/long/tabpanels/StateHistory';
import { ChangeHistoryTabpanel } from '@partials/contract/long/tabpanels/ChangeHistory';
import { MyButton } from '@components/button';
import { CreateEtcModal } from '@components/modal/CreateEtc';
import { useTab } from '@hooks/use-tab';
import { useDatepicker } from '@hooks/use-datepicker';
import { MyDatepicker } from '@components/datepicker';
import { CustomerTabpanel } from '@partials/contract/common/tabpanels/Customer';
import { EndorsementTabpanel } from '@partials/contract/long/tabpanels/Endorsement';
import { ContactTabpanel } from '@partials/customer/tabpanels/Contact';
import { CalcPerformTabpanel } from '@partials/contract/long/tabpanels/CalcPerform';
import { LongManagerAccordion } from '@components/accordion/LongManagerHistory';
// import { CustomSettingAccordion } from '@components/accordion/CustomSetting';
import longConstants from '@constants/options/long';
import { ProductSearchModal } from '@components/modal/ProductSearch';
import { useApi } from '@hooks/use-api';
import { CustomerSearchModal } from '@components/modal/CustomerSearch';
import { CreateLongPayModal } from '@components/modal/CreateLongPay';
import { CreateEndorsementModal } from '@components/modal/CreateEndorsement';
import { isEmpty } from '@utils/validator/common';
import { findSelectOption } from '@utils/getter';
import { getUsersRequest } from '@actions/hr/get-users';
import { CreateLongDTO, UpdateLongDTO } from '@dto/contractor/Long.dto';
import { createLongRequest } from '@actions/contract/long/create-long.action';
import { UserHistoryModal } from '@components/modal/UserHistory';
import { updateLongRequest } from '@actions/contract/long/update-long.action';
import { SearchProductInput } from '@partials/contract/SearchProductInput';

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
     * 납입주기 기본 값
     */
    defaultPayCycle?: CoreSelectOption;
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
     * 납입상태 기본 값
     */
    defaultPstatus?: CoreSelectOption;
    /**
     * 상태반영일 기본 값
     */
    defaultStatusDate?: string;
    /**
     * 종납회차 기본 값
     */
    defaultLastWhoi?: string;
    /**
     * 종납회차일 기본 값
     */
    defaultLastMonth?: string;
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
    /**
     * 수정보험료 기본 값
     */
    defaultTp?: string;
    /**
     * 월납기준 기본 값
     */
    // defaultPayMonth?: string;
    /**
     * 1차수정 기본 값
     */
    defaultTp1?: string;
    /**
     * 2차수정 기본 값
     */
    defaultTp2?: string;
    /**
     * 3차수정 기본 값
     */
    defaultTp3?: string;
    /**
     * 보장보험료 기본 값
     */
    defaultPayBo?: string;
    /**
     * 적립보험료 기본 값
     */
    defaultPayJ?: string;
    /**
     * 실손보험료 기본 값
     */
    defaultPayS?: string;
    /**
     * 저축유지수정 기본 값
     */
    defaultTpu?: string;
    // 정산구분 기본 값
    defaultCalType?: CoreSelectOption;
    // 정산개시월 기본 값
    defaultCalDatefrom?: string;
    // 본인계약여부 기본값
    defaultFamily?: CoreSelectOption;
}

export const LongForm: FC<Props> = ({
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
    defaultPayCycle = longConstants.payCycle[0],
    defaultPayDateto = '',
    defaultPayDu = -1,
    defaultStatus = null,
    defaultPstatus = null,
    defaultStatusDate = null,
    defaultLastWhoi = '0',
    defaultLastMonth = '',
    defaultSpec = '',
    defaultSubCategory = '',
    defaultIsConfirm = 'N',
    defaultCalSpec = '',
    defaultPayment = '',
    // defaultPayMonth = '',
    defaultTp = '',
    defaultTp1 = '',
    defaultTp2 = '',
    defaultTp3 = '',
    defaultTpu = '',
    defaultPayBo = '',
    defaultPayJ = '',
    defaultPayS = '',
    defaultCalType = null,
    defaultCalDatefrom = null,
    defaultFamily = null,
}) => {
    const displayName = 'wr-pages-long-detail';

    const router = useRouter();

    const { contacts, removedContacts, newUserHistory } = useSelector<
        AppState,
        CommonState
    >((state) => state.common);

    const { longUseCompanies, orgas, users } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { selectedProduct, insureds, loadedContract, pays, removedPays } =
        useSelector<AppState, ContractState>((state) => state.contract);

    const { isShowContractorSearchModal, isShowInsuredSearchModal } =
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
        longConstants.duration,
        findSelectOption(defaultBoDu, longConstants.duration),
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
    // 납입주기
    const [payCycle] = useSelect(longConstants.payCycle, defaultPayCycle);
    // 납입기간
    const [payDateto, setPayDateto] = useInput(defaultPayDateto);
    const [payDu] = useSelect(
        longConstants.duration,
        findSelectOption(defaultPayDu.toString(), longConstants.duration),
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
    // 납입상태
    const [payStatus] = useSelect(longConstants.pStatus, defaultPstatus);
    // 상태반영일
    const [statusDate] = useDatepicker(
        defaultStatusDate ? new Date(defaultStatusDate) : null,
    );
    // 실적보험료
    const [payment] = useNumbericInput(defaultPayment, { addComma: true });
    // 수정보험료
    const [tp] = useNumbericInput(defaultTp, { addComma: true });
    // 1차수정
    const [tp1] = useNumbericInput(defaultTp1, { addComma: true });
    // 2차수정
    const [tp2] = useNumbericInput(defaultTp2, { addComma: true });
    // 3차수정
    const [tp3] = useNumbericInput(defaultTp3, { addComma: true });
    // 보장보험료
    const [payBo] = useNumbericInput(defaultPayBo, { addComma: true });
    // 적립보험료
    const [payJ] = useNumbericInput(defaultPayJ, { addComma: true });
    // 실손보험료
    const [payS] = useNumbericInput(defaultPayS, { addComma: true });
    // 저축유지수정
    const [tpu] = useNumbericInput(defaultTpu, { addComma: true });
    // 정산구분
    const [calType] = useSelect(longConstants.calType, defaultCalType);
    // 정산개시월
    const [calDatefrom] = useDatepicker(
        defaultCalDatefrom ? new Date(defaultCalDatefrom) : null,
    );
    // 본인계약여부
    const [family] = useSelect(longConstants.family, defaultFamily);
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

    // 월납기준
    let payM = -1;
    // 보장보험료 비율
    let payBoRate = 0;
    // 적립보험료 비율
    let payJRate = 0;
    // 실손보험료 비율
    let paySRate = 0;
    // 수정보험료 비율
    let tpRate = 0;
    // 1차수정 비율
    let tp1Rate = 0;
    // 2차수정 비율
    let tp2Rate = 0;
    // 3차수정 비율
    let tp3Rate = 0;
    // 저축유지수정 비율
    let tpuRate = 0;
    if (!isEmpty(payment.value)) {
        if (payCycle.value) {
            if (payCycle.value.value === '0') {
                if (!isEmpty(boDateto.value) && contdate.value) {
                    let diff = differenceInMonths(
                        new Date(boDateto.value),
                        contdate.value,
                    );

                    if (diff === 0) {
                        diff = 1;
                    }

                    payM = Math.floor(
                        parseInt(payment.value.replace(/,/g, ''), 10) / diff,
                    );
                }
            } else {
                payM = Math.floor(
                    parseInt(payment.value.replace(/,/g, ''), 10) /
                        +payCycle.value.value,
                );
            }
        }

        if (!isEmpty(payBo.value)) {
            payBoRate = Math.floor(
                (parseInt(payBo.value.replace(/,/g, ''), 10) /
                    parseInt(payment.value.replace(/,/g, ''), 10)) *
                    100,
            );
        }

        if (!isEmpty(payJ.value)) {
            payJRate = Math.floor(
                (parseInt(payJ.value.replace(/,/g, ''), 10) /
                    parseInt(payment.value.replace(/,/g, ''), 10)) *
                    100,
            );
        }

        if (!isEmpty(payS.value)) {
            paySRate = Math.floor(
                (parseInt(payS.value.replace(/,/g, ''), 10) /
                    parseInt(payment.value.replace(/,/g, ''), 10)) *
                    100,
            );
        }

        if (!isEmpty(tp.value)) {
            tpRate = Math.floor(
                (parseInt(tp.value.replace(/,/g, ''), 10) /
                    parseInt(payment.value.replace(/,/g, ''), 10)) *
                    100,
            );
        }

        if (!isEmpty(tp1.value)) {
            tp1Rate = Math.floor(
                (parseInt(tp1.value.replace(/,/g, ''), 10) /
                    parseInt(payment.value.replace(/,/g, ''), 10)) *
                    100,
            );
        }

        if (!isEmpty(tp2.value)) {
            tp2Rate = Math.floor(
                (parseInt(tp2.value.replace(/,/g, ''), 10) /
                    parseInt(payment.value.replace(/,/g, ''), 10)) *
                    100,
            );
        }

        if (!isEmpty(tp3.value)) {
            tp3Rate = Math.floor(
                (parseInt(tp3.value.replace(/,/g, ''), 10) /
                    parseInt(payment.value.replace(/,/g, ''), 10)) *
                    100,
            );
        }

        if (!isEmpty(tpu.value)) {
            tpuRate = Math.floor(
                (parseInt(tpu.value.replace(/,/g, ''), 10) /
                    parseInt(payment.value.replace(/,/g, ''), 10)) *
                    100,
            );
        }
    }

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
            updateLong(updateLongDto.getPayload(), () => {
                router.replace(location.href);
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

        if (payCycle.value) {
            payload.pay_cycle = +payCycle.value.value;
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

        if (payM !== -1) {
            payload['pay_month'] = payM;
        }

        if (!isEmpty(payBo.value)) {
            payload['pay_bo'] = +payBo.value.replace(/,/g, '');
        }

        if (!isEmpty(payJ.value)) {
            payload['pay_j'] = +payJ.value.replace(/,/g, '');
        }

        if (!isEmpty(payS.value)) {
            payload['pay_s'] = +payS.value.replace(/,/g, '');
        }

        if (!isEmpty(tp.value)) {
            payload['tp'] = +tp.value.replace(/,/g, '');
        }

        if (!isEmpty(tp1.value)) {
            payload['tp1'] = +tp1.value.replace(/,/g, '');
        }

        if (!isEmpty(tp2.value)) {
            payload['tp2'] = +tp2.value.replace(/,/g, '');
        }

        if (!isEmpty(tp3.value)) {
            payload['tp3'] = +tp3.value.replace(/,/g, '');
        }

        if (!isEmpty(tpu.value)) {
            payload['tpu'] = +tpu.value.replace(/,/g, '');
        }

        if (calType.value) {
            payload['cal_type'] = calType.value.value;
        }

        if (calDatefrom.value) {
            payload['cal_datefrom'] = dayjs(calDatefrom.value).format(
                'YYYY-MM-01',
            );
        }

        if (family.value) {
            payload['family'] = family.value.value === 'Y' ? true : false;
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

        if (insureds.length > 0) {
            payload['p_persons'] = insureds;
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
                <div className={`${displayName}__left wr-pages-detail__left`}>
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
                                                inputId="orga"
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
                                                inputId="manager"
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
                                <LongManagerAccordion editable={editable} />
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
                                            inputId="company"
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
                                title={defaultTitle}
                                spec={defaultSpec}
                                subcategory={defaultSubCategory}
                                calSpec={defaultCalSpec}
                                spe="long"
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
                                <div className="col">
                                    <WithLabel
                                        id="pay_cycle"
                                        label="납입주기"
                                        type={labelType}
                                        isRequired={editable}
                                    >
                                        <MySelect
                                            inputId="pay_cycle"
                                            placeholder={'선택'}
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                            {...payCycle}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="col">
                                    <WithLabel
                                        id="bo_dateto"
                                        label="보장만기"
                                        type={labelType}
                                    >
                                        <MyInput
                                            id="bo_dateto"
                                            placeholder="보장만기일"
                                            disabled={true}
                                            className="wr-with__badge--inside-right-1"
                                            {...boDateto}
                                        />
                                        <div
                                            className="wr-with__extension"
                                            style={{ width: 86 }}
                                        >
                                            <MySelect
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
                                <div className="col">
                                    <WithLabel
                                        id="pay_dateto"
                                        label="납입만기"
                                        type={labelType}
                                        isRequired={editable}
                                    >
                                        <MyInput
                                            id="pay_dateto"
                                            placeholder="납입만기"
                                            disabled={true}
                                            className="wr-with__badge--inside-right-1"
                                            {...payDateto}
                                        />
                                        <div
                                            className="wr-with__extension"
                                            style={{
                                                width: 86,
                                            }}
                                        >
                                            <MySelect
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                                placement="right"
                                                {...payDu}
                                            />
                                        </div>
                                    </WithLabel>
                                </div>
                            </div>
                            {mode === 'update' && (
                                <>
                                    <div className="row wr-mt">
                                        <div className="col">
                                            <WithLabel
                                                id="status"
                                                label="계약상태"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="status"
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...status}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col">
                                            <WithLabel
                                                id="pay_status"
                                                label="납입상태"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="pay_status"
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...payStatus}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col">
                                            <WithLabel
                                                id="status_date"
                                                label="상태반영일"
                                                type={labelType}
                                            >
                                                <MyDatepicker
                                                    id="status_date"
                                                    size="md"
                                                    placeholder="상태반영일"
                                                    disabled={!editable}
                                                    hooks={statusDate}
                                                />
                                                {/* <div className="wr-with__extension">
                                                            <MyButton
                                                                className="btn-primary btn-md"
                                                                disabled={
                                                                    !editable
                                                                }
                                                            >
                                                                이력
                                                            </MyButton>
                                                        </div> */}
                                            </WithLabel>
                                        </div>
                                        <div className="col">
                                            <WithLabel
                                                id="last_whoi"
                                                label="종납회차"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    id="last_whoi"
                                                    placeholder="종납일"
                                                    disabled={true}
                                                    value={defaultLastMonth}
                                                />
                                                <div
                                                    className="wr-with__extension"
                                                    style={{
                                                        width: 100,
                                                    }}
                                                >
                                                    <MyInput
                                                        className="text-end wr-border-l--hide"
                                                        placeholder="0"
                                                        disabled={true}
                                                        value={defaultLastWhoi}
                                                        unit="회"
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="col">
                                    <WithLabel
                                        id="payment"
                                        label="실적보험료"
                                        type={labelType}
                                        isRequired={editable}
                                    >
                                        <MyInput
                                            id="payment"
                                            className="text-end"
                                            placeholder="0"
                                            disabled={!editable}
                                            {...payment}
                                        />
                                    </WithLabel>
                                    <WithLabel
                                        id="payment_m"
                                        label="월납기준"
                                        type={labelType}
                                    >
                                        <MyInput
                                            id="payment_m"
                                            className="text-end"
                                            placeholder="0"
                                            disabled
                                            value={
                                                payM !== -1
                                                    ? payM.toLocaleString()
                                                    : ''
                                            }
                                        />
                                    </WithLabel>
                                    <WithLabel
                                        id="pay_bo"
                                        label="보장보험료"
                                        type={labelType}
                                    >
                                        <MyInput
                                            id="pay_bo"
                                            className="text-end"
                                            placeholder="0"
                                            disabled={!editable}
                                            {...payBo}
                                        />
                                        <div
                                            className="wr-with__extension"
                                            style={{ width: 86 }}
                                        >
                                            <MyInput
                                                id="pay_bo_rate"
                                                className="text-end wr-border-l--hide"
                                                disabled
                                                value={payBoRate}
                                                unit="%"
                                            />
                                        </div>
                                    </WithLabel>
                                    <WithLabel
                                        id="pay_j"
                                        label="적립보험료"
                                        type={labelType}
                                    >
                                        <MyInput
                                            id="pay_j"
                                            className="text-end"
                                            placeholder="0"
                                            disabled={!editable}
                                            {...payJ}
                                        />
                                        <div
                                            className="wr-with__extension"
                                            style={{ width: 86 }}
                                        >
                                            <MyInput
                                                id="pay_j_rate"
                                                className="text-end wr-border-l--hide"
                                                disabled
                                                value={payJRate}
                                                unit="%"
                                            />
                                        </div>
                                    </WithLabel>
                                    <WithLabel
                                        id="pay_s"
                                        label="실손보험료"
                                        type={labelType}
                                    >
                                        <MyInput
                                            id="pay_s"
                                            className="text-end"
                                            placeholder="0"
                                            disabled={!editable}
                                            {...payS}
                                        />
                                        <div
                                            className="wr-with__extension"
                                            style={{ width: 86 }}
                                        >
                                            <MyInput
                                                id="pay_s_rate"
                                                className="text-end wr-border-l--hide"
                                                disabled
                                                value={paySRate}
                                                unit="%"
                                            />
                                        </div>
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="tp"
                                        label="수정보험료"
                                        type={labelType}
                                    >
                                        <MyInput
                                            id="tp"
                                            className="text-end"
                                            placeholder="0"
                                            disabled={!editable}
                                            {...tp}
                                        />
                                        <div
                                            className="wr-with__extension"
                                            style={{
                                                width: 86,
                                            }}
                                        >
                                            <MyInput
                                                id="tp_rate"
                                                className="text-end wr-border-l--hide"
                                                disabled
                                                value={tpRate}
                                                unit="%"
                                            />
                                        </div>
                                    </WithLabel>
                                    <WithLabel
                                        id="tp1"
                                        label="1차수정"
                                        type={labelType}
                                    >
                                        <MyInput
                                            id="tp1"
                                            className="text-end"
                                            placeholder="0"
                                            disabled={!editable}
                                            {...tp1}
                                        />
                                        <div
                                            className="wr-with__extension"
                                            style={{
                                                width: 86,
                                            }}
                                        >
                                            <MyInput
                                                id="tp1_rate"
                                                className="text-end wr-border-l--hide"
                                                disabled
                                                value={tp1Rate}
                                                unit="%"
                                            />
                                        </div>
                                    </WithLabel>
                                    <WithLabel
                                        id="tp2"
                                        label="2차수정"
                                        type={labelType}
                                    >
                                        <MyInput
                                            id="tp2"
                                            className="text-end"
                                            placeholder="0"
                                            disabled={!editable}
                                            {...tp2}
                                        />
                                        <div
                                            className="wr-with__extension"
                                            style={{
                                                width: 86,
                                            }}
                                        >
                                            <MyInput
                                                id="tp2_rate"
                                                className="text-end wr-border-l--hide"
                                                disabled
                                                value={tp2Rate}
                                                unit="%"
                                            />
                                        </div>
                                    </WithLabel>
                                    <WithLabel
                                        id="tp3"
                                        label="3차수정"
                                        type={labelType}
                                    >
                                        <MyInput
                                            id="tp3"
                                            className="text-end"
                                            placeholder="0"
                                            disabled={!editable}
                                            {...tp3}
                                        />
                                        <div
                                            className="wr-with__extension"
                                            style={{
                                                width: 86,
                                            }}
                                        >
                                            <MyInput
                                                id="tp3_rate"
                                                className="text-end wr-border-l--hide"
                                                disabled
                                                value={tp3Rate}
                                                unit="%"
                                            />
                                        </div>
                                    </WithLabel>
                                    <WithLabel
                                        id="tpu"
                                        label="저축유지수정"
                                        type={labelType}
                                    >
                                        <MyInput
                                            id="tpu"
                                            className="text-end"
                                            placeholder="0"
                                            disabled={!editable}
                                            {...tpu}
                                        />
                                        <div
                                            className="wr-with__extension"
                                            style={{
                                                width: 86,
                                            }}
                                        >
                                            <MyInput
                                                id="tpu_rate"
                                                className="text-end wr-border-l--hide"
                                                disabled
                                                value={tpuRate}
                                                unit="%"
                                            />
                                        </div>
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="col">
                                    <WithLabel
                                        id="cal_type"
                                        label="정산구분"
                                        type={labelType}
                                    >
                                        <MySelect
                                            inputId="cal_type"
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                            menuPlacement="top"
                                            {...calType}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="cal_datefrom"
                                        label="정산개시월"
                                        type={labelType}
                                    >
                                        <MyDatepicker
                                            id="cal_datefrom"
                                            size="md"
                                            format="yyyy-MM"
                                            placeholder="정산개시월"
                                            placement="topStart"
                                            disabled={!editable}
                                            hooks={calDatefrom}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col">
                                    <WithLabel
                                        id="family"
                                        label="본인계약여부"
                                        type={labelType}
                                    >
                                        <MySelect
                                            inputId="family"
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                            menuPlacement="top"
                                            {...family}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="sd"
                                        label="청약설계"
                                        type={labelType}
                                    >
                                        <div className="wr-pages-detail__lock">
                                            <span>준비중입니다.</span>
                                        </div>
                                        <MySelect
                                            inputId="sd"
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
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
                <div className="wr-pages-detail__right">
                    <ul className="wr-tab__wrap" role="tablist">
                        {LONG_DETAIL_TABS.map((v) => (
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
                            spe="long"
                        />
                        <LongPaysTabpanel
                            id="tabpanelPays"
                            tabId="tabPays"
                            hidden={tab.id !== 'tabPays'}
                            editable={editable}
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
                            // cnum={cnum.value}
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
                                    editable ? handleUpdate : handleClickModify
                                }
                            >
                                {editable ? '변경 사항 적용' : '수정'}
                            </MyButton>
                        )}
                    </div>
                </div>
            </MyFooter>
            <ProductSearchModal spe="long" />
            {isShowContractorSearchModal && (
                <CustomerSearchModal type="contractor" />
            )}
            {isShowInsuredSearchModal && (
                <CustomerSearchModal type="insured-person" />
            )}
            <CreateLongPayModal
                contdate={contdate.value!}
                payment={payment.value}
            />
            <CreateEndorsementModal />
            <CreateEtcModal />
            {mode === 'update' && <UserHistoryModal type="contract" />}
        </>
    );
};
