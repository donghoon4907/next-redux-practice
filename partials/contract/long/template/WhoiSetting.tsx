import type { FC, ChangeEvent } from 'react';
import type { CoreSetState } from '@interfaces/core';
import { useState, useEffect } from 'react';
import { useNumbericInput } from '@hooks/use-input';
import { MyInput } from '@components/input';
import { MyRadio } from '@components/radio';

const DATA = [
    {
        label: '전체',
        value: '1,999',
    },
    {
        label: '초회',
        value: '1,1',
    },
    {
        label: '초년도',
        value: '1,12',
    },
    {
        label: '2차년도',
        value: '13,24',
    },
    {
        label: '3차년도',
        value: '25,36',
    },
];

interface Props {
    title?: string;
    setTitle?: CoreSetState<string>;
    setOpen?: CoreSetState<boolean>;
}

export const LongWhoiSettingTemplate: FC<Props> = ({
    title,
    setTitle,
    setOpen,
}) => {
    const displayName = 'whoi-popup';

    // 직접입력 1
    const [whoi1, setWhoi1] = useNumbericInput('', {
        callbackOnChange: () => {
            setPreset('');
        },
    });
    // 직접입력 2
    const [whoi2, setWhoi2] = useNumbericInput('', {
        callbackOnChange: () => {
            setPreset('');
        },
    });

    const [preset, setPreset] = useState('1,999');

    const handleChangePreset = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;

        const [_whoi1, _whoi2] = value.split(',');

        setWhoi1(_whoi1);

        setWhoi2(_whoi2);

        setPreset(value);
    };

    const handleSubmit = () => {
        setTitle?.(`${whoi1.value}~${whoi2.value}`);

        setOpen?.(false);
    };

    useEffect(() => {
        if (title) {
            const [_whoi1, _whoi2] = title.split('~');

            setWhoi1(_whoi1);

            setWhoi2(_whoi2);

            setPreset(`${_whoi1},${_whoi2}`);
        }
    }, [title]);

    return (
        <div className={`${displayName}__wrap`}>
            <div className={`${displayName}__settings`}>
                <div className={`${displayName}__direct`}>
                    <span className={`wr-pages-list2__label`}>직접입력</span>
                    <div className={`${displayName}__directinput`}>
                        <div style={{ width: 50 }}>
                            <MyInput id="whoi1" {...whoi1} />
                        </div>
                        <div>~</div>
                        <div style={{ width: 50 }}>
                            <MyInput id="whoi2" {...whoi2} />
                        </div>
                    </div>
                </div>
                <div className={`${displayName}__presets`}>
                    {DATA.map((v, i) => (
                        <div
                            className={`${displayName}__preset`}
                            key={`whoiPreset${i}`}
                        >
                            <MyRadio
                                id={`whoi_preset${i}`}
                                value={v.value}
                                label={v.label}
                                onChange={handleChangePreset}
                                checked={preset === v.value}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <hr className={`${displayName}__divider`} />
            <div className={`${displayName}__submit`}>
                <button
                    type="button"
                    className={`${displayName}__button`}
                    onClick={handleSubmit}
                >
                    적용
                </button>
            </div>
        </div>
    );
};
