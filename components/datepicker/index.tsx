import type { FC } from 'react';
import type { PickerBaseProps } from 'rsuite/esm/@types/common';
import type { UseDatepickerOutput } from '@hooks/use-datepicker';
import { DatePicker } from 'rsuite';
import dayjs from 'dayjs';

export interface MyDatepickerProps extends PickerBaseProps {
    id: string;
    /**
     * Date format
     */
    format?: string;
    hooks?: UseDatepickerOutput;
    width?: number;
    onBlur?: () => void;
    shouldDisableDate?: (date: Date) => boolean;
}

export const MyDatepicker: FC<MyDatepickerProps> = ({
    id,
    format = 'yyyy-MM-dd',
    placeholder,
    hooks,
    disabled,
    width,
    onBlur,
    shouldDisableDate,
    ...rest
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
                placeholder={placeholder}
                disabled={disabled}
                shouldDisableDate={shouldDisableDate}
                {...rest}
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
