import type { FC, ChangeEvent } from 'react';
import type { Bupum } from '@models/bupum';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CoreEditableComponent } from '@interfaces/core';
import type { UseInputOutput } from '@hooks/use-input';
import type { UseSelectOutput } from '@hooks/use-select';
import type { UseDatepickerOutput } from '@hooks/use-datepicker';
import type { UseCheckboxOutput } from '@hooks/use-checkbox';
import type { AppState } from '@reducers/index';
import type { CarState } from '@reducers/car';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { MyCheckbox } from '@components/checkbox';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyDatepicker } from '@components/datepicker';
import { MyTableExtension } from '@components/table/Extension';
import { showCreateBupumModal } from '@actions/modal/create-bupum.action';
import {
    deleteBupum,
    updateBupum,
} from '@actions/contract/car/set-bupum.action';
import { MyButton } from '@components/button';

interface Props extends MyTabpanelProps, CoreEditableComponent {
    carNumHooks: UseInputOutput;
    carYearHooks: UseSelectOutput;
    carCodeHooks: UseInputOutput;
    cardateHooks: UseDatepickerOutput;
    checkLpgHooks: UseCheckboxOutput;
    checkTopcarHooks: UseCheckboxOutput;
    checkSportcarHooks: UseCheckboxOutput;
    carnameHooks: UseInputOutput;
    carGradeHooks: UseSelectOutput;
    baegirangHooks: UseInputOutput;
    peopleNumHooks: UseInputOutput;
    checkAutoHooks: UseCheckboxOutput;
    checkAbsHalinHooks: UseCheckboxOutput;
    checkImoHooks: UseCheckboxOutput;
    hasBbHooks: UseSelectOutput;
    bbBuydateHooks: UseDatepickerOutput;
    bbBuyPriceHooks: UseInputOutput;
    aircodeHooks: UseSelectOutput;
    chungHooks: UseSelectOutput;
    checkBluelinkHooks: UseCheckboxOutput;
    gpsHooks: UseSelectOutput;
    checkJobcodeNmHooks: UseCheckboxOutput;
    membercodeHooks: UseSelectOutput;
    carpriceHooks: UseInputOutput;
    usangHooks: UseSelectOutput;
    usang2Hooks: UseInputOutput;
    dambo2Hooks: UseSelectOutput;
    dambo3Hooks: UseSelectOutput;
    dambo4Hooks: UseSelectOutput;
    dambo5Hooks: UseSelectOutput;
    dambo6Hooks: UseSelectOutput;
    gooutDistHooks: UseSelectOutput;
    gooutDetailHooks: UseSelectOutput;
    mulSagoHooks: UseSelectOutput;
    mileDistHooks: UseSelectOutput;
    mileDetailHooks: UseSelectOutput;
    drateDistHooks: UseSelectOutput;
    drateDetailHooks: UseDatepickerOutput;
    tmapDistHooks: UseSelectOutput;
    tmapDetailHooks: UseInputOutput;
    caruseHooks: UseSelectOutput;
    ilPriceHooks: UseInputOutput;
    childdriveHooks: UseSelectOutput;
    guipcarrerHooks: UseSelectOutput;
    guipcarrerCarHooks: UseSelectOutput;
    lJobcodeHooks: UseSelectOutput;
    guipCarrerKbHooks: UseSelectOutput;
    trafficDistHooks: UseSelectOutput;
    trafficDetailHooks: UseSelectOutput;
    halinHooks: UseSelectOutput;
    checkRateUHooks: UseCheckboxOutput;
    specialCodeHooks: UseSelectOutput;
    specialCode2Hooks: UseSelectOutput;
    ssSago3Hooks: UseSelectOutput;
    preSago3Hooks: UseSelectOutput;
    pSagoHooks: UseSelectOutput;
    goout2Hooks: UseSelectOutput;
    sago3Hooks: UseSelectOutput;
    carNonumHooks: UseSelectOutput;
    sago1Hooks: UseSelectOutput;
    carSago3Hooks: UseSelectOutput;
    carSago2Hooks: UseSelectOutput;
    carSago1Hooks: UseSelectOutput;
    totalBupumPrice: number;
    totalPrice: number;
}

