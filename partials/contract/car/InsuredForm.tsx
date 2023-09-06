import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { WithLabel } from '@components/WithLabel';
import { useInput, useResidentNumberInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { createInsured } from '@actions/contract/common/set-insured.action';
import { generateIndex } from '@utils/generate';
import { isEmpty } from '@utils/validator/common';
import { useSelect } from '@hooks/use-select';
import carConstants from '@constants/options/car';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyInput } from '@components/input';
import { MyDatepicker } from '@components/datepicker';
import { MyButton } from '@components/button';
import {
    birthdayToInternationalAge,
    residentNumToBirthday,
} from '@utils/calculator';
import { isNumberic } from '@utils/validation';

interface Props {}

export const CarInsuredForm: FC<Props> = () => {
    const dispatch = useDispatch();

    const { insureds } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );
    // 관계
    const [relation, setRelation] = useSelect(carConstants.relation);
    // 이름
    const [name, setName] = useInput('');
    // 생년월일
    const [birthday, setBirthday] = useDatepicker(null);
    // 성별
    const [gender, setGender] = useState(true);
    // 주민번호
    const [jumin, setJumin] = useResidentNumberInput('', {
        callbackOnBlur: (val) => {
            const [_, after] = val.split('-');

            if (isNumberic(after)) {
                setGender(+after[0] % 2 === 1 ? true : false);
            }
        },
    });

    const isMain = insureds.length === 0;
    // 만 나이 계산
    let age = '';
    if (isMain) {
        if (jumin.value.length > 7) {
            const birthday = new Date(
                residentNumToBirthday(jumin.value.replace(/-/g, '')),
            );

            age = birthdayToInternationalAge(birthday).toString();
        }
    } else {
        if (birthday.value) {
            age = birthdayToInternationalAge(birthday.value).toString();
        }
    }

    const handleClickGender = () => {
        setGender((prevState) => !prevState);
    };

    const handleCreatePerson = () => {
        if (isEmpty(name.value)) {
            return alert('이름을 입력하세요');
        }

        if (isMain) {
            // 주민번호 검증 - 포함
            if (jumin.value.length !== 14) {
                return alert('주민번호를 확인하세요');
            }
        }

        dispatch(
            createInsured({
                index: generateIndex(insureds),
                checked: false,
                relation: relation.value!.value,
                name: name.value,
                birthday: birthday.value
                    ? dayjs(birthday.value).format('YYYY-MM-DD')
                    : '',
                sex: gender ? '남' : '여',
                dist: isMain ? '주피보험자' : '피보험자',
                jumin: isMain ? jumin.value.replace(/-/g, '') : undefined,
                age,
            }),
        );

        handleClear();
    };

    const handleClear = () => {
        setRelation(carConstants.relation[0]);
        setName('');
        setBirthday(null);
        setGender(true);
        setJumin('');
    };

    return (
        <div className="wr-pages-detail__content">
            <div className="wr-pages-detail__subtitle">
                <strong>{insureds.length === 0 && '주'}피보험자 추가</strong>
            </div>
            <div className="row">
                <div className="col-6">
                    <WithLabel id="prelation" label="관계" type="active">
                        <MySelect
                            inputId="prelation"
                            placeHolderFontSize={16}
                            height={variables.detailFilterHeight}
                            {...relation}
                        />
                    </WithLabel>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <WithLabel id="pname" label="이름" type="active">
                            <MyInput
                                type="text"
                                id="pname"
                                placeholder="이름"
                                {...name}
                            />
                        </WithLabel>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-6">
                    {insureds.length === 0 && (
                        <WithLabel id="pjumin" label="주민번호" type="active">
                            <MyInput
                                type="text"
                                id="pjumin"
                                placeholder="주민번호"
                                {...jumin}
                            />
                            <div
                                className="wr-with__extension"
                                style={{ width: 40 }}
                            >
                                <MyButton
                                    className={`btn-md btn-${
                                        gender ? 'primary' : 'danger'
                                    }`}
                                    onClick={handleClickGender}
                                    style={{ width: 40 }}
                                >
                                    {gender ? '남' : '여'}
                                </MyButton>
                            </div>
                        </WithLabel>
                    )}
                    {insureds.length !== 0 && (
                        <WithLabel
                            id="pbirthday"
                            label="생년월일"
                            type="active"
                        >
                            <MyDatepicker
                                id="pbirthday"
                                size="md"
                                placeholder="생년월일"
                                hooks={birthday}
                            />
                            <div
                                className="wr-with__extension"
                                style={{ width: 40 }}
                            >
                                <MyButton
                                    className={`btn-md btn-${
                                        gender ? 'primary' : 'danger'
                                    }`}
                                    onClick={handleClickGender}
                                    style={{ width: 40 }}
                                >
                                    {gender ? '남' : '여'}
                                </MyButton>
                            </div>
                        </WithLabel>
                    )}
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <WithLabel label="만 나이" type="active">
                            <MyInput
                                type="text"
                                placeholder="만 나이"
                                className="text-end"
                                disabled
                                value={age}
                                unit="세"
                            />
                        </WithLabel>
                    </div>
                </div>
            </div>
            <div className="wr-pages-detail__toolbar wr-mt">
                <div className="wr-pages-detail__buttons"></div>
                <div>
                    <MyButton
                        className="btn-primary btn-sm"
                        onClick={handleCreatePerson}
                    >
                        추가
                    </MyButton>
                </div>
            </div>
        </div>
    );
};
