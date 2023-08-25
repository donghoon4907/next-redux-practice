import type { FC, FormEvent, ChangeEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { WithLabel } from '@components/WithLabel';
import { MyButton } from '@components/button';
import { MyInput } from '@components/input';
import { MyDatepicker } from '@components/datepicker';
import { useInput, usePhoneInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { birthdayToAge } from '@utils/calculator';
import { createInsuredPerson } from '@actions/contract/set-insured-person.action';
import { generateIndex } from '@utils/generate';
import { MyCheckbox } from '@components/checkbox';
import { isEmpty } from '@utils/validator/common';
import { useApi } from '@hooks/use-api';
import { getUserCustomersRequest } from '@actions/customer/get-user-customers';
import { showInsuredPersonSearchModal } from '@actions/modal/customer-search.action';
import { convertPhoneNumber } from '@utils/converter';
import { updateLoadedInsuredPerson } from '@actions/contract/set-contractor.action';

interface Props {
    userid: string;
}

export const InsuredPersonForm: FC<Props> = ({ userid }) => {
    const dispatch = useDispatch();

    const { insuredPeople, loadedInsuredPerson, loadedContract } = useSelector<
        AppState,
        ContractState
    >((state) => state.contract);
    const getUserCustomers = useApi(getUserCustomersRequest);

    // 계약자와 동일
    const [checkContract, setCheckContract] = useState(false);
    // 태아
    const [checkFetus, setCheckFetus] = useState(false);
    // 피보험자명
    const [name, setName] = useInput('');
    // 연락처
    const [tel, setTel] = usePhoneInput('');
    // 직업
    const [job, setJob] = useInput('');
    // 생년월일
    const [birthday, setBirthday] = useDatepicker(null);
    // 성별
    const [gender, setGender] = useInput('');
    // 계약자와 동일 혹은 태아 체크 시 피보험자명 비활성
    const isDisabledName = checkContract || checkFetus;
    // 계약자와 동일 혹은 고객정보연결 시 비활성
    const isDisabledAnother = checkContract || loadedInsuredPerson;
    // 생년월일로 나이 계산
    let age = -1;
    if (birthday.value) {
        age = birthdayToAge(birthday.value);
    }

    const handleCheckContract = (evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.checked) {
            // 계약자 설정 체크
            if (!loadedContract) {
                return alert('먼저 계약자를 설정하세요.');
            }
            // 고객정보연결한 경우 체크
            let tf = true;
            if (loadedInsuredPerson) {
                tf = confirm(
                    '고객정보가 연결된 상태입니다. 계약자 정보를 불러오시겠습니까?',
                );
            }

            if (!tf) {
                return;
            }
            // 계약자 설정 로드
            setName(loadedContract.name || '');
            setTel(
                loadedContract.mobile
                    ? convertPhoneNumber(loadedContract.mobile)
                    : '',
            );
            setJob(loadedContract.job || '');
            setBirthday(new Date(loadedContract.birthday || null));
            // 고객정보연결 초기화
            dispatch(updateLoadedInsuredPerson(null));
            setCheckContract(true);

            if (checkFetus) {
                setCheckFetus(false);
            }
        } else {
            setCheckContract(false);
        }
    };

    const handleCheckFetus = (evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.checked) {
            // 고객정보연결한 경우 체크
            let tf = true;
            if (loadedInsuredPerson) {
                tf = confirm(
                    '고객정보가 연결된 상태입니다. 태아로 설정하시겠습니까?',
                );
            }

            if (!tf) {
                return;
            }
            // 필드 초기화
            handleClear();
            // 계약자 설정 로드
            setName('태아');

            setCheckFetus(true);
        } else {
            setCheckFetus(false);
        }
    };

    const handleCreate = () => {
        if (isEmpty(name.value)) {
            return alert('피보험자명을 입력하세요');
        }
        // p_idx의 우선순위
        // 1. 계약자와 동일 체크
        // 2. 고객정보연결
        dispatch(
            createInsuredPerson({
                index: generateIndex(insuredPeople),
                checked: false,
                name: name.value,
                tel: isEmpty(tel.value) ? '' : tel.value.replace(/\-/g, ''),
                job: isEmpty(job.value) ? '' : job.value,
                birthday: birthday.value
                    ? dayjs(birthday.value).format('YYYY-MM-DD')
                    : '',
                sex: gender.value ? gender.value : '',
                p_idx: checkContract
                    ? loadedContract.idx
                    : loadedInsuredPerson
                    ? loadedInsuredPerson.idx
                    : undefined,
            }),
        );

        handleClear();
    };

    const handleClear = () => {
        setName('');
        setTel('');
        setJob('');
        setBirthday(null);
        setGender('');
        dispatch(updateLoadedInsuredPerson(null));
        setCheckContract(false);
        setCheckFetus(false);
    };

    const handleSearchCustomer = (evt: FormEvent) => {
        evt.preventDefault();

        if (isEmpty(name.value)) {
            return alert('피보험자명을 입력하세요.');
        }

        getUserCustomers({ userid, username: name.value }, () => {
            dispatch(showInsuredPersonSearchModal());
        });
    };
    // 고객정보연결 시 동작
    useEffect(() => {
        if (loadedInsuredPerson) {
            setName(loadedInsuredPerson.name || '');
            setTel(
                loadedInsuredPerson.mobile
                    ? convertPhoneNumber(loadedInsuredPerson.mobile)
                    : '',
            );
            setJob(loadedInsuredPerson.job || '');
            setBirthday(new Date(loadedInsuredPerson.birthday || null));
        }
    }, [loadedInsuredPerson]);
    // 계약자 설정 변경 시 동작
    useEffect(() => {
        // 계약자와 동일 체크된 경우만 동작
        if (checkContract && loadedContract) {
            setName(loadedContract.name || '');
            setTel(convertPhoneNumber(loadedContract.mobile) || '');
            setJob(loadedContract.job || '');
            setBirthday(new Date(loadedContract.birthday || null));
        }
    }, [checkContract, loadedContract]);

    return (
        <>
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSearchCustomer}>
                        <WithLabel label="피보험자명" type="active">
                            <MyInput
                                type="search"
                                placeholder="피보험자명"
                                disabled={isDisabledName}
                                {...name}
                                button={{
                                    type: 'submit',
                                    className: 'btn-primary btn-md',
                                    disabled: isDisabledName,
                                    children: (
                                        <>
                                            <span>고객정보연결</span>
                                        </>
                                    ),
                                }}
                            />
                        </WithLabel>
                    </form>
                </div>
            </div>
            {!checkFetus && (
                <>
                    <div className="row wr-mt">
                        <div className="col-6">
                            <WithLabel label="연락처" type="active">
                                <MyInput
                                    type="text"
                                    placeholder="연락처"
                                    disabled={isDisabledAnother}
                                    {...tel}
                                />
                            </WithLabel>
                        </div>
                        <div className="col-6">
                            <div className="wr-ml">
                                <WithLabel label="직업" type="active">
                                    <MyInput
                                        type="text"
                                        placeholder="직업"
                                        disabled={isDisabledAnother}
                                        {...job}
                                    />
                                </WithLabel>
                            </div>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="col-6">
                            <WithLabel
                                label="생년월일"
                                type="active"
                                id="ibirthday"
                            >
                                <MyDatepicker
                                    id="ibirthday"
                                    size="md"
                                    placeholder="생년월일"
                                    disabled={isDisabledAnother}
                                    hooks={birthday}
                                />
                                {age !== -1 && (
                                    <div className="wr-with__extension wr-form__unit wr-border-l--hide">
                                        만 {age - 1}세
                                    </div>
                                )}
                            </WithLabel>
                        </div>
                        <div className="col-6">
                            <div className="wr-ml">
                                <WithLabel label="성별" type="active">
                                    <MyInput
                                        type="text"
                                        placeholder="성별"
                                        {...gender}
                                    />
                                </WithLabel>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="wr-pages-detail__toolbar wr-mt">
                <div className="wr-pages-detail__buttons">
                    <MyCheckbox
                        id="isContract"
                        label="계약자와 동일"
                        onChange={handleCheckContract}
                        checked={checkContract}
                    />
                    <MyCheckbox
                        id="isFetus"
                        label="태아"
                        onChange={handleCheckFetus}
                        checked={checkFetus}
                    />
                </div>
                <div>
                    <MyButton
                        className="btn-primary btn-sm"
                        onClick={handleCreate}
                    >
                        추가
                    </MyButton>
                </div>
            </div>
        </>
    );
};