export const CompareTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    carNumHooks,
    carYearHooks,
    carCodeHooks,
    cardateHooks,
    checkLpgHooks,
    checkTopcarHooks,
    checkSportcarHooks,
    carnameHooks,
    carGradeHooks,
    baegirangHooks,
    peopleNumHooks,
    checkAutoHooks,
    checkAbsHalinHooks,
    checkImoHooks,
    hasBbHooks,
    bbBuydateHooks,
    bbBuyPriceHooks,
    aircodeHooks,
    chungHooks,
    checkBluelinkHooks,
    gpsHooks,
    checkJobcodeNmHooks,
    membercodeHooks,
    carpriceHooks,
    usangHooks,
    usang2Hooks,
    dambo2Hooks,
    dambo3Hooks,
    dambo4Hooks,
    dambo5Hooks,
    dambo6Hooks,
    gooutDistHooks,
    gooutDetailHooks,
    mulSagoHooks,
    mileDistHooks,
    mileDetailHooks,
    drateDistHooks,
    drateDetailHooks,
    tmapDistHooks,
    tmapDetailHooks,
    caruseHooks,
    ilPriceHooks,
    childdriveHooks,
    guipcarrerHooks,
    guipcarrerCarHooks,
    lJobcodeHooks,
    guipCarrerKbHooks,
    trafficDistHooks,
    trafficDetailHooks,
    halinHooks,
    checkRateUHooks,
    specialCodeHooks,
    specialCode2Hooks,
    ssSago3Hooks,
    preSago3Hooks,
    pSagoHooks,
    goout2Hooks,
    sago3Hooks,
    carNonumHooks,
    sago1Hooks,
    carSago3Hooks,
    carSago2Hooks,
    carSago1Hooks,
    totalBupumPrice,
    totalPrice,
}) => {
    const dispatch = useDispatch();

    const { bupums } = useSelector<AppState, CarState>((state) => state.car);

    const labelType = editable ? 'active' : 'disable';

    const handleSearch = () => {
        alert('차명코드 조회 실행됨');
    };

    const handleShowCreateBupumModal = () => {
        dispatch(showCreateBupumModal());
    };

    const handleAllCheckBupum = (evt: ChangeEvent<HTMLInputElement>) => {
        bupums.forEach((v) => {
            dispatch(updateBupum({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheckBupum = (evt: ChangeEvent<HTMLInputElement>, v: Bupum) => {
        dispatch(updateBupum({ ...v, checked: evt.target.checked }));
    };

    const handleDeleteBupum = () => {
        if (bupums.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 추가부속을 선택해주세요.');
        }

        bupums
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteBupum({ index: v.index }));
            });
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-frame__tabbody overflow-auto">
                <div className="row">
                    <div className="col">
                        <WithLabel
                            id="carnum"
                            label="차량번호"
                            type={labelType}
                        >
                            <MyInput
                                type="search"
                                id="carnum"
                                placeholder="차량번호"
                                disabled={!editable}
                                {...carNumHooks}
                            />
                        </WithLabel>
                    </div>
                    <div className="col">
                        <WithLabel
                            id="caryear"
                            label="차량연식"
                            type={labelType}
                            // isRequired={editable}
                        >
                            <MySelect
                                inputId="caryear"
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                {...carYearHooks}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <form onSubmit={handleSearch}>
                            <WithLabel
                                id="carcode"
                                label="차명코드"
                                type={labelType}
                                // isRequired={editable}
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
                                                  className:
                                                      'btn-primary btn-md',
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
                    <div className="col">
                        <WithLabel
                            id="ccarDate"
                            label="차량등록일"
                            type={labelType}
                            // isRequired={editable}
                        >
                            <MyDatepicker
                                id="ccarDate"
                                size="md"
                                placeholder="차량등록일"
                                {...cardateHooks}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <div className="wr-pages-detail__buttons">
                            <MyCheckbox
                                id="ccarLpg"
                                label="LPG"
                                {...checkLpgHooks}
                            />
                            <MyCheckbox
                                id="ccarTopcar"
                                label="탑차"
                                {...checkTopcarHooks}
                            />
                            <MyCheckbox
                                id="ccarsportcar"
                                label="스포츠카"
                                {...checkSportcarHooks}
                            />
                        </div>
                        <WithLabel
                            id="ccarName"
                            label="차량명"
                            type={labelType}
                        >
                            <MyInput
                                type="text"
                                id="ccarName"
                                placeholder="차량명"
                                disabled={!editable}
                                {...carnameHooks}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <WithLabel
                            id="ccarGrade"
                            label="차량등급"
                            type={labelType}
                        >
                            <MySelect
                                inputId="ccarGrade"
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                {...carGradeHooks}
                            />
                        </WithLabel>
                    </div>
                    <div className="col">
                        <WithLabel
                            id="ccarBaegirang"
                            label="배기량/인원"
                            type={labelType}
                        >
                            <MyInput
                                type="number"
                                id="ccarBaegirang"
                                placeholder="0"
                                className="text-end"
                                disabled={!editable}
                                unit="cc"
                                {...baegirangHooks}
                            />
                            <div
                                className="wr-with__extension"
                                style={{ width: 135 }}
                            >
                                <MyInput
                                    type="number"
                                    placeholder="0"
                                    className="wr-border-l--hide"
                                    disabled={!editable}
                                    unit="인승"
                                    {...peopleNumHooks}
                                />
                            </div>
                        </WithLabel>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <WithLabel label="기본부속1" type={labelType}>
                            <div
                                style={{
                                    height: variables.detailFilterHeight,
                                }}
                                className="wr-with__checkbox wr-border"
                            >
                                <div className="wr-pages-detail__buttons">
                                    <MyCheckbox
                                        id="ccarAuto"
                                        label="오토"
                                        {...checkAutoHooks}
                                    />
                                    <MyCheckbox
                                        id="ccarAbs"
                                        label="ABS"
                                        {...checkAbsHalinHooks}
                                    />
                                    <MyCheckbox
                                        id="ccarImo"
                                        label="이모빌라이저"
                                        {...checkImoHooks}
                                    />
                                </div>
                            </div>
                        </WithLabel>
                    </div>
                    <div className="col">
                        <WithLabel
                            id="ccarHasBb"
                            label="블랙박스"
                            type={labelType}
                        >
                            <MySelect
                                inputId="ccarHasBb"
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                isDisabled={!editable}
                                {...hasBbHooks}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <WithLabel
                            id="ccarAircode"
                            label="에어백"
                            type={labelType}
                        >
                            <MySelect
                                inputId="ccarAircode"
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                isDisabled={!editable}
                                {...aircodeHooks}
                            />
                        </WithLabel>
                    </div>
                    {hasBbHooks.value?.value === '장착' && (
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <WithLabel
                                        id="ccarBbBuydate"
                                        label="구입시기"
                                        type={labelType}
                                    >
                                        <MyDatepicker
                                            id="ccarBbBuydate"
                                            size="md"
                                            placeholder="구입시기"
                                            hooks={bbBuydateHooks}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="ccarBbBuyPrice"
                                        label="금액"
                                        type={labelType}
                                    >
                                        <MyInput
                                            type="text"
                                            id="ccarBbBuyPrice"
                                            placeholder="0"
                                            className="text-end"
                                            disabled={!editable}
                                            unit="만원"
                                            {...bbBuyPriceHooks}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="wr-pages-detail__block wr-mt">
                    <div className="wr-pages-detail__title">
                        <strong>기본부속 2</strong>
                    </div>
                    <div className="wr-pages-detail__content">
                        <div className="row">
                            <div className="col">
                                <WithLabel
                                    id="ccarChung"
                                    label="전방출동"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarChung"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...chungHooks}
                                    />
                                </WithLabel>
                                <div className="wr-pages-detail__buttons">
                                    <MyCheckbox
                                        id="ccarBluelink"
                                        label="커넥티드카 (블루링크 또는 UVO)"
                                        {...checkBluelinkHooks}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <WithLabel
                                    id="ccarGps"
                                    label="차선이탈"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarGps"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...gpsHooks}
                                    />
                                </WithLabel>
                                <div className="wr-pages-detail__buttons">
                                    <MyCheckbox
                                        id="ccarJobcodeNm"
                                        label="지능형 안전장치"
                                        {...checkJobcodeNmHooks}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__title">
                                <strong>추가부속</strong>
                                {editable && (
                                    <div>
                                        <MyButton
                                            className="btn-danger btn-sm"
                                            onClick={handleDeleteBupum}
                                        >
                                            선택삭제
                                        </MyButton>
                                    </div>
                                )}
                            </div>
                            <div className="wr-pages-detail__content">
                                <div className="wr-table--normal">
                                    <table className="wr-table table">
                                        <thead>
                                            <tr>
                                                {editable && (
                                                    <th
                                                        style={{
                                                            width: '30px',
                                                        }}
                                                    >
                                                        <MyCheckbox
                                                            label=""
                                                            onChange={
                                                                handleAllCheckBupum
                                                            }
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
                                            {bupums.length === 0 && (
                                                <tr>
                                                    <td
                                                        colSpan={
                                                            editable ? 3 : 2
                                                        }
                                                    >
                                                        부속 정보가 없습니다.
                                                    </td>
                                                </tr>
                                            )}

                                            {bupums.map((v, i) => (
                                                <tr key={`pay${i}`}>
                                                    {editable && (
                                                        <td>
                                                            <MyCheckbox
                                                                label=""
                                                                checked={
                                                                    v.checked
                                                                }
                                                                onChange={(
                                                                    evt,
                                                                ) =>
                                                                    handleCheckBupum(
                                                                        evt,
                                                                        v,
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    )}

                                                    <td>
                                                        <span>
                                                            {v.name
                                                                ? v.name
                                                                : '-'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {v.price
                                                                ? v.price.toLocaleString()
                                                                : '-'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {editable && (
                                        <MyTableExtension
                                            onClick={handleShowCreateBupumModal}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <WithLabel
                            id="ccarMembercode"
                            label="차량구매형태"
                            type={labelType}
                        >
                            <MySelect
                                inputId="ccarMembercode"
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                isDisabled={!editable}
                                {...membercodeHooks}
                            />
                        </WithLabel>
                        <WithLabel
                            id="ccarPrice"
                            label="기본차량가액"
                            type={labelType}
                        >
                            <MyInput
                                type="text"
                                id="ccarPrice"
                                placeholder="0"
                                className="text-end"
                                disabled={!editable}
                                unit="만원"
                                {...carpriceHooks}
                            />
                        </WithLabel>
                        <WithLabel label="부속가액합계" type={labelType}>
                            <MyInput
                                type="text"
                                placeholder="0"
                                className="text-end"
                                disabled={true}
                                value={totalBupumPrice.toLocaleString()}
                                unit="만원"
                            />
                        </WithLabel>
                        <div className="wr-pages-detail__toolbar wr-border-b">
                            <div>총 차량가액</div>
                            <div>{totalPrice.toLocaleString()} 만원</div>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__title">
                                <strong>기타사항</strong>
                            </div>
                            <div className="wr-pages-detail__content">
                                <WithLabel
                                    id="ccarUsang"
                                    label="유상운송"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarUsang"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...usangHooks}
                                    />
                                </WithLabel>
                                <WithLabel
                                    id="ccarUsang2"
                                    label="기중기장치요율"
                                    type={labelType}
                                >
                                    <MyInput
                                        type="number"
                                        id="ccarUsang2"
                                        placeholder="0"
                                        className="text-end"
                                        disabled={!editable}
                                        unit="%"
                                        {...usang2Hooks}
                                    />
                                </WithLabel>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block wr-mt">
                            <div className="wr-pages-detail__title">
                                <strong>세부담보설정</strong>
                            </div>
                            <div className="wr-pages-detail__content">
                                <WithLabel label="대인배상I" type={labelType}>
                                    <MyInput
                                        type="text"
                                        placeholder="대인배상I"
                                        disabled={true}
                                        value="의무가입"
                                    />
                                </WithLabel>
                                <WithLabel
                                    id="ccarDambo2"
                                    label="대인배상II"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarDambo2"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...dambo2Hooks}
                                    />
                                </WithLabel>
                                <WithLabel
                                    id="ccarDambo3"
                                    label="대물한도"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarDambo3"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...dambo3Hooks}
                                    />
                                </WithLabel>
                                <WithLabel
                                    id="ccarDambo4"
                                    label="자손/자상"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarDambo4"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...dambo4Hooks}
                                    />
                                </WithLabel>
                                <WithLabel
                                    id="ccarDambo5"
                                    label="무보험차"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarDambo5"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...dambo5Hooks}
                                    />
                                </WithLabel>
                                <WithLabel
                                    id="ccarDambo6"
                                    label="자기차량"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarDambo6"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...dambo6Hooks}
                                    />
                                </WithLabel>
                                <WithLabel
                                    id="ccarGooutDist"
                                    label="긴급출동"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarGooutDist"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...gooutDistHooks}
                                    />
                                    <div
                                        className="wr-with__extension"
                                        style={{ width: 190 }}
                                    >
                                        <MySelect
                                            placeHolderFontSize={16}
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            placement="right"
                                            isDisabled={!editable}
                                            {...gooutDetailHooks}
                                        />
                                    </div>
                                </WithLabel>
                                <WithLabel
                                    id="ccarMulSago"
                                    label="물적사고할증"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarMulSago"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...mulSagoHooks}
                                    />
                                </WithLabel>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block wr-mt">
                            <div className="wr-pages-detail__title">
                                <strong>특약사항</strong>
                            </div>
                            <div className="wr-pages-detail__content">
                                <WithLabel
                                    id="ccarMileDist"
                                    label="마일리지"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarMileDist"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...mileDistHooks}
                                    />
                                    {mileDistHooks.value?.value !==
                                        '미가입' && (
                                        <div
                                            className="wr-with__extension"
                                            style={{ width: 190 }}
                                        >
                                            <MySelect
                                                placeHolderFontSize={16}
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                placement="right"
                                                isDisabled={!editable}
                                                {...mileDetailHooks}
                                            />
                                        </div>
                                    )}
                                </WithLabel>
                                <WithLabel
                                    id="ccarDrateDist"
                                    label="자녀특약"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarDrateDist"
                                        placeholder="미가입"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        placement={
                                            drateDistHooks.value?.value ===
                                            '자녀'
                                                ? 'left'
                                                : 'single'
                                        }
                                        {...drateDistHooks}
                                    />
                                    {drateDistHooks.value?.value === '자녀' && (
                                        <div
                                            className="wr-with__extension"
                                            style={{ width: 191 }}
                                        >
                                            <MyDatepicker
                                                id=""
                                                size="md"
                                                placeholder="생년월일"
                                                hooks={drateDetailHooks}
                                            />
                                        </div>
                                    )}
                                </WithLabel>
                                <WithLabel
                                    id="ccarTmapDist"
                                    label="안전운전습관"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarTmapDist"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        placement={
                                            tmapDistHooks.value?.value ===
                                            '미가입'
                                                ? 'single'
                                                : 'left'
                                        }
                                        isDisabled={!editable}
                                        {...tmapDistHooks}
                                    />
                                    {tmapDistHooks.value?.value !==
                                        '미가입' && (
                                        <div
                                            className="wr-with__extension"
                                            style={{ width: 191 }}
                                        >
                                            <MyInput
                                                type="number"
                                                placeholder="0"
                                                className="text-end"
                                                disabled={!editable}
                                                unit="점"
                                                {...tmapDetailHooks}
                                            />
                                        </div>
                                    )}
                                </WithLabel>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block wr-mt">
                            <div className="wr-pages-detail__title">
                                <strong>기타</strong>
                            </div>
                            <div className="wr-pages-detail__content">
                                <WithLabel
                                    id="ccarUse"
                                    label="차량용도"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarUse"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...caruseHooks}
                                    />
                                </WithLabel>
                                <WithLabel
                                    id="ccarIlPrice"
                                    label="일부담보"
                                    type={labelType}
                                >
                                    <MyInput
                                        type="text"
                                        id="ccarIlPrice"
                                        placeholder="0"
                                        className="text-end"
                                        disabled={!editable}
                                        unit="원"
                                        {...ilPriceHooks}
                                    />
                                </WithLabel>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__title">
                                <strong>요율사항</strong>
                            </div>
                            <div className="wr-pages-detail__content">
                                <WithLabel
                                    id="ccarChilddrive"
                                    label="총차량대수"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="ccarChilddrive"
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...childdriveHooks}
                                    />
                                </WithLabel>
                                <div className="wr-pages-detail__block wr-mt">
                                    <div className="wr-pages-detail__title">
                                        <strong>보험가입경력</strong>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col">
                                                <WithLabel
                                                    id="ccarGuipcarrer"
                                                    label="피보험자"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarGuipcarrer"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...guipcarrerHooks}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col">
                                                <WithLabel
                                                    id="ccarGuipcarrerCar"
                                                    label="차량"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarGuipcarrerCar"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...guipcarrerCarHooks}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wr-pages-detail__block wr-mt">
                                    <div className="wr-pages-detail__title">
                                        <strong>직전3년가입경력</strong>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col">
                                                <WithLabel
                                                    id="ccarLJobcode"
                                                    label="DB"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarLJobcode"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...lJobcodeHooks}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col">
                                                <WithLabel
                                                    id="ccarGuipCarrerKb"
                                                    label="KB"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarGuipCarrerKb"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...guipCarrerKbHooks}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wr-pages-detail__block wr-mt">
                                    <div className="wr-pages-detail__title">
                                        <strong>교통법규위반</strong>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col">
                                                <MySelect
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...trafficDistHooks}
                                                />
                                            </div>
                                            <div className="col">
                                                <div className="d-flex">
                                                    <div className="flex-fill">
                                                        <MySelect
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
                                                            {...trafficDetailHooks}
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
                                <div className="wr-pages-detail__block wr-mt">
                                    <div className="wr-pages-detail__title">
                                        <strong>할증율</strong>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col">
                                                <WithLabel
                                                    id="ccarHalin"
                                                    label="할인할증"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarHalin"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...halinHooks}
                                                    />
                                                </WithLabel>
                                            </div>
                                            {(guipcarrerHooks.value?.value ===
                                                'B2' ||
                                                guipcarrerHooks.value?.value ===
                                                    'B3') && (
                                                <div className="col d-flex justify-content-start align-items-center">
                                                    <MyCheckbox
                                                        id="ccarRateU"
                                                        label="군/법인/해외경력인정"
                                                        {...checkRateUHooks}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col">
                                                <WithLabel
                                                    id="ccarSpecialCode"
                                                    label="기본할증"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarSpecialCode"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...specialCodeHooks}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col">
                                                <WithLabel
                                                    id="ccarSpecialCode2"
                                                    label="추가할증"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarSpecialCode2"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...specialCode2Hooks}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wr-pages-detail__block wr-mt">
                                    <div className="wr-pages-detail__title">
                                        <strong>사고요율</strong>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col">
                                                <WithLabel
                                                    id="ccarSsSago3"
                                                    label="3년간사고요율"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarSsSago3"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...ssSago3Hooks}
                                                    />
                                                </WithLabel>
                                                <WithLabel
                                                    id="ccarPreSago3"
                                                    label="전계약사고요율"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarPreSago3"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...preSago3Hooks}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col">
                                                <WithLabel
                                                    id="ccarPSago"
                                                    label="3년사고점수"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarPSago"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...pSagoHooks}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col">
                                                <WithLabel
                                                    id="ccarGoout2"
                                                    label="1년사고점수"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="ccarGoout2"
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...goout2Hooks}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                        <div className="wr-pages-detail__block wr-mt">
                                            <div className="wr-pages-detail__title">
                                                <strong>
                                                    피보기준 사고건수
                                                </strong>
                                            </div>
                                            <div className="wr-pages-detail__content">
                                                <div className="row">
                                                    <div className="col">
                                                        <WithLabel
                                                            id="ccarSago3"
                                                            label="3년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarSago3"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                {...sago3Hooks}
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
                                                            id="ccarCarNonum"
                                                            label="2년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarCarNonum"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                {...carNonumHooks}
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
                                                            id="ccarSago1"
                                                            label="1년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarSago1"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                {...sago1Hooks}
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
                                            </div>
                                            <div className="wr-pages-detail__content">
                                                <div className="row">
                                                    <div className="col">
                                                        <WithLabel
                                                            id="ccarCarSago3"
                                                            label="3년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarCarSago3"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                {...carSago3Hooks}
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
                                                            id="ccarCarSago2"
                                                            label="2년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarCarSago2"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                {...carSago2Hooks}
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
                                                            id="ccarCarSago1"
                                                            label="1년간"
                                                            type={labelType}
                                                        >
                                                            <MySelect
                                                                inputId="ccarCarSago1"
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                {...carSago1Hooks}
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
