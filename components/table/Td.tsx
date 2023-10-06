import type { FC } from 'react';
import type { Cell } from '@tanstack/react-table';
import { memo } from 'react';
// import { flexRender } from '@tanstack/react-table';
import { MyColumnDef } from '@hooks/use-column';
import { InternalInput } from '@components/input/Internal';
import { checkSeparatorNeeded } from '@utils/validation';
import { isValidOnlyNumPhone } from '@utils/validator/user';
import { convertPhoneNumber } from '@utils/converter';

interface EmptyTdProps {
    colSpan: number;
}

interface MyTdProps extends Cell<any, unknown> {}

export const EmptyTd: FC<EmptyTdProps> = ({ colSpan }) => {
    return <td colSpan={colSpan}>데이터가 없습니다.</td>;
};

export const MyTd: FC<MyTdProps> = memo(({ column, getValue, getContext }) => {
    let className = '';

    // 숫자인 경우 콤마를 사용해 천단위로 나누고, 오른쪽 정렬
    // let isTextEnd =
    //     isNumberic(getValue()) &&
    //     checkSeparatorNeeded(column.id) &&
    //     checkTextAlignRightNeeded(column.id);

    // if (isTextEnd) {
    //     className += 'text-end';
    // }

    let value = getValue() as string;
    // 휴대폰 번호의 경우
    if (typeof value === 'string' && isValidOnlyNumPhone(value)) {
        value = convertPhoneNumber(value);
    }

    if (Number.isInteger(value) && checkSeparatorNeeded(column.id)) {
        className += 'text-end';
    } else {
        className += 'text-start';
    }

    return (
        <td className={className}>
            {value}
            {/* {flexRender(column.columnDef.cell, getContext())} */}
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
