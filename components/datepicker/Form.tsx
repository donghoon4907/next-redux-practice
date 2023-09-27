import type { FC } from 'react';
import type { UseDatepickerOption } from '@hooks/use-datepicker';
import type { MyDatepickerProps } from '.';
import { MyDatepicker } from '.';
import { useDatepicker } from '@hooks/use-datepicker';

interface Props extends MyDatepickerProps {
    defaultValue?: Date | null;
    where?: UseDatepickerOption;
}

export const FormDatepicker: FC<Props> = ({
    where,
    defaultValue = null,
    ...props
}) => {
    const [date] = useDatepicker(defaultValue, where);

    return <MyDatepicker {...props} {...date} />;
};
