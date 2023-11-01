import type { FC, ChangeEvent } from 'react';
import type { Pay } from '@models/pay';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CoreEditableComponent } from '@interfaces/core';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { deletePay, updatePay } from '@actions/contract/long/set-pay.action';
import { MyCheckbox } from '@components/checkbox';
import { MyTableExtension } from '@components/table/Extension';
import { showCreateLongPayModal } from '@actions/modal/create-pay.action';
import { findSelectOption } from '@utils/getter';
import longConstants from '@constants/options/long';
import { MyTableToolbar } from '@components/table/Toolbar';
import { UpdatePayTemplate } from '../template/UpdatePay';
import { generateIndex } from '@utils/generate';
import dayjs from 'dayjs';
import { createPay } from '@actions/contract/common/set-pay.action';
import { isEmpty } from '@utils/validator/common';
import { setMonth } from 'date-fns';
import { calcTargetMonth, makeDistkind } from '@utils/calculator';

interface Props extends MyTabpanelProps, CoreEditableComponent {
    contdate: Date;
    payment: string;
}

export const LongPaysTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    contdate,
    payment,
}) => {
    const dispatch = useDispatch();

    const { pays } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    // const handleShowCreateModal = () => {
    //     dispatch(showCreateLongPayModal());
    // };

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        // pays.forEach((v) => {
        //     dispatch(updatePay({ ...v, checked: evt.target.checked }));
        // });
        dispatch(
            updatePay({
                ...pays[pays.length - 1],
                checked: evt.target.checked,
            }),
        );
    };

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Pay) => {
        dispatch(updatePay({ ...v, checked: evt.target.checked }));
    };

    const handleCreate = () => {
        if (!contdate) {
            return alert('계약일자를 입력해주세요.');
        } else if (isEmpty(payment)) {
            return alert('실적보험료를 입력해주세요.');
        }

        const index = generateIndex(pays);
        let paydate;
        let whoi;
        let dist;
        const cycle = '1';
        // 신규인 경우
        if (index === 0) {
            // 영수일을 계약일자로
            paydate = contdate;
            whoi = 1;
            dist = '신규';
        } else {
            // 영수일을 오늘날짜로
            paydate = new Date();
            // 마지막으로 설정된 회차 + 1
            const findLastWhoi = pays.reverse().find((v) => v.whoi);
            if (findLastWhoi) {
                whoi = findLastWhoi.whoi! + 1;
            }
            dist = '계속';
        }

        let gdate;
        let distkind;
        if (whoi) {
            distkind = makeDistkind(contdate, paydate, whoi);
            const calcGdate = setMonth(
                contdate,
                calcTargetMonth(contdate, whoi) - 1,
            );
            gdate = dayjs(calcGdate).format('YYYY-MM-01');
        }

        dispatch(
            createPay({
                index,
                checked: false,
                paydate: dayjs(paydate).format('YYYY-MM-DD'),
                whoi,
                cycle,
                pay: +payment.replace(/,/g, ''),
                dist,
                gdate,
                distkind,
            }),
        );
    };

    const handleDelete = () => {
        if (pays.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 설정을 선택해주세요.');
        }

        pays.filter((v) => v.checked).forEach((v) => {
            dispatch(deletePay({ index: v.index }));
        });
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <MyTableToolbar
                editable={editable}
                onCreate={handleCreate}
                onDelete={handleDelete}
            />
            <div className="wr-table--normal">
                <table className="wr-table table">
                    <thead>
                        <tr>
                            {editable && (
                                <th style={{ width: '30px' }}>
                                    <MyCheckbox
                                        id="lpt_allcheck"
                                        label=""
                                        onChange={handleAllCheck}
                                    />
                                </th>
                            )}

                            <th style={{ width: '130px' }}>영수일</th>
                            <th style={{ width: '40px' }}>회차</th>
                            <th style={{ width: '120px' }}>입금구분</th>
                            <th style={{ width: '70px' }}>대상년월</th>
                            <th style={{ width: '70px' }}>납입구분</th>
                            <th>영수보험료</th>
                            <th style={{ width: '100px' }}>금종</th>
                            {/* <th style={{ width: '110px' }}>납입주기</th> */}
                            <th style={{ width: '70px' }}>실적확인</th>
                            <th style={{ width: '70px' }}>정산여부</th>
                            {!editable && (
                                <>
                                    <th>
                                        <strong>입력</strong>
                                    </th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {pays.length === 0 && (
                            <tr>
                                <td colSpan={editable ? 13 : 12}>
                                    실적 정보가 없습니다.
                                </td>
                            </tr>
                        )}
                        {pays.map((v, i) => (
                            <tr key={`pay${i}`}>
                                {editable && i === pays.length - 1 ? (
                                    <td>
                                        <MyCheckbox
                                            label=""
                                            checked={v.checked}
                                            onChange={(evt) =>
                                                handleCheck(evt, v)
                                            }
                                        />
                                    </td>
                                ) : (
                                    <td></td>
                                )}
                                {editable ? (
                                    <UpdatePayTemplate
                                        contdate={contdate}
                                        {...v}
                                    />
                                ) : (
                                    <>
                                        <td>
                                            <span>
                                                {v.paydate ? v.paydate : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>{v.whoi ? v.whoi : '-'}</span>
                                        </td>
                                        <td>
                                            <span>{v.dist ? v.dist : '-'}</span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.gdate
                                                    ? v.gdate.substring(0, 7)
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.distkind ? v.distkind : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.pay
                                                    ? v.pay.toLocaleString()
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.method ? v.method : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.cycle
                                                    ? findSelectOption(
                                                          v.cycle,
                                                          longConstants.payCycle,
                                                      ).label
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.confirm ? v.confirm : 'N'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>{v.cals ? 'Y' : 'N'}</span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.insert_datetime
                                                    ? `${
                                                          v.insert_userid
                                                              ? v.insert_userid
                                                              : ''
                                                      } ${v.insert_datetime}`
                                                    : '-'}
                                            </span>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* {editable && (
                    <MyTableExtension onClick={() => handleShowCreateModal()} />
                )} */}
            </div>
        </MyTabpanel>
    );
};
