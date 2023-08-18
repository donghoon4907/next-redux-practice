import type { FC } from 'react';
import type { LongState } from '@reducers/long';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CoreSelectOption } from '@interfaces/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addMonths from 'date-fns/addMonths';
import { MySelect } from '@components/select';
import { LONG_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { MyLayout } from '@components/Layout';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { MyFooter } from '@components/footer';
import { useSelect } from '@hooks/use-select';
import { PaysTabpanel } from '@partials/contract/long/tabpanels/Pays';
import { StateHistoryTabpanel } from '@partials/contract/long/tabpanels/StateHistory';
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
import { LongManagerAccordion } from '@components/accordion/LongManagerHistory';
import { CustomSettingAccordion } from '@components/accordion/CustomSetting';
import longConstants from '@constants/options/long';
import { showProductSearchModal } from '@actions/modal/product-search.action';
import { ProductSearchModal } from '@components/modal/ProductSearch';
import { useApi } from '@hooks/use-api';
import { CustomerSearchModal } from '@components/modal/CustomerSearch';
import { CreatePayModal } from '@components/modal/CreatePay';
import { CreateEndorsementModal } from '@components/modal/CreateEndorsement';
import { isEmpty } from '@utils/validator/common';

interface Props {
    /**
     * 모드: 등록 / 수정
     */
    mode: 'create' | 'update';
    /**
     * 담당자 기본 값
     */
    defaultFc: string;
    /**
     * 담당자 기본 ID
     */
    defaultUserid: string;
    /**
     * 담당자 기본 부서 값
     */
    defaultOrga: string;
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
    defaultPtitle?: string;
    /**
     * 계약일자 기본 값
     */
    defaultContdate?: string;
    /**
     * 보험기간 기본 값
     */
    defaultBodateto?: string;
    /**
     * 납입주기 기본 값
     */
    defaultPayCycle?: CoreSelectOption;
    /**
     * 납입기간 기본 값
     */
    defaultPayDateto?: string;
    defaultPayDu?: CoreSelectOption;
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
     * 상품타입 기본 값
     */
    defaultProductType?: string;
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

export const LongForm: FC<Props> = ({
    mode,
    defaultFc,
    defaultUserid,
    defaultOrga,
    defaultComp = null,
    defaultCnum = '',
    defaultPtitle = '',
    defaultContdate = null,
    defaultBodateto = null,
    defaultPayCycle = null,
    defaultPayDateto = null,
    defaultPayDu = null,
    defaultStatus = null,
    defaultPstatus = null,
    defaultStatusDate = null,
    defaultLastWhoi = '',
    defaultProductType = '',
    defaultSubCategory = '',
    defaultIsConfirm = 'N',
    defaultCalSpec = '',
    defaultPayment = '',
}) => {
    const displayName = 'wr-pages-long-detail';

    const dispatch = useDispatch();

    const { longUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { selectedProduct } = useSelector<AppState, LongState>(
        (state) => state.long,
    );

    // const createUser = useApi(createUserRequest);
    // 탭 관리
    const [tab, setTab] = useTab(LONG_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    const labelType = editable ? 'active' : 'disable';
    // 보험사
    const [comp] = useSelect(longUseCompanies, defaultComp);
    // 계약번호
    const [cnum] = useInput(defaultCnum);
    // 상품명
    // const [ptitle] = useInput(defaultPtitle);
    // 계약일자
    const [contdate] = useDatepicker(
        defaultContdate ? new Date(defaultContdate) : null,
        // {
        //     callbackOnChange: (next) => {
        //         if (!next) {
        //             if (tab.label === '납입실적') {
        //                 setTab(LONG_DETAIL_TABS[0]);
        //             }
        //         }
        //     },
        // },
    );
    // 보험기간
    const [boDateto] = useDatepicker(
        defaultBodateto ? new Date(defaultBodateto) : null,
    );
    // 납입주기
    const [payCycle] = useSelect(longConstants.payCycle, defaultPayCycle);
    // 납입기간
    const [payDu] = useSelect(longConstants.payDu, defaultPayDu, {
        callbackOnChange: (next) => {
            if (next) {
                if (contdate.value) {
                    if (next.value === '종신') {
                        setPayDateto(null);
                    } else {
                        const date = addMonths(
                            contdate.value,
                            12 * +next.value,
                        );

                        setPayDateto(date);
                    }
                } else {
                    alert('계약일을 입력해주세요');
                }
            }
        },
    });
    const [payDateto, setPayDateto] = useDatepicker(
        defaultPayDateto ? new Date(defaultPayDateto) : null,
    );
    // 계약상태
    const [status] = useSelect(longConstants.status, defaultStatus);
    // 납입상태
    const [payStatus] = useSelect(longConstants.pStatus, defaultPstatus);
    // 상태반영일
    const [statusDate] = useDatepicker(
        defaultStatusDate ? new Date(defaultStatusDate) : null,
    );
    // 최종납입월
    // const [lastMonth] = useInput(long.last_month);
    // 종납회차
    const [lastWhoi] = useInput(defaultLastWhoi);
    // 실적보험료
    const [payment] = useNumbericInput(defaultPayment, { addComma: true });
    // 보험료
    // const [payment] = useNumbericInput(long.payment.toString(), {
    //     addComma: true,
    // });
    // 월납환산수정P
    // const [tp] = useNumbericInput(long.tp.toString(), { addComma: true });
    // const [tpRate] = useInput(long.tp_rate);
    // 선택한 변경사항
    // const [selectedChangeHis, setSelectedChangeHis] = useState('');
    // 수금 실적 추가 요청한 레코드 수
    // const [paysAddCount, setPaysAddCount] = useState(0);
    // 상태 이력 추가 요청한 레코드 수
    // const [statusHisAddCount, setStatusHisAddCount] = useState(0);
    // 변경 내역 추가 요청한 레코드 수
    // const [changeHisAddCount, setChangeHisAddCount] = useState(0);

    const handleCreate = () => {};

    const handleUpdate = () => {};
    // 수정 버튼 클릭 핸들러
    const handleClickModify = () => {
        setEditable(true);
    };
    // 취소 버튼 클릭 핸들러
    const handleClickCancel = () => {
        const tf = confirm('수정을 취소하시겠습니까?');

        if (tf) {
            setEditable(false);
        }
    };
    // 상품명 찾기 클릭 핸들러
    const handleClickSearchPtitle = () => {
        dispatch(showProductSearchModal());
    };

    // const handleShowHistory = (body: any) => {
    //     setSelectedChangeHis(JSON.stringify(body, undefined, 2));
    // };

    // const log = long.log.map((v: any) => ({
    //     ...v,
    //     remark: v.content.remark,
    //     body: ['button', '보기', () => handleShowHistory(v.content.body)],
    // }));
    const productType = selectedProduct
        ? selectedProduct.spec
        : defaultProductType;
    const subCategory = selectedProduct
        ? selectedProduct.subcategory
        : defaultSubCategory;
    const calSpec = selectedProduct ? selectedProduct.cal_spec : defaultCalSpec;

    const pTitle = selectedProduct ? selectedProduct.title : defaultPtitle;

    let pTitlePaddingRate = 0;
    if (productType) {
        pTitlePaddingRate += 1;
    }

    if (subCategory) {
        pTitlePaddingRate += 1;
    }

    return (
        <>
            <MyLayout>
                <div className={`${displayName} row`}>
                    <div className="col-5">
                        <div
                            className={`${displayName}__left wr-frame__section`}
                        >
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <LongManagerAccordion
                                        defaultTitle={`${defaultOrga} ${defaultFc}`}
                                    />
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
                                    <div className="row wr-mt">
                                        <div className="col">
                                            <WithLabel
                                                id="ptitle"
                                                label="상품명"
                                                type={labelType}
                                            >
                                                <div className="wr-with__badge">
                                                    <MyInput
                                                        type="text"
                                                        id="ptitle"
                                                        className={`wr-with__badge--inside-left-${pTitlePaddingRate}`}
                                                        placeholder=""
                                                        disabled={true}
                                                        value={pTitle}
                                                        button={
                                                            comp.value &&
                                                            editable
                                                                ? {
                                                                      className:
                                                                          'btn-md btn-primary',
                                                                      onClick:
                                                                          handleClickSearchPtitle,
                                                                      children:
                                                                          (
                                                                              <>
                                                                                  <span>
                                                                                      찾기
                                                                                  </span>
                                                                              </>
                                                                          ),
                                                                  }
                                                                : undefined
                                                        }
                                                        unit={
                                                            editable
                                                                ? ''
                                                                : calSpec
                                                        }
                                                    />

                                                    <div className="wr-with__badge--left wr-badge__wrap">
                                                        {productType && (
                                                            <span className="badge rounded-pill bg-primary wr-badge">
                                                                {productType}
                                                                <span className="visually-hidden">
                                                                    {
                                                                        productType
                                                                    }
                                                                </span>
                                                            </span>
                                                        )}
                                                        {subCategory && (
                                                            <span className="badge rounded-pill bg-warning wr-badge">
                                                                {subCategory}
                                                                <span className="visually-hidden">
                                                                    {
                                                                        subCategory
                                                                    }
                                                                </span>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </WithLabel>
                                        </div>
                                    </div>
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
                                                    id="contdate"
                                                    label="납입주기"
                                                    type={labelType}
                                                    isRequired={editable}
                                                >
                                                    <MySelect
                                                        inputId="contdate"
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
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
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            <WithLabel
                                                id="gExpireDate"
                                                label="보장만기"
                                                type={labelType}
                                            >
                                                <MyDatepicker
                                                    id="gExpireDate"
                                                    size="md"
                                                    placeholder="보장만기"
                                                    disabled={!editable}
                                                    hooks={boDateto}
                                                />
                                                <div className="wr-with__extension">
                                                    <MySelect
                                                        placeholder="전기납"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        placement="right"
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="pExpireDate"
                                                    label="납입만기"
                                                    type={labelType}
                                                    isRequired={editable}
                                                >
                                                    <MyDatepicker
                                                        id="pExpireDate"
                                                        size="md"
                                                        placeholder="납입만기"
                                                        disabled={true}
                                                        hooks={payDateto}
                                                    />
                                                    <div className="wr-with__extension">
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
                                                id="status"
                                                label="계약상태"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    placeholder="선택"
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...status}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="pStatus"
                                                    label="납입상태"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="pStatus"
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...payStatus}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="statusDate"
                                                label="상태반영일"
                                                type={labelType}
                                            >
                                                <MyDatepicker
                                                    id="statusDate"
                                                    size="md"
                                                    placeholder="상태반영일"
                                                    disabled={!editable}
                                                    hooks={statusDate}
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
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="last_whoi"
                                                    label="종납회차"
                                                    type={labelType}
                                                >
                                                    <MyDatepicker
                                                        id="last_whoi"
                                                        size="md"
                                                        format="yyyy-MM"
                                                        placeholder="종납회차"
                                                        disabled={!editable}
                                                        hooks={contdate}
                                                    />
                                                    <div
                                                        className="wr-with__extension"
                                                        style={{ width: 100 }}
                                                    >
                                                        <MyInput
                                                            type="number"
                                                            className="wr-border-l--hide"
                                                            placeholder="종납회차"
                                                            disabled={!editable}
                                                            {...lastWhoi}
                                                            unit="회"
                                                        />
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
                                            <WithLabel
                                                id="pay_m"
                                                label="월납기준"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="pay_m"
                                                    className="text-end"
                                                    placeholder="0"
                                                    disabled={!editable}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="pay_bo"
                                                label="보장보험료"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="pay_bo"
                                                    className="text-end"
                                                    placeholder="0"
                                                    disabled={!editable}
                                                />
                                                <div
                                                    className="wr-with__extension"
                                                    style={{ width: 100 }}
                                                >
                                                    <MyInput
                                                        type="number"
                                                        className="wr-border-l--hide"
                                                        disabled={!editable}
                                                        value="240"
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
                                                    type="text"
                                                    id="pay_j"
                                                    className="text-end"
                                                    placeholder="0"
                                                    disabled={!editable}
                                                />
                                                <div
                                                    className="wr-with__extension"
                                                    style={{ width: 100 }}
                                                >
                                                    <MyInput
                                                        type="number"
                                                        className="wr-border-l--hide"
                                                        disabled={!editable}
                                                        value="240"
                                                        unit="%"
                                                    />
                                                </div>
                                            </WithLabel>
                                            <WithLabel
                                                id="pay_sil"
                                                label="실손보험료"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="pay_sil"
                                                    className="text-end"
                                                    placeholder="0"
                                                    disabled={!editable}
                                                />
                                                <div
                                                    className="wr-with__extension"
                                                    style={{ width: 100 }}
                                                >
                                                    <MyInput
                                                        type="number"
                                                        className="wr-border-l--hide"
                                                        disabled={!editable}
                                                        value="240"
                                                        unit="%"
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="tp"
                                                    label="수정보험료"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="tp"
                                                        className="text-end"
                                                        placeholder="0"
                                                        disabled={!editable}
                                                    />
                                                    <div
                                                        className="wr-with__extension"
                                                        style={{ width: 100 }}
                                                    >
                                                        <MyInput
                                                            type="number"
                                                            className="wr-border-l--hide"
                                                            disabled={!editable}
                                                            value="240"
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
                                                        type="text"
                                                        id="tp1"
                                                        className="text-end"
                                                        placeholder="0"
                                                        disabled={!editable}
                                                    />
                                                    <div
                                                        className="wr-with__extension"
                                                        style={{ width: 100 }}
                                                    >
                                                        <MyInput
                                                            type="number"
                                                            className="wr-border-l--hide"
                                                            disabled={!editable}
                                                            value="240"
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
                                                        type="text"
                                                        id="tp2"
                                                        className="text-end"
                                                        placeholder="0"
                                                        disabled={!editable}
                                                    />
                                                    <div
                                                        className="wr-with__extension"
                                                        style={{ width: 100 }}
                                                    >
                                                        <MyInput
                                                            type="number"
                                                            className="wr-border-l--hide"
                                                            disabled={!editable}
                                                            value="240"
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
                                                        type="text"
                                                        id="tp3"
                                                        className="text-end"
                                                        placeholder="0"
                                                        disabled={!editable}
                                                    />
                                                    <div
                                                        className="wr-with__extension"
                                                        style={{ width: 100 }}
                                                    >
                                                        <MyInput
                                                            type="number"
                                                            className="wr-border-l--hide"
                                                            disabled={!editable}
                                                            value="240"
                                                            unit="%"
                                                        />
                                                    </div>
                                                </WithLabel>
                                                <WithLabel
                                                    id="ksm"
                                                    label="저축유지수정"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="ksm"
                                                        className="text-end"
                                                        placeholder="0"
                                                        disabled={!editable}
                                                    />
                                                    <div
                                                        className="wr-with__extension"
                                                        style={{ width: 100 }}
                                                    >
                                                        <MyInput
                                                            type="number"
                                                            className="wr-border-l--hide"
                                                            disabled={!editable}
                                                            value="240"
                                                            unit="%"
                                                        />
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
                                                id="sc"
                                                label="정산구분"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="sc"
                                                    placeholder="기본정산"
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="ssm"
                                                    label="정산개시월"
                                                    type={labelType}
                                                >
                                                    <MyDatepicker
                                                        id="ssm"
                                                        size="md"
                                                        format="yyyy-MM"
                                                        placeholder="정산개시월"
                                                        disabled={!editable}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="wyc"
                                                label="본인계약여부"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="wyc"
                                                    placeholder="선택"
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="sd"
                                                    label="청약설계"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="sd"
                                                        placeholder="본인"
                                                        placeHolderFontSize={16}
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
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <CustomSettingAccordion data={[]} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className={`${displayName}__right`}>
                            <ul className="wr-tab__wrap" role="tablist">
                                {LONG_DETAIL_TABS.map((v) => {
                                    // if (v.label === '납입실적') {
                                    //     if (!contdate.value) {
                                    //         return null;
                                    //     }
                                    // }

                                    return (
                                        <MyTab
                                            key={v.id}
                                            onClick={setTab}
                                            isActive={v.id === tab.id}
                                            {...v}
                                        />
                                    );
                                })}
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

                                {/* <ChangeHistoryTabpanel
                                    id="tabpanelChangeHis"
                                    tabId="tabChangeHis"
                                    hidden={tab.id !== 'tabChangeHis'}
                                    data={log}
                                    editable={editable}
                                    selectedData={selectedChangeHis}
                                /> */}
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
                </div>
                <MyFooter>
                    <div className="wr-footer__between">
                        <div></div>
                        <div className="wr-pages-detail__buttons">
                            {editable && (
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
            {comp.value && (
                <ProductSearchModal
                    wname={comp.value.label}
                    wcode={comp.value.value}
                />
            )}
            <CustomerSearchModal />
            <CreatePayModal contdate={contdate.value} payment={payment.value} />
            <CreateEndorsementModal />
            <CreateEtcModal />
        </>
    );
};
