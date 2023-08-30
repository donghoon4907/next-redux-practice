import type { FC, FormEvent, ChangeEvent } from 'react';
import type { Insured } from '@models/insured';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import type { CoreEditableComponent } from '@interfaces/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { MyCheckbox } from '@components/checkbox';
import { MyButton } from '@components/button';
import { useInput } from '@hooks/use-input';
import { useApi } from '@hooks/use-api';
import { getUserCustomersRequest } from '@actions/customer/get-user-customers';
import { isEmpty } from '@utils/validator/common';
import { convertPhoneNumber } from '@utils/converter';
import { showContractorSearchModal } from '@actions/modal/customer-search.action';
import {
    deleteInsured,
    updateInsured,
} from '@actions/contract/set-insured.action';

// import { InsuredTemplate } from '../template/LongInsured';
// import { InsuredForm } from '../InsuredForm';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { useSelect } from '@hooks/use-select';
import carConstants from '@constants/options/car';
import { CarInsuredForm } from '@partials/contract/car/InsuredForm';
import { GeneralInsuredForm } from '@partials/contract/general/InsuredForm';
import { LongInsuredForm } from '@partials/contract/long/InsuredForm';
import { LongInsuredTemplate } from '@partials/contract/long/template/Insured';
import { GeneralInsuredTemplate } from '@partials/contract/general/template/Insured';
import { CarInsuredTemplate } from '@partials/contract/car/template/Insured';
import { MyDatepicker } from '@components/datepicker';
import { MyTableExtension } from '@components/table/Extension';

interface Props extends MyTabpanelProps, CoreEditableComponent {}

