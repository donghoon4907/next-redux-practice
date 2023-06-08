import type { ChangeEvent } from 'react';
import { useState, useRef } from 'react';

export enum UseInputWhere {
    NO_SPACE = 'NO_SPACE',
}

export const useInput = (defaultValue: string, where?: UseInputWhere) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        let nextVal = evt.target.value;

        if (where === UseInputWhere.NO_SPACE) {
            nextVal = nextVal.replace(/(^\s*)|(\s*$)/g, '');
        }

        setValue(nextVal);
    };

    return { value, onChange, setValue };
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

export type UseInputType = ReturnType<typeof useInput>;
