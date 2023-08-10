import type { FC } from 'react';
import type { TypeAttributes } from 'rsuite/esm/@types/common';
import type { UseDatepickerOutput } from '@hooks/use-datepicker';
import { WithLabel } from '@components/WithLabel';
import { MyDatepicker } from '@components/datepicker';
import { MyButton } from '@components/button';
import { CoreSetState } from '@interfaces/core';

interface Props {
    idPrefix?: string;
    disabled?: boolean;
    dateHooks?: UseDatepickerOutput;
    type?: boolean;
    setType?: CoreSetState<boolean>;
    labelType: 'active' | 'disable';
    size: TypeAttributes.Size;
}

export const BirthDayInput: FC<Props> = ({
    idPrefix = '',
    disabled = false,
    dateHooks,
    type,
    setType,
    labelType,
    size,
}) => {
    const id = idPrefix + 'birthday';

    const handleClickButton = () => {
        setType?.((prev) => !prev);
    };

    return (
        <WithLabel id={id} label="생년월일" type={labelType}>
            <MyDatepicker
                id={id}
                size={size}
                placeholder="생년월일"
                disabled={disabled}
                hooks={dateHooks}
            />
            <div className="wr-with__extension">
                <MyButton
                    className={`${
                        type ? 'btn-primary' : 'btn-secondary'
                    } btn-${size}`}
                    onClick={handleClickButton}
                >
                    {type ? '양력' : '음력'}
                </MyButton>
            </div>
        </WithLabel>
    );
};
