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
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { addYears } from 'date-fns';
import { differenceInYears } from 'date-fns';
import { CAR_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useSelect } from '@hooks/use-select';
import { MyButton } from '@components/button';
import { useTab } from '@hooks/use-tab';
import { useDatepicker } from '@hooks/use-datepicker';
// import { CustomSettingAccordion } from '@components/accordion/CustomSetting';
import carConstants from '@constants/options/car';
import longConstants from '@constants/options/long';
import commonConstants from '@constants/options/common';
import { ProductSearchModal } from '@components/modal/ProductSearch';
import { useApi } from '@hooks/use-api';
import { CustomerSearchModal } from '@components/modal/CustomerSearch';
import { findSelectOption } from '@utils/getter';
import { getUsersRequest } from '@actions/hr/get-users';
// import { showSetPeriodModal } from '@actions/modal/set-period.action';
import { SearchProductInput } from '@partials/contract/common/input/SearchProductInput';
import { CarPaysTabpanel } from '@partials/contract/car/tabpanels/CarPays';
// import { CreateBupumModal } from '@components/modal/CreateBupum';
import { createCarRequest } from '@actions/contract/car/create-car.action';
import { CreateCarDTO, UpdateCarDTO } from '@dto/contractor/Car.dto';
import { CreateCarPayModal } from '@components/modal/CreateCarPay';
import { MyFooter } from '@components/footer';
import { LongManagerAccordion } from '@components/accordion/LongManagerHistory';
import { updateCarRequest } from '@actions/contract/car/update-car.action';
import { UserHistoryModal } from '@components/modal/UserHistory';
import { FloatSelect } from '@components/select/Float';
import { FloatInput } from '@components/input/Float';
import { SearchContractorInput } from '../common/input/SearchContractorInput';
import { InfoCustAccordion } from '@components/accordion/InfoCust';
import { InfoProductAccordion } from '@components/accordion/InfoProduct';
import { FloatDatepicker } from '@components/datepicker/Float';
import { SingleContactTabpanel } from '@partials/customer/tabpanels/SingleContact';
import { Compare2Tabpanel } from './tabpanels/Compare2';
import { getEstimatesRequest } from '@actions/contract/car/get-estimates.action';
import { showEstimateSearchModal } from '@actions/modal/estimate-search.action';
import { EstimateSearchModal } from '@components/modal/EstimateSearch';

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
     * 상품명 기본 값
     */
    defaultTitle?: string;
    /**
     * 보종 기본 값
     */
    defaultSpec?: string;
    /**
     * 정산보종 기본 값
     */
    defaultCalSpec?: string;
    /**
     * 인수구분 기본 값
     */
    defaultInsu?: CoreSelectOption;
    /**
     * 납입보험료 기본 값
     */
    defaultSumpay?: string;
    /**
     * 등급 기본 값
     */
    defaultRate?: CoreSelectOption;
    /**
     * 정산구분 기본 값
     */
    defaultCalType?: CoreSelectOption;
    /**
     * 청약설계 기본 값
     */
    defaultSulDist?: CoreSelectOption;
    /**
     * 운전자범위 기본 값
     */
    defaultCarfamily?: CoreSelectOption;
    /**
     * 최저운전자 연령 기본 값
     */
    defaultCarage?: CoreSelectOption;
    /**
     * 차량번호 기본 값
     */
    defaultCarNum?: string;
    /**
     * 보험시기 기본 값
     */
    defaultBodatefrom?: string;
    /**
     * 납입방법 기본 값
     */
    defaultCycle?: CoreSelectOption;
    /**
     * 보험만기 기본 값
     */
    defaultBodateto?: string;
    /**
     * 계약상태 기본 값
     */
    defaultStatus?: CoreSelectOption;
    /**
     * 보험기간구분 기본 값
     */
    defaultBodesc?: CoreSelectOption;
    /**
     * 전보험사 기본 값
     */
    defaultPreComp?: CoreSelectOption;
    /**
     * 전계약번호 기본 값
     */
    defaultPreCnum?: string;
    /**
     * 블랙박스 구입시기 기본 값
     */
    // defaultBlackboxBuydate?: string;
    /**
     * 블랙박스 금액 기본 값
     */
    // defaultBlackboxBuyPrice?: string;
    /**
     * 기본차량가액 기본 값
     */
    defaultCarprice?: string;
    /**
     * 검증 여부 기본 값
     */
    defaultIsConfirm?: string;
}

