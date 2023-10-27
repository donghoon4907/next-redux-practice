import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { Code } from '@models/code';
import type { CoreSelectOption } from '@interfaces/core';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '@hooks/use-input';
import { useSelect } from '@hooks/use-select';
import { updateCode } from '@actions/hr/set-code.action';
import { MyButton } from '@components/button';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import { isEmpty } from '@utils/validator/common';
import { findSelectOption } from '@utils/getter';
import { CodeDTO } from '@dto/hr/Code.dto';

interface Props extends Code {
    companies: CoreSelectOption[];
}

export const UpdateCodeTemplate: FC<Props> = ({ companies, ...code }) => {
    const dispatch = useDispatch();

    // 보험사
    const [company] = useSelect(
        companies,
        findSelectOption(code.wcode, companies),
        {
            callbackOnChange: (next) => {
                if (next) {
                    dispatch(
                        updateCode({
                            index: code.index,
                            wcode: +next.value,
                            company: next.label,
                        }),
                    );
                }
            },
        },
    );
    // 코드
    const [fccode] = useInput(code.fccode || '', {
        noSpace: true,
        callbackOnBlur: (next) => {
            dispatch(
                updateCode({
                    index: code.index,
                    fccode: next,
                }),
            );
        },
    });
    // 비밀번호
    const [password] = useInput(code.password || '', {
        noSpace: true,
        callbackOnBlur: (next) => {
            dispatch(
                updateCode({
                    index: code.index,
                    password: next,
                }),
            );
        },
    });
    // 인증번호
    const [centval] = useInput(code.cent_val || '', {
        noSpace: true,
        callbackOnBlur: (next) => {
            dispatch(
                updateCode({
                    index: code.index,
                    cent_val: next,
                }),
            );
        },
    });

    return (
        <>
            <td>
                <MySelect placeholder="선택" {...company} />
            </td>
            <td>
                <MyInput placeholder="코드" {...fccode} />
            </td>
            <td>
                <MyInput placeholder="비밀번호" {...password} />
            </td>
            <td>
                <MyInput placeholder="인증번호" {...centval} />
            </td>
        </>
    );
};
