import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { Code } from '@models/code';
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
    hidden?: boolean;
}

export const UpdateCodeTemplate: FC<Props> = ({ hidden, ...code }) => {
    const dispatch = useDispatch();

    const { allCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const filteredCompany = useMemo(
        () => allCompanies.filter((v) => v.origin.dist === code.dist),
        [],
    );

    // 보험사
    const [company, setCompany] = useSelect(
        filteredCompany,
        findSelectOption(code.wcode, filteredCompany),
    );
    // 코드
    const [fccode, setFccode] = useInput(code.fccode || '', { noSpace: true });
    // 비밀번호
    const [password, setPassword] = useInput(code.password || '', {
        noSpace: true,
    });
    // 인증번호
    const [centval, setCentval] = useInput(code.cent_val || '', {
        noSpace: true,
    });

    const handleBackup = () => {
        const tf = confirm('초기 설정으로 변경하시겠습니까?');

        if (tf) {
            setCompany(findSelectOption(code.wcode, filteredCompany));

            setFccode(code.fccode || '');

            setPassword(code.password || '');

            setCentval(code.cent_val || '');
        }
    };

    const handleUpdate = () => {
        const payload = createPayload();

        const updateCodeDto = new CodeDTO(payload);

        if (updateCodeDto.requiredValidate()) {
            dispatch(
                updateCode({
                    ...code,
                    ...updateCodeDto.getPayload(),
                }),
            );
        }
    };

    const createPayload = useCallback(() => {
        const payload: any = {
            index: code.index,
        };

        if (company.value) {
            payload['wcode'] = +company.value.value;
        }

        if (!isEmpty(fccode.value)) {
            payload['fccode'] = fccode.value;
        }

        if (!isEmpty(password.value)) {
            payload['password'] = password.value;
        }

        if (!isEmpty(centval.value)) {
            payload['cent_val'] = centval.value;
        }

        return payload;
    }, [company, fccode, password, centval]);

    useEffect(() => {
        if (hidden) {
            handleUpdate();
        }
    }, [hidden]);

    return (
        <>
            <td hidden={hidden}>
                <MySelect placeholder="선택" {...company} />
            </td>
            <td hidden={hidden}>
                <MyInput placeholder="코드" {...fccode} />
            </td>
            <td hidden={hidden}>
                <MyInput placeholder="비밀번호" {...password} />
            </td>
            <td hidden={hidden}>
                <MyInput placeholder="인증번호" {...centval} />
            </td>
            <td hidden={hidden}>
                <div className="d-flex justify-content-center align-items-center">
                    <MyButton
                        type="button"
                        className="btn-success btn-sm"
                        onClick={handleBackup}
                    >
                        원래대로
                    </MyButton>
                </div>
            </td>
        </>
    );
};