export const CarForm: FC<Props> = ({
    mode,
    idx = -1,
    defaultUserid,
    defaultOrganize = '',
    defaultOrga = null,
    defaultComp = null,
    defaultCnum = '',
    defaultTitle = '',
    defaultInsu = null,
    defaultSumpay = '',
    defaultRate = null,
    defaultCalType = null,
    defaultSulDist = null,
    defaultCarfamily = null,
    defaultCarage = null,
    defaultCarNum = '',
    defaultBodatefrom = null,
    defaultCycle = carConstants.payMethod[0],
    defaultBodateto = '',
    defaultStatus = null,
    defaultBodesc = carConstants.shortDist[0],
    defaultPreComp = null,
    defaultPreCnum = '',
    defaultSpec = '',
    defaultIsConfirm = 'N',
}) => {
    const displayName = 'wr-pages-car-detail';

    const dispatch = useDispatch();

    const router = useRouter();

    const { newUserHistory } = useSelector<AppState, CommonState>(
        (state) => state.common,
    );

    const { longUseCompanies, orgas, users } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { selectedProduct, loadedContract, pays, removedPays } = useSelector<
        AppState,
        ContractState
    >((state) => state.contract);

    // const { estimate } = useSelector<AppState, CarState>((state) => state.car);

    const { isShowContractorSearchModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const createCar = useApi(createCarRequest);

    const updateCar = useApi(updateCarRequest);

    const getUsers = useApi(getUsersRequest);

    const getEstimates = useApi(getEstimatesRequest);
    // 탭 관리
    const [tab, setTab] = useTab(CAR_DETAIL_TABS[0]);
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
    // 인수구분
    const [insu] = useSelect(carConstants.dist, defaultInsu);
    // 납입보험료
    const [sumpay] = useNumbericInput(defaultSumpay, {
        addComma: true,
    });
    // 등급
    const [rate] = useSelect(carConstants.cGrade, defaultRate);
    // 정산구분
    const [cal_type] = useSelect(carConstants.calType, defaultCalType);
    // 청약설계
    const [sul_dist] = useSelect(commonConstants.sulDist, defaultSulDist);
    // 운전자범위
    const [carfamily] = useSelect(carConstants.driverRange, defaultCarfamily);
    // 최저운전자 연령
    const [carage] = useSelect(carConstants.minAge, defaultCarage);
    // 차량번호
    const [carnum] = useInput(defaultCarNum);
    // 보험시기
    const [boDatefrom] = useDatepicker(
        defaultBodatefrom ? new Date(defaultBodatefrom) : new Date(),
    );
    // 납입방법
    const [cycle] = useSelect(carConstants.payMethod, defaultCycle);
    // 보험만기
    const [boDateto] = useDatepicker(
        defaultBodateto ? new Date(defaultBodateto) : addYears(new Date(), 1),
    );
    // 계약상태
    const [status] = useSelect(longConstants.status, defaultStatus);
    // 보험기간구분
    const [boDesc] = useSelect(carConstants.shortDist, defaultBodesc);
    // 전보험사
    const [preWcode] = useSelect(longUseCompanies, defaultPreComp);
    // 전계약번호
    const [preCnum] = useInput(defaultPreCnum);

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

    const handleClickLoadEstimate = () => {
        getEstimates(
            { userid: 'W0383', bo_datefrom: '2023-11-12' },
            // { userid: defaultUserid, bo_datefrom: boDatefrom.value },
            () => {
                dispatch(showEstimateSearchModal());
            },
        );
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
            remove: {},
        };

        if (idx !== -1) {
            payload['idx'] = idx;
        }

        if (wcode.value) {
            payload.wcode = +wcode.value.value;
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
                                            {...sumpay}
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
                                            {...carnum}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            label="보험시기"
                                            readOnly={!editable}
                                            hooks={boDatefrom}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="납입방법"
                                            isDisabled={!editable}
                                            {...cycle}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            label="보험만기"
                                            readOnly={!editable}
                                            hooks={boDateto}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="계약상태"
                                            isDisabled={!editable}
                                            {...status}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="보험기간구분"
                                            isDisabled={!editable}
                                            {...boDesc}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="전보험사"
                                            isDisabled={!editable}
                                            {...preWcode}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="전계약번호"
                                            readOnly={!editable}
                                            {...preCnum}
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
                                hidden={v.isHideMode === mode}
                                {...v}
                            />
                        ))}
                        <li className="wr-tab__line"></li>
                    </ul>
                    <div className="wr-pages-detail__body">
                        <CarPaysTabpanel
                            id="tabpanelPays"
                            tabId="tabPays"
                            hidden={tab.id !== 'tabPays'}
                            editable={editable}
                        />
                        {mode === 'update' && loadedContract && (
                            <SingleContactTabpanel
                                id="tabpanelContact"
                                tabId="tabContact"
                                hidden={tab.id !== 'tabContact'}
                                cust_idx={loadedContract.idx}
                                spe_idx={idx}
                                spe="car"
                                cnum={cnum.value}
                            />
                        )}
                        <Compare2Tabpanel
                            id="tabpanelCompare"
                            tabId="tabCompare"
                            hidden={tab.id !== 'tabCompare'}
                            editable={editable}
                        />
                    </div>
                </div>
            </div>
            <MyFooter>
                <div className="wr-footer__between">
                    <div>
                        <MyButton
                            type="button"
                            className="btn-warning btn-sm"
                            onClick={handleClickLoadEstimate}
                        >
                            비교견적 가져오기
                        </MyButton>
                    </div>
                    <div className="wr-pages-detail__buttons">
                        {editable && mode === 'update' && (
                            <MyButton
                                type="button"
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
            <CreateCarPayModal />
            <EstimateSearchModal />
            {mode === 'update' && <UserHistoryModal type="contract" />}
        </>
    );
};
