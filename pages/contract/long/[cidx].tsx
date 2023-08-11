import type { NextPage } from 'next';
import type { LongState } from '@reducers/long';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { PaysTabpanel } from '@partials/long/tabpanels/Pays';
import { StateHistoryTabpanel } from '@partials/long/tabpanels/StateHistory';
import { ChangeHistoryTabpanel } from '@partials/long/tabpanels/ChangeHistory';
import { MyButton } from '@components/button';
import { showUserHistoryModal } from '@actions/modal/user-history.action';
import { EtcsTabpanel } from '@partials/long/tabpanels/Etcs';
import { CreateEtcModal } from '@components/modal/CreateEtc';
import { UserHistoryModal } from '@components/modal/UserHistory';
import longsService from '@services/longsService';
import { useTab } from '@hooks/use-tab';
import {
    CON_STATUS,
    INSU_COMP,
    INSU_DURATION,
    PAY_CYCLE,
    PAY_STATUS,
} from '@constants/selectOption';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import { useDatepicker } from '@hooks/use-datepicker';
import { MyDatepicker } from '@components/datepicker';
import { CustomerTabpanel } from '@partials/long/tabpanels/Customer';
import { EndorsementTabpanel } from '@partials/long/tabpanels/Endorsement';
import { ContactTabpanel } from '@partials/customer/tabpanels/Contact';
import { CalcPerformTabpanel } from '@partials/long/tabpanels/CalcPerform';
import { LongManagerAccordion } from '@components/accordion/LongManagerHistory';
import { CustomSettingAccordion } from '@components/accordion/CustomSetting';

