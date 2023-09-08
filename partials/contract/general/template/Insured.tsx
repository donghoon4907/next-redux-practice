import type { FC } from 'react';
import type { Insured } from '@models/insured';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { birthdayToAge } from '@utils/calculator';
import { convertPhoneNumber } from '@utils/converter';

interface Props extends Partial<Insured> {}

export const GeneralInsuredTemplate: FC<Props> = ({
    // index = -1,
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
                            <WithLabel label="피보험물" type="disable">
                                <MyInput
                                    type="text"
                                    placeholder="피보험물"
                                    disabled={true}
                                    value={name}
                                />
                            </WithLabel>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="col">
                            <WithLabel label="소재지" type="disable">
                                <MyInput
                                    type="text"
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
                            <WithLabel label="피보험자명" type="disable">
                                <MyInput
                                    type="text"
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
                                    <WithLabel label="연락처" type="disable">
                                        <MyInput
                                            type="text"
                                            placeholder="연락처"
                                            disabled={true}
                                            value={convertPhoneNumber(tel)}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel label="직업" type="disable">
                                        <MyInput
                                            type="text"
                                            placeholder="직업"
                                            disabled={true}
                                            value={job}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col">
                                    <WithLabel label="생년월일" type="disable">
                                        <MyInput
                                            type="text"
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
                                    <WithLabel label="성별" type="disable">
                                        <MyInput
                                            type="text"
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
