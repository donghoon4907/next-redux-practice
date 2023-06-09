import type { FC, InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}
/**
 * 기본 입력창 컴포넌트
 *
 */
export const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
    (props, ref) => {
        // const describedbyId = `${id}-addon`;

        return (
            <div className="input-group">
                <input
                    ref={ref}
                    className="form-control"
                    // aria-describedby={feedback ? describedbyId : ''}
                    {...props}
                />
            </div>
        );
    },
);
