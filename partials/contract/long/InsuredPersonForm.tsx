import type { FC, FormEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { WithLabel } from '@components/WithLabel';
import { MyButton } from '@components/button';
import { MyInput } from '@components/input';
import { MyDatepicker } from '@components/datepicker';
import { useInput, usePhoneInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { birthdayToAge } from '@utils/calculator';
import { createInsuredPerson } from '@actions/long/set-insured-person.action';
import { generateIndex } from '@utils/generate';
import { MyCheckbox } from '@components/checkbox';
import { useCheckbox } from '@hooks/use-checkbox';
import { isEmpty } from '@utils/validator/common';
import { useApi } from '@hooks/use-api';
import { getUserCustomersRequest } from '@actions/customer/get-user-customers';
import { showInsuredPersonSearchModal } from '@actions/modal/customer-search.action';
import { convertPhoneNumber } from '@utils/converter';

interface Props {
    userid: string;
}

export const InsuredPersonForm: FC<Props> = ({ userid }) => {
    const dispatch = useDispatch();

    const { insuredPeople, loadedInsuredPerson, loadedContract } = useSelector<
        AppState,
        LongState
    >((state) => state.long);
    const getUserCustomers = useApi(getUserCustomersRequest);

    // 계약자와 동일
    const [isContract, setIsContract] = useCheckbox(false);
    // 태아
    const [isFetus] = useCheckbox(false, {
        callbackOnChange: (checked) => {
            if (checked) {
                setIname('태아');
                setIsContract(false);
            }
        },
    });
    // 피보험자명
    const [iname, setIname] = useInput('');
    // 연락처
    const [itel, setItel] = usePhoneInput('');
    // 직업
    const [ijob, setIjob] = useInput('');
    // 생년월일
    const [ibirthday, setIbirthday] = useDatepicker(null);
    // 성별
    const [igender] = useInput('');

    let age = -1;
    if (ibirthday.value) {
        age = birthdayToAge(ibirthday.value);
    }

    const handleCreate = () => {
        dispatch(
            createInsuredPerson({
                index: generateIndex(insuredPeople),
                checked: false,
                name: iname.value,
                tel: isFetus.checked ? '' : itel.value,
                job: isFetus.checked ? '' : ijob.value,
                birthday: isFetus.checked
                    ? ''
                    : dayjs(ibirthday.value).format('YYYY-MM-DD'),
                sex: isFetus.checked ? '' : igender.value,
                p_idx: isContract.checked ? loadedInsuredPerson.idx : undefined,
            }),
        );
    };

    const handleSearchCustomer = (evt: FormEvent) => {
        evt.preventDefault();

        if (isEmpty(iname.value)) {
            return alert('피보험자명을 입력하세요.');
        }

        getUserCustomers({ userid, username: iname.value }, () => {
            dispatch(showInsuredPersonSearchModal());
        });
    };

    useEffect(() => {
        if (loadedInsuredPerson) {
            setIname(loadedInsuredPerson.name || '');
            setItel(
                loadedInsuredPerson.mobile
                    ? convertPhoneNumber(loadedInsuredPerson.mobile)
                    : '',
            );
            setIjob(loadedInsuredPerson.job || '');
            setIbirthday(new Date(loadedInsuredPerson.birthday || null));
        }
    }, [loadedInsuredPerson, setIname, setItel, setIjob, setIbirthday]);

    useEffect(() => {
        if (isContract.checked && loadedContract) {
            setIname(loadedContract.name || '');
            setItel(loadedContract.mobile || '');
            setIjob(loadedContract.job || '');
            setIbirthday(new Date(loadedContract.birthday || null));
        }
    }, [
        isContract.checked,
        loadedContract,
        setIname,
        setItel,
        setIjob,
        setIbirthday,
    ]);

    return (
        <>
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSearchCustomer}>
                        <WithLabel label="피보험자명" type="active">
                            <MyInput
                                type="search"
                                placeholder="피보험자명"
                                disabled={isContract.checked}
                                {...iname}
                                button={{
                                    type: 'submit',
                                    className: 'btn-primary btn-md',
                                    disabled:
                                        isContract.checked || isFetus.checked,
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
            {!isFetus.checked && (
                <>
                    <div className="row wr-mt">
                        <div className="col-6">
                            <WithLabel label="연락처" type="active">
                                <MyInput
                                    type="text"
                                    placeholder="연락처"
                                    disabled={isContract.checked}
                                    {...itel}
                                />
                            </WithLabel>
                        </div>
                        <div className="col-6">
                            <div className="wr-ml">
                                <WithLabel label="직업" type="active">
                                    <MyInput
                                        type="text"
                                        placeholder="직업"
                                        disabled={isContract.checked}
                                        {...ijob}
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
                                    disabled={isContract.checked}
                                    hooks={ibirthday}
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
                                        {...igender}
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
                        {...isContract}
                    />
                    <MyCheckbox id="isFetus" label="태아" {...isFetus} />
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
