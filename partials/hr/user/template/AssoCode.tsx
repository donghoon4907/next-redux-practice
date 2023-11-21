import type { FC, ChangeEvent } from 'react';
import type { Code } from '@models/code';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CompanyDist } from '@models/company';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UseInputOutput } from '@hooks/use-input';
import { UseSelectOutput } from '@hooks/use-select';
import { UseDatepickerOutput } from '@hooks/use-datepicker';
import { MyCheckbox } from '@components/checkbox';
import {
    createCode,
    deleteCode,
    updateCode,
} from '@actions/hr/common/set-code.action';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { FloatSelect } from '@components/select/Float';
import { generateIndex } from '@utils/generate';
import { UpdateCodeTemplate } from '@partials/common/template/UpdateCode';
import { MyTableToolbar } from '@components/table/Toolbar';

interface Props {
    editable: boolean;
    no: UseInputOutput;
    company: UseSelectOutput;
    indate: UseDatepickerOutput;
    outdate: UseDatepickerOutput;
    // manager: UseSelectOutput;
    qualification: UseSelectOutput;
    dist: CompanyDist;
    title: string;
    subtitle: string;
}

export const UserAssoCodeTemplate: FC<Props> = ({
    editable,
    no,
    company,
    indate,
    outdate,
    // manager,
    qualification,
    dist,
    title,
    subtitle,
}) => {
    const dispatch = useDispatch();

    const { wrCompanies, codes } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const filteredCompany = useMemo(
        () => wrCompanies.filter((v) => v.origin.dist === dist),
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

    const handleDelete = () => {
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
            <div className="wr-pages-detail__block wr-mb">
                <div className="wr-pages-detail__content">
                    <div className="row">
                        <div className="flex-fill">
                            <FloatInput
                                label="등록번호"
                                readOnly={!editable}
                                {...no}
                            />
                        </div>
                        <div className="flex-fill">
                            <FloatDatepicker
                                label="등록일"
                                readOnly={!editable}
                                hooks={indate}
                            />
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="flex-fill">
                            <FloatSelect
                                label="등록보험사"
                                isDisabled={!editable}
                                {...company}
                            />
                        </div>
                        <div className="flex-fill">
                            <FloatSelect
                                label="자격구분"
                                isDisabled={!editable}
                                {...qualification}
                            />
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="flex-fill">
                            <FloatDatepicker
                                label="해촉일"
                                readOnly={!editable}
                                hooks={outdate}
                            />
                        </div>
                        <div className="flex-fill"></div>
                    </div>
                </div>
            </div>
            <MyTableToolbar
                editable={editable}
                title={subtitle}
                onCreate={handleCreate}
                onDelete={handleDelete}
            />
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
                        {filteredCodes.map((v) => {
                            return (
                                <tr key={`${dist}-code${v.index}`}>
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
