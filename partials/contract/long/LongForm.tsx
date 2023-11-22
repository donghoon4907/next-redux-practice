import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { OrgaState } from '@reducers/orga';
import type { UserState } from '@reducers/user';
import type { CommonState } from '@reducers/common';
import type { ModalState } from '@reducers/modal';
import type { ContractState } from '@reducers/contract';
import type { CoreSelectOption } from '@interfaces/core';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
    differenceInMonths,
    differenceInYears,
    addDays,
    setDate,
} from 'date-fns';
import { LONG_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { MyFooter } from '@components/footer';
import { useSelect } from '@hooks/use-select';
import { LongPaysTabpanel } from '@partials/contract/long/tabpanels/LongPays';
import { MyButton } from '@components/button';
import { useTab } from '@hooks/use-tab';
import { useDatepicker } from '@hooks/use-datepicker';
import { LongManagerAccordion } from '@components/accordion/LongManagerHistory';
import longConstants from '@constants/options/long';
import commonConstants from '@constants/options/common';
import { ProductSearchModal } from '@components/modal/ProductSearch';
import { useApi } from '@hooks/use-api';
import { CustomerSearchModal } from '@components/modal/CustomerSearch';
import { isEmpty } from '@utils/validator/common';
import { findSelectOption } from '@utils/getter';
import { getUsersRequest } from '@actions/hr/user/get-users.action';
import { CreateLongDTO, UpdateLongDTO } from '@dto/contractor/Long.dto';
import { createLongRequest } from '@actions/contract/long/create.action';
import { UserHistoryModal } from '@components/modal/UserHistory';
import { updateLongRequest } from '@actions/contract/long/update.action';
import { SearchProductInput } from '@partials/contract/common/input/SearchProductInput';
import { FloatSelect } from '@components/select/Float';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { MyUnit } from '@components/Unit';
import { SingleContactTabpanel } from '@partials/customer/tabpanels/SingleContact';
import { InfoCustAccordion } from '@components/accordion/InfoCust';
import { SetInfoCustModal } from '@components/modal/SetInfoCust';
import { SetInfoProductModal } from '@components/modal/SetInfoProduct';
import { InfoProductAccordion } from '@components/accordion/InfoProduct';

import { SearchContractorInput } from '../common/input/SearchContractorInput';
import { LongBaeseossTabpanel } from './tabpanels/LongBaeseos';

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
     * 수정 시
     */
    defaultOrganize?: string;
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
     * 계약일자 기본 값
     */
    defaultContdate?: string;
    /**
     * 보장만기 기본 값
     */
    defaultBodateto?: string;
    // defaultBoDu?: number;
    /**
     * 납입주기 기본 값
     */
    defaultPayCycle?: CoreSelectOption;
    /**
     * 납입기간 기본 값
     */
    defaultPayDateto?: string;
    /**
     * 계약상태 기본 값
     */
    defaultStatus?: CoreSelectOption;
    /**
     * 납입상태 기본 값
     */
    defaultPayStatus?: string;
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
     * 검증 여부 기본 값
     */
    defaultIsConfirm?: string;
    /**
     * 실적보험료 기본 값
     */
    defaultPayment?: string;
    /**
     * 수정보험료 기본 값
     */
    defaultTp?: string;
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
    // 청약설계 기본값
    defaultSulDist?: CoreSelectOption;
    // 고객처약서명 기본값
    defaultSubsSign?: CoreSelectOption;
    // 청약서제출여부
    defaultSubsSubmission?: CoreSelectOption;
}

