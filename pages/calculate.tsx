import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { wrapper } from '@store/redux';
import { findSelectOption } from '@utils/getter';
import carConstants from '@constants/options/car';

const Calculate: NextPage<any> = (props) => {
    const [companies, setCompanies] = useState<any[]>([]);

    const _dambo2 = findSelectOption(props.dambo2, carConstants.dambo2);

    const _dambo3 = findSelectOption(props.dambo3, carConstants.dambo3);

    const _dambo4 = findSelectOption(props.dambo4, carConstants.dambo4);

    const _dambo5 = findSelectOption(props.dambo5, carConstants.dambo5);

    const _dambo6 = findSelectOption(props.dambo6, carConstants.dambo6);

    const _goout1 = findSelectOption(props.goout1, carConstants.gDist);

    useEffect(() => {
        // 가입경력율/법규위반율/특별할증율/중고차율/ABS율/오토율/이모빌율/에어백율/할인할증율/연령변경특약/블랙박스요율/마일리지특약율
        const [
            hd_membership_rate,
            hd_vio_rate,
            hd_surcharge_rate,
            hd_usedcar_rate,
            hd_abs_rate,
            hd_auto_rate,
            hd_imo_rate,
            hd_air_rate,
            hd_halin_rate,
            hd_agechange,
            hd_bbox_rate,
            hd_mile_rate,
        ] = props.hd_etc.split('/');
        const [
            ss_membership_rate,
            ss_vio_rate,
            ss_surcharge_rate,
            ss_usedcar_rate,
            ss_abs_rate,
            ss_auto_rate,
            ss_imo_rate,
            ss_air_rate,
            ss_halin_rate,
            ss_agechange,
            ss_bbox_rate,
            ss_mile_rate,
        ] = props.ss_etc.split('/');
        const [
            db_membership_rate,
            db_vio_rate,
            db_surcharge_rate,
            db_usedcar_rate,
            db_abs_rate,
            db_auto_rate,
            db_imo_rate,
            db_air_rate,
            db_halin_rate,
            db_agechange,
            db_bbox_rate,
            db_mile_rate,
        ] = props.db_etc.split('/');
        const [
            dy_membership_rate,
            dy_vio_rate,
            dy_surcharge_rate,
            dy_usedcar_rate,
            dy_abs_rate,
            dy_auto_rate,
            dy_imo_rate,
            dy_air_rate,
            dy_halin_rate,
            dy_agechange,
            dy_bbox_rate,
            dy_mile_rate,
        ] = props.dy_etc.split('/');
        const [
            sy_membership_rate,
            sy_vio_rate,
            sy_surcharge_rate,
            sy_usedcar_rate,
            sy_abs_rate,
            sy_auto_rate,
            sy_imo_rate,
            sy_air_rate,
            sy_halin_rate,
            sy_agechange,
            sy_bbox_rate,
            sy_mile_rate,
        ] = props.sy_etc.split('/');
        const [
            sd_membership_rate,
            sd_vio_rate,
            sd_surcharge_rate,
            sd_usedcar_rate,
            sd_abs_rate,
            sd_auto_rate,
            sd_imo_rate,
            sd_air_rate,
            sd_halin_rate,
            sd_agechange,
            sd_bbox_rate,
            sd_mile_rate,
        ] = props.sd_etc.split('/');
        const [
            lg_membership_rate,
            lg_vio_rate,
            lg_surcharge_rate,
            lg_usedcar_rate,
            lg_abs_rate,
            lg_auto_rate,
            lg_imo_rate,
            lg_air_rate,
            lg_halin_rate,
            lg_agechange,
            lg_bbox_rate,
            lg_mile_rate,
        ] = props.lg_etc.split('/');
        const [
            dh_membership_rate,
            dh_vio_rate,
            dh_surcharge_rate,
            dh_usedcar_rate,
            dh_abs_rate,
            dh_auto_rate,
            dh_imo_rate,
            dh_air_rate,
            dh_halin_rate,
            dh_agechange,
            dh_bbox_rate,
            dh_mile_rate,
        ] = props.dh_etc.split('/');

        const sorted: Array<any> = [
            {
                comname: '롯데',
                total: props.dh,
                carfamily: findSelectOption(
                    props.carfamily_dh,
                    carConstants.family,
                ),
                carage: findSelectOption(props.carage_dh, carConstants.minAge),
                dambo1: props.dh_man1,
                dambo2: props.dh_man2,
                dambo3: props.dh_mul,

                dambo4: props.dh_sin,
                dambo5: props.dh_mu,
                dambo6: props.dh_car,
                goout: props.dh_goout,
                membership_rate: dh_membership_rate,
                halin_rate: dh_halin_rate,
                vio_rate: dh_vio_rate,
                surcharge_rate: dh_surcharge_rate,
                usedcar_rate: dh_usedcar_rate,
                abs_rate: dh_abs_rate,
                auto_rate: dh_auto_rate,
                imo_rate: dh_imo_rate,
                air_rate: dh_air_rate,
                bbox_rate: dh_bbox_rate,
                mile_rate: dh_mile_rate,
                agechange: dh_agechange,
            },
            {
                comname: '삼성',
                total: props.ss,
                carfamily: findSelectOption(
                    props.carfamily_ss,
                    carConstants.family,
                ),
                carage: findSelectOption(props.carage_ss, carConstants.minAge),
                dambo1: props.ss_man1,
                dambo2: props.ss_man2,
                dambo3: props.ss_mul,
                dambo4: props.ss_sin,
                dambo5: props.ss_mu,
                dambo6: props.ss_car,
                goout: props.ss_goout,
                membership_rate: ss_membership_rate,
                halin_rate: ss_halin_rate,
                vio_rate: ss_vio_rate,
                surcharge_rate: ss_surcharge_rate,
                usedcar_rate: ss_usedcar_rate,
                abs_rate: ss_abs_rate,
                auto_rate: ss_auto_rate,
                imo_rate: ss_imo_rate,
                air_rate: ss_air_rate,
                bbox_rate: ss_bbox_rate,
                mile_rate: ss_mile_rate,
                agechange: ss_agechange,
            },
            {
                comname: '현대',
                total: props.hd,
                carfamily: findSelectOption(
                    props.carfamily_hd,
                    carConstants.family,
                ),
                carage: findSelectOption(props.carage_hd, carConstants.minAge),
                dambo1: props.hd_man1,
                dambo2: props.hd_man2,
                dambo3: props.hd_mul,
                dambo4: props.hd_sin,
                dambo5: props.hd_mu,
                dambo6: props.hd_car,
                goout: props.hd_goout,
                membership_rate: hd_membership_rate,
                halin_rate: hd_halin_rate,
                vio_rate: hd_vio_rate,
                surcharge_rate: hd_surcharge_rate,
                usedcar_rate: hd_usedcar_rate,
                abs_rate: hd_abs_rate,
                auto_rate: hd_auto_rate,
                imo_rate: hd_imo_rate,
                air_rate: hd_air_rate,
                bbox_rate: hd_bbox_rate,
                mile_rate: hd_mile_rate,
                agechange: hd_agechange,
            },
            {
                comname: '메리츠',
                total: props.dy,
                carfamily: findSelectOption(
                    props.carfamily_dy,
                    carConstants.family,
                ),
                carage: findSelectOption(props.carage_dy, carConstants.minAge),
                dambo1: props.dy_man1,
                dambo2: props.dy_man2,
                dambo3: props.dy_mul,
                dambo4: props.dy_sin,
                dambo5: props.dy_mu,
                dambo6: props.dy_car,
                goout: props.dy_goout,
                membership_rate: dy_membership_rate,
                halin_rate: dy_halin_rate,
                vio_rate: dy_vio_rate,
                surcharge_rate: dy_surcharge_rate,
                usedcar_rate: dy_usedcar_rate,
                abs_rate: dy_abs_rate,
                auto_rate: dy_auto_rate,
                imo_rate: dy_imo_rate,
                air_rate: dy_air_rate,
                bbox_rate: dy_bbox_rate,
                mile_rate: dy_mile_rate,
                agechange: dy_agechange,
            },
            {
                comname: '한화',
                total: props.sd,
                carfamily: findSelectOption(
                    props.carfamily_sd,
                    carConstants.family,
                ),
                carage: findSelectOption(props.carage_sd, carConstants.minAge),
                dambo1: props.sd_man1,
                dambo2: props.sd_man2,
                dambo3: props.sd_mul,
                dambo4: props.sd_sin,
                dambo5: props.sd_mu,
                dambo6: props.sd_car,
                goout: props.sd_goout,
                membership_rate: sd_membership_rate,
                halin_rate: sd_halin_rate,
                vio_rate: sd_vio_rate,
                surcharge_rate: sd_surcharge_rate,
                usedcar_rate: sd_usedcar_rate,
                abs_rate: sd_abs_rate,
                auto_rate: sd_auto_rate,
                imo_rate: sd_imo_rate,
                air_rate: sd_air_rate,
                bbox_rate: sd_bbox_rate,
                mile_rate: sd_mile_rate,
                agechange: sd_agechange,
            },
            {
                comname: '흥국',
                total: props.sy,
                carfamily: findSelectOption(
                    props.carfamily_sy,
                    carConstants.family,
                ),
                carage: findSelectOption(props.carage_sy, carConstants.minAge),
                dambo1: props.sy_man1,
                dambo2: props.sy_man2,
                dambo3: props.sy_mul,
                dambo4: props.sy_sin,
                dambo5: props.sy_mu,
                dambo6: props.sy_car,
                goout: props.sy_goout,
                membership_rate: sy_membership_rate,
                halin_rate: sy_halin_rate,
                vio_rate: sy_vio_rate,
                surcharge_rate: sy_surcharge_rate,
                usedcar_rate: sy_usedcar_rate,
                abs_rate: sy_abs_rate,
                auto_rate: sy_auto_rate,
                imo_rate: sy_imo_rate,
                air_rate: sy_air_rate,
                bbox_rate: sy_bbox_rate,
                mile_rate: sy_mile_rate,
                agechange: sy_agechange,
            },
            {
                comname: 'DB',
                total: props.db,
                carfamily: findSelectOption(
                    props.carfamily_db,
                    carConstants.family,
                ),
                carage: findSelectOption(props.carage_db, carConstants.minAge),
                dambo1: props.db_man1,
                dambo2: props.db_man2,
                dambo3: props.db_mul,
                dambo4: props.db_sin,
                dambo5: props.db_mu,
                dambo6: props.db_car,
                goout: props.db_goout,
                membership_rate: db_membership_rate,
                halin_rate: db_halin_rate,
                vio_rate: db_vio_rate,
                surcharge_rate: db_surcharge_rate,
                usedcar_rate: db_usedcar_rate,
                abs_rate: db_abs_rate,
                auto_rate: db_auto_rate,
                imo_rate: db_imo_rate,
                air_rate: db_air_rate,
                bbox_rate: db_bbox_rate,
                mile_rate: db_mile_rate,
                agechange: db_agechange,
            },
            {
                comname: 'KB',
                total: props.lg,
                carfamily: findSelectOption(
                    props.carfamily_lg,
                    carConstants.family,
                ),
                carage: findSelectOption(props.carage_lg, carConstants.minAge),
                dambo1: props.lg_man1,
                dambo2: props.lg_man2,
                dambo3: props.lg_mul,
                dambo4: props.lg_sin,
                dambo5: props.lg_mu,
                dambo6: props.lg_car,
                goout: props.lg_goout,
                membership_rate: lg_membership_rate,
                halin_rate: lg_halin_rate,
                vio_rate: lg_vio_rate,
                surcharge_rate: lg_surcharge_rate,
                usedcar_rate: lg_usedcar_rate,
                abs_rate: lg_abs_rate,
                auto_rate: lg_auto_rate,
                imo_rate: lg_imo_rate,
                air_rate: lg_air_rate,
                bbox_rate: lg_bbox_rate,
                mile_rate: lg_mile_rate,
                agechange: lg_agechange,
            },
        ].sort((a, b) => +a.total - +b.total);

        for (let i = 0; i < sorted.length; i++) {
            if (i === 0) {
                sorted[i]['diff'] = 0;
            } else {
                sorted[i]['diff'] = +sorted[i].total - +sorted[0].total;
            }
        }

        setCompanies(sorted);
    }, []);

    return (
        <>
            <Head>
                <title>계산기</title>
            </Head>
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                    background: 'white',
                }}
            >
                <div className="wr-table--scrollable overflow-auto">
                    <table className="wr-table table">
                        <colgroup>
                            <col width="100px" />
                            <col width="100px" />
                        </colgroup>
                        <thead>
                            <tr style={{ background: '#bfe4f2' }}>
                                <th colSpan={2}>
                                    <span>보험사</span>
                                </th>
                                {companies.map((v, i) => (
                                    <th key={`comname${i}`}>
                                        <strong>{v.comname}</strong>
                                    </th>
                                ))}
                            </tr>
                            <tr>
                                <th colSpan={2}>
                                    <span>총 보험료</span>
                                </th>
                                {companies.map((v, i) => (
                                    <th key={`total${i}`} className="text-end">
                                        <strong>
                                            {(+v.total).toLocaleString()}원
                                        </strong>
                                    </th>
                                ))}
                            </tr>
                            <tr>
                                <th colSpan={2}>
                                    <span>차액</span>
                                </th>
                                {companies.map((v, i) => (
                                    <th
                                        key={`diff${i}`}
                                        className="text-end"
                                        style={{ color: 'gray' }}
                                    >
                                        <strong>
                                            {v.diff.toLocaleString()}원
                                        </strong>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span>대인 I</span>
                                </td>
                                <td className="text-center">
                                    <span>의무가입</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`dambo1${i}`} className="text-end">
                                        <span>
                                            {(+v.dambo1).toLocaleString()}원
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>
                                    <span>대인 II</span>
                                </td>
                                <td className="text-center">
                                    <span>{_dambo2 ? _dambo2.label : ''}</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`dambo2${i}`} className="text-end">
                                        <span>
                                            {(+v.dambo2).toLocaleString()}원
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>
                                    <span>대물</span>
                                </td>
                                <td className="text-center">
                                    <span>{_dambo3 ? _dambo3.label : ''}</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`dambo3${i}`} className="text-end">
                                        <span>
                                            {(+v.dambo3).toLocaleString()}원
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>
                                    <span>자기신체</span>
                                </td>
                                <td className="text-center">
                                    <span>{_dambo4 ? _dambo4.label : ''}</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`dambo4${i}`} className="text-end">
                                        <span>
                                            {(+v.dambo4).toLocaleString()}원
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>
                                    <span>무보험</span>
                                </td>
                                <td className="text-center">
                                    <span>{_dambo5 ? _dambo5.label : ''}</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`dambo5${i}`} className="text-end">
                                        <span>
                                            {(+v.dambo5).toLocaleString()}원
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>
                                    <span>자차</span>
                                </td>
                                <td className="text-center">
                                    <span>{_dambo6 ? _dambo6.label : ''}</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`dambo6${i}`} className="text-end">
                                        <span>
                                            {(+v.dambo6).toLocaleString()}원
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>
                                    <span>긴급출동</span>
                                </td>
                                <td className="text-center">
                                    <span>{_goout1 ? _goout1.label : ''}</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`goout${i}`} className="text-end">
                                        <span>
                                            {(+v.goout).toLocaleString()}원
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>운전범위</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`carfamily${i}`}>
                                        <span>
                                            {v.carfamily
                                                ? v.carfamily.label
                                                : ''}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>연령특약</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`carage${i}`}>
                                        <span>
                                            {v.carage ? v.carage.label : ''}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>연령변경</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`surcharge${i}`}>
                                        <span>{v.hd_agechange}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>비고</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`etc${i}`}>
                                        <span></span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>가입경력율</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td
                                        key={`membership${i}`}
                                        className="text-end"
                                    >
                                        <span>{v.membership_rate}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>할인할증율</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`halin${i}`} className="text-end">
                                        <span>{v.halin_rate}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>법규위반율</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`vio${i}`} className="text-end">
                                        <span>{v.vio_rate}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>특별할증율</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td
                                        key={`surcharge${i}`}
                                        className="text-end"
                                    >
                                        <span>{v.surcharge_rate}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>중고차율</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td
                                        key={`userdcar${i}`}
                                        className="text-end"
                                    >
                                        <span>{v.usedcar_rate}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>ABS</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`abs${i}`} className="text-end">
                                        <span>{v.abs_rate}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>오토</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`auto${i}`} className="text-end">
                                        <span>{v.auto_rate}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>이모빌</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`imo${i}`} className="text-end">
                                        <span>{v.imo_rate}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>에어백</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`air${i}`} className="text-end">
                                        <span>{v.air_rate}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>블랙박스</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`bbox${i}`} className="text-end">
                                        <span>{v.bbox_rate}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>마일리지</span>
                                </td>
                                {companies.map((v, i) => (
                                    <td key={`mile${i}`} className="text-end">
                                        <span>{v.mile_rate}</span>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (_) =>
        async ({ query }) => {
            return {
                props: query,
            };
        },
);

export default Calculate;
