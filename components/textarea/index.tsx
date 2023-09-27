import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

export interface MyTextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const MyTextarea = forwardRef<HTMLTextAreaElement, MyTextareaProps>(
    (props, ref) => {
        return <textarea ref={ref} {...props} />;
    },
);
