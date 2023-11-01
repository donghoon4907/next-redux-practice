import type { FC, InputHTMLAttributes, FocusEvent } from 'react';
import { useState, ReactNode } from 'react';
import { LuSearch } from 'react-icons/lu';
import { isEmpty } from '@utils/validator/common';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    /**
     * 단위 표시
     */
    unit?: string;
    /**
     * 숫자형 여부
     */
    isNumber?: boolean;
    /**
     * 필수 여부
     *
     */
    isRequired?: boolean;
    /**
     * 입력창 이전 컴포넌트 추가
     */
    before?: ReactNode;
    /**
     * 입력창 이후 컴포넌트 추가
     */
    after?: ReactNode;
}

export const FloatInput: FC<Props> = ({
    label,
    unit,
    isNumber,
    isRequired,
    onFocus,
    onBlur,
    before,
    after,
    ...rest
}) => {
    const displayName = 'wr-detail-input';

    const [focus, setFocus] = useState(false);

    const handleFocus = (evt: FocusEvent<HTMLInputElement>) => {
        setFocus(true);

        onFocus?.(evt);
    };

    const handleBlur = (evt: FocusEvent<HTMLInputElement>) => {
        setFocus(false);

        onBlur?.(evt);
    };

    const isFloat = focus || rest.value || rest.defaultValue;

    return (
        <div
            className={`${displayName}__wrap ${
                after ? `${displayName}--after` : ''
            } ${isFloat ? `${displayName}--active` : ''}`}
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
            <div className={`${displayName}__both`}>
                {before}
                <input
                    className={`${displayName} ${
                        isFloat && isNumber ? 'text-end' : ''
                    } ${isFloat ? `${displayName}--active` : ''}`}
                    placeholder={label}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...rest}
                />
                {after}
            </div>
        </div>
    );
};