export const CompareTabpanel: FC<Props> = ({ id, tabId, hidden, editable }) => {
    const dispatch = useDispatch();

    const labelType = editable ? 'active' : 'disable';

    const handleSearch = () => {};

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-6">
                    <WithLabel id="ccarNum" label="차량번호" type={labelType}>
                        <MyInput
                            type="search"
                            id="ccarNum"
                            placeholder="차량번호"
                            value="서울00러0000"
                            disabled={!editable}
                            readOnly
                        />
                    </WithLabel>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <WithLabel
                            id="ccarNum"
                            label="차량연식"
                            type={labelType}
                        >
                            <MyInput
                                type="search"
                                id="ccarNum"
                                placeholder="차량연식"
                                disabled={!editable}
                                readOnly
                                value="2024"
                            />
                        </WithLabel>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-6">
                    <form onSubmit={handleSearch}>
                        <WithLabel id="ccode" label="차명코드" type={labelType}>
                            <MyInput
                                type="search"
                                id="ccode"
                                placeholder="차명코드"
                                disabled={!editable}
                                readOnly
                                value="21P05"
                                button={{
                                    type: 'submit',
                                    className: 'btn-primary btn-md',
                                    disabled: !editable,
                                    children: (
                                        <>
                                            <span>조회</span>
                                        </>
                                    ),
                                }}
                            />
                        </WithLabel>
                    </form>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <WithLabel
                            id="ccarRegdate"
                            label="차량등록일"
                            type={labelType}
                        >
                            <MyDatepicker
                                id="ccarRegdate"
                                size="md"
                                placeholder="2023-08-30"
                            />
                        </WithLabel>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__buttons">
                        <MyCheckbox label="LPG" />
                        <MyCheckbox label="탑차" />
                        <MyCheckbox label="스포츠카" />
                    </div>
                    <WithLabel id="ccarName" label="차량명" type={labelType}>
                        <MyInput
                            type="text"
                            id="ccarName"
                            placeholder="차량명"
                            disabled={!editable}
                            readOnly
                            value="티볼리 1.6 16년식 가솔린 LX 최고급"
                        />
                    </WithLabel>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-6">
                    <WithLabel id="ccarGrade" label="차량등급" type={labelType}>
                        <MySelect
                            inputId="ccarGrade"
                            placeholder="11등급"
                            placeHolderFontSize={16}
                            height={variables.detailFilterHeight}
                        />
                    </WithLabel>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <WithLabel
                            id="ccarExhust"
                            label="배기량/인원"
                            type={labelType}
                        >
                            <MyInput
                                type="text"
                                id="ccarExhust"
                                placeholder="배기량"
                                className="text-end"
                                disabled={!editable}
                                readOnly
                                value="1,598"
                                unit="cc"
                            />
                            <div
                                className="wr-with__extension"
                                style={{ width: 100 }}
                            >
                                <MyInput
                                    type="number"
                                    id="ccarExhust"
                                    placeholder="배기량"
                                    className="wr-border-l--hide"
                                    disabled={!editable}
                                    readOnly
                                    value="11"
                                    unit="인승"
                                />
                            </div>
                        </WithLabel>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-6">
                    <WithLabel label="기본부속1" type={labelType}>
                        <div
                            style={{
                                height: variables.detailFilterHeight,
                            }}
                            className="wr-with__checkbox wr-border"
                        >
                            <div className="wr-pages-detail__buttons">
                                <MyCheckbox label="오토" />
                                <MyCheckbox label="ABS" />
                                <MyCheckbox label="이모빌라이저" />
                            </div>
                        </div>
                    </WithLabel>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <WithLabel
                            id="ccarBbox"
                            label="블랙박스"
                            type={labelType}
                        >
                            <MySelect
                                inputId="ccarBbox"
                                placeholder="장착"
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                isDisabled={!editable}
                            />
                        </WithLabel>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-6">
                    <WithLabel id="ccarAirback" label="에어백" type={labelType}>
                        <MySelect
                            inputId="ccarAirback"
                            placeholder="운전석+조수석"
                            placeHolderFontSize={16}
                            height={variables.detailFilterHeight}
                            isDisabled={!editable}
                        />
                    </WithLabel>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <div className="row">
                            <div className="col-6">
                                <WithLabel
                                    id="ccarPdate"
                                    label="구입시기"
                                    type={labelType}
                                >
                                    <MyDatepicker
                                        id="ccarPdate"
                                        size="md"
                                        placeholder="2023-08-30"
                                    />
                                </WithLabel>
                            </div>
                            <div className="col-6">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="ccarPrice"
                                        label="금액"
                                        type={labelType}
                                    >
                                        <MyInput
                                            type="text"
                                            id="ccarExhust"
                                            placeholder="배기량"
                                            className="text-end"
                                            disabled={!editable}
                                            readOnly
                                            value="2,400"
                                            unit="만원"
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wr-pages-detail__block wr-mt">
                <div className="wr-pages-detail__title">
                    <strong>기본부속 2</strong>
                    <div></div>
                </div>
                <div className="wr-pages-detail__content">
                    <div className="row">
                        <div className="col-6">
                            <WithLabel
                                id="ccarDispatch"
                                label="전방출동"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarDispatch"
                                    placeholder="경고+비상제동"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                />
                            </WithLabel>
                            <div className="wr-pages-detail__buttons">
                                <MyCheckbox label="커넥티드카 (블루링크 또는 UVO)" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="wr-ml">
                                <WithLabel
                                    id="ccarLeave"
                                    label="차선이탈"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarLeave"
                                        placeholder="경고+유지"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                    />
                                </WithLabel>
                                <div className="wr-pages-detail__buttons">
                                    <MyCheckbox label="지능형 안전장치" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-6">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__title">
                            <strong>추가부속</strong>
                            <div></div>
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="wr-table--normal wr-mt">
                                <table className="wr-table table">
                                    <thead>
                                        <tr>
                                            {editable && (
                                                <th style={{ width: '30px' }}>
                                                    <MyCheckbox
                                                        label=""
                                                        // onChange={
                                                        //     handleAllCheck
                                                        // }
                                                    />
                                                </th>
                                            )}

                                            <th>
                                                <strong>부속명</strong>
                                            </th>
                                            <th style={{ width: '100px' }}>
                                                <strong>부속가액</strong>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={editable ? 3 : 2}>
                                                부속 정보가 없습니다.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {editable && (
                                    <MyTableExtension
                                    // onClick={handleShowSettingModal}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-detail__block wr-mt">
                        <div className="wr-pages-detail__title">
                            <strong>기타사항</strong>
                            <div></div>
                        </div>
                        <div className="wr-pages-detail__content">
                            <WithLabel
                                id="ccarTransport"
                                label="유상운송"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarTransport"
                                    placeholder="선택"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                />
                            </WithLabel>
                            <WithLabel
                                id="ccarCER"
                                label="기중기장치요율"
                                type={labelType}
                            >
                                <MyInput
                                    type="number"
                                    id="ccarCER"
                                    placeholder="기중기장치요율"
                                    className="text-end"
                                    disabled={!editable}
                                    readOnly
                                    value="0"
                                    unit="%"
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <WithLabel
                            id="ccarPtype"
                            label="차량구매형태"
                            type={labelType}
                        >
                            <MySelect
                                inputId="ccarPtype"
                                placeholder="신차or중고차"
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                isDisabled={!editable}
                            />
                        </WithLabel>
                        <WithLabel
                            id="ccarVprice"
                            label="기본차량가액"
                            type={labelType}
                        >
                            <MyInput
                                type="number"
                                id="ccarVprice"
                                placeholder="기본차량가액"
                                className="text-end"
                                disabled={!editable}
                                readOnly
                                value="365"
                                unit="만원"
                            />
                        </WithLabel>
                        <WithLabel
                            id="ccarVtotal"
                            label="부속가액합계"
                            type={labelType}
                        >
                            <MyInput
                                type="number"
                                id="ccarVtotal"
                                placeholder="부속가액합계"
                                className="text-end"
                                disabled={!editable}
                                readOnly
                                value="335"
                                unit="만원"
                            />
                        </WithLabel>
                        <div className="wr-pages-detail__toolbar wr-border-b">
                            <div>총 차량가액</div>
                            <div>700 만원</div>
                        </div>
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
