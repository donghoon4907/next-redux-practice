import type { FC } from 'react';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useSelect } from '@hooks/use-select';
import carConstants from '@constants/options/car';
import { MySelect } from '@components/select';
import { isNumberic } from '@utils/validation';
import { CoreSelectOption } from '@interfaces/core';
import { isEmpty } from '@utils/validator/common';
import { MyInput } from '@components/input';

interface Props {}
// 차량번호 입력
export const FormCarnums: FC<Props> = () => {
    // 지역
    const [locale, setLocale] = useSelect(carConstants.locale, undefined, {
        callbackOnChange: (nextVal) => {
            if (nextVal) {
                syncDirect(nextVal, type.value, usage.value!, num.value);
            }
        },
    });
    // 차종
    const [type, setType] = useNumbericInput('', {
        maxLength: 3,
        isFirstZero: true,
        callbackOnChange: (nextVal) => {
            if (typeof nextVal === 'string') {
                syncDirect(locale.value, nextVal, usage.value!, num.value);
            }
        },
    });
    // 용도
    const [usage, setUsage] = useSelect(carConstants.usage, undefined, {
        callbackOnChange: (nextVal) => {
            if (nextVal) {
                syncDirect(locale.value, type.value, nextVal, num.value);
            }
        },
    });
    // 등록 번호
    const [num, setNum] = useNumbericInput('', {
        maxLength: 4,
        isFirstZero: true,
        callbackOnChange: (nextVal) => {
            if (typeof nextVal === 'string') {
                syncDirect(locale.value, type.value, usage.value, nextVal);
            }
        },
    });
    // 차량 번호 - 직접입력
    const [direct, setDirectCarNum] = useInput('');

    const handleBlurDirectCarNum = () => {
        // 입력을 하지 않은 경우
        if (direct.value === '') {
            return;
        }
        // 차량번호 정규식(지역 포함, 미포함)
        const regex = [
            /^([가-힣]{2})([0-9]{2,3})([가-힣]{1})([0-9]{4})$/,
            /^([0-9]{2,3})([가-힣]{1})([0-9]{4})$/,
        ];

        let feedback = null;
        let nextLocale: CoreSelectOption | null = null;
        let nextType: string | null = null;
        let nextUsage: CoreSelectOption | null = null;
        let nextRegiNum: string | null = null;
        // 정규식 매칭 여부
        let isMatch = false;
        for (let i = 0; i < regex.length; i++) {
            const matches = regex[i].exec(direct.value);

            if (matches) {
                isMatch = true;

                let inputLocale = '';
                let inputType = '';
                let inputUsage = '';
                let inputRegiNum = '';
                if (i === 0) {
                    [, inputLocale, inputType, inputUsage, inputRegiNum] =
                        matches;

                    const findIndex = carConstants.locale.findIndex(
                        (v) => v.label === inputLocale,
                    );

                    if (findIndex === -1) {
                        feedback = '허용되지 않은 지역을 입력하였습니다.';

                        break;
                    } else {
                        nextLocale = carConstants.locale[findIndex];
                    }
                } else if (i === 1) {
                    [, inputType, inputUsage, inputRegiNum] = matches;
                }

                if (isNumberic(inputType)) {
                    nextType = inputType;
                } else {
                    feedback = '차종을 확인하세요';

                    break;
                }
                const findIndex = carConstants.usage.findIndex(
                    (v) => v.label === inputUsage,
                );
                if (findIndex === -1) {
                    feedback = '허용되지 않은 용도를 입력하였습니다.';

                    break;
                } else {
                    nextUsage = carConstants.usage[findIndex];
                }

                if (isNumberic(inputRegiNum)) {
                    nextRegiNum = inputRegiNum;
                } else {
                    feedback = '등록번호를 확인하세요';

                    break;
                }

                break;
            }
        }

        if (!isMatch || feedback !== null) {
            alert('차량번호를 확인하세요.');
            console.log(feedback);
        } else {
            if (nextLocale) {
                setLocale(nextLocale);
            }

            if (nextType) {
                setType(nextType);
            }

            if (nextUsage) {
                setUsage(nextUsage);
            }

            if (nextRegiNum) {
                setNum(nextRegiNum);
            }
        }
    };

    const syncDirect = (
        carLocale: CoreSelectOption | null,
        carType: string,
        carUsage: CoreSelectOption | null,
        carRegiNum: string,
    ) => {
        let localeTxt = '';
        if (carLocale && carLocale.value !== '00') {
            localeTxt = carLocale.label;
        }

        let carTypeTxt = '';
        if (!isEmpty(carType)) {
            carTypeTxt = carType;
        }

        let carUsageTxt = '';
        if (carUsage && carUsage.value !== '00') {
            carUsageTxt = carUsage.label;
        }

        let carRegiNumTxt = '';
        if (!isEmpty(carRegiNum)) {
            carRegiNumTxt = carRegiNum;
        }

        setDirectCarNum(localeTxt + carTypeTxt + carUsageTxt + carRegiNumTxt);
    };

    return (
        <>
            <div
                style={{
                    width: 100,
                }}
            >
                <MySelect inputId="carnum1" {...locale} />
            </div>

            <div
                style={{
                    width: 55,
                }}
            >
                <MyInput
                    name="carnum2"
                    placeholder=""
                    pattern="[0-9]{2,3}"
                    {...type}
                />
            </div>
            <div style={{ width: 100 }}>
                <MySelect inputId="carnum3" {...usage} />
            </div>

            <div
                style={{
                    width: 65,
                }}
            >
                <MyInput
                    name="carnum4"
                    placeholder=""
                    pattern="[0-9]{4}"
                    {...num}
                />
            </div>
            <div
                style={{
                    width: 150,
                }}
            >
                <MyInput
                    id="carnum"
                    name="carnum"
                    placeholder="직접입력"
                    onBlur={handleBlurDirectCarNum}
                    {...direct}
                />
            </div>
        </>
    );
};
