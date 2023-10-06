import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MyButton } from '@components/button';
import carConstants from '@constants/options/car';
import {
    birthdayToInternationalAge,
    residentNumToBirthday,
} from '@utils/calculator';
import { FormInput, FormResidentNumberInput } from '@components/input/Form';
import { FormSelect } from '@components/select/Form';

import { CarnumField } from './CarnumField';
import { CarusageField } from './CarusageField';
import { CardateField } from './CardateField';

interface Props {}
// 고객기본정보
export const FormCarCustomer: FC<Props> = () => {
    const displayName = 'wr-pages-compare-car';

    const { carUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );
    // 주민번호 피드백
    const [juminFeedback, setJuminFeedback] = useState('');

    const handleBlurJumin = (convertedVal: string) => {
        const _jumin = convertedVal.replace(/-/g, '');

        let message = '';
        if (_jumin.length === 13) {
            // 주민번호 뒷자리가 1자리의 숫자인지 검증
            const birthday = residentNumToBirthday(_jumin);

            const age = birthdayToInternationalAge(new Date(birthday));

            let gender;
            if (parseInt(_jumin.charAt(6)) % 2 === 0) {
                gender = '여성';
            } else {
                gender = '남성';
            }

            message = `(만 ${age}세 ${gender})`;
        } else {
            message = '주민번호 앞자리를 확인하세요';
        }

        setJuminFeedback(message);
    };

    return (
        <div className="wr-table--normal">
            <table className="wr-table table">
                <colgroup>
                    <col width="130px" className={`${displayName}__label`} />
                    <col width="570px" />
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan={2}>
                            <span>고객기본정보</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <label
                                htmlFor="jumin"
                                className="wr-label--required"
                            >
                                주민번호
                            </label>
                        </td>
                        <td>
                            <div className={`${displayName}__description`}>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <FormResidentNumberInput
                                        id="jumin"
                                        name="jumin"
                                        placeholder="주민번호"
                                        where={{
                                            callbackOnBlur: handleBlurJumin,
                                        }}
                                    />
                                </div>
                                <div>
                                    <strong>{juminFeedback}</strong>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="carnum">차량번호</label>
                        </td>
                        <td>
                            <div className={`${displayName}__description`}>
                                <CarnumField />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label
                                className="wr-label--required"
                                htmlFor="idate"
                            >
                                가입예정일
                            </label>
                        </td>
                        <td>
                            <div className={`${displayName}__description`}>
                                <CardateField />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>개발원조회</span>
                        </td>
                        <td className="position-relative">
                            <div className="wr-pages-detail__lock">
                                <p>준비 중입니다.</p>
                            </div>
                            <div className={`${displayName}__description`}>
                                <MyButton className="btn-warning btn-sm">
                                    현대
                                </MyButton>
                                <MyButton className="btn-warning btn-sm">
                                    DB(신규)
                                </MyButton>
                                <MyButton className="btn-warning btn-sm">
                                    DB(갱신)
                                </MyButton>
                                <MyButton className="btn-warning btn-sm">
                                    메리츠
                                </MyButton>
                                <MyButton className="btn-warning btn-sm">
                                    KB
                                </MyButton>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label
                                className="wr-label--required"
                                htmlFor="name"
                            >
                                고객명
                            </label>
                        </td>
                        <td>
                            <div className={`${displayName}__description`}>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <FormInput
                                        id="name"
                                        name="name"
                                        placeholder="고객명"
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="wr-label--required">차량용도</span>
                        </td>
                        <td>
                            <div className={`${displayName}__description`}>
                                <CarusageField />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label
                                className="wr-label--required"
                                htmlFor="carfamily"
                            >
                                가족한정
                            </label>
                        </td>
                        <td>
                            <div className={`${displayName}__description`}>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <FormSelect
                                        inputId="carfamily"
                                        options={carConstants.family}
                                        defaultValue={carConstants.family[0]}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="drate">
                                        <strong>어린이특약</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <FormSelect
                                        inputId="drate"
                                        options={carConstants.dDist}
                                        defaultValue={carConstants.dDist[0]}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label
                                className="wr-label--required"
                                htmlFor="carage"
                            >
                                운전자연령
                            </label>
                        </td>
                        <td>
                            <div className={`${displayName}__description`}>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <FormSelect
                                        inputId="carage"
                                        options={carConstants.minAge}
                                        defaultValue={carConstants.minAge[6]}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="divide_num">납입방법</label>
                        </td>
                        <td>
                            <div className={`${displayName}__description`}>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <FormSelect
                                        inputId="divide_num"
                                        options={carConstants.payMethod}
                                        defaultValue={carConstants.payMethod[0]}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="mul_sago">물적사고할증</label>
                        </td>
                        <td>
                            <div className={`${displayName}__description`}>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <FormSelect
                                        inputId="mul_sago"
                                        options={carConstants.mSago}
                                        defaultValue={carConstants.mSago[3]}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="pre_com">전보험사</label>
                        </td>
                        <td>
                            <div className={`${displayName}__description`}>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <FormSelect
                                        inputId="pre_com"
                                        options={carUseCompanies}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="pre_num">
                                        <strong>전계약 NO</strong>
                                    </label>
                                </div>
                                <div
                                    style={{
                                        width: 150,
                                    }}
                                >
                                    <FormInput
                                        id="pre_num"
                                        name="pre_num"
                                        placeholder="전계약번호"
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