const Long: NextPage<LongState> = ({ long }) => {
    const displayName = 'wr-pages-long-detail';

    const dispatch = useDispatch();

    // const createUser = useApi(createUserRequest);
    // 탭 관리
    const [tab, setTab] = useTab(LONG_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(false);
    // 보험사
    const [comp] = useSelect(
        INSU_COMP,
        INSU_COMP.filter(({ value }) => value === long.company)[0],
    );
    // 계약번호
    const [cnum] = useInput(long.cnum);
    // 상품명
    const [ptitle] = useInput(long.ptitle);
    // 계약일자
    const [contdate] = useDatepicker(
        long.contdate ? new Date(long.contdate) : null,
    );
    // 보험기간
    // const [boDu] = useSelect(
    //     INSU_DURATION,
    //     INSU_DURATION.filter(({ value }) => value === long.bo_du)[0],
    // );
    // const [boDu] = useInput(long.bo_du);
    const [boDateto] = useDatepicker(
        long.bo_dateto ? new Date(long.bo_dateto) : null,
    );
    // 납입주기
    const [payCycle] = useSelect(
        PAY_CYCLE,
        PAY_CYCLE.filter(({ value }) => value === long.pay_cycle)[0],
    );
    // 납입기간
    const [payDu] = useSelect(
        INSU_DURATION,
        INSU_DURATION.filter(({ value }) => value === long.pay_du)[0],
    );
    const [payDateto] = useDatepicker(
        long.pay_dateto ? new Date(long.pay_dateto) : null,
    );
    // 계약상태
    // const [statusDate] = useInput(long.status_date);
    const [status] = useSelect(
        CON_STATUS,
        CON_STATUS.filter(({ value }) => value === long.status)[0],
    );
    // 납입상태
    // const [psDate] = useInput(long.ps_date);
    const [payStatus] = useSelect(
        PAY_STATUS,
        PAY_STATUS.filter(({ value }) => value === long.pay_status)[0],
    );
    // 최종납입월
    const [lastMonth] = useInput(long.last_month);
    // 종납회차
    const [lastWhoi] = useInput(long.last_whoi);
    // 월납환산보험료
    const [payM] = useNumbericInput(long.pay_m.toString(), { addComma: true });
    // 보험료
    const [payment] = useNumbericInput(long.payment.toString(), {
        addComma: true,
    });
    // 월납환산수정P
    const [tp] = useNumbericInput(long.tp.toString(), { addComma: true });
    const [tpRate] = useInput(long.tp_rate);
    // 선택한 변경사항
    const [selectedChangeHis, setSelectedChangeHis] = useState('');
    // 수금 실적 추가 요청한 레코드 수
    const [paysAddCount, setPaysAddCount] = useState(0);
    // 상태 이력 추가 요청한 레코드 수
    const [statusHisAddCount, setStatusHisAddCount] = useState(0);
    // 변경 내역 추가 요청한 레코드 수
    const [changeHisAddCount, setChangeHisAddCount] = useState(0);

    const handleIncrementPaysAddCount = () => {
        setPaysAddCount((prev) => prev + 1);
    };

    const handleIncrementStatusHisAddCount = () => {
        setStatusHisAddCount((prev) => prev + 1);
    };

    const handleIncrementChangeHisAddCount = () => {
        setChangeHisAddCount((prev) => prev + 1);
    };

    const handleClickChangeHistory = () => {
        dispatch(showUserHistoryModal());
    };

    const handleCancelModify = () => {
        const tf = confirm('수정을 취소하시겠습니까?');

        if (tf) {
            setEditable(false);
            setPaysAddCount(0);
            setStatusHisAddCount(0);
            setChangeHisAddCount(0);
        }
    };

    const handleModify = () => {
        setEditable(true);
    };

    const labelType = editable ? 'active' : 'disable';

    const handleShowHistory = (body: any) => {
        setSelectedChangeHis(JSON.stringify(body, undefined, 2));
    };

    const log = long.log.map((v: any) => ({
        ...v,
        remark: v.content.remark,
        body: ['button', '보기', () => handleShowHistory(v.content.body)],
    }));

    useEffect(() => {
        // 탭 추가
        const tab = new TabModule();

        const to = `/contract/long/${long.idx}`;
        if (!tab.read(to)) {
            tab.create({
                id: to,
                label: `장기계약상세 - ${long.cname}`,
                to,
            });
        }

        dispatch(initTab(tab.getAll()));
    }, [dispatch, long]);

    return (
        <>
            <Head>
                <title>장기계약상세</title>
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
                                    <LongManagerAccordion
                                        defaultTitle={`${long.orga} ${long.fc}`}
                                        data={long.user_his}
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
                                                        {long.confirm ===
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
                                                        className="wr-with__badge--inside-left-2"
                                                        placeholder="상품명"
                                                        disabled={!editable}
                                                        {...ptitle}
                                                        unit="보장"
                                                    />
                                                    <div className="wr-with__badge--left wr-badge__wrap">
                                                        <span className="badge rounded-pill bg-primary wr-badge">
                                                            {long.product_type}
                                                            <span className="visually-hidden">
                                                                {
                                                                    long.product_type
                                                                }
                                                            </span>
                                                        </span>
                                                        <span className="badge rounded-pill bg-warning wr-badge">
                                                            {long.subcategory}
                                                            <span className="visually-hidden">
                                                                {
                                                                    long.subcategory
                                                                }
                                                            </span>
                                                        </span>
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
                                                >
                                                    <MyDatepicker
                                                        id="pExpireDate"
                                                        size="md"
                                                        placeholder="납입만기"
                                                        disabled={!editable}
                                                        hooks={payDateto}
                                                    />
                                                    <div className="wr-with__extension">
                                                        <MySelect
                                                            placeholder="20년"
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
                                                id="statDate"
                                                label="상태반영일"
                                                type={labelType}
                                            >
                                                <MyDatepicker
                                                    id="statDate"
                                                    size="md"
                                                    placeholder="상태반영일"
                                                    disabled={!editable}
                                                    // hooks={contdate}
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
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="payment"
                                                    className="text-end"
                                                    placeholder="0"
                                                    disabled={!editable}
                                                    // {...payM}
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
                            <div
                                className={`${displayName}__body wr-frame__tabbody`}
                            >
                                <CustomerTabpanel
                                    id="tabpanelCustomer"
                                    tabId="tabCustomer"
                                    hidden={tab.id !== 'tabCustomer'}
                                    editable={editable}
                                />
                                <PaysTabpanel
                                    id="tabpanelPays"
                                    tabId="tabPays"
                                    hidden={tab.id !== 'tabPays'}
                                    data={long.pays}
                                    editable={editable}
                                    addCount={paysAddCount}
                                    onAddCount={handleIncrementPaysAddCount}
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
                                />

                                <ChangeHistoryTabpanel
                                    id="tabpanelChangeHis"
                                    tabId="tabChangeHis"
                                    hidden={tab.id !== 'tabChangeHis'}
                                    data={log}
                                    editable={editable}
                                    selectedData={selectedChangeHis}
                                    addCount={changeHisAddCount}
                                    onAddCount={
                                        handleIncrementChangeHisAddCount
                                    }
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
                </div>
                <MyFooter>
                    <div className="wr-footer__between">
                        <div></div>
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
            <CreateEtcModal />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async (_, ctx) => {
        const { query } = ctx;

        const cidx = query.cidx as string;

        const output: any = {
            props: {},
        };

        try {
            const { data } = await longsService.getLong({ cidx });

            output.props.long = data;
        } catch {
            output.redirect = {
                destination: '/404',
                permanent: true, // true로 설정하면 301 상태 코드로 리다이렉션
            };
        }

        return output;
    }),
);

export default Long;
