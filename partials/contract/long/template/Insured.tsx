import type { FC } from 'react';
import type { Insured } from '@models/insured';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { birthdayToAge } from '@utils/calculator';
import { convertPhoneNumber } from '@utils/converter';

interface Props extends Partial<Insured> {}

export const LongInsuredTemplate: FC<Props> = ({
    index,
    name = '',
    tel = '',
    job = '',
    birthday = '',
    sex = '',
}) => {
    let age = -1;
    if (birthday) {
        age = birthdayToAge(new Date(birthday));
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <WithLabel
                        id={`lit_name${index}`}
                        label="피보험자명"
                        type="disable"
                    >
                        <MyInput
                            id={`lit_name${index}`}
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
                                id={`lit_mobile${index}`}
                                label="연락처"
                                type="disable"
                            >
                                <MyInput
                                    id={`lit_mobile${index}`}
                                    placeholder="연락처"
                                    disabled={true}
                                    value={convertPhoneNumber(tel)}
                                />
                            </WithLabel>
                        </div>
                        <div className="col">
                            <WithLabel
                                id={`lit_job${index}`}
                                label="직업"
                                type="disable"
                            >
                                <MyInput
                                    id={`lit_job${index}`}
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
                                id={`lit_birthday${index}`}
                                label="생년월일"
                                type="disable"
                            >
                                <MyInput
                                    id={`lit_birthday${index}`}
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
                                id={`lit_gender${index}`}
                                label="성별"
                                type="disable"
                            >
                                <MyInput
                                    id={`lit_gender${index}`}
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
    );
};
