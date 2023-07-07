import type { ChangeEvent } from 'react';
import type { CoreSetState } from '@interfaces/core';
import { useState, useRef } from 'react';
import { isNumberic } from '@utils/validation';

export interface UseInputOption {
    noSpace?: boolean;
    includeSetState?: boolean;
    addComma?: boolean;
}

export type UseInputOutput = {
    value: string;
    onChange: (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    setValue?: CoreSetState<string>;
};

export const useInput = (defaultValue: string, where: UseInputOption = {}) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        let nextVal = evt.target.value;

        if (where.noSpace) {
            nextVal = nextVal.replace(/(^\s*)|(\s*$)/g, '');
        }

        if (where.addComma) {
            nextVal = nextVal.replace(/,/g, '');
            if (!isNumberic(nextVal)) {
                return;
            }
        }

        setValue(nextVal);
    };

    let output: UseInputOutput = { value, onChange };

    if (where.includeSetState) {
        output.setValue = setValue;
    }

    if (where.addComma) {
        output.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return output;
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
