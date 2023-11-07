import type { FC, ChangeEvent } from 'react';
import type { Pay } from '@models/pay';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import type { CoreEditableComponent } from '@interfaces/core';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useSelect } from '@hooks/use-select';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import { findSelectOption } from '@utils/getter';
import { useDatepicker } from '@hooks/use-datepicker';
import { updatePay } from '@actions/contract/common/set-pay.action';
import longConstants from '@constants/options/long';
import { MyDatepicker } from '@components/datepicker';
import { calcGdate, calcDistkind } from '@utils/calculator';
import { MyCheckbox } from '@components/checkbox';
import { generateNextWhoi } from '@utils/generate';
import { isNumberic } from '@utils/validation';

interface Props extends Pay, CoreEditableComponent {
    contdate: Date;
}

export const PayTemplate: FC<Props> = ({ editable, contdate, ...rest }) => {
    const dispatch = useDispatch();

    const { pays } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    // 영수일
    const [paydate] = useDatepicker(new Date(rest.paydate), {
        callbackOnChange: (next) => {
            if (next) {
                dispatch(
                    updatePay({
                        index: rest.index,
                        paydate: dayjs(next).format('YYYY-MM-DD'),
                    }),
                );
            }
        },
    });
    // 회차
    const [whoi] = useInput(rest.whoi ? rest.whoi.toString() : '', {
        beforeOnChangeCondition: (next) => {
            let flag = true;
            if (+next < 2) {
                alert('회차는 2이상의 수로 설정해주세요.');

                flag = false;
            }

            return flag;
        },
        callbackOnChange: (next) => {
            if (next) {
                dispatch(
                    updatePay({
                        index: rest.index,
                        whoi: +next,
                    }),
                );
            }
        },
    });
    // 입금구분
    const [dist] = useSelect(
        longConstants.pDist,
        findSelectOption(rest.dist, longConstants.pDist),
        {
            beforeOnChangeCondition: (next) => {
                let flag = true;
                if (next) {
                    if (next.value !== '계속') {
                        // 다음 데이터가 있는 경우
                        if (pays[rest.index + 1]) {
                            alert(
                                '다음 회차의 실적 정보가 없는 경우에만 설정할 수 있습니다.',
                            );

                            flag = false;
                        }
                    }
                }

                return flag;
            },
            callbackOnChange: (next) => {
                if (next) {
                    let nextWhoi = rest.whoi;
                    // let nextPay = +pay.value.replace(/,/g, '');
                    if (next.value === '철회' || next.value === '취소') {
                        // 1회차로 변경
                        nextWhoi = 1;
                    } else {
                        if (next.value === '추징' || next.value === '환급') {
                            // 회차 비활성화
                            nextWhoi = undefined;
                        } else if (next.value === '계속') {
                            // 마지막으로 설정된 회차 + 1
                            nextWhoi = generateNextWhoi(pays);
                        }
                    }

                    dispatch(
                        updatePay({
                            index: rest.index,
                            dist: next.value,
                            whoi: nextWhoi,
                        }),
                    );
                }
            },
        },
    );
    // 영수보험료
    const [pay] = useNumbericInput(rest.pay.toString(), {
        addComma: true,
        callbackOnBlur: (next) => {
            dispatch(
                updatePay({
                    index: rest.index,
                    pay: +next,
                }),
            );
        },
    });
    // 금종
    const [method] = useSelect(
        longConstants.payKind,
        findSelectOption(rest.method, longConstants.payKind),
        {
            callbackOnChange: (next) => {
                if (next) {
                    dispatch(
                        updatePay({
                            index: rest.index,
                            method: next.value,
                        }),
                    );
                }
            },
        },
    );

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Pay) => {
        dispatch(updatePay({ ...v, checked: evt.target.checked }));
    };

    // 대상년월
    let gdate;
    let distkind;
    if (rest.dist === '신규' || rest.dist === '계속') {
        gdate = calcGdate(contdate, rest.whoi!);

        distkind = calcDistkind(gdate, new Date(rest.paydate));
    }

    return (
        <tr>
            {editable && (
                <td>
                    <MyCheckbox
                        label=""
                        checked={rest.checked}
                        onChange={(evt) => handleCheck(evt, rest)}
                    />
                </td>
            )}
            <td>
                {editable ? (
                    <MyDatepicker size="sm" hooks={paydate} cleanable={false} />
                ) : (
                    dayjs(rest.paydate).format('YYYY-MM-DD')
                )}
            </td>

            <td>
                {rest.whoi ? (
                    editable && rest.whoi !== 1 ? (
                        <MyInput type="number" {...whoi} />
                    ) : (
                        rest.whoi
                    )
                ) : (
                    ''
                )}
            </td>
            <td>
                {editable && rest.dist !== '신규' ? (
                    <MySelect placeholder="선택" {...dist} />
                ) : (
                    rest.dist
                )}
            </td>
            <td>{gdate ? dayjs(gdate).format('YYYY-MM') : ''}</td>
            <td>{distkind}</td>
            <td>
                {editable ? (
                    <MyInput type="text" className="text-end" {...pay} />
                ) : (
                    rest.pay.toLocaleString()
                )}
            </td>

            <td>{editable ? <MySelect {...method} /> : rest.method}</td>
            <td>N</td>
            <td>N</td>
            {!editable && (
                <td>
                    {rest.insert_userid} {rest.insert_datetime}
                </td>
            )}
        </tr>
    );
};
