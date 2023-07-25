import type { ChangeEvent } from 'react';
import type { CoreSetState } from '@interfaces/core';
import { useState, useRef } from 'react';
import { isNumberic } from '@utils/validation';

interface UseInputOption {
    noSpace?: boolean;
    addComma?: boolean;
    isNumWithHyphen?: boolean;
    limit?: number;
}

export interface UseInputOutput {
    value: string;
    onChange: (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
}

interface UseInputFunction {
    (defaultValue: string, where?: UseInputOption): [
        UseInputOutput,
        CoreSetState<string>,
    ];
}

export const useInput: UseInputFunction = (defaultValue, where = {}) => {
    const [value, setValue] = useState(defaultValue || '');

    const onChange = (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        let nextVal = evt.target.value;

        if (where.noSpace) {
            nextVal = nextVal.replace(/(^\s*)|(\s*$)/g, '');
        }

        if (where.isNumWithHyphen) {
            nextVal = nextVal.replace(/[^0-9\-]/g, '');
        }

        setValue(nextVal);
    };

    return [{ value, onChange }, setValue];
};

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
        const nextVal = noSpaceVal.replace(/,/g, '');
        // 빈 값 업데이트 허용
        if (value === '') {
            setValue('');
            return;
        }

        if (isNumberic(nextVal)) {
            // 글자 수 제한이 있는 경우
            if (where.limit && nextVal.length > where.limit) {
                return;
            }

            setValue(nextVal);
        }
    };

    let output = { value, onChange };

    if (where.addComma) {
        output.value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return [output, setValue];
};

export const useFeedbackInput = (
    defaultValue: string,
    validator: (value: any) => string,
) => {
    const $input = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState(defaultValue);
    // 피드백
    const [feedback, setFeedback] = useState('');
    // 입력창 포커싱 여부
    const [activeFocus, setActiveFocus] = useState(true);
    // 입력창에 초점
    const focusOnInput = () => {
        if ($input.current) {
            $input.current.focus();
        } else {
            console.error(
                '[useFeedbackInput:focusInput - Input reference not found]',
            );
        }
    };
    // blur callback
    const afterBlur = () => {
        setActiveFocus(false);
    };

    const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;

        setValue(value);
        // 입력 중에는 피드백 비활성화
        if (feedback !== '') {
            setFeedback('');
        }
    };

    const onFocus = () => {
        setActiveFocus(true);
    };

    const onBlur = () => {
        setFeedback(validator(value));

        afterBlur();
    };

    const onClear = () => {
        setValue('');

        setFeedback('');

        focusOnInput();
    };

    return {
        inputRef: $input,
        value,
        feedback,
        setFeedback,
        activeFocus,
        onChange,
        onFocus,
        onBlur,
        onClear,
        focusOnInput,
        afterBlur,
        validator,
    };
};
