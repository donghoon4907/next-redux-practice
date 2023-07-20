import type { NextPage } from 'next';
import type { CoreTabOption } from '@interfaces/core';
import type { LongState } from '@reducers/long';
import Head from 'next/head';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
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
import { getLongRequest } from '@actions/long/get-long.action';
import { PaysTabpanel } from '@partials/long/tabpanels/Pays';
import { StateHistoryTabpanel } from '@partials/long/tabpanels/StateHistory';
import { ChangeHistoryTabpanel } from '@partials/long/tabpanels/ChangeHistory';
import { MyButton } from '@components/button';
import { showUserHistoryModal } from '@actions/modal/user-history.action';
import { EtcsTabpanel } from '@partials/long/tabpanels/Etcs';
import { CreateEtcModal } from '@components/modal/CreateEtc';
import { UserHistoryModal } from '@components/modal/UserHistory';
import {
    BIRTH_TYPE,
    CON_STATUS,
    INSU_COMP,
    INSU_DURATION,
    PAY_CYCLE,
    PAY_STATUS,
} from '@constants/selectOption';

const Long: NextPage<LongState> = ({ long }) => {
    const dispatch = useDispatch();

    // const createUser = useApi(createUserRequest);
    // 탭 관리
    const [tab, setTab] = useState<CoreTabOption>(LONG_DETAIL_TABS[0]);
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
    const [contdate] = useInput(long.contdate);
    // 보험기간
    // const boDu = useSelect(
    //     INSU_DURATION.filter(({ value }) => value === long.bo_du)[0],
    // );
    const [boDu] = useInput(long.bo_du);
    const [boDateto] = useInput(long.bo_dateto);
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
    const [payDateto] = useInput(long.pay_dateto);
    // 계약상태
    const [statusDate] = useInput(long.status_date);
    const [status] = useSelect(
        CON_STATUS,
        CON_STATUS.filter(({ value }) => value === long.status)[0],
    );
    // 수금상태
    const [psDate] = useInput(long.ps_date);
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

    const handleClickTab = (tab: CoreTabOption) => {
        setTab(tab);
    };

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
                <div className="wr-pages-long-detail row">
                    <div className="col-5">
                        <div className="wr-pages-long-detail__left wr-frame__section">
                            <div className="wr-pages-long-detail__block">
                                <div className="wr-group">
                                    <span className="wr-pages-long-detail__department">
                                        {`${long.orga} ${long.fc}`}
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
                            <div className="wr-pages-long-detail__block">
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
                                                        readOnly={!editable}
                                                        className="wr-with__badge--inside-right-1"
                                                        {...cnum}
                                                    />
                                                    {long.confirm === 'Y' && (
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
                                                    readOnly={!editable}
                                                    {...ptitle}
                                                />
                                                <div className="wr-with__badge--left wr-badge__wrap">
                                                    <span className="badge rounded-pill bg-primary wr-badge">
                                                        {long.product_type}
                                                        <span className="visually-hidden">
                                                            {long.product_type}
                                                        </span>
                                                    </span>
                                                    <span className="badge rounded-pill bg-warning wr-badge">
                                                        {long.subcategory}
                                                        <span className="visually-hidden">
                                                            {long.subcategory}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </WithLabel>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-long-detail__block">
                                <div className="row">
                                    <div className="col-6">
                                        <WithLabel
                                            id="contdate"
                                            label="계약일자"
                                            type={labelType}
                                        >
                                            <MyInput
                                                type="text"
                                                id="contdate"
                                                placeholder="계약일자"
                                                readOnly={!editable}
                                                {...contdate}
                                            />
                                        </WithLabel>
                                    </div>
                                    <div className="col-6">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="bo_dateto"
                                                label="보험기간"
                                                type={labelType}
                                            >
                                                <div className="wr-pages-long-detail__with">
                                                    {/* <MySelect
                                                        inputId="bo_du"
                                                        options={INSU_DURATION}
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...boDu}
                                                    /> */}
                                                    <MyInput
                                                        type="text"
                                                        id="bo_du"
                                                        placeholder="보험기간"
                                                        readOnly={!editable}
                                                        {...boDu}
                                                    />
                                                    <MyInput
                                                        type="text"
                                                        id="bo_dateto"
                                                        placeholder="보험기간"
                                                        readOnly={!editable}
                                                        {...boDateto}
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="col-6">
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
                                    <div className="col-6">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="pay_dateto"
                                                label="납입기간"
                                                type={labelType}
                                            >
                                                <div className="wr-pages-long-detail__with">
                                                    <MySelect
                                                        inputId="pay_du"
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...payDu}
                                                    />
                                                    <MyInput
                                                        type="text"
                                                        id="pay_dateto"
                                                        placeholder="납입기간"
                                                        readOnly={!editable}
                                                        {...payDateto}
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="col-6">
                                        <WithLabel
                                            id="status_date"
                                            label="계약상태"
                                            type={labelType}
                                        >
                                            <div className="wr-pages-long-detail__with">
                                                <MyInput
                                                    type="text"
                                                    id="status_date"
                                                    placeholder="계약상태"
                                                    readOnly={!editable}
                                                    {...statusDate}
                                                />
                                                <MySelect
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...status}
                                                />
                                            </div>
                                        </WithLabel>
                                    </div>
                                    <div className="col-6">
                                        <div className="wr-ml">
                                            <MyInput
                                                type="text"
                                                placeholder="계약상태 (추후 업데이트 예정)"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="col-6">
                                        <WithLabel
                                            id="ps_date"
                                            label="수금상태"
                                            type={labelType}
                                        >
                                            <div className="wr-pages-long-detail__with">
                                                <MyInput
                                                    type="text"
                                                    id="ps_date"
                                                    placeholder="수금상태"
                                                    readOnly={!editable}
                                                    {...psDate}
                                                />
                                                <MySelect
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...payStatus}
                                                />
                                            </div>
                                        </WithLabel>
                                    </div>
                                    <div className="col-6">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="last_month"
                                                label="최종납입월"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="last_month"
                                                    placeholder="최종납입월"
                                                    readOnly={!editable}
                                                    {...lastMonth}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="col-6">
                                        <WithLabel
                                            id="last_whoi"
                                            label="종납회차"
                                            type={labelType}
                                        >
                                            <MyInput
                                                type="number"
                                                id="last_whoi"
                                                placeholder="종납회차"
                                                readOnly={!editable}
                                                {...lastWhoi}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-long-detail__block">
                                <div className="row">
                                    <div className="col-6">
                                        <WithLabel
                                            id="pay_m"
                                            label="월납환산보험료"
                                            type={labelType}
                                        >
                                            <MyInput
                                                type="text"
                                                id="pay_m"
                                                className="text-end"
                                                placeholder="월납환산보험료"
                                                readOnly={!editable}
                                                {...payM}
                                            />
                                        </WithLabel>
                                    </div>
                                    <div className="col-6">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="payoutRate"
                                                label="보험료"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    className="text-end"
                                                    placeholder="보험료"
                                                    readOnly={!editable}
                                                    {...payment}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="col-6">
                                        <WithLabel
                                            id="payoutRate"
                                            label="월납환산수정P"
                                            type={labelType}
                                        >
                                            <div className="wr-pages-long-detail__with">
                                                <MyInput
                                                    type="text"
                                                    className="text-end"
                                                    placeholder="월납환산수정P"
                                                    // readOnly={!editable}
                                                    {...tp}
                                                />
                                                <MyInput
                                                    type="number"
                                                    placeholder="월납환산수정P 수치"
                                                    unit="%"
                                                    readOnly={!editable}
                                                    {...tpRate}
                                                />
                                            </div>
                                        </WithLabel>
                                    </div>
                                    <div className="col-6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="wr-pages-long-detail__right">
                            <ul className="wr-tab__wrap" role="tablist">
                                {LONG_DETAIL_TABS.map((v) => (
                                    <MyTab
                                        key={v.id}
                                        onClick={handleClickTab}
                                        isActive={v.id === tab.id}
                                        {...v}
                                    />
                                ))}
                                <li className="wr-tab__line"></li>
                            </ul>
                            <div className="wr-pages-long-detail__body wr-frame__tabbody">
                                <PaysTabpanel
                                    id="tabpanelPays"
                                    tabId="tabPays"
                                    hidden={tab.id !== 'tabPays'}
                                    data={long.pays}
                                    editable={editable}
                                    addCount={paysAddCount}
                                    onAddCount={handleIncrementPaysAddCount}
                                />
                                <StateHistoryTabpanel
                                    id="tabpanelStatusHis"
                                    tabId="tabStatusHis"
                                    hidden={tab.id !== 'tabStatusHis'}
                                    data={long.status_his}
                                    editable={editable}
                                    addCount={statusHisAddCount}
                                    onAddCount={
                                        handleIncrementStatusHisAddCount
                                    }
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
                                <EtcsTabpanel
                                    id="tabpanelEtcs"
                                    tabId="tabEtcs"
                                    hidden={tab.id !== 'tabEtcs'}
                                    editable={editable}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-footer__between">
                        <div></div>
                        <div className="wr-pages-long-detail__submit">
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

            <UserHistoryModal />
            <CreateEtcModal />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch, sagaTask, getState }) =>
        async ({ req, res, query, ...etc }) => {
            const cidx = query.cidx as string;

            dispatch(getLongRequest({ cidx }));

            dispatch(END);

            let props = {};
            try {
                await sagaTask?.toPromise();

                props = getState().long;
            } catch (e) {
                res.statusCode = 302;

                res.setHeader('Location', '/404');
            }

            return {
                props,
            };
        },
);

export default Long;
