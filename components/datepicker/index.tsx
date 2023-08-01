import type { FC } from 'react';
import type { TypeAttributes } from 'rsuite/esm/@types/common';
import type { UseDatepickerOutput } from '@hooks/use-datepicker';
import { DatePicker } from 'rsuite';

interface Props {
    id: string;
    /**
     * 입력창 크기(sm,md)
     */
    size: TypeAttributes.Size;
    /**
     * Date format
     */
    format?: string;
    placeholder?: string;
    hooks?: UseDatepickerOutput;
    placement?: TypeAttributes.Placement;
    readOnly?: boolean;
    width?: number;
}

export const MyDatepicker: FC<Props> = ({
    id,
    size,
    format = 'yyyy-MM-dd',
    placeholder,
    hooks,
    placement = 'bottomStart',
    readOnly,
    width,
}) => {
    return (
        <DatePicker
            id={id}
            oneTap
            format={format}
            style={{ width: width ? `width: ${width}px` : '100%' }}
            size={size}
            placeholder={placeholder}
            placement={placement}
            readOnly={readOnly}
            {...hooks}
        />
    );
};
