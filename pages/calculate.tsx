import type { NextPage } from 'next';
import Head from 'next/head';
import { wrapper } from '@store/redux';
import { findSelectOption } from '@utils/getter';
import carConstants from '@constants/options/car';

const Calculate: NextPage<any> = (props) => {
    const _dambo2 = findSelectOption(props.dambo2, carConstants.dambo2);

    const _dambo3 = findSelectOption(props.dambo3, carConstants.dambo3);

    const _dambo4 = findSelectOption(props.dambo4, carConstants.dambo4);

    const _dambo5 = findSelectOption(props.dambo5, carConstants.dambo5);

    const _dambo6 = findSelectOption(props.dambo6, carConstants.dambo6);

    const _goout1 = findSelectOption(props.goout1, carConstants.gDist);

    const sortedComs = [
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
        },
    ].sort((a, b) => +a.total - +b.total);

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
                            <tr>
                                <th colSpan={2}>
                                    <span>보험사</span>
                                </th>
                                {sortedComs.map((v, i) => (
                                    <th key={`comnameRank${i}`}>
                                        <strong>{v.comname}</strong>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <span>총 보험료</span>
                                </td>
                                {sortedComs.map((v, i) => (
                                    <td
                                        key={`totalRank${i}`}
                                        className="text-end"
                                    >
                                        <strong>
                                            {(+v.total).toLocaleString()}원
                                        </strong>
                                    </td>
                                ))}
                            </tr>
                            {/* <tr>
                                <td colSpan={2}>
                                    <span>(차액)</span>
                                </td>
                            </tr> */}
                            <tr>
                                <td>
                                    <span>대인 I</span>
                                </td>
                                <td className="text-center">
                                    <span>의무가입</span>
                                </td>
                                {sortedComs.map((v, i) => (
                                    <td
                                        key={`dambo1Rank${i}`}
                                        className="text-end"
                                    >
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
                                    <span>{_dambo2.label}</span>
                                </td>
                                {sortedComs.map((v, i) => (
                                    <td
                                        key={`dambo2Rank${i}`}
                                        className="text-end"
                                    >
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
                                    <span>{_dambo3.label}</span>
                                </td>
                                {sortedComs.map((v, i) => (
                                    <td
                                        key={`dambo3Rank${i}`}
                                        className="text-end"
                                    >
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
                                    <span>{_dambo4.label}</span>
                                </td>
                                {sortedComs.map((v, i) => (
                                    <td
                                        key={`dambo4Rank${i}`}
                                        className="text-end"
                                    >
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
                                    <span>{_dambo5.label}</span>
                                </td>
                                {sortedComs.map((v, i) => (
                                    <td
                                        key={`dambo5Rank${i}`}
                                        className="text-end"
                                    >
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
                                    <span>{_dambo6.label}</span>
                                </td>
                                {sortedComs.map((v, i) => (
                                    <td
                                        key={`dambo6Rank${i}`}
                                        className="text-end"
                                    >
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
                                    <span>{_goout1.label}</span>
                                </td>
                                {sortedComs.map((v, i) => (
                                    <td
                                        key={`gooutRank${i}`}
                                        className="text-end"
                                    >
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
                                {sortedComs.map((v, i) => (
                                    <td key={`carfamily${i}`}>
                                        <span>{v.carfamily.label}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>연령특약</span>
                                </td>
                                {sortedComs.map((v, i) => (
                                    <td key={`carage${i}`}>
                                        <span>{v.carage.label}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>연령변경</span>
                                </td>
                                {sortedComs.map((v, i) => (
                                    <td key={`agech${i}`}>
                                        <span></span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>비고</span>
                                </td>
                                {sortedComs.map((v, i) => (
                                    <td key={`etc${i}`}>
                                        <span></span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>가입경력율</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>할인할증율</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>법규위반율</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>특별할증율</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>중고차율</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>ABS</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>오토</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>이모빌</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>에어백</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>블랙박스</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <span>마일리지</span>
                                </td>
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
