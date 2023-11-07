import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CommonState } from '@reducers/common';
import type { ModalState } from '@reducers/modal';
import type { ContractState } from '@reducers/contract';
import type { CarState } from '@reducers/car';
import type { CoreSelectOption } from '@interfaces/core';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { addYears } from 'date-fns';
import { differenceInYears } from 'date-fns';
import { MySelect } from '@components/select';
import { CAR_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useSelect } from '@hooks/use-select';
import { MyButton } from '@components/button';
import { useTab } from '@hooks/use-tab';
import { useDatepicker } from '@hooks/use-datepicker';
import { MyDatepicker } from '@components/datepicker';
import { CustomerTabpanel } from '@partials/contract/common/tabpanels/Customer';
// import { CustomSettingAccordion } from '@components/accordion/CustomSetting';
import carConstants from '@constants/options/car';
import longConstants from '@constants/options/long';
import commonConstants from '@constants/options/common';
import { ProductSearchModal } from '@components/modal/ProductSearch';
import { useApi } from '@hooks/use-api';
import { CustomerSearchModal } from '@components/modal/CustomerSearch';
import { isEmpty } from '@utils/validator/common';
import { findSelectOption } from '@utils/getter';
import { getUsersRequest } from '@actions/hr/get-users';
// import { showSetPeriodModal } from '@actions/modal/set-period.action';
import { SearchProductInput } from '@partials/contract/common/input/SearchProductInput';
import { CompareTabpanel } from '@partials/contract/car/tabpanels/Compare';
import { CarPaysTabpanel } from '@partials/contract/car/tabpanels/CarPays';
import { useCheckbox } from '@hooks/use-checkbox';
import { CreateBupumModal } from '@components/modal/CreateBupum';
import { createCarRequest } from '@actions/contract/car/create-car.action';
import { CreateCarDTO, UpdateCarDTO } from '@dto/contractor/Car.dto';
import { CreateCarPayModal } from '@components/modal/CreateCarPay';
import { MyFooter } from '@components/footer';
import { LongManagerAccordion } from '@components/accordion/LongManagerHistory';
import { updateCarRequest } from '@actions/contract/car/update-car.action';
import { UserHistoryModal } from '@components/modal/UserHistory';
import { carShouldDisableDate } from '@utils/datepicker';
import { FloatSelect } from '@components/select/Float';
import { FloatInput } from '@components/input/Float';
import { SearchContractorInput } from '../common/input/SearchContractorInput';
import { InfoCustAccordion } from '@components/accordion/InfoCust';
import { InfoProductAccordion } from '@components/accordion/InfoProduct';
import { FloatDatepicker } from '@components/datepicker/Float';

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
     * 보장만기 - 단기설정 기본 값
     */
    defaultBodesc?: CoreSelectOption;
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
    defaultBaegirang?: string;
    /**
     * 인원 기본 값
     */
    defaultPeopleNum?: string;
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
     * 블랙박스 장착 여부
     */
    defaultHasBlackbox?: CoreSelectOption;
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
    defaultAircode?: CoreSelectOption;
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
    defaultCarprice?: string;
    /**
     * 유상운송 기본 값
     */
    defaultUsang?: CoreSelectOption;
    /**
     * 기중기장치요율 기본 값
     */
    defaultUsang2?: string;
    /**
     * 대인배상I 기본 값
     */
    // defaultDambo1?: string;
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
     * 자녀특약 상세(생년월일) 기본 값
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
    defaultCaruse?: CoreSelectOption;
    /**
     * 일부담보 상세 기본 값
     */
    defaultIlPrice?: string;
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
     * 전계약사고요율 기본값
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
    defaultOrganize = '',
    defaultOrga = null,
    defaultComp = null,
    defaultPreComp = null,
    defaultCnum = '',
    defaultPreCnum = '',
    defaultTitle = '',
    defaultBodatefrom = null,
    defaultContdate = null,
    defaultBodateto = '',
    defaultBodesc = carConstants.shortDist[0],
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
    defaultLpg = false,
    defaultTopcar = false,
    defaultSportcar = false,
    defaultCarName = '',
    defaultCarGrade = carConstants.grade[10],
    defaultBaegirang = '',
    defaultPeopleNum = '',
    defaultAuto = false,
    defaultAbsHalin = false,
    defaultImo = false,
    defaultHasBlackbox = carConstants.hasBb[0],
    defaultBlackboxBuydate = null,
    defaultBlackboxBuyPrice = '',
    defaultAircode = carConstants.airBack[2],
    defaultChung = carConstants.chung[0],
    defaultBluelink = false,
    defaultGps = null,
    defaultJobcodeNm = false,
    defaultMembercode = carConstants.pType[0],
    defaultCarprice = '0',
    defaultUsang = carConstants.usang[0],
    defaultUsang2 = '',
    defaultDambo2 = carConstants.dambo2[1],
    defaultDambo3 = carConstants.dambo3[6],
    defaultDambo4 = carConstants.dambo4[1],
    defaultDambo5 = carConstants.dambo5[1],
    defaultDambo6 = carConstants.dambo6[1],
    defaultGooutDist = carConstants.gDist[0],
    defaultGooutDetail = carConstants.gDetail[0],
    defaultMulSago = carConstants.mSago[3],
    defaultMileDist = carConstants.mDist[0],
    defaultMileDetail = null,
    defaultDrateDist = carConstants.dDist[0],
    defaultDrateDetail = null,
    defaultTmapDist = carConstants.tDist[0],
    defaultTmapDetail = '',
    defaultCaruse = carConstants.use[0],
    defaultIlPrice = '',
    defaultChilddrive = null,
    defaultGuipcarrer = carConstants.exp[0],
    defaultGuipcarrerCar = null,
    defaultLJobcode = null,
    defaultGuipCarrerKb = null,
    defaultTrafficDist = carConstants.tVio[0],
    defaultTrafficDetail = carConstants.numCase[0],
    defaultHalin = carConstants.halin[20],
    defaultRateU = false,
    defaultSpecialCode = carConstants.sCode[0],
    defaultSpecialCode2 = carConstants.sCode2[0],
    defaultSsSago3 = carConstants.sago3[0],
    defaultPreSago3 = carConstants.prevSago[0],
    defaultPSago = null,
    defaultGoout2 = null,
    defaultSago3 = carConstants.numCase[0],
    defaultCarNonum = carConstants.numCase[0],
    defaultSago1 = carConstants.numCase[0],
    defaultCarSago3 = carConstants.numCase[0],
    defaultCarSago2 = carConstants.numCase[0],
    defaultCarSago1 = carConstants.numCase[0],
}) => {
    const displayName = 'wr-pages-car-detail';

    const router = useRouter();

    const { newUserHistory } = useSelector<AppState, CommonState>(
        (state) => state.common,
    );

    const { carUseCompanies, orgas, users } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { selectedProduct, insureds, loadedContract, pays, removedPays } =
        useSelector<AppState, ContractState>((state) => state.contract);

    const { bupums } = useSelector<AppState, CarState>((state) => state.car);

    const { isShowContractorSearchModal, isShowInsuredSearchModal } =
        useSelector<AppState, ModalState>((state) => state.modal);

    const createCar = useApi(createCarRequest);

    const updateCar = useApi(updateCarRequest);

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
    const [wcode] = useSelect(carUseCompanies, defaultComp);
    // 전보험사
    const [preComp] = useSelect(carUseCompanies, defaultPreComp);
    // 계약번호
    const [cnum] = useInput(defaultCnum);
    // 전계약번호
    const [preCnum] = useInput(defaultPreCnum);
    // 계약일자
    const [contdate] = useDatepicker(
        defaultContdate ? new Date(defaultContdate) : new Date(),
        {
            callbackOnChange: (nextDate) => {
                // 계약일자 변경 시 보장 시기 및 보장 만기(1년)가 자동 계산됩니다.
                if (nextDate) {
                    setBoDatefrom(nextDate);

                    setBoDateto(addYears(nextDate, 1));
                }
            },
        },
    );
    // 보장시기
    const [boDatefrom, setBoDatefrom] = useDatepicker(
        defaultBodatefrom ? new Date(defaultBodatefrom) : new Date(),
    );
    // 보험기간
    // const [period, setPeriod] = useState('1년');
    // 보장만기
    const [boDateto, setBoDateto] = useDatepicker(
        defaultBodateto ? new Date(defaultBodateto) : addYears(new Date(), 1),
    );
    // 단기구분
    const [sDist] = useSelect(carConstants.shortDist, defaultBodesc);
    // 보험기간
    const boPeriod = differenceInYears(boDateto.value!, boDatefrom.value!);
    // 계약상태
    const [status] = useSelect(longConstants.status, defaultStatus);
    // 인수구분
    const [insu] = useSelect(carConstants.dist, defaultInsu);
    // 등급
    const [rate] = useSelect(carConstants.cGrade, defaultRate);
    // 정산구분 + 상세작업필요
    const [cal_type] = useSelect(carConstants.calType);
    // 청약설계 + 상세작업필요
    const [sul_dist] = useSelect(commonConstants.sulDist);
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
    // LPG 여부
    const [checkLpg] = useCheckbox(defaultLpg);
    // 탑차 여부
    const [checkTopcar] = useCheckbox(defaultTopcar);
    // 스포츠카 여부
    const [checkSportcar] = useCheckbox(defaultSportcar);
    // 차량명
    const [carname] = useInput(defaultCarName);
    // 차량등급
    const [carGrade] = useSelect(carConstants.grade, defaultCarGrade);
    // 배기량
    const [baegirang] = useNumbericInput(defaultBaegirang);
    // 인원수
    const [peopleNum] = useNumbericInput(defaultPeopleNum);
    // 오토 여부
    const [checkAuto] = useCheckbox(defaultAuto);
    // ABS 여부
    const [checkAbsHalin] = useCheckbox(defaultAbsHalin);
    // 이모빌라이저 여부
    const [checkImo] = useCheckbox(defaultImo);
    // 블랙박스 장착 여부
    const [hasBb] = useSelect(carConstants.hasBb, defaultHasBlackbox);
    // 블랙박스 구입시기
    const [bbBuydate] = useDatepicker(
        defaultBlackboxBuydate ? new Date(defaultBlackboxBuydate) : null,
    );
    // 블랙박스 금액
    const [bbBuyPrice] = useNumbericInput(defaultBlackboxBuyPrice, {
        addComma: true,
    });
    // 에어백
    const [aircode] = useSelect(carConstants.airBack, defaultAircode);
    // 전방출동
    const [chung] = useSelect(carConstants.chung, defaultChung);
    // 커넥티드카 여부
    const [checkBluelink] = useCheckbox(defaultBluelink);
    // 차선이탈
    const [gps] = useSelect(carConstants.gps, defaultGps);
    // 지능형 안전장치 여부
    const [checkJobcodeNm] = useCheckbox(defaultJobcodeNm);
    // 차량구매형태
    const [membercode] = useSelect(carConstants.pType, defaultMembercode);
    // 기본차량가액
    const [carprice] = useNumbericInput(defaultCarprice, {
        addComma: true,
    });
    // 부속가액합계
    const totalBupumsPrice = bupums.reduce((acc, cur) => acc + cur.price, 0);
    // 총차량가액
    const totalPrice = +carprice.value.replace(/,/g, '') + totalBupumsPrice;
    // 유상운송
    const [usang] = useSelect(carConstants.usang, defaultUsang);
    // 기중기장치요율
    const [usang2] = useNumbericInput(defaultUsang2);
    // 대인배상 2
    const [dambo2] = useSelect(carConstants.dambo2, defaultDambo2);
    // 대물한도
    const [dambo3] = useSelect(carConstants.dambo3, defaultDambo3);
    // 자손/자상
    const [dambo4] = useSelect(carConstants.dambo4, defaultDambo4);
    // 무보험차
    const [dambo5] = useSelect(carConstants.dambo5, defaultDambo5);
    // 자기차량
    const [dambo6] = useSelect(carConstants.dambo6, defaultDambo6);
    // 긴급출동
    const [gooutDist] = useSelect(carConstants.gDist, defaultGooutDist);
    // 긴급출동 상세
    const [gooutDetail] = useSelect(carConstants.gDetail, defaultGooutDetail);
    // 물적사고할증
    const [mulSago] = useSelect(carConstants.mSago, defaultMulSago);
    // 마일리지
    const [mileDist] = useSelect(carConstants.mDist, defaultMileDist);
    // 마일리지 상세
    const [mileDetail] = useSelect(carConstants.mDetail, defaultMileDetail);
    // 자녀특약
    const [drateDist] = useSelect(carConstants.dDist, defaultDrateDist);
    // 자녀특약 - 생년월일
    const [drateDetail] = useDatepicker(
        defaultDrateDetail ? new Date(defaultDrateDetail) : null,
    );
    // 안전운전습관
    const [tmapDist] = useSelect(carConstants.tDist, defaultTmapDist);
    // 안전운전습관 점수
    const [tmapDetail] = useNumbericInput(defaultTmapDetail);
    // 차량용도
    const [caruse] = useSelect(carConstants.use, defaultCaruse);
    // 일부담보
    const [ilPrice] = useNumbericInput(defaultIlPrice, {
        addComma: true,
    });
    // 총차량대수
    const [childdrive] = useSelect(carConstants.cDrive, defaultChilddrive);
    // 보험가입경력 - 피보험자
    const [guipcarrer] = useSelect(carConstants.exp, defaultGuipcarrer);
    // 보험가입경력 - 차량
    const [guipcarrerCar] = useSelect(carConstants.exp2, defaultGuipcarrerCar);
    // 직전3년가입경력 - DB
    const [lJobcode] = useSelect(carConstants.exp, defaultLJobcode);
    // 직전3년가입경력 - KB
    const [guipCarrerKb] = useSelect(carConstants.exp, defaultGuipCarrerKb);
    // 교통법규 위반
    const [trafficDist] = useSelect(carConstants.tVio, defaultTrafficDist);
    // 교통법규 위반 건수
    const [trafficDetail] = useSelect(
        carConstants.numCase.slice(0, 4),
        defaultTrafficDetail,
    );
    // 할증율 - 할인할증
    const [halin] = useSelect(carConstants.halin, defaultHalin);
    // 할증율 - 군/법인/해외경력인정
    const [checkRateU] = useCheckbox(defaultRateU);
    // 할증율 - 기본할증
    const [specialCode] = useSelect(carConstants.sCode, defaultSpecialCode);
    // 할증율 - 추가할증
    const [specialCode2] = useSelect(carConstants.sCode2, defaultSpecialCode2);
    // 사고요율 - 3년간사고요율
    const [ssSago3] = useSelect(carConstants.sago3, defaultSsSago3);
    // 사고요율 - 전계약사고요율
    const [preSago3] = useSelect(carConstants.prevSago, defaultPreSago3);
    // 사고요율 - 3년사고점수
    const [pSago] = useSelect(carConstants.sCode2, defaultPSago);
    // 사고요율 - 1년사고점수
    const [goout2] = useSelect(carConstants.sCode2, defaultGoout2);
    // 피보기준 사고건수 - 3년간
    const [sago3] = useSelect(carConstants.numCase, defaultSago3);
    // 피보기준 사고건수 - 2년간
    const [carNonum] = useSelect(carConstants.numCase, defaultCarNonum);
    // 피보기준 사고건수 - 1년간
    const [sago1] = useSelect(carConstants.numCase, defaultSago1);
    // 차량기준 사고건수 - 3년간
    const [carSago3] = useSelect(carConstants.numCase, defaultCarSago3);
    // 차량기준 사고건수 - 2년간
    const [carSago2] = useSelect(carConstants.numCase, defaultCarSago2);
    // 차량기준 사고건수 - 1년간
    const [carSago1] = useSelect(carConstants.numCase, defaultCarSago1);

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

        const createCarDto = new CreateCarDTO(payload);

        if (createCarDto.requiredValidate()) {
            createCar(createCarDto.getPayload());
        }
    };

    const handleUpdate = () => {
        const payload = createPayload();

        const updateLongDto = new UpdateCarDTO(payload);

        if (updateLongDto.requiredValidate()) {
            updateCar(updateLongDto.getPayload(), () => {
                router.replace(location.href);
            });
        }
    };

    const createPayload = () => {
        const payload: any = {
            wcode: -1,
            cnum: cnum.value,
            contdate: dayjs(contdate.value).format('YYYY-MM-DD'),
            bo_datefrom: dayjs(boDatefrom.value).format('YYYY-MM-DD'),
            bo_dateto: dayjs(boDateto.value).format('YYYY-MM-DD'),
            bo_desc: boPeriod > 0 ? '1년' : sDist.value!.value,
            payment,
            p_persons: insureds,
            remove: {},
            carinfo: {
                carprice: +carprice.value,
                bupum_price: totalBupumsPrice,
                car_tot: totalPrice,
            },
            dambo: {
                dambo1: '의무가입',
            },
            insurate: {},
        };

        if (idx !== -1) {
            payload['idx'] = idx;
        }

        if (wcode.value) {
            payload.wcode = +wcode.value.value;
        }

        if (preComp.value) {
            payload['pre_wcode'] = +preComp.value.value;
        }

        if (!isEmpty(preCnum.value)) {
            payload['pre_cnum'] = preCnum.value;
        }

        if (selectedProduct) {
            payload['p_code'] = selectedProduct.p_code;
            payload['title'] = selectedProduct.title;
            payload['spec'] = selectedProduct.spec;
            // payload['subcategory'] = selectedProduct.subcategory;
            payload['cal_spec'] = selectedProduct.cal_spec;
        }

        if (insu.value) {
            payload['insu'] = insu.value.value;
        }

        if (rate.value) {
            payload['rate'] = rate.value.value;
        }

        if (cycle.value) {
            payload['cycle'] = cycle.value.value;
        }

        if (loadedContract) {
            payload['c_idx'] = loadedContract.idx;
            payload['c_name'] = loadedContract.name;
        }

        if (carfamily.value) {
            payload['carfamily'] = carfamily.value.value;
        }

        if (carage.value) {
            payload['carage'] = carage.value.value;
        }

        if (pays.length > 0) {
            payload['pays'] = pays;
        }

        // if (!isEmpty(carNum.value)) {
        //     payload.carinfo['carnum'] = carNum.value;
        // }

        // if (caryear.value) {
        //     payload.carinfo['caryear'] = caryear.value.value;
        // }

        // if (!isEmpty(carcode.value)) {
        //     payload.carinfo['carcode'] = carcode.value;
        // }

        // if (checkLpg.checked) {
        //     payload.carinfo['lpg'] = checkLpg.checked;
        // }

        // if (checkTopcar.checked) {
        //     payload.carinfo['topcar'] = checkTopcar.checked;
        // }

        // if (checkSportcar.checked) {
        //     payload.carinfo['sportcar'] = checkSportcar.checked;
        // }

        // if (checkAuto.checked) {
        //     payload.carinfo['auto'] = checkAuto.checked;
        // }

        // if (checkAbsHalin.checked) {
        //     payload.carinfo['abs_halin'] = checkAbsHalin.checked;
        // }

        // if (checkImo.checked) {
        //     payload.carinfo['imo'] = checkImo.checked;
        // }

        // if (!isEmpty(carname.value)) {
        //     payload.carinfo['carname'] = carname.value;
        // }

        // if (carGrade.value) {
        //     payload.carinfo['car_grade'] = carGrade.value.value;
        // }

        // if (!isEmpty(baegirang.value)) {
        //     payload.carinfo['baegirang'] = +baegirang.value;
        // }

        // if (!isEmpty(peopleNum.value)) {
        //     payload.carinfo['people_num'] = +peopleNum.value;
        // }

        // if (hasBb.value) {
        //     payload.carinfo['blackbox'] = {};
        //     if (hasBb.value.value === '장착') {
        //         if (bbBuydate.value) {
        //             payload.carinfo['blackbox']['buydate'] = dayjs(
        //                 bbBuydate.value,
        //             ).format('YYYY-MM-DD');
        //         }

        //         if (!isEmpty(bbBuyPrice.value)) {
        //             payload.carinfo['blackbox']['buyprice'] = +bbBuyPrice.value;
        //         }
        //     }
        // }

        // if (aircode.value) {
        //     payload.carinfo['aircode'] = +aircode.value.value;
        // }

        // if (chung.value) {
        //     payload.carinfo['chung'] = chung.value.value;
        //     payload.carinfo['blue_link'] = checkBluelink.checked;
        // }

        // if (gps.value) {
        //     payload.carinfo['gps'] = gps.value.value;
        //     payload.carinfo['l_jobcode_nm'] = checkJobcodeNm.checked;
        // }

        // if (bupums.length > 0) {
        //     payload.carinfo['bupum'] = bupums;
        // }

        // if (usang.value) {
        //     payload.carinfo['usang'] = usang.value.value;
        // }

        // if (!isEmpty(usang2.value)) {
        //     payload.carinfo['usnag2'] = +usang2.value;
        // }

        // if (membercode.value) {
        //     payload.carinfo['membercode'] = membercode.value.value;
        // }

        // if (dambo2.value) {
        //     payload.dambo['dambo2'] = dambo2.value.value;
        // }

        // if (dambo3.value) {
        //     payload.dambo['dambo3'] = dambo3.value.value;
        // }

        // if (dambo4.value) {
        //     payload.dambo['dambo4'] = dambo4.value.value;
        // }

        // if (dambo5.value) {
        //     payload.dambo['dambo5'] = dambo5.value.value;
        // }

        // if (dambo6.value) {
        //     payload.dambo['dambo6'] = dambo6.value.value;
        // }

        // if (gooutDist.value) {
        //     payload.dambo['goout'] = {
        //         dist: gooutDist.value.value,
        //     };

        //     if (gooutDetail.value) {
        //         payload.dambo['goout']['detail'] = gooutDetail.value.value;
        //     }
        // }

        // if (mulSago.value) {
        //     payload.dambo['mul_sago'] = mulSago.value.value;
        // }

        // if (mileDist.value) {
        //     payload.dambo['mile'] = {
        //         dist: mileDist.value.value,
        //     };

        //     if (mileDist.value.value !== '미가입') {
        //         if (mileDetail.value) {
        //             payload.dambo['mile']['detail'] = mileDetail.value.value;
        //         }
        //     }
        // }

        // if (drateDist.value) {
        //     payload.dambo['drate'] = {
        //         dist: drateDist.value.value,
        //     };

        //     if (drateDist.value.value === '자녀') {
        //         if (drateDetail.value) {
        //             payload.dambo['drate']['detail'] = dayjs(
        //                 drateDetail.value,
        //             ).format('YYYY-MM-DD');
        //         }
        //     }
        // }

        // if (tmapDist.value) {
        //     payload.dambo['tmap'] = {
        //         dist: tmapDist.value.value,
        //     };

        //     if (tmapDist.value.value !== '미가입') {
        //         if (!isEmpty(tmapDetail.value)) {
        //             payload.dambo['tmap']['detail'] = tmapDetail.value;
        //         }
        //     }
        // }

        // if (caruse.value) {
        //     payload.dambo['caeruse'] = caruse.value.value;
        // }

        // if (!isEmpty(ilPrice.value)) {
        //     payload.dambo['il_price'] = +ilPrice.value.replace(/,/g, '');
        // }

        // if (childdrive.value) {
        //     payload.insurate['childdrive'] = childdrive.value.value;
        // }

        // if (guipcarrer.value) {
        //     payload.insurate['guipcarrer'] = guipcarrer.value.value;
        // }

        // if (guipcarrerCar.value) {
        //     payload.insurate['guipcarrer_car'] = guipcarrerCar.value.value;
        // }

        // if (lJobcode.value) {
        //     payload.insurate['l_jobcode'] = lJobcode.value.value;
        // }

        // if (guipCarrerKb.value) {
        //     payload.insurate['guip_carrer_kb'] = guipCarrerKb.value.value;
        // }

        // if (trafficDist.value) {
        //     payload.insurate['traffic'] = {
        //         dist: trafficDist.value.value,
        //     };

        //     if (trafficDetail.value) {
        //         payload.insurate['traffic']['detail'] = trafficDetail.value;
        //     }
        // }

        // if (halin.value) {
        //     payload.insurate['halin'] = halin.value.value;
        // }

        // if (checkRateU.checked) {
        //     payload.insurate['rate_u'] = checkRateU.checked;
        // }

        // if (specialCode.value) {
        //     payload.insurate['special_code'] = specialCode.value.value;
        // }

        // if (specialCode2.value) {
        //     payload.insurate['special_code2'] = specialCode2.value.value;
        // }

        // if (ssSago3.value) {
        //     payload.insurate['ss_sago3'] = ssSago3.value.value;
        // }

        // if (preSago3.value) {
        //     payload.insurate['pre_sago3'] = preSago3.value.value;
        // }

        // if (pSago.value) {
        //     payload.insurate['p_sago'] = pSago.value.value;
        // }

        // if (goout2.value) {
        //     payload.insurate['goout2'] = goout2.value.value;
        // }

        // if (sago3.value) {
        //     payload.insurate['sago3'] = +sago3.value.value;
        // }

        // if (carNonum.value) {
        //     payload.insurate['car_nonum'] = +carNonum.value.value;
        // }

        // if (sago1.value) {
        //     payload.insurate['sago1'] = +sago1.value.value;
        // }

        // if (carSago3.value) {
        //     payload.insurate['car_sago3'] = +carSago3.value.value;
        // }

        // if (carSago2.value) {
        //     payload.insurate['car_sago2'] = +carSago2.value.value;
        // }

        // if (carSago1.value) {
        //     payload.insurate['car_sago1'] = +carSago1.value.value;
        // }
        if (mode === 'create') {
            payload['userid'] = manager.value ? manager.value.value : null;
        } else if (mode === 'update') {
            if (newUserHistory) {
                payload['userid'] = newUserHistory.userid;
            } else {
                payload['userid'] = defaultUserid;
            }

            if (removedPays.length > 0) {
                payload['remove']['pays'] = removedPays.map((v) => v.idx);
            }
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
            <div className={`${displayName} wr-pages-detail wr-frame__tabbody`}>
                <div
                    className={`${displayName}__left wr-pages-detail__left  wr-pages-detail__applydatepicker`}
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
                                            defaultTitle={defaultTitle}
                                            defaultSpec={defaultSpec}
                                            defaultSubcategory={null}
                                            defaultCalSpec={null}
                                            spe="car"
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="인수구분"
                                            isDisabled={!editable}
                                            {...insu}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="납입보험료"
                                            readOnly
                                            isNumber
                                            defaultValue={payment.toLocaleString()}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="등급"
                                            isDisabled={!editable}
                                            {...rate}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="정산구분"
                                            isDisabled={!editable}
                                            {...cal_type}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="청약설계"
                                            isDisabled={!editable}
                                            {...sul_dist}
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
                                        <SearchContractorInput
                                            type="계약자"
                                            editable={
                                                editable && mode === 'create'
                                            }
                                            userid={defaultUserid}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="운전자 범위"
                                            isDisabled={!editable}
                                            {...carfamily}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="최저운전자 연령"
                                            isDisabled={!editable}
                                            {...carage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="차량번호"
                                            readOnly={!editable}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            label="보험시기"
                                            readOnly={!editable}
                                            isRequired
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="납입방법"
                                            isDisabled={!editable}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            label="보험만기"
                                            readOnly={!editable}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="계약상태"
                                            isDisabled={!editable}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            label="보험기간구분"
                                            readOnly={!editable}
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
                    <div className="wr-pages-detail__body">
                        {/* <CustomerTabpanel
                            id="tabpanelCustomer"
                            tabId="tabCustomer"
                            hidden={tab.id !== 'tabCustomer'}
                            editable={editable}
                            userid={defaultUserid}
                            spe="car"
                            carfamilyHooks={carfamily}
                            carageHooks={carage}
                        /> */}
                        <CompareTabpanel
                            id="tabpanelCompare"
                            tabId="tabCompare"
                            hidden={tab.id !== 'tabCompare'}
                            editable={editable}
                            carNumHooks={carNum}
                            carYearHooks={caryear}
                            carCodeHooks={carcode}
                            cardateHooks={cardate}
                            checkLpgHooks={checkLpg}
                            checkTopcarHooks={checkTopcar}
                            checkSportcarHooks={checkSportcar}
                            carnameHooks={carname}
                            carGradeHooks={carGrade}
                            baegirangHooks={baegirang}
                            peopleNumHooks={peopleNum}
                            checkAutoHooks={checkAuto}
                            checkAbsHalinHooks={checkAbsHalin}
                            checkImoHooks={checkImo}
                            hasBbHooks={hasBb}
                            bbBuydateHooks={bbBuydate}
                            bbBuyPriceHooks={bbBuyPrice}
                            aircodeHooks={aircode}
                            chungHooks={chung}
                            checkBluelinkHooks={checkBluelink}
                            gpsHooks={gps}
                            checkJobcodeNmHooks={checkJobcodeNm}
                            membercodeHooks={membercode}
                            carpriceHooks={carprice}
                            usangHooks={usang}
                            usang2Hooks={usang2}
                            dambo2Hooks={dambo2}
                            dambo3Hooks={dambo3}
                            dambo4Hooks={dambo4}
                            dambo5Hooks={dambo5}
                            dambo6Hooks={dambo6}
                            gooutDistHooks={gooutDist}
                            gooutDetailHooks={gooutDetail}
                            mulSagoHooks={mulSago}
                            mileDistHooks={mileDist}
                            mileDetailHooks={mileDetail}
                            drateDistHooks={drateDist}
                            drateDetailHooks={drateDetail}
                            tmapDistHooks={tmapDist}
                            tmapDetailHooks={tmapDetail}
                            caruseHooks={caruse}
                            ilPriceHooks={ilPrice}
                            childdriveHooks={childdrive}
                            guipcarrerHooks={guipcarrer}
                            guipcarrerCarHooks={guipcarrerCar}
                            lJobcodeHooks={lJobcode}
                            guipCarrerKbHooks={guipCarrerKb}
                            trafficDistHooks={trafficDist}
                            trafficDetailHooks={trafficDetail}
                            halinHooks={halin}
                            checkRateUHooks={checkRateU}
                            specialCodeHooks={specialCode}
                            specialCode2Hooks={specialCode2}
                            ssSago3Hooks={ssSago3}
                            preSago3Hooks={preSago3}
                            pSagoHooks={pSago}
                            goout2Hooks={goout2}
                            sago3Hooks={sago3}
                            carNonumHooks={carNonum}
                            sago1Hooks={sago1}
                            carSago3Hooks={carSago3}
                            carSago2Hooks={carSago2}
                            carSago1Hooks={carSago1}
                            totalBupumPrice={totalBupumsPrice}
                            totalPrice={totalPrice}
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
                                    editable ? handleUpdate : handleClickModify
                                }
                            >
                                {editable ? '변경 사항 적용' : '수정'}
                            </MyButton>
                        )}
                    </div>
                </div>
            </MyFooter>
            <ProductSearchModal spe="car" />
            {isShowContractorSearchModal && (
                <CustomerSearchModal type="contractor" />
            )}
            {isShowInsuredSearchModal && (
                <CustomerSearchModal type="insured-person" />
            )}
            <CreateCarPayModal />
            <CreateBupumModal />
            {mode === 'update' && <UserHistoryModal type="contract" />}
        </>
    );
};
