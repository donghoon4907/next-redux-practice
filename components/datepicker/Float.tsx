import type { FC } from 'react';
import type { MyDatepickerProps } from '.';
import { useState, ReactNode } from 'react';
import { isEmpty } from '@utils/validator/common';

import { MyDatepicker } from '.';

interface Props extends MyDatepickerProps {
    label: string;
    /**
     * 단위 표시
     */
    unit?: string;
    /**
     * 필수 여부
     *
     */
    isRequired?: boolean;
    /**
     * 입력창 이후 컴포넌트 추가
     */
    after?: ReactNode;
}

export const FloatDatepicker: FC<Props> = ({
    children,
    label,
    unit,
    isRequired,
    hooks,
    after,
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

            {after}
        </div>
    );
};
