import type { FC, ChangeEvent } from 'react';
import type { Baeseo } from '@models/baeseo';
import type { CoreEditableComponent } from '@interfaces/core';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useSelect } from '@hooks/use-select';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import { findSelectOption } from '@utils/getter';
import { useDatepicker } from '@hooks/use-datepicker';
import { updateBaeseo } from '@actions/contract/common/set-baeseo.action';
import longConstants from '@constants/options/long';
import { MyDatepicker } from '@components/datepicker';
import { MyCheckbox } from '@components/checkbox';

interface Props extends Baeseo, CoreEditableComponent {}

export const BaeseoTemplate: FC<Props> = ({ editable, ...rest }) => {
    const dispatch = useDispatch();

    // 실적일
    const [date] = useDatepicker(rest.date ? new Date(rest.date) : new Date(), {
        callbackOnChange: (next) => {
            if (next) {
                dispatch(
                    updateBaeseo({
                        index: rest.index,
                        date: dayjs(next).format('YYYY-MM-DD'),
                    }),
                );
            }
        },
    });
    // 구분
    const [dist] = useSelect(
        longConstants.baeseDist,
        findSelectOption(rest.dist, longConstants.baeseDist),
        {
            callbackOnChange: (next) => {
                if (next) {
                    dispatch(
                        updateBaeseo({
                            index: rest.index,
                            dist: next.value,
                        }),
                    );
                }
            },
        },
    );
    // 회차
    const [whoi] = useInput(rest.whoi ? rest.whoi.toString() : '', {
        beforeOnChangeCondition: (next) => {
            let flag = true;
            if (+next < 1) {
                alert('회차는 1이상의 수로 설정해주세요.');

                flag = false;
            }

            return flag;
        },
        callbackOnChange: (next) => {
            if (next) {
                dispatch(
                    updateBaeseo({
                        index: rest.index,
                        whoi: +next,
                    }),
                );
            }
        },
    });
    // 실적
    const [pay_point] = useNumbericInput(rest.pay_point.toString(), {
        addComma: true,
        callbackOnBlur: (next) => {
            dispatch(
                updateBaeseo({
                    index: rest.index,
                    pay_point: +next,
                }),
            );
        },
    });
    // 수정보험료
    const [tp_point] = useNumbericInput(rest.tp_point.toString(), {
        addComma: true,
        callbackOnBlur: (next) => {
            dispatch(
                updateBaeseo({
                    index: rest.index,
                    tp_point: +next,
                }),
            );
        },
    });
    // 정산월
    const [gdate] = useDatepicker(
        rest.gdate ? new Date(rest.gdate) : new Date(),
        {
            callbackOnChange: (next) => {
                if (next) {
                    dispatch(
                        updateBaeseo({
                            index: rest.index,
                            gdate: dayjs(next).format('YYYY-MM-01'),
                        }),
                    );
                }
            },
        },
    );

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Baeseo) => {
        dispatch(updateBaeseo({ ...v, checked: evt.target.checked }));
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
                    <MyDatepicker size="sm" hooks={date} cleanable={false} />
                ) : (
                    dayjs(rest.date).format('YYYY-MM-DD')
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
                {editable ? <MyInput type="number" {...whoi} /> : rest.whoi}
            </td>
            <td>
                {editable ? (
                    <MyInput type="text" className="text-end" {...pay_point} />
                ) : (
                    rest.pay_point.toLocaleString()
                )}
            </td>
            <td>
                {editable ? (
                    <MyInput type="text" className="text-end" {...tp_point} />
                ) : (
                    rest.tp_point.toLocaleString()
                )}
            </td>
            <td>
                {editable ? (
                    <MyDatepicker
                        size="sm"
                        hooks={gdate}
                        cleanable={false}
                        format="yyyy-MM"
                    />
                ) : (
                    dayjs(rest.gdate).format('YYYY-MM')
                )}
            </td>
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
