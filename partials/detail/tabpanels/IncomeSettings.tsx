import type { FC } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { CoreSelectOption, CoreTabpanelOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import { useState, useMemo } from 'react';
import { MySelect } from '@components/select';
import { MyTable } from '@components/table';
import { useSelector } from 'react-redux';
import { DisconnectedLabel } from '@components/label/DisconnectedLabel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';

const WITH_SELECT_SIZE = 100;

interface Props extends CoreTabpanelOption {}

export const IncomeSettings: FC<Props> = ({ id, panelId, hidden }) => {
    const { basicPayments, overrides } = useSelector<AppState, LongState>(
        (props) => props.long,
    );

    const [org, setOrg] = useState<CoreSelectOption | null>(null);

    const handleChange = (org: CoreSelectOption | null) => {
        setOrg(org);
    };

    const basicPaymentscolumns = useMemo<ColumnDef<any>[]>(
        () =>
            Object.entries(basicPayments.fields).map(([key, value]) => {
                return {
                    header: (info: any) => {
                        return <strong>{key}</strong>;
                    },
                    accessorKey: value,
                    cell: (info: any) => {
                        return <span>{info.getValue()}</span>;
                    },
                };
            }),
        [basicPayments.fields],
    );

    const overridesColumns = useMemo<ColumnDef<any>[]>(
        () =>
            Object.entries(overrides.fields).map(([key, value]) => {
                return {
                    header: (info: any) => {
                        return <strong>{key}</strong>;
                    },
                    accessorKey: value,
                    cell: (info: any) => {
                        return <span>{info.getValue()}</span>;
                    },
                };
            }),
        [overrides.fields],
    );

    return (
        <div
            className="wr-pages-detail__income"
            role="tabpanel"
            id={panelId}
            aria-labelledby={id}
            hidden={hidden}
        >
            <div className="row">
                <div className="col-4">
                    <div className="wr-mr">
                        <WithLabel id="bName" label="은행명" type="active">
                            <MySelect
                                options={[]}
                                value={org}
                                onChange={() => {}}
                                placeholder={'국민은행'}
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="col-4">
                    <div className="wr-mr">
                        <WithLabel id="account" label="직함" type="active">
                            <MyInput
                                type="text"
                                id="account"
                                placeholder="123456-01-32423934"
                                readOnly
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="col-4">
                    <WithLabel id="accHolder" label="예금주" type="active">
                        <div className="wr-pages-detail__with">
                            <MyInput
                                type="text"
                                id="accHolder"
                                placeholder="홍길동"
                                readOnly
                            />
                            <MySelect
                                options={[]}
                                value={org}
                                onChange={() => {}}
                                placeholder={'과세'}
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                            />
                        </div>
                    </WithLabel>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-4">
                    <div className="wr-mr">
                        <WithLabel
                            id="accHolder"
                            label="소득구분"
                            type="active"
                        >
                            <MySelect
                                options={[]}
                                value={org}
                                onChange={() => {}}
                                placeholder={'근로 + 사업'}
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="col-4">
                    <div className="wr-mr">
                        <WithLabel
                            id="accHolder"
                            label="지급제도"
                            type="active"
                        >
                            <MySelect
                                options={[]}
                                value={org}
                                onChange={() => {}}
                                placeholder={'S3-2'}
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="col-4">
                    <WithLabel id="accHolder" label="지급율" type="active">
                        <div className="wr-pages-detail__with">
                            <MySelect
                                options={[]}
                                value={org}
                                onChange={() => {}}
                                placeholder={'기본 + 성과'}
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                            />
                            <MyInput
                                type="number"
                                id="accHolder"
                                placeholder="85"
                                unit="%"
                            />
                        </div>
                    </WithLabel>
                </div>
            </div>
            {basicPayments.data.length > 0 && (
                <div className="row mt-3">
                    <div className="col">
                        <DisconnectedLabel>장기 기본 지급</DisconnectedLabel>
                        <MyTable
                            columns={basicPaymentscolumns}
                            data={basicPayments.data}
                        />
                    </div>
                </div>
            )}

            {overrides.data.length > 0 && (
                <div className="row mt-3">
                    <div className="col">
                        <DisconnectedLabel>장기 오버라이드</DisconnectedLabel>
                        <MyTable
                            columns={overridesColumns}
                            data={overrides.data}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
