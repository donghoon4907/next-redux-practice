import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { useDispatch } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyInput } from '@components/input';
import { useSelect } from '@hooks/use-select';
import { CALC_STANDARD } from '@constants/options/user';
import { showGuaranteeSettingModal } from '@actions/modal/guarantee-setting.action';

interface Props extends MyTabpanelProps {
    // data: any[];
    editable: boolean;
    // addCount: number;
    // onAddCount: () => void;
}

export const QualManageTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    // data,
    editable,
    // addCount,
    // onAddCount,
}) => {
    const dispatch = useDispatch();
    // const columns = useColumn(LONG_COL_PERFORMANCE)

    const [calcStandard] = useSelect(CALC_STANDARD);

    const labelType = editable ? 'active' : 'disable';

    const handleShowSettingModal = () => {
        dispatch(showGuaranteeSettingModal());
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-6">
                    <div className="wr-pages-hr-detail__block">
                        <div className="wr-pages-hr-detail__title">
                            <strong>손해보험협회</strong>
                        </div>
                        <div className="wr-pages-hr-detail__content">
                            <div className="row">
                                <div className="col-6">
                                    <WithLabel
                                        id="giaRegNum"
                                        label="등록번호"
                                        type={labelType}
                                    >
                                        <MyInput
                                            type="text"
                                            id="giaRegNum"
                                            placeholder="등록번호"
                                            readOnly={!editable}
                                        />
                                    </WithLabel>
                                    <WithLabel
                                        id="giaRegDate"
                                        label="등록일"
                                        type={labelType}
                                    >
                                        <MyInput
                                            type="text"
                                            id="giaRegDate"
                                            placeholder="등록일"
                                            readOnly={!editable}
                                        />
                                    </WithLabel>
                                    <WithLabel
                                        id="giaDivision"
                                        label="자격구분"
                                        type={labelType}
                                    >
                                        <MySelect
                                            inputId="giaDivision"
                                            placeholder={'선택'}
                                            placeHolderFontSize={16}
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                            options={[]}
                                            value={null}
                                            onChange={() => {}}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col-6">
                                    <div className="wr-ml">
                                        <WithLabel
                                            id="giaComp"
                                            label="등록보험사"
                                            type={labelType}
                                        >
                                            <MySelect
                                                inputId="giaComp"
                                                placeholder={'선택'}
                                                placeHolderFontSize={16}
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                                options={[]}
                                                value={null}
                                                onChange={() => {}}
                                            />
                                        </WithLabel>
                                        <WithLabel
                                            id="giaExpDate"
                                            label="말소일"
                                            type={labelType}
                                        >
                                            <MyInput
                                                type="text"
                                                id="giaExpDate"
                                                placeholder="말소일"
                                                readOnly={!editable}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <div className="wr-pages-hr-detail__block">
                            <div className="wr-pages-hr-detail__title">
                                <strong>생명보험협회</strong>
                            </div>
                            <div className="wr-pages-hr-detail__content">
                                <div className="row">
                                    <div className="col-6">
                                        <WithLabel
                                            id="liaRegNum"
                                            label="등록번호"
                                            type={labelType}
                                        >
                                            <MyInput
                                                type="text"
                                                id="liaRegNum"
                                                placeholder="등록번호"
                                                readOnly={!editable}
                                            />
                                        </WithLabel>
                                        <WithLabel
                                            id="liaRegDate"
                                            label="등록일"
                                            type={labelType}
                                        >
                                            <MyInput
                                                type="text"
                                                id="liaRegDate"
                                                placeholder="등록일"
                                                readOnly={!editable}
                                            />
                                        </WithLabel>
                                        <WithLabel
                                            id="liaDivision"
                                            label="자격구분"
                                            type={labelType}
                                        >
                                            <MySelect
                                                inputId="liaDivision"
                                                placeholder={'선택'}
                                                placeHolderFontSize={16}
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                                options={[]}
                                                value={null}
                                                onChange={() => {}}
                                            />
                                        </WithLabel>
                                    </div>
                                    <div className="col-6">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="liaComp"
                                                label="등록보험사"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="liaComp"
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    options={[]}
                                                    value={null}
                                                    onChange={() => {}}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="liaExpDate"
                                                label="말소일"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="liaExpDate"
                                                    placeholder="말소일"
                                                    readOnly={!editable}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="wr-pages-hr-detail__subtitle">
                        <strong>손보 보험사 코드</strong>
                    </div>
                    <div className="wr-table--normal wr-mb">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    <th>
                                        <strong>보험사</strong>
                                    </th>
                                    <th>
                                        <strong>등록일</strong>
                                    </th>
                                    <th>
                                        <strong>코드</strong>
                                    </th>
                                    <th>
                                        <strong>비밀번호</strong>
                                    </th>
                                    <th>
                                        <strong>인증번호</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td>
                                        <span>-</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <div className="wr-pages-hr-detail__subtitle">
                            <strong>생보 보험사 코드</strong>
                        </div>
                        <div className="wr-table--normal wr-mb">
                            <table className="wr-table table">
                                <thead>
                                    <tr>
                                        <th>
                                            <strong>보험사</strong>
                                        </th>
                                        <th>
                                            <strong>등록일</strong>
                                        </th>
                                        <th>
                                            <strong>코드</strong>
                                        </th>
                                        <th>
                                            <strong>비밀번호</strong>
                                        </th>
                                        <th>
                                            <strong>인증번호</strong>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span>-</span>
                                        </td>
                                        <td>
                                            <span>-</span>
                                        </td>
                                        <td>
                                            <span>-</span>
                                        </td>
                                        <td>
                                            <span>-</span>
                                        </td>
                                        <td>
                                            <span>-</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
