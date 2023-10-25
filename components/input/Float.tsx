import type { FC, InputHTMLAttributes, FocusEvent } from 'react';
import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { isEmpty } from '@utils/validator/common';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    /**
     * 필수 여부
     *
     */
    isRequired?: boolean;
    /**
     * 검색이벤트 추가, 아이콘 활성화
     *
     */
    onSearch?: () => void;
}

export const FloatInput: FC<Props> = ({
    label,
    isRequired,
    onSearch,
    onFocus,
    onBlur,
    value,
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

    const isFloat = focus || !isEmpty(value);

    return (
        <div
            className={`${displayName}__wrap ${
                onSearch ? `${displayName}--search` : ''
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
                <input
                    className={`${displayName} ${
                        isFloat && `${displayName}--active`
                    }`}
                    placeholder={label}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={value}
                    {...rest}
                />
                {onSearch && (
                    <button
                        type="button"
                        className={`${displayName}__button`}
                        onClick={onSearch}
                    >
                        <LuSearch size={18} />
                        <span className="visually-hidden">검색</span>
                    </button>
                )}
            </div>
        </div>
    );
};
