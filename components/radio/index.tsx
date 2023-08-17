import type { FC, InputHTMLAttributes } from 'react';

export interface MyRadioProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * 라디오 버튼 설명, 라디오 버튼 기준 오른쪽에 위치
     */
    label: string;
}

export const MyRadio: FC<MyRadioProps> = ({ id, label, ...rest }) => {
    return (
        <div className="wr-radio form-check">
            <input
                className="form-check-input wr-radio--adjust"
                type="radio"
                id={id}
                {...rest}
            />
            {label && (
                <label className="form-check-label ms-1" htmlFor={id}>
                    {label}
                </label>
            )}
        </div>
    );
};
