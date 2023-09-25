import type { FC } from 'react';
import type { Insured } from '@models/insured';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { birthdayToAge } from '@utils/calculator';
import { convertPhoneNumber } from '@utils/converter';

interface Props extends Partial<Insured> {}

export const GeneralInsuredTemplate: FC<Props> = ({
    index,
    dist,
    name = '',
    tel = '',
    job = '',
    birthday = '',
    sex = '',
    p_address = '',
}) => {
    let age = -1;
    if (birthday) {
        age = birthdayToAge(new Date(birthday));
    }

    return (
        <>
            {dist === '피보험물' && (
                <>
                    <div className="row">
                        <div className="col">
                            <WithLabel
                                id={`git_pname${index}`}
                                label="피보험물"
                                type="disable"
                            >
                                <MyInput
                                    id={`git_pname${index}`}
                                    placeholder="피보험물"
                                    disabled={true}
                                    value={name}
                                />
                            </WithLabel>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="col">
                            <WithLabel
                                id={`git_address${index}`}
                                label="소재지"
                                type="disable"
                            >
                                <MyInput
                                    id={`git_address${index}`}
                                    placeholder="소재지"
                                    disabled={true}
                                    value={p_address}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </>
            )}
            {dist === '피보험자' && (
                <>
                    <div className="row">
                        <div className="col">
                            <WithLabel
                                id={`git_name${index}`}
                                label="피보험자명"
                                type="disable"
                            >
                                <MyInput
                                    id={`git_name${index}`}
                                    placeholder="피보험자명"
                                    disabled={true}
                                    value={name}
                                />
                            </WithLabel>
                        </div>
                    </div>
                    {name !== '태아' && (
                        <>
                            <div className="row wr-mt">
                                <div className="col">
                                    <WithLabel
                                        id={`git_mobile${index}`}
                                        label="연락처"
                                        type="disable"
                                    >
                                        <MyInput
                                            id={`git_mobile${index}`}
                                            placeholder="연락처"
                                            disabled={true}
                                            value={convertPhoneNumber(tel)}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id={`git_job${index}`}
                                        label="직업"
                                        type="disable"
                                    >
                                        <MyInput
                                            id={`git_job${index}`}
                                            placeholder="직업"
                                            disabled={true}
                                            value={job}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col">
                                    <WithLabel
                                        id={`git_birthday${index}`}
                                        label="생년월일"
                                        type="disable"
                                    >
                                        <MyInput
                                            id={`git_birthday${index}`}
                                            placeholder="생년월일"
                                            disabled={true}
                                            value={birthday}
                                        />
                                        {age !== -1 && (
                                            <div className="wr-with__extension wr-form__unit wr-border-l--hide">
                                                만 {age - 1}세
                                            </div>
                                        )}
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id={`git_gender${index}`}
                                        label="성별"
                                        type="disable"
                                    >
                                        <MyInput
                                            id={`git_gender${index}`}
                                            placeholder="성별"
                                            disabled={true}
                                            value={sex}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};
