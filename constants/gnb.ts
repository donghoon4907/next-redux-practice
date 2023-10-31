import type { CoreMenuOption } from '@interfaces/core';

export const GNBS: CoreMenuOption[] = [
    { id: 'customer', label: '고객', to: '/customer' },
    { id: 'sales', label: '영업', to: '/sales' },
    { id: 'contract', label: '계약', to: '/contract/long/list' },
    { id: 'income', label: '소득', to: '/income' },
    { id: 'hr', label: '인사', to: '/hr' },
];

export const SUBMENUS: CoreMenuOption[] = [
    { id: 'submenu1', label: '통합검색', to: '#' },
    { id: 'submenu2', label: '게시판', to: '#' },
    { id: 'submenu3', label: '일정관리', to: '/calendar' },
    { id: 'submenu3', label: 'SMS/Fax', to: '#' },
    { id: 'submenu3', label: 'Mypage', to: '#' },
];

export const ASIDE_MENU: any = {
    customer: {
        // join: {
        //     id: 'customer-join',
        //     label: '가입고객',
        //     to: '',
        //     create: {
        //         id: 'customer-join_create',
        //         label: '고객 등록',
        //         to: '/customer/join/create',
        //     },
        // },
        // nojoin: {
        //     id: 'customer-nojoin',
        //     label: '미가입고객',
        //     to: '',
        //     nojoin: {
        //         id: 'customer-nojoin_nojoin',
        //         label: '미가입고객',
        //         to: '/customer/nojoin/nojoin',
        //     },
        // },
        // incoming: {
        //     id: 'customer-incoming',
        //     label: '유입고객',
        //     to: '',
        //     incoming: {
        //         id: 'customer-incoming_incoming',
        //         label: '유입고객',
        //         to: '/customer/incoming/incoming',
        //     },
        // },
        // history: {
        //     id: 'customer-history',
        //     label: '고객접촉이력',
        //     to: '',
        //     spec: {
        //         id: 'customer-history_spec',
        //         label: '고객접촉명세',
        //         to: '/customer/history/spec',
        //     },
        //     ftfm: {
        //         id: 'customer-history_ftfm',
        //         label: '고객대면관리',
        //         to: '/customer/history/ftfm',
        //     },
        //     transcript: {
        //         id: 'customer-history_transcript',
        //         label: '녹취내역',
        //         to: '/customer/history/transcript',
        //     },
        //     send: {
        //         id: 'customer-history_send',
        //         label: '메시징/발송',
        //         to: '/customer/history/send',
        //     },
        // },
        // status: {
        //     id: 'customer-status',
        //     label: '고객현황',
        //     to: '',
        //     region: {
        //         id: 'customer-status_region',
        //         label: '지역별 고객현황',
        //         to: '/customer/status/region',
        //     },
        //     contract: {
        //         id: 'customer-status_contract',
        //         label: '고객별 계약현황',
        //         to: '/customer/status/contract',
        //     },
        // },
    },
    sales: {
        // spec: {
        //     id: 'sales-spec',
        //     label: '영업명세총괄',
        //     to: '',
        //     spec: {
        //         id: 'sales-spec_spec',
        //         label: '영업명세총괄',
        //         to: '/sales/spec/spec',
        //     },
        // },
        // trend: {
        //     id: 'sales-trend',
        //     label: '영업추이',
        //     to: '',
        //     total: {
        //         id: 'sales-trend_total',
        //         label: '종합매출추이',
        //         to: '/sales/trend/total',
        //     },
        //     long: {
        //         id: 'sales-trend_long',
        //         label: '장기',
        //         to: '/sales/trend/long',
        //     },
        //     car: {
        //         id: 'sales-trend_car',
        //         label: '자동차',
        //         to: '/sales/trend/car',
        //     },
        //     normal: {
        //         id: 'sales-trend_normal',
        //         label: '일반',
        //         to: '/sales/trend/normal',
        //     },
        // },
        // crate: {
        //     id: 'sales-crate',
        //     label: '수금율',
        //     to: '',
        //     crate: {
        //         id: 'sales-crate_crate',
        //         label: '수금율',
        //         to: '/sales/crate/crate',
        //     },
        // },
        // department: {
        //     id: 'sales-department',
        //     label: '영업조직',
        //     to: '',
        //     ostatus: {
        //         id: 'sales-department_ostatus',
        //         label: '가동현황',
        //         to: '/sales/department/ostatus',
        //     },
        //     sstatus: {
        //         id: 'sales-department_sstatus',
        //         label: '정착율 현황',
        //         to: '/sales/department/sstatus',
        //     },
        // },
        // risk: {
        //     id: 'sales-risk',
        //     label: '리스크관리',
        //     to: '',
        //     cri: {
        //         id: 'sales-risk-cri',
        //         label: '계약모집지표',
        //         to: '',
        //         total: {
        //             id: 'sales-risk-cri_total',
        //             label: '종합모집지표',
        //             to: '/sales/risk/cri/total',
        //         },
        //         is: {
        //             id: 'sales-risk-cri_is',
        //             label: '불완전판매명세',
        //             to: '/sales/risk/cri/is',
        //         },
        //         rc: {
        //             id: 'sales-risk-cri_rc',
        //             label: '모집민원명세',
        //             to: '/sales/risk/cri/rc',
        //         },
        //         emem: {
        //             id: 'sales-risk-cri_emem',
        //             label: '월초월말계약집중 명세',
        //             to: '/sales/risk/cri/emem',
        //         },
        //         swr: {
        //             id: 'sales-risk-cri_swr',
        //             label: '청약철회율',
        //             to: '/sales/risk/cri/swr',
        //         },
        //         lc: {
        //             id: 'sales-risk-cri_lc',
        //             label: '고액계약명세',
        //             to: '/sales/risk/cri/lc',
        //         },
        //     },
        //     cmi: {
        //         id: 'sales-risk-cmi',
        //         label: '계약관리지표',
        //         to: '',
        //         crr: {
        //             id: 'sales-risk-cmi_crr',
        //             label: '계약유지율지표',
        //             to: '/sales/risk/cmi/crr',
        //         },
        //         rcpr: {
        //             id: 'sales-risk-cmi_rcpr',
        //             label: '모집-수금설계사 상이율',
        //             to: '/sales/risk/cmi/rcpr',
        //         },
        //         rcpd: {
        //             id: 'sales-risk-cmi_rcpd',
        //             label: '모집-수금설계사 상이내역',
        //             to: '/sales/risk/cmi/rcpd',
        //         },
        //     },
        //     doi: {
        //         id: 'sales-risk-doi',
        //         label: '대리점 운영지표',
        //         to: '',
        //         frr: {
        //             id: 'sales-risk-doi_frr',
        //             label: '수수료 환수율',
        //             to: '/sales/risk/doi/frr',
        //         },
        //     },
        //     crmi: {
        //         id: 'sales-risk-crmi',
        //         label: '계약자관리지표',
        //         to: '',
        //         tom: {
        //             id: 'sales-risk-crmi_tom',
        //             label: '누계5건이상 계약자',
        //             to: '/sales/risk/crmi/tom',
        //         },
        //         tmp: {
        //             id: 'sales-risk-crmi_tmp',
        //             label: '누계월납 100만원 이상 계약자',
        //             to: '/sales/risk/crmi/tmp',
        //         },
        //     },
        //     frc: {
        //         id: 'sales-risk-frc',
        //         label: 'FRC관리지표',
        //         to: '',
        //         sc: {
        //             id: 'sales-risk-frc_sc',
        //             label: '자기계약건수 3건 이상 FC',
        //             to: '/sales/risk/frc/sc',
        //         },
        //     },
        // },
    },
    contract: {
        long: {
            id: 'contract-long',
            label: '장기',
            to: '',
            bo: {
                id: 'contract-long_bo',
                label: '장기보유계약',
                to: '/contract/long/bo',
            },
            sil: {
                id: 'contract-long_sil',
                label: '장기실적',
                to: '/contract/long/sil',
            },
            silhyo: {
                id: 'contract-long_silhyo',
                label: '실효명세',
                to: '/contract/long/silhyo',
            },
            buhwal: {
                id: 'contract-long_buhwal',
                label: '부활명세',
                to: '/contract/long/buhwal',
            },
            // upload: {
            //     id: 'contract-long_upload',
            //     label: '선택업로드',
            //     to: '/contract/long/upload',
            // },
            // sch: {
            //     id: 'contract-long_sch',
            //     label: '상태변경내역',
            //     to: '/contract/long/sch',
            // },
        },
        car: {
            id: 'contract-car',
            label: '자동차',
            to: '',
            bo: {
                id: 'contract-car_bo',
                label: '자동차보유계약',
                to: '/contract/car/bo',
            },
            // create: {
            //     id: 'contract-car_create',
            //     label: '자동차계약등록',
            //     to: '/contract/car/create',
            // },
            // compare: {
            //     id: 'contract-car-compare',
            //     label: '비교견적',
            //     to: '/contract/car/compare',
            // },
            // hc: {
            //     id: 'contract-car_hc',
            //     label: '보유계약',
            //     to: '/contract/car/hc',
            // },
            // mc: {
            //     id: 'contract-car_mc',
            //     label: '만기계약',
            //     to: '/contract/car/mc',
            // },
            // im: {
            //     id: 'contract-car_im',
            //     label: '분납관리',
            //     to: '/contract/car/im',
            // },
            // sch: {
            //     id: 'contract-car_sch',
            //     label: '상태변경내역',
            //     to: '/contract/car/sch',
            // },
        },
        // general: {
        //     id: 'contract-general',
        //     label: '일반',
        //     to: '',
        //     list: {
        //         id: 'contract-long_list',
        //         label: '장기계약목록',
        //         to: '/contract/long/list',
        //     },
        //     create: {
        //         id: 'contract-general_create',
        //         label: '일반계약등록',
        //         to: '/contract/general/create',
        //     },
        //     hc: {
        //         id: 'contract-general_hc',
        //         label: '보유계약',
        //         to: '/contract/normal/hc',
        //     },
        //     mc: {
        //         id: 'contract-normal_mc',
        //         label: '만기계약',
        //         to: '/contract/normal/mc',
        //     },
        //     sch: {
        //         id: 'contract-normal_sch',
        //         label: '상태변경내역',
        //         to: '/contract/normal/sch',
        //     },
        // },
        // monitoring: {
        //     id: 'contract-monitoring',
        //     label: '판매모니터링',
        //     to: '',
        //     monitoring: {
        //         id: 'contract-monitoring_monitoring',
        //         label: '판매모니터링',
        //         to: '/contract/monitoring/monitoring',
        //     },
        // },
        // mcp: {
        //     id: 'contract-mcp',
        //     label: '월마감실적',
        //     to: '',
        //     long: {
        //         id: 'contract-mcp-long',
        //         label: '장기',
        //         to: '',
        //         dw: {
        //             id: 'contract-mcp-long_dw',
        //             label: '장기입출금명세',
        //             to: '/contract/mcp/long/dw',
        //         },
        //         te: {
        //             id: 'contract-mcp-long_te',
        //             label: '장기배서명세',
        //             to: '/contract/mcp/long/te',
        //         },
        //         ti: {
        //             id: 'contract-mcp-long_ti',
        //             label: '장기보험상품',
        //             to: '/contract/mcp/long/ti',
        //         },
        //         cm: {
        //             id: 'contract-mcp-long_cm',
        //             label: '수금관리',
        //             to: '/contract/mcp/long/cm',
        //         },
        //     },
        //     car: {
        //         id: 'contract-mcp_car',
        //         label: '자동차',
        //         to: '/contract/mcp/car',
        //     },
        //     normal: {
        //         id: 'contract-mcp_normal',
        //         label: '일반',
        //         to: '/contract/mcp/normal',
        //     },
        // },
        // upload: {
        //     id: 'contract-upload',
        //     label: '자동업로드관리',
        //     to: '',
        //     upload: {
        //         id: 'contract-upload_upload',
        //         label: '자동업로드관리',
        //         to: '/contract/upload/upload',
        //     },
        // },
        // escalation: {
        //     id: 'contract-escalation',
        //     label: '이관',
        //     to: '',
        //     upload: {
        //         id: 'contract-escalation_escalation',
        //         label: '이관',
        //         to: '/contract/escalation/escalation',
        //     },
        // },
    },
    income: {
        // ps: {
        //     id: 'income-ps',
        //     label: '지급제도',
        //     to: '',
        //     hc: {
        //         id: 'income-ps_hc',
        //         label: '지급제도',
        //         to: '/income/ps/hc',
        //     },
        //     sch: {
        //         id: 'income-ps_sch',
        //         label: '상태변경내역',
        //         to: '/income/ps/sch',
        //     },
        // },
        // sc: {
        //     id: 'income-sc',
        //     label: '정산건별명세',
        //     to: '',
        //     long: {
        //         id: 'income-sc-long',
        //         label: '장기',
        //         to: '',
        //         lp: {
        //             id: 'income-sc-long_lp',
        //             label: '장기성적',
        //             to: '/income/sc/long/lp',
        //         },
        //         lt: {
        //             id: 'income-sc-long_lt',
        //             label: '장기계속분',
        //             to: '/income/sc/long/lt',
        //         },
        //     },
        //     car: {
        //         id: 'income-sc_car',
        //         label: '자동차',
        //         to: '/income/sc/car',
        //     },
        //     normal: {
        //         id: 'income-sc_normal',
        //         label: '일반',
        //         to: '/income/sc/normal',
        //     },
        // },
        // sms: {
        //     id: 'income-sms',
        //     label: 'SMS/FAX',
        //     to: '',
        //     sh: {
        //         id: 'income-sms_sh',
        //         label: '발송내역',
        //         to: '/income/sms/sh',
        //     },
        // },
        // rm: {
        //     id: 'income-rm',
        //     label: '임대관리',
        //     to: '',
        //     se: {
        //         id: 'income-rm_se',
        //         label: '전산장비',
        //         to: '/income/rm/se',
        //     },
        //     etc: {
        //         id: 'income-rm_etc',
        //         label: '기타임대',
        //         to: '/income/rm/etc',
        //     },
        // },
        // as: {
        //     id: 'income-as',
        //     label: '추가/공제',
        //     to: '',
        //     as: {
        //         id: 'income-as_as',
        //         label: '추가/공제',
        //         to: '/income/as/as',
        //     },
        // },
        // ip: {
        //     id: 'income-ip',
        //     label: '소득지급현황(명세)',
        //     to: '',
        //     ip: {
        //         id: 'income-ip_ip',
        //         label: '소득지급현황(명세)',
        //         to: '/income/ip/ip',
        //     },
        // },
        // cm: {
        //     id: 'income-cm',
        //     label: '이월관리',
        //     to: '',
        //     cm: {
        //         id: 'income-cm_cm',
        //         label: '이월관리',
        //         to: '/income/cm/cm',
        //     },
        // },
    },
    hr: {
        group: {
            id: 'hr-group',
            label: '조직관리',
            to: '',
            orga: {
                id: 'hr-group_orga',
                label: '지점명세',
                to: '/hr/group/orga',
            },
            user: {
                id: 'hr-group_user',
                label: '영업가족',
                to: '/hr/group/user',
            },
        },
        // manage: {
        //     id: 'hr-manage',
        //     label: '사용인관리',
        //     to: '',
        //     ars: {
        //         id: 'hr-manage_ars',
        //         label: '협회등록현황',
        //         to: '/hr/manage/ars',
        //     },
        //     code: {
        //         id: 'hr-manage_code',
        //         label: '보험사별코드',
        //         to: '/hr/manage/code',
        //     },
        //     iaei: {
        //         id: 'hr-manage_iaei',
        //         label: '산재고용보험',
        //         to: '/hr/manage/iaei',
        //     },
        // },
        // oa: {
        //     id: 'hr-oa',
        //     label: '조직위촉',
        //     to: '',
        //     tam: {
        //         id: 'hr-oa_tam',
        //         label: '시험신청 및 관리',
        //         to: '/hr/oa/tam',
        //     },
        // },
        // ioc: {
        //     id: 'hr-ioc',
        //     label: '제증명서발급',
        //     to: '',
        //     ioc: {
        //         id: 'hr-ioc_ioc',
        //         label: '제증명서발급',
        //         to: '/hr/ioc/ioc',
        //     },
        // },
    },
    board: {
        list: {
            id: 'board_list',
            label: '게시판목록',
            to: '/board/list',
        },
    },
    calendar: {
        id: 'calendar',
        label: '일정관리',
        to: '/calendar',
    },
};
