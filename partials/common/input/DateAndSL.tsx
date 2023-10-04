import type { FC } from 'react';
import type { TypeAttributes } from 'rsuite/esm/@types/common';
import type { UseDatepickerOutput } from '@hooks/use-datepicker';
import { WithLabel } from '@components/WithLabel';
import { MyDatepicker } from '@components/datepicker';
import { MyButton } from '@components/button';
import { CoreSetState } from '@interfaces/core';

interface Props {
    id: string;
    label: string;
    disabled?: boolean;
    dateHooks?: UseDatepickerOutput;
    type?: boolean;
    setType?: CoreSetState<boolean>;
    labelType: 'active' | 'disable';
    size: TypeAttributes.Size;
}

export const DateAndSLInput: FC<Props> = ({
    id,
    label,
    disabled = false,
    dateHooks,
    type,
    setType,
    labelType,
    size,
}) => {
    const handleClickButton = () => {
        setType?.((prev) => !prev);
    };

    return (
        <WithLabel id={id} label={label} type={labelType}>
            <MyDatepicker
                id={id}
                size={size}
                placeholder={label}
                disabled={disabled}
                hooks={dateHooks}
            />
            <div className="wr-with__extension">
                <MyButton
                    className={`${
                        type ? 'btn-primary' : 'btn-secondary'
                    } btn-${size}`}
                    onClick={handleClickButton}
                    disabled={disabled}
                >
                    {type ? '양력' : '음력'}
                </MyButton>
            </div>
        </WithLabel>
    );
};
