import type { FC } from 'react';
import type { TypeAttributes } from 'rsuite/esm/@types/common';
import type { UseDateRangepickerOutput } from '@hooks/use-datepicker';
import { DateRangePicker } from 'rsuite';
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
    hooks?: UseDateRangepickerOutput;
    placement?: TypeAttributes.Placement;
    readOnly?: boolean;
    disabled?: boolean;
    width?: number;
    onBlur?: () => void;
    shouldDisableDate?: (date: Date) => boolean;
    cleanable?: boolean;
    ranges?: { label: string; value: [Date, Date] }[];
}

export const MyDateRangepicker: FC<MyDatepickerProps> = ({
    id,
    size,
    format = 'yyyy-MM-dd',
    placeholder,
    hooks,
    placement = 'autoVerticalStart',
    readOnly,
    disabled,
    width,
    onBlur,
    shouldDisableDate,
    cleanable = true,
    ranges,
}) => {
    return (
        <>
            <DateRangePicker
                id={id}
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
                ranges={ranges}
                {...hooks}
            />
            {hooks && (
                <input
                    type="hidden"
                    name={id}
                    value={
                        hooks.value !== null
                            ? hooks.value
                                  .map((v) => dayjs(v).format('YYYY-MM-DD'))
                                  .join(',')
                            : ''
                    }
                />
            )}
        </>
    );
};
