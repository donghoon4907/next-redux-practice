import type { FC } from 'react';
import type { Pay } from '@models/pay';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { setMonth } from 'date-fns';
import { useNumbericInput } from '@hooks/use-input';
import { useSelect } from '@hooks/use-select';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import { findSelectOption } from '@utils/getter';
import { useDatepicker } from '@hooks/use-datepicker';
import { updatePay } from '@actions/contract/common/set-pay.action';
import longConstants from '@constants/options/long';
import { MyDatepicker } from '@components/datepicker';
import { calcTargetMonth, makeDistkind } from '@utils/calculator';

interface Props extends Pay {
    contdate: Date;
}

export const UpdatePayTemplate: FC<Props> = (props) => {
    const dispatch = useDispatch();

    // 영수일
    const [paydate] = useDatepicker(new Date(props.paydate), {
        callbackOnChange: (next) => {
            if (next) {
                dispatch(
                    updatePay({
                        index: props.index,
                        paydate: dayjs(next).format('YYYY-MM-DD'),
                    }),
                );
            }
        },
    });
    // 회차
    // const [whoi] = useState(props.whoi);
    // 입금구분
    const [dist] = useSelect(
        longConstants.pDist.filter((v) => {
            if (props.index > 0 && v.value === '신규') {
                return null;
            }

            return v;
        }),
        findSelectOption(props.dist, longConstants.pDist),
        {
            callbackOnChange: (next) => {
                if (next) {
                    let nextGdate;
                    let nextDistkind;
                    // 신규 및 계속인 경우에만 대상년월 및 납입구분을 표기(회차가 존재)
                    if (next.value === '신규' || next.value === '계속') {
                        const calcGdate = setMonth(
                            props.contdate,
                            calcTargetMonth(props.contdate, props.whoi!) - 1,
                        );
                        nextGdate = dayjs(calcGdate).format('YYYY-MM-01');

                        nextDistkind = makeDistkind(
                            props.contdate,
                            new Date(paydate.value!),
                            props.whoi!,
                        );
                    } else {
                        nextGdate = undefined;
                        nextDistkind = undefined;
                    }
                    // let nextWhoi = whoi;
                    // let nextPay = +pay.value.replace(/,/g, '');
                    // if (next.value === '철회' || next.value === '취소') {
                    //     // 1회차로 변경
                    //     nextWhoi = 1;
                    //     // 실적을 음수로 변경
                    //     nextPay = nextPay * -1;
                    // } else {
                    //     // 실적을 양수로 변경
                    //     nextPay = Math.abs(nextPay);
                    //     if (next.value === '추징' || next.value === '환급') {
                    //         // 회차 비활성화
                    //         nextWhoi = -1;
                    //     }
                    // }

                    dispatch(
                        updatePay({
                            index: props.index,
                            dist: next.value,
                            gdate: nextGdate,
                            distkind: nextDistkind,
                        }),
                    );
                }
            },
        },
    );
    // 영수보험료
    const [pay] = useNumbericInput(props.pay.toString(), {
        addComma: true,
        callbackOnBlur: (next) => {
            // let nextPay = +next.replace(/,/, '');
            // if (props.pay < 0) {
            //     nextPay = nextPay * 1;
            // }

            dispatch(
                updatePay({
                    index: props.index,
                    pay: +next,
                }),
            );
        },
    });
    // 금종
    const [method] = useSelect(
        longConstants.payKind,
        findSelectOption(props.method, longConstants.payKind),
        {
            callbackOnChange: (next) => {
                if (next) {
                    dispatch(
                        updatePay({
                            index: props.index,
                            method: next.value,
                        }),
                    );
                }
            },
        },
    );
    // 납입주기
    // const [cycle] = useSelect(
    //     longConstants.payCycle,
    //     findSelectOption(props.cycle, longConstants.payCycle),
    //     {
    //         callbackOnChange: (next) => {
    //             if (next) {
    //                 dispatch(
    //                     updatePay({
    //                         index: props.index,
    //                         cycle: next.value,
    //                     }),
    //                 );
    //             }
    //         },
    //     },
    // );

    return (
        <>
            <td>
                <MyDatepicker
                    placeholder="영수일"
                    size="sm"
                    readOnly={props.index === 0}
                    hooks={paydate}
                    cleanable={false}
                />
            </td>
            <td>{props.whoi ? props.whoi : ''}</td>
            <td>
                <MySelect isDisabled={props.index === 0} {...dist} />
            </td>
            <td>{props.gdate ? props.gdate.substring(0, 7) : ''}</td>
            <td>{props.distkind}</td>
            <td>
                <MyInput
                    type="text"
                    placeholder="영수보험료"
                    className="text-end"
                    {...pay}
                />
            </td>
            <td>
                <MySelect {...method} />
            </td>
            {/* <td>
                <MySelect {...cycle} />
            </td> */}
            <td>N</td>
            <td>N</td>
        </>
    );
};
