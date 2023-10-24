import type { FC } from 'react';
import type { MyDatepickerProps } from '.';
import { useState } from 'react';
import { MyDatepicker } from '.';
import { isEmpty } from '@utils/validator/common';

interface Props extends MyDatepickerProps {
    label: string;
    /**
     * 필수 여부
     *
     */
    isRequired?: boolean;
}

export const FloatDatepicker: FC<Props> = ({
    children,
    label,
    isRequired,
    hooks,
    ...rest
}) => {
    const displayName = 'wr-detail-input';

    const [focus, setFocus] = useState(false);

    const handleEnter = () => {
        setFocus(true);
    };

    const handleExit = () => {
        setFocus(false);
    };

    const isFloat = focus || !isEmpty(hooks?.value);

    return (
        <div
            className={`${displayName}__wrap ${displayName}--datepicker ${
                isFloat ? `${displayName}--active` : ''
            }`}
        >
            <div
                className={`${displayName}__float ${
                    isFloat ? `${displayName}__float--active` : ''
                }`}
            >
                <div
                    className={`${displayName}__label ${
                        isRequired && isFloat ? 'wr-label--required' : ''
                    }`}
                >
                    {label}
                </div>
            </div>
            {isRequired && !isFloat && (
                <div className={`${displayName}__required`}></div>
            )}
            <MyDatepicker
                placeholder={label}
                onEnter={handleEnter}
                onExit={handleExit}
                size="sm"
                hooks={hooks}
                {...rest}
            />
        </div>
    );
};
