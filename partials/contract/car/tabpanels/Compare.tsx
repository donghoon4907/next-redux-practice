import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CoreEditableComponent } from '@interfaces/core';
import { useDispatch } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { MyCheckbox } from '@components/checkbox';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyDatepicker } from '@components/datepicker';
import { MyTableExtension } from '@components/table/Extension';
import { UseInputOutput } from '@hooks/use-input';
import { UseSelectOutput } from '@hooks/use-select';

interface Props extends MyTabpanelProps, CoreEditableComponent {
    carNumHooks: UseInputOutput;
    carYearHooks: UseSelectOutput;
    carCodeHooks: UseInputOutput;
}

export const CompareTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    carNumHooks,
    carYearHooks,
    carCodeHooks,
}) => {
    const dispatch = useDispatch();

    const labelType = editable ? 'active' : 'disable';

    const handleSearch = () => {
        alert('차명코드 조회 실행됨');
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-6">
                    <WithLabel id="carnum" label="차량번호" type={labelType}>
                        <MyInput
                            type="search"
                            id="carnum"
                            placeholder="차량번호"
                            disabled={!editable}
                            {...carNumHooks}
                        />
                    </WithLabel>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <WithLabel
                            id="caryear"
                            label="차량연식"
                            type={labelType}
                        >
                            <MySelect
                                inputId="caryear"
                                placeholder="선택"
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                {...carYearHooks}
                            />
                        </WithLabel>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-6">
                    <form onSubmit={handleSearch}>
                        <WithLabel
                            id="carcode"
                            label="차명코드"
                            type={labelType}
                        >
                            <MyInput
                                type="search"
                                id="carcode"
                                placeholder="차명코드"
                                disabled={!editable}
                                button={
                                    editable
                                        ? {
                                              type: 'submit',
                                              className: 'btn-primary btn-md',
                                              disabled: !editable,
                                              children: (
                                                  <>
                                                      <span>조회</span>
                                                  </>
                                              ),
                                          }
                                        : undefined
                                }
                                {...carCodeHooks}
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
            <div className="row wr-mt">
                <div className="col-6">
                    <div className="wr-pages-detail__block">
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
                    <div className="wr-pages-detail__block wr-mt">
                        <div className="wr-pages-detail__title">
                            <strong>세부담보설정</strong>
                            <div></div>
                        </div>
                        <div className="wr-pages-detail__content">
                            <WithLabel
                                id="ccarCompensation"
                                label="대인배상I"
                                type={labelType}
                            >
                                <MyInput
                                    type="text"
                                    id="ccarCompensation"
                                    placeholder="대인배상I"
                                    disabled={!editable}
                                    readOnly
                                    value="의무가입"
                                />
                            </WithLabel>
                            <WithLabel
                                id="ccarCompensation"
                                label="대인배상II"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarCompensation"
                                    placeholder="무한"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                />
                            </WithLabel>
                            <WithLabel
                                id="ccarLimit"
                                label="대물한도"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarLimit"
                                    placeholder="10억원"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                />
                            </WithLabel>
                            <WithLabel
                                id="ccarDes"
                                label="자손/자상"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarDes"
                                    placeholder="선택"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                />
                            </WithLabel>
                            <WithLabel
                                id="ccarNoInsu"
                                label="무보험차"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarNoInsu"
                                    placeholder="선택"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                />
                            </WithLabel>
                            <WithLabel
                                id="ccarMine"
                                label="자기차량"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarMine"
                                    placeholder="선택"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                />
                            </WithLabel>
                            <WithLabel
                                id="ccarDispatch"
                                label="긴급출동"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarDispatch"
                                    placeholder="선택"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                />
                            </WithLabel>
                            <WithLabel
                                id="ccarPremium"
                                label="물적사고할증"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarPremium"
                                    placeholder="선택"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                />
                            </WithLabel>
                        </div>
                    </div>
                    <div className="wr-pages-detail__block wr-mt">
                        <div className="wr-pages-detail__title">
                            <strong>특약사항</strong>
                            <div></div>
                        </div>
                        <div className="wr-pages-detail__content">
                            <WithLabel
                                id="ccarMileage"
                                label="마일리지"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarMileage"
                                    placeholder="선택"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                />
                                <div
                                    className="wr-with__extension"
                                    style={{ width: 190 }}
                                >
                                    <MySelect
                                        placeholder="선택"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        placement="right"
                                        isDisabled={!editable}
                                    />
                                </div>
                            </WithLabel>
                            <WithLabel
                                id="ccarCSC"
                                label="자녀특약"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarCSC"
                                    placeholder="미가입"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                    placement="left"
                                />
                                <div
                                    className="wr-with__extension"
                                    style={{ width: 191 }}
                                >
                                    <MyDatepicker
                                        id="ccarRegdate"
                                        size="md"
                                        placeholder="생년월일"
                                    />
                                </div>
                            </WithLabel>
                            <WithLabel
                                id="ccarLimit"
                                label="안전운전습관"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarLimit"
                                    placeholder="10억원"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    placement="left"
                                    isDisabled={!editable}
                                />
                                <div
                                    className="wr-with__extension"
                                    style={{ width: 191 }}
                                >
                                    <MyInput
                                        type="number"
                                        placeholder="0"
                                        className="text-end"
                                        disabled={!editable}
                                        readOnly
                                        value="365"
                                        unit="점"
                                    />
                                </div>
                            </WithLabel>
                        </div>
                    </div>
                    <div className="wr-pages-detail__block wr-mt">
                        <div className="wr-pages-detail__title">
                            <strong>기타</strong>
                            <div></div>
                        </div>
                        <div className="wr-pages-detail__content">
                            <WithLabel
                                id="ccarUsage"
                                label="차량용도"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="ccarUsage"
                                    placeholder="선택"
                                    placeHolderFontSize={16}
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                />
                            </WithLabel>
                            <WithLabel
                                id="ccarGuarantee"
                                label="일부담보"
                                type={labelType}
                            >
                                <MyInput
                                    type="number"
                                    id="ccarGuarantee"
                                    placeholder="0"
                                    className="text-end"
                                    disabled={!editable}
                                    readOnly
                                    value="0"
                                    unit="원"
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__title">
                                <strong>요율사항</strong>
                                <div></div>
                            </div>
                            <div className="wr-pages-detail__content">
                                <WithLabel
                                    id="ccarAllCount"
                                    label="총차량대수"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarAllCount"
                                        placeholder="선택"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                    />
                                </WithLabel>
                                <div className="wr-pages-detail__block wr-mt">
                                    <div className="wr-pages-detail__title">
                                        <strong>보험가입경력</strong>
                                        <div></div>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="ccarMEI"
                                                    label="피보험자"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarMEI"
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="ccarMEC"
                                                        label="차량"
                                                        type={labelType}
                                                    >
                                                        <MySelect
                                                            inputId="ccarMEC"
                                                            placeholder="선택"
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                            height={
                                                                variables.detailFilterHeight
                                                            }
                                                            isDisabled={
                                                                !editable
                                                            }
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wr-pages-detail__block wr-mt">
                                    <div className="wr-pages-detail__title">
                                        <strong>직전3년가입경력</strong>
                                        <div></div>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="ccarPMED"
                                                    label="DB"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarPMED"
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="ccarPMEK"
                                                        label="KB"
                                                        type={labelType}
                                                    >
                                                        <MySelect
                                                            inputId="ccarPMEK"
                                                            placeholder="선택"
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                            height={
                                                                variables.detailFilterHeight
                                                            }
                                                            isDisabled={
                                                                !editable
                                                            }
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wr-pages-detail__block wr-mt">
                                    <div className="wr-pages-detail__title">
                                        <strong>교통법규위반</strong>
                                        <div></div>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col-6">
                                                <MySelect
                                                    placeholder="선택"
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <div className="d-flex">
                                                        <div className="flex-fill">
                                                            <MySelect
                                                                inputId="ccarPMEK"
                                                                placeholder="선택"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                placement="left"
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                            />
                                                        </div>

                                                        <div className="wr-form__unit">
                                                            건
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wr-pages-detail__block wr-mt">
                                    <div className="wr-pages-detail__title">
                                        <strong>할증율</strong>
                                        <div></div>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="ccarDiscount"
                                                    label="할인할증"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarDiscount"
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6 d-flex justify-content-start align-items-center">
                                                <div className="wr-ml ">
                                                    <MyCheckbox
                                                        id="ccarCR"
                                                        label="군/법인/해외경력인정"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="ccarDD"
                                                    label="기본할증"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarDD"
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml ">
                                                    <WithLabel
                                                        id="ccarAD"
                                                        label="추가할증"
                                                        type={labelType}
                                                    >
                                                        <MySelect
                                                            inputId="ccarAD"
                                                            placeholder="선택"
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                            height={
                                                                variables.detailFilterHeight
                                                            }
                                                            isDisabled={
                                                                !editable
                                                            }
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wr-pages-detail__block wr-mt">
                                    <div className="wr-pages-detail__title">
                                        <strong>사고요율</strong>
                                        <div></div>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col">
                                                <WithLabel
                                                    id="ccarArateF3"
                                                    label="3년간사고요율"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarArateF3"
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                    />
                                                </WithLabel>
                                                <WithLabel
                                                    id="ccarArateBC"
                                                    label="전계약사고요율"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarArateBC"
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="ccarAPF3"
                                                    label="3년사고점수"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarAPF3"
                                                        placeholder="선택"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="ccarAPF1"
                                                        label="1년사고점수"
                                                        type={labelType}
                                                    >
                                                        <MySelect
                                                            inputId="ccarAPF1"
                                                            placeholder="선택"
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                            height={
                                                                variables.detailFilterHeight
                                                            }
                                                            isDisabled={
                                                                !editable
                                                            }
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wr-pages-detail__block wr-mt">
                                            <div className="wr-pages-detail__title">
                                                <strong>
                                                    피보기준 사고건수
                                                </strong>
                                                <div></div>
                                            </div>
                                            <div className="wr-pages-detail__content">
                                                <div className="row">
                                                    <div className="col">
                                                        <WithLabel
                                                            id="ccarIACF3"
                                                            label="3년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarIACF3"
                                                                placeholder="선택"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                            />
                                                            <div className="wr-with__extension wr-form__unit wr-border-l--hide">
                                                                건
                                                            </div>
                                                        </WithLabel>
                                                    </div>
                                                </div>
                                                <div className="row wr-mt">
                                                    <div className="col">
                                                        <WithLabel
                                                            id="ccarIACF2"
                                                            label="2년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarIACF2"
                                                                placeholder="선택"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                            />
                                                            <div className="wr-with__extension wr-form__unit wr-border-l--hide">
                                                                건
                                                            </div>
                                                        </WithLabel>
                                                    </div>
                                                </div>
                                                <div className="row wr-mt">
                                                    <div className="col">
                                                        <WithLabel
                                                            id="ccarIACF1"
                                                            label="1년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarIACF1"
                                                                placeholder="선택"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                            />
                                                            <div className="wr-with__extension wr-form__unit wr-border-l--hide">
                                                                건
                                                            </div>
                                                        </WithLabel>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wr-pages-detail__block wr-mt">
                                            <div className="wr-pages-detail__title">
                                                <strong>
                                                    차량기준 사고건수
                                                </strong>
                                                <div></div>
                                            </div>
                                            <div className="wr-pages-detail__content">
                                                <div className="row">
                                                    <div className="col">
                                                        <WithLabel
                                                            id="ccarCACF3"
                                                            label="3년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarCACF3"
                                                                placeholder="선택"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                            />
                                                            <div className="wr-with__extension wr-form__unit wr-border-l--hide">
                                                                건
                                                            </div>
                                                        </WithLabel>
                                                    </div>
                                                </div>
                                                <div className="row wr-mt">
                                                    <div className="col">
                                                        <WithLabel
                                                            id="ccarCACF2"
                                                            label="2년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarCACF2"
                                                                placeholder="선택"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                            />
                                                            <div className="wr-with__extension wr-form__unit wr-border-l--hide">
                                                                건
                                                            </div>
                                                        </WithLabel>
                                                    </div>
                                                </div>
                                                <div className="row wr-mt">
                                                    <div className="col">
                                                        <WithLabel
                                                            id="ccarCACF1"
                                                            label="1년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarCACF1"
                                                                placeholder="선택"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                            />
                                                            <div className="wr-with__extension wr-form__unit wr-border-l--hide">
                                                                건
                                                            </div>
                                                        </WithLabel>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
