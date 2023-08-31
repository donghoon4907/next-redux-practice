import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CommonState } from '@reducers/common';
import type { ModalState } from '@reducers/modal';
import type { ContractState } from '@reducers/contract';
import type { CoreSelectOption } from '@interfaces/core';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import addYears from 'date-fns/addYears';
import differenceInYears from 'date-fns/differenceInYears';
import { MySelect } from '@components/select';
import { CAR_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { MyLayout } from '@components/Layout';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { MyFooter } from '@components/footer';
import { useSelect } from '@hooks/use-select';
import { MyButton } from '@components/button';
import { useTab } from '@hooks/use-tab';
import { useDatepicker } from '@hooks/use-datepicker';
import { MyDatepicker } from '@components/datepicker';
import { CustomerTabpanel } from '@partials/contract/common/tabpanels/Customer';
// import { CustomSettingAccordion } from '@components/accordion/CustomSetting';
import carConstants from '@constants/options/car';
import longConstants from '@constants/options/long';
import { ProductSearchModal } from '@components/modal/ProductSearch';
import { useApi } from '@hooks/use-api';
import { CustomerSearchModal } from '@components/modal/CustomerSearch';
import { isEmpty } from '@utils/validator/common';
import { findSelectOption } from '@utils/getter';
import { getUsersRequest } from '@actions/hr/get-users';
import {
    CreateGeneralDTO,
    UpdateGeneralDTO,
} from '@dto/contractor/General.dto';
import { createGeneralRequest } from '@actions/general/create-general.action';
import { updateGeneralRequest } from '@actions/general/update-general.action';
import { showSetPeriodModal } from '@actions/modal/set-period.action';
import { SearchProductInput } from '@partials/contract/SearchProductInput';
import { CompareTabpanel } from '@partials/contract/car/tabpanels/Compare';
import { CarPaysTabpanel } from '@partials/contract/car/tabpanels/CarPays';

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
     * 전보험사 기본 값
     */
    defaultPreComp?: CoreSelectOption;
    /**
     * 계약번호 기본 값
     */
    defaultCnum?: string;
    /**
     * 전계약번호 기본 값
     */
    defaultPreCnum?: string;
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
     * 인수구분 기본 값
     */
    defaultInsu?: CoreSelectOption;
    /**
     * 등급 기본 값
     */
    defaultRate?: CoreSelectOption;
    /**
     * 납입방법 기본 값
     */
    defaultCycle?: CoreSelectOption;
    /**
     * 운전자범위 기본 값
     */
    defaultCarfamily?: CoreSelectOption;
    /**
     * 최저연령 기본 값
     */
    defaultCarage?: CoreSelectOption;
    /**
     * 차량번호 기본 값
     */
    defaultCarNum?: string;
    /**
     * 차량연식 기본 값
     */
    defaultCarYear?: CoreSelectOption;
    /**
     * 차명코드 기본 값
     */
    defaultCarCode?: string;
    /**
     * 차량등록일 기본 값
     */
    defaultCarDate?: string;
    /**
     * LPG 기본 값
     */
    defaultLpg?: boolean;
    /**
     * 탑차 기본 값
     */
    defaultTopcar?: boolean;
    /**
     * 스포츠카 기본 값
     */
    defaultSportcar?: boolean;
    /**
     * 차량명 기본 값
     */
    defaultCarName?: string;
    /**
     * 차량등급 기본 값
     */
    defaultCarGrade?: CoreSelectOption;
    /**
     * 배기량 기본 값
     */
    defaultBaegirang?: number;
    /**
     * 인원 기본 값
     */
    defaultPeopleNum?: number;
    /**
     * 오토 기본 값
     */
    defaultAuto?: boolean;
    /**
     * ABS 기본 값
     */
    defaultAbsHalin?: boolean;
    /**
     * 이모빌라이저 기본 값
     */
    defaultImo?: boolean;
    /**
     * 블랙박스 구입시기 기본 값
     */
    defaultBlackboxBuydate?: string;
    /**
     * 블랙박스 금액 기본 값
     */
    defaultBlackboxBuyPrice?: string;
    /**
     * 에어백 기본 값
     */
    defaultAircode?: number;
    /**
     * 전방출동 기본 값
     */
    defaultChung?: CoreSelectOption;
    /**
     * 커넥티드카 기본 값
     */
    defaultBluelink?: boolean;
    /**
     * 차선이탈 기본 값
     */
    defaultGps?: CoreSelectOption;
    /**
     * 지능형 안전장치 기본 값
     */
    defaultJobcodeNm?: boolean;
    /**
     * 차량구매형태 기본 값
     */
    defaultMembercode?: CoreSelectOption;
    /**
     * 기본차량가액 기본 값
     */
    defaultCarprice?: number;
    /**
     * 유상운송 기본 값
     */
    defaultUsang?: CoreSelectOption;
    /**
     * 기중기장치요율 기본 값
     */
    defaultUsang2?: number;
    /**
     * 대인배상I 기본 값
     */
    defaultDambo1?: string;
    /**
     * 대인배상II 기본 값
     */
    defaultDambo2?: CoreSelectOption;
    /**
     * 대물한도 기본 값
     */
    defaultDambo3?: CoreSelectOption;
    /**
     * 자손/자상 기본 값
     */
    defaultDambo4?: CoreSelectOption;
    /**
     * 무보험차 기본 값
     */
    defaultDambo5?: CoreSelectOption;
    /**
     * 자기차량 기본 값
     */
    defaultDambo6?: CoreSelectOption;
    /**
     * 긴급출동 기본 값
     */
    defaultGooutDist?: CoreSelectOption;
    /**
     * 긴급출동 상세 기본 값
     */
    defaultGooutDetail?: CoreSelectOption;
    /**
     * 물적사고할증 상세 기본 값
     */
    defaultMulSago?: CoreSelectOption;
    /**
     * 마일리지 기본 값
     */
    defaultMileDist?: CoreSelectOption;
    /**
     * 마일리지 상세 기본 값
     */
    defaultMileDetail?: CoreSelectOption;
    /**
     * 자녀특약 기본 값
     */
    defaultDrateDist?: CoreSelectOption;
    /**
     * 자녀특약 상세 기본 값
     */
    defaultDrateDetail?: string;
    /**
     * 안전운전습관 기본 값
     */
    defaultTmapDist?: CoreSelectOption;
    /**
     * 안전운전습관 상세 기본 값
     */
    defaultTmapDetail?: string;
    /**
     * 차량용도 기본 값
     */
    defaultCaeruse?: CoreSelectOption;
    /**
     * 일부담보 상세 기본 값
     */
    defaultIlPrice?: number;
    /**
     * 총차량대수 기본 값
     */
    defaultChilddrive?: CoreSelectOption;
    /**
     * 보험가입경력 - 피보험자 기본 값
     */
    defaultGuipcarrer?: CoreSelectOption;
    /**
     * 보험가입경력 - 차량 기본 값
     */
    defaultGuipcarrerCar?: CoreSelectOption;
    /**
     * 직전3년가입경력 - DB 기본 값
     */
    defaultLJobcode?: CoreSelectOption;
    /**
     * 직전3년가입경력 - KB 기본 값
     */
    defaultGuipCarrerKb?: CoreSelectOption;
    /**
     * 교통법규위반 기본 값
     */
    defaultTrafficDist?: CoreSelectOption;
    /**
     * 교통법규위반 건수 기본 값
     */
    defaultTrafficDetail?: CoreSelectOption;
    /**
     * 할인할증 기본값
     */
    defaultHalin?: CoreSelectOption;
    /**
     * 군/법인/해외경력인정 기본값
     */
    defaultRateU?: boolean;
    /**
     * 기본할증 기본값
     */
    defaultSpecialCode?: CoreSelectOption;
    /**
     * 추가할증 기본값
     */
    defaultSpecialCode2?: CoreSelectOption;
    /**
     * 3년간사고요율 기본값
     */
    defaultSsSago3?: CoreSelectOption;
    /**
     * 이전계약사고요율 기본값
     */
    defaultPreSago3?: CoreSelectOption;
    /**
     * 3년사고점수 기본값
     */
    defaultPSago?: CoreSelectOption;
    /**
     * 1년사고점수 기본값
     */
    defaultGoout2?: CoreSelectOption;
    /**
     * 피보기준 사고건수 - 3년간 기본값
     */
    defaultSago3?: CoreSelectOption;
    /**
     * 피보기준 사고건수 - 2년간 기본값
     */
    defaultCarNonum?: CoreSelectOption;
    /**
     * 피보기준 사고건수 - 1년간 기본값
     */
    defaultSago1?: CoreSelectOption;
    /**
     * 차량기준 사고건수 - 3년간 기본값
     */
    defaultCarSago3?: CoreSelectOption;
    /**
     * 차량기준 사고건수 - 2년간 기본값
     */
    defaultCarSago2?: CoreSelectOption;
    /**
     * 차량기준 사고건수 - 1년간 기본값
     */
    defaultCarSago1?: CoreSelectOption;
}

