import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import { MyRadio } from '@components/radio';

interface Props {}
// 차량용도
export const CarusageField: FC<Props> = () => {
    // 시작일
    const [caruse, setCaruse] = useState('1');

    const handleChangeCaruse = (evt: ChangeEvent<HTMLInputElement>) => {
        setCaruse(evt.target.value);
    };

    return (
        <>
            {['출퇴근용(영리)', '사업용(비영리)', '종교단체'].map((v, i) => (
                <MyRadio
                    key={`caruse${i}`}
                    id={`caruse${i}`}
                    name="caruse"
                    label={v}
                    value={i + 1}
                    onChange={handleChangeCaruse}
                    checked={caruse === `${i + 1}`}
                />
            ))}
        </>
    );
};
