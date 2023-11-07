import type { ChangeEvent } from 'react';
import type { CoreSetState } from '@interfaces/core';
import { useState } from 'react';
import { isNumberic } from '@utils/validation';
import { convertPhoneNumber, convertResidentNumber } from '@utils/converter';

export interface UseInputOption {
    /**
     * 스페이스 허용 여부
     */
    noSpace?: boolean;
    /**
     * 콤마 허용 여부
     */
    addComma?: boolean;
    /**
     * 숫자 및 - 허용 여부
     */
    // isNumWithHyphen?: boolean;
    /**
     * 글자수 제한
     */
    maxLength?: number;
    /**
     * 첫 번째 자리 0 허용
     */
    isFirstZero?: boolean;
    /**
     * callback
     */
    callbackOnChange?: (nextVal?: string) => void;
    // callbackOnFocus?: () => void;
    callbackOnBlur?: (convertedVal: string) => void;
    /**
     * before condition
     */
    beforeOnChangeCondition?: (nextVal: string) => boolean;
}

export interface UseInputOutput {
    value: string;
    onChange: (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    maxLength?: number;
    onBlur?: () => void;
    onFocus?: () => void;
}

interface UseInputFunction {
    (defaultValue: string, where?: UseInputOption): [
        UseInputOutput,
        CoreSetState<string>,
    ];
}
/**
 * 기본 입력 hooks
 */
export const useInput: UseInputFunction = (defaultValue, where = {}) => {
    const [value, setValue] = useState(defaultValue || '');

    const onChange = (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        let nextVal = evt.target.value;

        if (where.noSpace) {
            nextVal = nextVal.replace(/\s/g, '');
        }

        // if (where.isNumWithHyphen) {
        //     nextVal = nextVal.replace(/[^0-9\-]/g, '');
        // }

        if (where.hasOwnProperty('beforeOnChangeCondition')) {
            if (where.beforeOnChangeCondition!(nextVal)) {
                setValue(nextVal);
            } else {
                return;
            }
        } else {
            setValue(nextVal);
        }

        where.callbackOnChange?.(nextVal);
    };

    const onBlur = () => {
        where.callbackOnBlur?.(value);
    };

    let output: UseInputOutput = { value, onChange, onBlur };

    if (where.maxLength) {
        output.maxLength = where.maxLength;
    }

    return [output, setValue];
};
/**
 * 숫자 입력 hooks
 */
export const useNumbericInput: UseInputFunction = (
    defaultValue,
    where = {},
) => {
    const [value, setValue] = useState(defaultValue || '');

    const onChange = (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { value } = evt.target;
        // 공백 제거
        const noSpaceVal = value.replace(/(^\s*)|(\s*$)/g, '');
        // 콤마 제거
        let nextVal = noSpaceVal.replace(/,/g, '');

        // 빈 값 업데이트 허용
        if (value === '') {
            setValue(value);
        } else {
            // 두자리 이상인 경우
            if (nextVal.length > 1) {
                if (!where.isFirstZero) {
                    // 첫 번째 0 제거
                    if (nextVal.charAt(0) === '0') {
                        nextVal = nextVal.substring(1);
                    }
                }
            }

            if (isNumberic(nextVal)) {
                // 글자 수 제한이 있는 경우
                // if (where.limit && nextVal.length > where.limit) {
                //     return alert(`${where.limit}자 이상 입력할 수 없습니다.`);
                // }

                setValue(nextVal);
            }
        }

        where.callbackOnChange?.(nextVal);
    };

    const onBlur = () => {
        const converted = value.replace(/,/g, '');

        where.callbackOnBlur?.(converted);
    };

    let output: UseInputOutput = { value, onChange, onBlur };

    if (where.addComma) {
        output.value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (where.maxLength) {
        output.maxLength = where.maxLength;
    }

    return [output, setValue];
};
/**
 * 전화번호 입력 hooks
 */
export const usePhoneInput: UseInputFunction = (defaultValue, where = {}) => {
    const [value, setValue] = useState(
        defaultValue ? convertPhoneNumber(defaultValue) : '',
    );

    const onChange = (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { value } = evt.target;
        // 공백 제거
        const nextVal = value.replace(/(^\s*)|(\s*$)/g, '');

        // 빈 값 업데이트 허용
        if (value === '') {
            setValue(value);
        } else {
            if (isNumberic(nextVal)) {
                setValue(nextVal);
            }
        }

        where.callbackOnChange?.(nextVal);
    };

    const onFocus = () => {
        setValue((prev) => prev.replace(/\-/g, ''));
    };

    const onBlur = () => {
        const converted = convertPhoneNumber(value);

        setValue(converted);

        where.callbackOnBlur?.(converted);
    };

    let output: UseInputOutput = {
        value,
        onChange,
        onFocus,
        onBlur,
        maxLength: 11,
    };

    return [output, setValue];
};
/**
 * 주민번호 입력 hooks
 */
export const useResidentNumberInput: UseInputFunction = (
    defaultValue,
    where = {},
) => {
    const [value, setValue] = useState(
        defaultValue ? convertResidentNumber(defaultValue) : '',
    );

    const onChange = (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { value } = evt.target;
        // 공백 제거
        const nextVal = value.replace(/(^\s*)|(\s*$)/g, '');

        // 빈 값 업데이트 허용
        if (value === '') {
            setValue(value);
        } else {
            if (isNumberic(nextVal)) {
                setValue(nextVal);
            }
        }

        where.callbackOnChange?.(nextVal);
    };

    const onFocus = () => {
        setValue((prev) => prev.replace(/\-/g, ''));
    };

    const onBlur = () => {
        // 마지막 자리의 경우 자리수에 상관없이 -가 생기도록
        const converted = convertResidentNumber(value);

        setValue(converted);

        where.callbackOnBlur?.(converted);
    };

    let output: UseInputOutput = {
        value,
        onChange,
        onFocus,
        onBlur,
        maxLength: 13,
    };

    return [output, setValue];
};
