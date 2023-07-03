import type { FC } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { CoreSelectOption, CoreTabpanelOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import { useState, useMemo } from 'react';
import { MyLabel } from '@components/label';
import { MySelect } from '@components/select';
import { MyTable } from '@components/table';
import { useSelector } from 'react-redux';
import { DisconnectedLabel } from '@components/label/DisconnectedLabel';

const FULL_SELECT_SIZE = 337;

const WITH_SELECT_SIZE = 100;

interface Props extends CoreTabpanelOption {}

export const GuaranteeSettings: FC<Props> = ({ id, panelId, hidden }) => {
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
                    <MyLabel>은행명</MyLabel>
                    <MySelect
                        width={FULL_SELECT_SIZE}
                        options={[]}
                        value={org}
                        onChange={() => {}}
                        placeholder={'국민은행'}
                        placeHolderFontSize={16}
                    />
                </div>
                <div className="col-4">
                    <MyLabel>계좌번호</MyLabel>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="123456-01-32423934"
                        />
                    </div>
                </div>
                <div className="col-4">
                    <MyLabel>예금주</MyLabel>
                    <div className="wr-pages-detail__with">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="홍길동"
                            />
                        </div>
                        <MySelect
                            width={WITH_SELECT_SIZE}
                            options={[]}
                            value={org}
                            onChange={() => {}}
                            placeholder={'과세'}
                            placeHolderFontSize={16}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <MyLabel>소득구분</MyLabel>
                    <MySelect
                        width={FULL_SELECT_SIZE}
                        options={[]}
                        value={org}
                        onChange={() => {}}
                        placeholder={'근로 + 사업'}
                        placeHolderFontSize={16}
                    />
                </div>
                <div className="col-4">
                    <MyLabel>자동차 지급제도</MyLabel>
                    <MySelect
                        width={FULL_SELECT_SIZE}
                        options={[]}
                        value={org}
                        onChange={() => {}}
                        placeholder={'S3-2'}
                        placeHolderFontSize={16}
                    />
                </div>
                <div className="col-4">
                    <MyLabel>일반 지급율</MyLabel>
                    <div className="wr-pages-detail__with">
                        <MySelect
                            width={260}
                            options={[]}
                            value={org}
                            onChange={() => {}}
                            placeholder={'기본 + 성과'}
                            placeHolderFontSize={16}
                        />

                        <div className="input-group align-items-center">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="85"
                            />
                            <span className="ms-2">%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <DisconnectedLabel>장기 기본 지급</DisconnectedLabel>
                    <MyTable
                        columns={basicPaymentscolumns}
                        data={basicPayments.data}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <DisconnectedLabel>장기 오버라이드</DisconnectedLabel>
                    <MyTable columns={overridesColumns} data={overrides.data} />
                </div>
            </div>
        </div>
    );
};
