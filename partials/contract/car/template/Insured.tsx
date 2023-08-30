import type { FC } from 'react';
import type { Insured } from '@models/insured';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { birthdayToAge } from '@utils/calculator';

interface Props extends Partial<Insured> {}

export const CarInsuredTemplate: FC<Props> = ({
    relation,
    name = '',
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
                <div className="col-6">
                    <WithLabel label="관계" type="disable">
                        <MyInput
                            type="text"
                            placeholder="관계"
                            disabled
                            value={relation}
                        />
                    </WithLabel>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <WithLabel label="이름" type="active">
                            <MyInput
                                type="text"
                                placeholder="이름"
                                disabled
                                value={name}
                            />
                        </WithLabel>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-6">
                    <WithLabel label="생년월일" type="disable">
                        <MyInput
                            type="text"
                            placeholder="생년월일"
                            disabled
                            value={birthday}
                            unit={sex}
                        />
                    </WithLabel>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <WithLabel label="만 나이" type="active">
                            <MyInput
                                type="text"
                                placeholder="만 나이"
                                disabled
                                className="text-end"
                                value={
                                    birthday
                                        ? birthdayToAge(new Date(birthday)) - 1
                                        : ''
                                }
                                unit="세"
                            />
                        </WithLabel>
                    </div>
                </div>
            </div>
        </>
    );
};
