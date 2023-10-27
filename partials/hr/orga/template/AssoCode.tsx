import type { FC, ChangeEvent } from 'react';
import type { Code } from '@models/code';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CompanyDist } from '@models/company';
import { useMemo } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { UseInputOutput } from '@hooks/use-input';
import { UseSelectOutput } from '@hooks/use-select';
import { UseDatepickerOutput } from '@hooks/use-datepicker';
import { MyCheckbox } from '@components/checkbox';
import {
    createCode,
    deleteCode,
    updateCode,
} from '@actions/hr/set-code.action';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { FloatSelect } from '@components/select/Float';
import { IconWrapper } from '@components/IconWrapper';
import { generateIndex } from '@utils/generate';
import { UpdateCodeTemplate } from '@partials/common/template/UpdateCode';

interface Props {
    editable: boolean;
    no: UseInputOutput;
    company: UseSelectOutput;
    indate: UseDatepickerOutput;
    outdate: UseDatepickerOutput;
    manager: UseSelectOutput;
    dist: CompanyDist;
    title: string;
    subtitle: string;
}

export const AssoCodeTemplate: FC<Props> = ({
    editable,
    no,
    company,
    indate,
    outdate,
    manager,
    dist,
    title,
    subtitle,
}) => {
    const dispatch = useDispatch();

    const { allCompanies, codes } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const filteredCompany = useMemo(
        () => allCompanies.filter((v) => v.origin.dist === dist),
        [],
    );

    const filteredCodes = useMemo(
        () => codes.filter((v) => v.dist === dist),
        [codes],
    );

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        filteredCodes.forEach((v) => {
            dispatch(updateCode({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Code) => {
        dispatch(updateCode({ ...v, checked: evt.target.checked }));
    };

    const handleDeleteDamages = () => {
        if (filteredCodes.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 코드를 선택해주세요.');
        }

        filteredCodes
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteCode({ index: v.index }));
            });
    };

    const handleCreate = () => {
        dispatch(
            createCode({
                index: generateIndex(codes),
                dist,
                checked: false,
            }),
        );
    };

    return (
        <>
            <div className="wr-pages-detail__tabtitle">{title}</div>
            <div className="wr-pages-detail__block">
                <div className="wr-pages-detail__content">
                    <div className="row">
                        <div className="flex-fill">
                            <FloatInput
                                label="등록번호"
                                disabled={!editable}
                                {...no}
                            />
                        </div>
                        <div className="flex-fill">
                            <FloatDatepicker
                                label="등록일"
                                disabled={!editable}
                                hooks={indate}
                            />
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="flex-fill">
                            <FloatSelect
                                label="등록보험사"
                                {...company}
                                isDisabled={!editable}
                            />
                        </div>
                        <div className="flex-fill">
                            <FloatSelect
                                label="지점장"
                                {...manager}
                                isDisabled={!editable}
                            />
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="flex-fill">
                            <FloatDatepicker
                                label="해촉일"
                                disabled={!editable}
                                hooks={outdate}
                            />
                        </div>
                        <div className="flex-fill"></div>
                    </div>
                </div>
            </div>
            <div className="wr-pages-detail__tabsubtitle wr-mt">
                <span>{subtitle}</span>
                {editable && (
                    <div className="d-flex">
                        <IconWrapper onClick={handleCreate}>
                            <AiOutlinePlus size={20} />
                        </IconWrapper>
                        <IconWrapper onClick={handleDeleteDamages}>
                            <AiOutlineMinus size={20} />
                        </IconWrapper>
                    </div>
                )}
            </div>
            <div className="wr-table--normal">
                <table className="wr-table table">
                    <thead>
                        <tr>
                            {editable && (
                                <th style={{ width: 30 }}>
                                    <MyCheckbox
                                        label=""
                                        onChange={handleAllCheck}
                                    />
                                </th>
                            )}

                            <th style={{ width: 130 }}>보험사</th>
                            <th>코드</th>
                            <th>비밀번호</th>
                            <th>인증번호</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCodes.length === 0 && (
                            <tr>
                                <td colSpan={editable ? 6 : 5}>
                                    <span>등록된 코드가 없습니다.</span>
                                </td>
                            </tr>
                        )}
                        {filteredCodes.map((v, i) => {
                            return (
                                <tr key={`${dist}-code${i}`}>
                                    {editable && (
                                        <td>
                                            <MyCheckbox
                                                label=""
                                                checked={v.checked}
                                                onChange={(evt) =>
                                                    handleCheck(evt, v)
                                                }
                                            />
                                        </td>
                                    )}
                                    {editable ? (
                                        <UpdateCodeTemplate
                                            companies={filteredCompany}
                                            {...v}
                                        />
                                    ) : (
                                        <>
                                            <td>
                                                <span>{v.company}</span>
                                            </td>
                                            <td>
                                                <span>{v.fccode}</span>
                                            </td>
                                            <td>
                                                <span>{v.password}</span>
                                            </td>
                                            <td>
                                                <span>{v.cent_val}</span>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};
