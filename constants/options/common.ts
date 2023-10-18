import type { CoreSelectOption } from '@interfaces/core';

// 페이지네이션 - 보기수
const LIST_COUNTS: CoreSelectOption[] = [
    {
        label: '25개 보기',
        value: '25',
    },
    {
        label: '50개 보기',
        value: '50',
    },
    {
        label: '100개 보기',
        value: '100',
    },
    {
        label: '500개 보기',
        value: '500',
    },
];

// Y or N
const YES_NO: CoreSelectOption[] = [
    {
        label: '전체',
        value: '',
        isFixed: false,
    },
    {
        label: 'Y',
        value: 'Y',
        isFixed: false,
    },
    {
        label: 'N',
        value: 'N',
        isFixed: false,
    },
];

// 손보 목록
const D_COMPANIES = [
    {
        value: 'https://mganet.mggeneralins.com',
        label: 'MG손해',
    },
    {
        value: 'https://lottero.lotteins.co.kr',
        label: '롯데손해',
    },
    {
        value: 'http://sales.meritzfire.com',
        label: '메리츠',
    },
    {
        value: 'https://erp.samsungfire.com/irj/servlet/prt/portal/prtroot/logon.LogonPage',
        label: '삼성화재',
    },
    {
        value: 'http://portal.hwgeneralins.com/',
        label: '한화손해',
    },
    {
        value: 'http://upride.heungkukfire.co.kr/portal/magicsso/login.jsp',
        label: '흥국화재',
    },
    {
        value: 'https://sp.hi.co.kr/',
        label: '현대해상',
    },
    {
        value: 'https://sales.kbinsure.co.kr',
        label: 'KB손해',
    },
    {
        value: 'https://www.mdbins.com/',
        label: 'DB손보',
    },
    {
        value: 'http://aigen-ga.aig.co.kr',
        label: 'AIG손해',
    },
    {
        value: 'https://ss.nhfire.co.kr',
        label: '농협손해',
    },
    {
        value: 'https://sfa.saleshana.com',
        label: '하나손해',
    },
    {
        value: 'http://itm.aceinsurance.co.kr',
        label: '에이스손해',
    },
];

// 생보 목록
const L_COMPANIES = [
    {
        value: 'http://kss.kdblife.co.kr',
        label: 'KDB생명',
    },
    {
        value: 'http://u-channel-ga.samsunglife.com',
        label: '삼성생명',
    },
    {
        value: 'http://www.loveageplan.com',
        label: '미래에셋',
    },
    {
        value: 'https://sfa.nhlife.co.kr:8443',
        label: '농협생명',
    },
    {
        value: 'https://ga.lina.co.kr',
        label: '라이나생명',
    },
    {
        value: 'https://ga.kyobo.com/webcenter/portal/PTL_P_0050?_afrLoop=34898013300547767&_afrWindowMode=0&Adf-Window-Id=w1bp6j2sk4e&_afrFS=16&_afrMT=screen&_afrMFW=1920&_afrMFH=912&_afrMFDW=1920&_afrMFDH=1080&_afrMFC=8&_afrMFCI=0&_afrMFM=0&_afrMFR=96&_afrMFG=0&_afrMFS=0&_afrMFO=0#none',
        label: '교보생명',
    },
    {
        value: 'https://1004.myangel.co.kr/',
        label: '동양생명',
    },
    {
        value: 'http://esfa.kbli.co.kr',
        label: 'KB생명',
    },
    {
        value: 'https://etopia.idblife.com/',
        label: 'DB생명',
    },
    {
        value: 'https://hmp.hanwhalife.com/online/ga',
        label: '한화생명',
    },
    {
        value: 'https://ga.shinhanlife.co.kr',
        label: '신한라이프',
    },
    {
        value: 'https://e-life.heungkuklife.co.kr',
        label: ' 흥국생명',
    },
    {
        value: 'https://metplus.metlife.co.kr',
        label: '메트라이프',
    },
    {
        value: 'https://esmart.chubblife.co.kr',
        label: 'CHUBB생명',
    },
    {
        value: 'https://ga.abllife.co.kr',
        label: 'ABL생명',
    },
    {
        value: 'http://ga.cardif.co.kr',
        label: '카디프생명',
    },
    {
        value: 'https://sfa.kblife.co.kr/',
        label: 'KB라이프생명',
    },
];

const rootSelectOptions = {
    listCounts: LIST_COUNTS,
    dCompanies: D_COMPANIES,
    lCompanies: L_COMPANIES,
    yn: YES_NO,
};

export default rootSelectOptions;
