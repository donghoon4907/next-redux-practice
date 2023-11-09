import type { FC, ChangeEvent } from 'react';
import type { Pay } from '@models/pay';
import type { CoreEditableComponent } from '@interfaces/core';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useNumbericInput } from '@hooks/use-input';
import { useSelect } from '@hooks/use-select';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import { findSelectOption } from '@utils/getter';
import { useDatepicker } from '@hooks/use-datepicker';
import { updatePay } from '@actions/contract/common/set-pay.action';
import carConstants from '@constants/options/car';
import commonConstants from '@constants/options/common';
import { MyDatepicker } from '@components/datepicker';
import { MyCheckbox } from '@components/checkbox';

interface Props extends Pay, CoreEditableComponent {}

export const CarPayTemplate: FC<Props> = ({ editable, ...rest }) => {
    const dispatch = useDispatch();

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
    // 납입구분
    const [dist] = useSelect(
        carConstants.pDist,
        findSelectOption(rest.dist, carConstants.pDist),
        {
            callbackOnChange: (next) => {
                if (next) {
                    dispatch(
                        updatePay({
                            index: rest.index,
                            dist: next.value,
                        }),
                    );
                }
            },
        },
    );
    // 영수보험료
    const [pay] = useNumbericInput(rest.pay ? rest.pay.toString() : '', {
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
    // 책임
    const [pay1] = useNumbericInput(rest.pay1 ? rest.pay1.toString() : '', {
        addComma: true,
        callbackOnBlur: (next) => {
            dispatch(
                updatePay({
                    index: rest.index,
                    pay1: +next,
                }),
            );
        },
    });
    // 임의보험료
    const [pay2] = useNumbericInput(rest.pay2 ? rest.pay2.toString() : '', {
        addComma: true,
        callbackOnBlur: (next) => {
            dispatch(
                updatePay({
                    index: rest.index,
                    pay2: +next,
                }),
            );
        },
    });
    // 금종
    const [method] = useSelect(
        commonConstants.payKind,
        findSelectOption(rest.method, commonConstants.payKind),
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
    // 실적확인
    const [confirm] = useSelect(
        commonConstants.yn,
        findSelectOption(rest.confirm ? 'Y' : 'N', commonConstants.yn),
        {
            callbackOnChange: (next) => {
                if (next) {
                    dispatch(
                        updatePay({
                            index: rest.index,
                            confirm: next.value === 'Y' ? true : false,
                        }),
                    );
                }
            },
        },
    );
    // 정산여부
    const [cals] = useSelect(
        commonConstants.yn,
        findSelectOption(rest.cals ? 'Y' : 'N', commonConstants.yn),
        {
            callbackOnChange: (next) => {
                if (next) {
                    dispatch(
                        updatePay({
                            index: rest.index,
                            cals: next.value === 'Y' ? true : false,
                        }),
                    );
                }
            },
        },
    );

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Pay) => {
        dispatch(updatePay({ ...v, checked: evt.target.checked }));
    };

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
                {editable ? (
                    <MySelect placeholder="선택" {...dist} />
                ) : (
                    rest.dist
                )}
            </td>
            <td>
                {editable ? (
                    <MyInput type="text" className="text-end" {...pay} />
                ) : (
                    rest.pay.toLocaleString()
                )}
            </td>
            <td>
                {editable ? (
                    <MyInput type="text" className="text-end" {...pay1} />
                ) : rest.pay1 ? (
                    rest.pay1.toLocaleString()
                ) : (
                    ''
                )}
            </td>
            <td>
                {editable ? (
                    <MyInput type="text" className="text-end" {...pay2} />
                ) : rest.pay2 ? (
                    rest.pay2.toLocaleString()
                ) : (
                    ''
                )}
            </td>

            <td>{editable ? <MySelect {...method} /> : rest.method}</td>
            <td>
                {editable ? (
                    <MySelect {...confirm} />
                ) : rest.confirm ? (
                    'Y'
                ) : (
                    'N'
                )}
            </td>
            <td>{editable ? <MySelect {...cals} /> : rest.cals ? 'Y' : 'N'}</td>
            {!editable && (
                <td>
                    {rest.insert_userid} {rest.insert_datetime}
                </td>
            )}
        </tr>
    );
};