export const LongForm: FC<Props> = ({
    mode,
    idx = -1,
    defaultUserid,
    defaultOrganize = '',
    defaultOrga = null,
    defaultComp = null,
    defaultCnum = '',
    defaultContdate = null,
    defaultBodateto = '',
    defaultPayCycle = longConstants.payCycle[0],
    defaultPayDateto = '',
    defaultStatus = null,
    defaultPayStatus = '',
    defaultStatusDate = null,
    defaultLastWhoi = '0',
    defaultLastMonth = '',
    defaultIsConfirm = 'N',
    defaultPayment = '',
    // defaultPayMonth = '',
    defaultTp = '',
    // defaultTp1 = '',
    defaultTp2 = '',
    defaultTp3 = '',
    defaultTpu = '',
    defaultPayBo = '',
    defaultPayJ = '',
    defaultPayS = '',
    defaultCalType = longConstants.calType[0],
    defaultCalDatefrom = null,
    defaultFamily = longConstants.family[0],
    defaultSulDist = null,
    defaultSubsSign = null,
    defaultSubsSubmission = null,
}) => {
    const displayName = 'wr-pages-long-detail';

    const { newUserHistory } = useSelector<AppState, CommonState>(
        (state) => state.common,
    );

    const { longUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { orgas } = useSelector<AppState, OrgaState>((state) => state.orga);

    const { users } = useSelector<AppState, UserState>((state) => state.user);

    const {
        selectedProduct,
        loadedContract,
        loadedInsured,
        pays,
        baeseos,
        removedPays,
        removedBaeseos,
        infoCusts,
        infoProducts,
    } = useSelector<AppState, ContractState>((state) => state.contract);

    const { isShowContractorSearchModal, isShowInsuredSearchModal } =
        useSelector<AppState, ModalState>((state) => state.modal);

    const createLong = useApi(createLongRequest);

    const updateLong = useApi(updateLongRequest);

    const getUsers = useApi(getUsersRequest);

    // 탭 관리
    const [tab, setTab] = useTab(LONG_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    // 조직
    const [orga] = useSelect(orgas, defaultOrga);
    // 담당자
    const [manager, setManager] = useSelect(users);
    // 보험사
    const [wcode] = useSelect(longUseCompanies, defaultComp);
    // 계약번호
    const [cnum] = useInput(defaultCnum);
    // 계약일자
    const [contdate] = useDatepicker(
        defaultContdate ? new Date(defaultContdate) : new Date(),
    );
    // 납입만기
    const [pay_dateto] = useDatepicker(
        defaultPayDateto ? new Date(defaultPayDateto) : null,
    );
    // 납입주기
    const [pay_cycle] = useSelect(longConstants.payCycle, defaultPayCycle);
    // 보장만기
    const [bo_dateto] = useDatepicker(
        defaultBodateto ? new Date(defaultPayDateto) : null,
    );
    // 계약상태
    const [status] = useSelect(longConstants.status, defaultStatus);
    // 납입상태
    // const [payStatus] = useSelect(longConstants.pStatus, defaultPstatus);
    // 상태반영일
    const [statusDate] = useDatepicker(
        defaultStatusDate ? new Date(defaultStatusDate) : null,
    );
    // 실적보험료
    const [payment] = useNumbericInput(defaultPayment, { addComma: true });
    // 수정보험료
    const [tp] = useNumbericInput(defaultTp, { addComma: true });
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
        defaultCalDatefrom ? new Date(defaultCalDatefrom) : new Date(),
    );
    // 본인계약여부
    const [family] = useSelect(longConstants.family, defaultFamily);
    // 청약설계
    const [sul_dist] = useSelect(commonConstants.sulDist, defaultSulDist);
    // 고객청약서명 - 이후 상세작업필요
    const [subs_sign] = useSelect(commonConstants.yn, defaultSubsSign);
    // 청약서제출여부
    const [subs_submission] = useSelect(
        longConstants.subsSubmission,
        defaultSubsSubmission,
    );

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
    // 각 월의 1일로 계산
    // 납입만기 기간
    let payDu = 0;
    // 보장만기 기간
    let boDu = 0;
    if (pay_dateto.value) {
        payDu = differenceInYears(
            setDate(pay_dateto.value!, 2),
            setDate(new Date(), 1),
        );
    }

    if (bo_dateto.value) {
        boDu = differenceInYears(
            setDate(bo_dateto.value!, 2),
            setDate(new Date(), 1),
        );
    }
    // 월납기준
    let payM = 0;
    // 보장보험료 비율
    let payBoRate = 0;
    // 적립보험료 비율
    let payJRate = 0;
    // 실손보험료 비율
    let paySRate = 0;
    // 수정보험료 비율
    let tpRate = 0;
    // 2차수정 비율
    let tp2Rate = 0;
    // 3차수정 비율
    let tp3Rate = 0;
    // 저축유지수정 비율
    let tpuRate = 0;
    if (!isEmpty(payment.value)) {
        if (pay_cycle.value) {
            if (pay_cycle.value.value === '0') {
                if (bo_dateto.value && contdate.value) {
                    let diff = differenceInMonths(
                        bo_dateto.value,
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
                        +pay_cycle.value.value,
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

        const createDto = new CreateLongDTO(payload);

        if (createDto.requiredValidate()) {
            createLong(createDto.getPayload(), () => {
                alert('등록되었습니다.');
            });
        }
    };

    const handleUpdate = () => {
        const payload = createPayload();

        const updateLongDto = new UpdateLongDTO(payload);

        if (updateLongDto.requiredValidate()) {
            updateLong(updateLongDto.getPayload(), () => {
                // router.replace(location.href);
                alert('수정되었습니다.');
                location.reload();
            });
        }
    };

    const createPayload = () => {
        // 필수값
        const payload: any = {
            info_custom: infoCusts,
            info_product: infoProducts,
            remove: {},
        };

        // 담당자 관련
        if (mode === 'create') {
            payload['userid'] = manager.value ? manager.value.value : null;
        } else if (mode === 'update') {
            // 수정 시 index 추가
            if (idx !== -1) {
                payload['idx'] = idx;
            }

            if (newUserHistory) {
                payload['userid'] = newUserHistory.userid;
            } else {
                payload['userid'] = defaultUserid;
            }

            // API 분리로 인하여 제외
            // if (removedContacts.length > 0) {
            //     payload['remove']['contacts'] = removedContacts.map(
            //         (v) => v.idx,
            //     );
            // }

            if (removedPays.length > 0) {
                payload['remove']['pays'] = removedPays.map((v) => v.idx);
            }
            if (removedBaeseos.length > 0) {
                payload['remove']['baeseos'] = removedBaeseos.map((v) => v.idx);
            }
            // 계약상태
            if (status.value) {
                payload['status'] = status.value.value;
            }
            // 상태반영일
            if (statusDate.value) {
                payload['status_date'] = dayjs(statusDate.value).format(
                    'YYYY-MM-DD',
                );
            }
        }
        // 보험사 관련
        if (wcode.value) {
            payload['wcode'] = wcode.value.value;
        }
        // 계약번호 관련
        if (!isEmpty(cnum.value)) {
            payload['cnum'] = cnum.value;
        }
        // 상품명 관련
        if (selectedProduct) {
            payload['p_code'] = selectedProduct.p_code;
            payload['title'] = selectedProduct.title;
            payload['spec'] = selectedProduct.spec;
            payload['subcategory'] = selectedProduct.subcategory;
            payload['cal_spec'] = selectedProduct.cal_spec;
        }
        // 계약자 관련
        if (loadedContract) {
            payload['c_idx'] = loadedContract.idx;
            payload['c_name'] = loadedContract.name;
        }
        // 피보험자 관련
        if (loadedInsured) {
            payload['p_name'] = loadedInsured.name;
        }
        // 계약일자 관련
        if (contdate.value) {
            payload.contdate = dayjs(contdate.value).format('YYYY-MM-DD');
        }
        // 납입만기 관련
        if (pay_dateto.value) {
            payload.pay_dateto = dayjs(pay_dateto.value).format('YYYY-MM-DD');
            payload['pay_du'] = payDu;
        }
        // 납입주기 관련
        if (pay_cycle.value) {
            payload['pay_cycle'] = pay_cycle.value.value;
        }
        // 보장만기 관련
        if (bo_dateto.value) {
            payload['bo_dateto'] = dayjs(bo_dateto.value).format('YYYY-MM-DD');
            payload['bo_du'] = boDu;
        }
        // 실적보험료
        if (!isEmpty(payment.value)) {
            payload['payment'] = +payment.value.replace(/,/g, '');
        }
        // 월납기준환산
        if (payM) {
            payload['pay_month'] = payM;
        }
        // 보장보험료
        if (!isEmpty(payBo.value)) {
            payload['pay_bo'] = +payBo.value.replace(/,/g, '');
        }
        // 적립보험료
        if (!isEmpty(payJ.value)) {
            payload['pay_j'] = +payJ.value.replace(/,/g, '');
        }
        // 실손보험료
        if (!isEmpty(payS.value)) {
            payload['pay_s'] = +payS.value.replace(/,/g, '');
        }
        // 1차
        if (!isEmpty(tp.value)) {
            payload['tp'] = +tp.value.replace(/,/g, '');
        }
        // 2차
        if (!isEmpty(tp2.value)) {
            payload['tp2'] = +tp2.value.replace(/,/g, '');
        }
        // 3차
        if (!isEmpty(tp3.value)) {
            payload['tp3'] = +tp3.value.replace(/,/g, '');
        }
        // 저축유지
        if (!isEmpty(tpu.value)) {
            payload['tpu'] = +tpu.value.replace(/,/g, '');
        }
        // 정산구분
        if (calType.value) {
            payload['cal_type'] = calType.value.value;
        }
        // 정산개시월
        if (calDatefrom.value) {
            payload['cal_datefrom'] = dayjs(calDatefrom.value).format(
                'YYYY-MM-01',
            );
        }
        // 본인계약여부
        if (family.value) {
            payload['family'] = family.value.value === 'Y' ? true : false;
        }
        // 청약설계
        if (sul_dist.value) {
            payload['sul_dist'] = sul_dist.value.value;
        }
        // 고객청약서명
        if (subs_sign.value) {
            // payload['subs_sign'] = subs_sign.value.value === 'Y' ? true : false;
            payload['subs_sign'] = subs_sign.value.value;
        }
        // 청약서제출여부
        if (subs_submission.value) {
            payload['subs_submission'] = subs_submission.value.value;
        }

        // 납입실적
        if (pays.length > 0) {
            payload['pays'] = pays.map((v) => {
                const output = { ...v };

                if (output.dist === '추징' || output.dist === '환급') {
                    output.pay *= -1;
                }

                return output;
            });
        }

        // 미유지/부활
        if (baeseos.length > 0) {
            payload['baeseos'] = baeseos.map((v) => {
                const output = { ...v };

                if (output.dist !== '부활') {
                    output.pay_point *= -1;
                    output.tp_point *= -1;
                }

                return output;
            });
        }
        // API 분리로 인하여 제외
        // if (contacts.length > 0) {
        //     payload['contacts'] = contacts;
        // }
        // 피보험자 입력 변경으로 인하여 제외
        // if (insureds.length > 0) {
        //     payload['p_persons'] = insureds;
        // }

        return payload;
    };
    // 조직에 맞는 담당자로 업데이트
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
            <div className={`${displayName} wr-pages-detail wr-frame__tabbody`}>
                <div
                    className={`${displayName}__left wr-pages-detail__left wr-pages-detail__applydatepicker`}
                >
                    <div className="wr-pages-detail__inner">
                        <div className="wr-pages-detail__block">
                            {mode === 'create' ? (
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="flex-fill">
                                            <FloatSelect
                                                label="소속"
                                                isDisabled={!editable}
                                                isRequired
                                                {...orga}
                                            />
                                        </div>
                                        <div className="flex-fill">
                                            <FloatSelect
                                                label="담당자"
                                                isDisabled={!editable}
                                                isRequired
                                                {...manager}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="wr-pages-detail__content p-15">
                                    <LongManagerAccordion
                                        editable={editable}
                                        defaultTitle={defaultOrganize}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="보험사"
                                            isDisabled={!editable}
                                            isRequired
                                            {...wcode}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="계약번호"
                                            readOnly={!editable}
                                            isRequired
                                            {...cnum}
                                        />
                                        {/* {defaultIsConfirm === 'Y' && (
                                            <div className="badge rounded-pill bg-warning wr-with__badge--right wr-badge">
                                                검증
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <SearchProductInput
                                            editable={editable}
                                            wcode={wcode.value?.value}
                                            spe="long"
                                        />
                                    </div>
                                </div>

                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <SearchContractorInput
                                            editable={
                                                editable && mode === 'create'
                                            }
                                        />
                                    </div>
                                </div>
                                {/* <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <SearchContractorInput
                                            type="피보험자"
                                            editable={editable}
                                            userid={defaultUserid}
                                        />
                                    </div>
                                </div> */}
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            label="계약일자"
                                            readOnly={!editable}
                                            isRequired
                                            hooks={contdate}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            label="납입만기"
                                            readOnly={!editable}
                                            isRequired
                                            hooks={pay_dateto}
                                            shouldDisableDate={(date) =>
                                                date < addDays(new Date(), -1)
                                            }
                                            after={
                                                payDu > 0 && (
                                                    <MyUnit placement="picker">
                                                        {`${payDu}년`}
                                                    </MyUnit>
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="납입주기"
                                            isDisabled={!editable}
                                            isRequired
                                            {...pay_cycle}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            label="보장만기"
                                            readOnly={!editable}
                                            isRequired
                                            hooks={bo_dateto}
                                            shouldDisableDate={(date) =>
                                                date < addDays(new Date(), -1)
                                            }
                                            after={
                                                boDu > 0 && (
                                                    <MyUnit placement="picker">
                                                        {`${boDu}년`}
                                                    </MyUnit>
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {mode === 'update' && (
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="flex-fill">
                                            <FloatSelect
                                                label="계약상태"
                                                isDisabled={!editable}
                                                {...status}
                                            />
                                        </div>
                                        <div className="flex-fill">
                                            <FloatDatepicker
                                                label="상태반영일"
                                                readOnly={!editable}
                                                hooks={statusDate}
                                            />
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="flex-fill">
                                            <FloatInput
                                                label="납입상태"
                                                readOnly
                                                defaultValue={defaultPayStatus}
                                            />
                                        </div>
                                        <div className="flex-fill">
                                            <FloatInput
                                                label="종납회차"
                                                readOnly
                                                value={defaultLastMonth}
                                                after={
                                                    <>
                                                        <MyUnit placement="middle">
                                                            {defaultLastWhoi}
                                                        </MyUnit>
                                                        <MyUnit placement="last">
                                                            회
                                                        </MyUnit>
                                                    </>
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="실적보험료"
                                            readOnly={!editable}
                                            isRequired
                                            isNumber
                                            {...payment}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label={
                                                tp2.value || tp3.value
                                                    ? '1차수정'
                                                    : '수정보험료'
                                            }
                                            readOnly={!editable}
                                            isNumber
                                            after={
                                                <>
                                                    <MyUnit placement="middle">
                                                        {tpRate}
                                                    </MyUnit>
                                                    <MyUnit placement="last">
                                                        %
                                                    </MyUnit>
                                                </>
                                            }
                                            {...tp}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="월납기준환산"
                                            disabled
                                            isNumber
                                            value={payM.toLocaleString()}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="2차수정"
                                            readOnly={!editable}
                                            isNumber
                                            after={
                                                <>
                                                    <MyUnit placement="middle">
                                                        {tp2Rate}
                                                    </MyUnit>
                                                    <MyUnit placement="last">
                                                        %
                                                    </MyUnit>
                                                </>
                                            }
                                            {...tp2}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="보장보험료"
                                            readOnly={!editable}
                                            isNumber
                                            after={
                                                <>
                                                    <MyUnit placement="middle">
                                                        {payBoRate}
                                                    </MyUnit>
                                                    <MyUnit placement="last">
                                                        %
                                                    </MyUnit>
                                                </>
                                            }
                                            {...payBo}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="3차수정"
                                            readOnly={!editable}
                                            isNumber
                                            after={
                                                <>
                                                    <MyUnit placement="middle">
                                                        {tp3Rate}
                                                    </MyUnit>
                                                    <MyUnit placement="last">
                                                        %
                                                    </MyUnit>
                                                </>
                                            }
                                            {...tp3}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="적립보험료"
                                            readOnly={!editable}
                                            isNumber
                                            after={
                                                <>
                                                    <MyUnit placement="middle">
                                                        {payJRate}
                                                    </MyUnit>
                                                    <MyUnit placement="last">
                                                        %
                                                    </MyUnit>
                                                </>
                                            }
                                            {...payJ}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="저축유지수정"
                                            readOnly={!editable}
                                            isNumber
                                            after={
                                                <>
                                                    <MyUnit placement="middle">
                                                        {tpuRate}
                                                    </MyUnit>
                                                    <MyUnit placement="last">
                                                        %
                                                    </MyUnit>
                                                </>
                                            }
                                            {...tpu}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="실손보험료"
                                            readOnly={!editable}
                                            isNumber
                                            after={
                                                <>
                                                    <MyUnit placement="middle">
                                                        {paySRate}
                                                    </MyUnit>
                                                    <MyUnit placement="last">
                                                        %
                                                    </MyUnit>
                                                </>
                                            }
                                            {...payS}
                                        />
                                    </div>
                                    <div className="flex-fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="정산구분"
                                            isDisabled={!editable}
                                            {...calType}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            label="정산개시월"
                                            format="yyyy-MM"
                                            readOnly={!editable}
                                            hooks={calDatefrom}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="본인계약여부"
                                            isDisabled={!editable}
                                            {...family}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="청약설계"
                                            isDisabled={!editable}
                                            {...sul_dist}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="고객청약서명"
                                            isDisabled={!editable}
                                            {...subs_sign}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="청약서제출여부"
                                            isDisabled={!editable}
                                            {...subs_submission}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content p-15">
                                <InfoCustAccordion editable={editable} />
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content p-15">
                                <InfoProductAccordion editable={editable} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wr-pages-detail__right">
                    <ul className="wr-tab__wrap" role="tablist">
                        {LONG_DETAIL_TABS.map((v) => (
                            <MyTab
                                key={v.id}
                                onClick={setTab}
                                isActive={v.id === tab.id}
                                hidden={v.isHideMode === mode}
                                {...v}
                            />
                        ))}
                        <li className="wr-tab__line"></li>
                    </ul>
                    <div className="wr-pages-detail__body">
                        <LongPaysTabpanel
                            id="tabpanelPays"
                            tabId="tabPays"
                            hidden={tab.id !== 'tabPays'}
                            editable={editable}
                            contdate={contdate.value!}
                            payment={+payment.value.replace(/,/g, '')}
                        />
                        <LongBaeseossTabpanel
                            id="tabpanelBuhwal"
                            tabId="tabBuhwal"
                            hidden={tab.id !== 'tabBuhwal'}
                            editable={editable}
                            payment={+payment.value.replace(/,/g, '')}
                            tp={+tp.value.replace(/,/g, '')}
                        />
                        {tab.id === 'tabContact' && (
                            <SingleContactTabpanel
                                id="tabpanelContact"
                                tabId="tabContact"
                                hidden={false}
                                spe_idx={idx}
                                spe="long"
                                cnum={cnum.value}
                            />
                        )}
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
            <ProductSearchModal />
            <CustomerSearchModal userid={defaultUserid} />
            <SetInfoCustModal />
            <SetInfoProductModal />
            {mode === 'update' && <UserHistoryModal type="contract" />}
        </>
    );
};
