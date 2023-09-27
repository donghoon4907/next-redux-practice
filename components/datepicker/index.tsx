import type { FC } from 'react';
import type { TypeAttributes } from 'rsuite/esm/@types/common';
import type { UseDatepickerOutput } from '@hooks/use-datepicker';
import { DatePicker } from 'rsuite';
import dayjs from 'dayjs';

export interface MyDatepickerProps {
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
    disabled?: boolean;
    width?: number;
    onBlur?: () => void;
    shouldDisableDate?: (date: Date) => boolean;
    cleanable?: boolean;
}

export const MyDatepicker: FC<MyDatepickerProps> = ({
    id,
    size,
    format = 'yyyy-MM-dd',
    placeholder,
    hooks,
    placement = 'bottomStart',
    readOnly,
    disabled,
    width,
    onBlur,
    shouldDisableDate,
    cleanable = true,
}) => {
    return (
        <>
            <DatePicker
                id={id}
                oneTap
                format={format}
                style={{
                    width: width ? `width: ${width}px` : '100%',
                }}
                size={size}
                placeholder={placeholder}
                placement={placement}
                readOnly={readOnly}
                disabled={disabled}
                onBlur={onBlur}
                shouldDisableDate={shouldDisableDate}
                cleanable={cleanable}
                {...hooks}
            />
            {hooks && (
                <input
                    type="hidden"
                    name={id}
                    value={
                        hooks.value
                            ? dayjs(hooks.value).format('YYYY-MM-DD')
                            : ''
                    }
                />
            )}
        </>
    );
};
