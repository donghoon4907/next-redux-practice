import type { FC } from 'react';
import type { Cell } from '@tanstack/react-table';
import { memo } from 'react';
import { MyColumnDef } from '@hooks/use-column';
import { InternalInput } from '@components/input/Internal';
import { isValidOnlyNumPhone } from '@utils/validator/user';
import { convertPhoneNumber } from '@utils/converter';
import { checkOrginNeeded, checkTextAlignLeftNeeded } from '@utils/validation';

interface EmptyTdProps {
    colSpan: number;
}

interface MyTdProps extends Cell<any, unknown> {}

export const EmptyTd: FC<EmptyTdProps> = ({ colSpan }) => {
    return <td colSpan={colSpan}>데이터가 없습니다.</td>;
};

export const MyTd: FC<MyTdProps> = memo(({ column, getValue, getContext }) => {
    let className = '';

    let value = getValue() as any;
    // 휴대폰 번호의 경우
    if (
        typeof value === 'string' &&
        isValidOnlyNumPhone(value) &&
        !checkOrginNeeded(column.id)
    ) {
        value = convertPhoneNumber(value);
    }
    // 정수형 데이터의 경우 오른쪽 정렬 및 천단위 구분
    // 문자형 데이터의 경우 왼쪽 정렬
    if (Number.isInteger(value)) {
        className += 'text-end';

        value = Number(value).toLocaleString();
    } else {
        if (checkTextAlignLeftNeeded(column.id)) {
            className += 'text-start';
        }
    }

    if (typeof value === 'boolean') {
        if (value) {
            value = 'Y';
        } else {
            value = 'N';
        }
    }

    return (
        <td className={className} title={value}>
            {value}
        </td>
    );
});

export const AdditionalTd: FC<MyColumnDef> = ({ headerKey, headerText }) => {
    return (
        <td data-field={headerKey}>
            <InternalInput placeholder={headerText} />
        </td>
    );
};