export const CarForm: FC<Props> = ({
    mode,
    idx = -1,
    defaultUserid,
    defaultOrga = null,
    defaultComp = null,
    defaultPreComp = null,
    defaultCnum = '',
    defaultPreCnum = '',
    defaultTitle = '',
    defaultBodatefrom = null,
    defaultContdate = null,
    defaultBodateto = '',
    defaultStatus = null,
    defaultSpec = '',
    defaultIsConfirm = 'N',
    defaultInsu = null,
    defaultRate = null,
    defaultCycle = carConstants.payMethod[0],
    defaultCarfamily = null,
    defaultCarage = null,
    defaultCarNum = '',
    defaultCarYear = null,
    defaultCarCode = '',
    defaultCarDate = null,
}) => {
    const displayName = 'wr-pages-car-detail';

    const router = useRouter();

    const dispatch = useDispatch();

    const { contacts, removedContacts } = useSelector<AppState, CommonState>(
        (state) => state.common,
    );

    const { carUseCompanies, orgas, users } = useSelector<AppState, HrState>(
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
    const [tab, setTab] = useTab(CAR_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    const labelType = editable ? 'active' : 'disable';
    // 조직
    const [orga] = useSelect(orgas, defaultOrga);
    // 담당자
    const [manager, setManager] = useSelect(users);
    // 보험사
    const [comp] = useSelect(carUseCompanies, defaultComp);
    // 전보험사
    const [preComp] = useSelect(carUseCompanies, defaultPreComp);
    // 계약번호
    const [cnum] = useInput(defaultCnum);
    // 전계약번호
    const [preCnum] = useInput(defaultPreCnum);
    // 계약일자
    const [contdate] = useDatepicker(
        defaultContdate ? new Date(defaultContdate) : new Date(),
    );
    // 보장시기
    const [boDatefrom] = useDatepicker(
        defaultBodatefrom ? new Date(defaultBodatefrom) : new Date(),
    );
    // 보험기간
    // const [period, setPeriod] = useState('1년');
    // 보장만기
    const [boDateto] = useDatepicker(
        defaultBodateto ? new Date(defaultBodateto) : addYears(new Date(), 1),
    );
    // 단기구분
    const [sDist] = useSelect(carConstants.shortDist);
    // 보험기간
    const boPeriod = differenceInYears(boDateto.value!, boDatefrom.value!);
    // 계약상태
    const [status] = useSelect(longConstants.status, defaultStatus);
    // 인수구분
    const [insu] = useSelect(carConstants.dist, defaultInsu);
    // 등급
    const [rate] = useSelect(carConstants.grade, defaultRate);
    // 납입방법
    const [cycle] = useSelect(carConstants.payMethod, defaultCycle);
    // 보험료
    const payment = pays.reduce((acc, cur) => acc + cur.pay, 0);
    // 운전자범위
    const [carfamily] = useSelect(carConstants.driverRange, defaultCarfamily);
    // 최저연령
    const [carage] = useSelect(carConstants.minAge, defaultCarage);
    // 차량번호
    const [carNum] = useInput(defaultCarNum);
    // 차량연식
    const [caryear] = useSelect(
        Array.from({ length: 31 }).reduce((acc: CoreSelectOption[], cur, i) => {
            const targetYear = addYears(new Date(), i * -1)
                .getFullYear()
                .toString();

            if (i === 0) {
                return [
                    {
                        label: `${targetYear}A`,
                        value: `${targetYear}A`,
                    },
                    {
                        label: `${targetYear}B`,
                        value: `${targetYear}B`,
                    },
                ];
            } else {
                return [
                    ...acc,
                    {
                        label: targetYear,
                        value: targetYear,
                    },
                ];
            }
        }, []),
        defaultCarYear,
    );
    // 차명코드
    const [carcode] = useInput(defaultCarCode);
    // 차량등록일
    const [cardate] = useDatepicker(
        defaultCarDate ? new Date(defaultCarDate) : addYears(new Date(), 1),
    );

    // 보장시기 blur 핸들러
    // const handleBlurBoDatefrom = () => {
    //     dispatch(showSetPeriodModal());
    // };
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
            payment,
            userid: manager.value!.value,
            remove: {},
        };

        if (idx !== -1) {
            payload['idx'] = idx;
        }

        if (comp.value) {
            payload.wcode = comp.value.value;
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

        if (mode === 'update') {
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

    // useEffect(() => {
    //     if (boDatefrom.value) {
    //         if (period === '1년') {
    //             setBoDateto(addYears(boDatefrom.value, 1));
    //         }
    //     }
    // }, [period, boDatefrom.value]);

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
                                        subcategory={null}
                                        calSpec={null}
                                        spe="car"
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
                                        {mode === 'update' && (
                                            <div className="col-6">
                                                <div className="wr-ml position-relative">
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
                                                                disabled={
                                                                    !editable
                                                                }
                                                            >
                                                                이력
                                                            </MyButton>
                                                        </div>
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            <WithLabel
                                                id="bo_datefrom"
                                                label="보장시기"
                                                type={labelType}
                                                isRequired={editable}
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
                                        <div className="col-6">
                                            <div className="wr-ml">
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
                                                    {boPeriod > 0 && (
                                                        <div className="wr-with__extension wr-form__unit wr-border-l--hide">
                                                            {`${boPeriod}년`}
                                                        </div>
                                                    )}

                                                    {boPeriod <= 0 && (
                                                        <div className="wr-with__extension">
                                                            <MySelect
                                                                inputId="periodDist"
                                                                placeholder="선택"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                placement="right"
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                {...sDist}
                                                            />
                                                        </div>
                                                    )}
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="insu"
                                                label="인수구분"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="insu"
                                                    placeholder="선택"
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...insu}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="rate"
                                                    label="등급"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="rate"
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...rate}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="payment"
                                                label="보험료"
                                                type={labelType}
                                                isRequired={editable}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="payment"
                                                    className="text-end"
                                                    placeholder="0"
                                                    disabled={true}
                                                    value={payment}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="pay_method"
                                                    label="납입방법"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="pay_method"
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...cycle}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="pre_wcode"
                                                label="전보험사"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="pre_wcode"
                                                    placeholder="선택"
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...preComp}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="pre_cnum"
                                                    label="전계약번호"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="pre_cnum"
                                                        placeholder="전계약번호"
                                                        disabled={!editable}
                                                        className="wr-with__badge--inside-right-1"
                                                        {...preCnum}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${displayName}__right col`}>
                        <ul className="wr-tab__wrap" role="tablist">
                            {CAR_DETAIL_TABS.map((v) => (
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
                                spe="car"
                                carfamilyHooks={carfamily}
                                carageHooks={carage}
                            />
                            <CompareTabpanel
                                id="tabpanelCompare"
                                tabId="tabCompare"
                                hidden={tab.id !== 'tabCompare'}
                                editable={editable}
                                carNumHooks={carNum}
                                carYearHooks={caryear}
                                carCodeHooks={carcode}
                            />
                            <CarPaysTabpanel
                                id="tabpanelPays"
                                tabId="tabPays"
                                hidden={tab.id !== 'tabPays'}
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
            <ProductSearchModal spe="car" />
            {isShowContractorSearchModal && (
                <CustomerSearchModal type="contractor" />
            )}
            {isShowInsuredSearchModal && (
                <CustomerSearchModal type="insured-person" />
            )}
        </>
    );
};
