import type { FC } from 'react';
import type { Insured } from '@models/insured';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { MyButton } from '@components/button';
import { convertResidentNumber } from '@utils/converter';

interface Props extends Partial<Insured> {}

export const CarInsuredTemplate: FC<Props> = ({
    dist,
    relation,
    name = '',
    birthday = '',
    sex = '',
    jumin = '',
    age = '',
}) => {
    return (
        <>
            <div className="row">
                <div className="col">
                    <WithLabel label="관계" type="disable">
                        <MyInput
                            type="text"
                            placeholder="관계"
                            disabled
                            value={relation}
                        />
                    </WithLabel>
                </div>
                <div className="col">
                    <WithLabel label="이름" type="disable">
                        <MyInput
                            type="text"
                            placeholder="이름"
                            disabled
                            value={name}
                        />
                    </WithLabel>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    {dist === '주피보험자' && (
                        <WithLabel id="pjumin" label="주민번호" type="disable">
                            <MyInput
                                type="text"
                                id="pjumin"
                                placeholder="주민번호"
                                disabled
                                value={convertResidentNumber(jumin)}
                            />
                            <div
                                className="wr-with__extension"
                                style={{ width: 40 }}
                            >
                                <MyButton
                                    className={`btn-md btn-${
                                        sex === '남' ? 'primary' : 'danger'
                                    }`}
                                    style={{ width: 40 }}
                                    disabled
                                >
                                    {sex}
                                </MyButton>
                            </div>
                        </WithLabel>
                    )}
                    {dist === '피보험자' && (
                        <WithLabel
                            id="pbirthday"
                            label="생년월일"
                            type="disable"
                        >
                            <MyInput
                                type="text"
                                id="pbirthday"
                                placeholder="생년월일"
                                disabled
                                value={birthday}
                            />
                            <div
                                className="wr-with__extension"
                                style={{ width: 40 }}
                            >
                                <MyButton
                                    className={`btn-md btn-${
                                        sex === '남' ? 'primary' : 'danger'
                                    }`}
                                    style={{ width: 40 }}
                                    disabled
                                >
                                    {sex}
                                </MyButton>
                            </div>
                        </WithLabel>
                    )}
                </div>
                <div className="col">
                    <WithLabel label="만 나이" type="disable">
                        <MyInput
                            type="text"
                            placeholder="만 나이"
                            disabled
                            className="text-end"
                            value={age}
                            unit="세"
                        />
                    </WithLabel>
                </div>
            </div>
        </>
    );
};
