import type { FC } from 'react';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';

interface Props {
    index: number;
    isMt?: boolean;
    disabled?: boolean;
    labelType: 'active' | 'disable';
    postcode: string;
    address1: string;
    address2: string;
    address3: string;
}

export const PostcodeTemplate: FC<Props> = ({
    index,
    isMt = false,
    disabled = false,
    labelType,
    postcode,
    address1,
    address2,
    address3,
}) => {
    return (
        <>
            <div className={`row ${isMt ? 'wr-mt' : ''}`}>
                <div className="col">
                    <WithLabel
                        id={`postcode_temp${index}`}
                        label="우편번호"
                        type="disable"
                    >
                        <MyInput
                            id={`postcode_temp${index}`}
                            placeholder="우편번호"
                            disabled={disabled}
                            value={postcode}
                        />
                    </WithLabel>
                </div>
                <div className="col">
                    <MyInput
                        placeholder="주소1"
                        disabled={true}
                        value={address1}
                    />
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <WithLabel
                        id={`address3_temp${index}`}
                        label="상세주소"
                        type={labelType}
                    >
                        <MyInput
                            id={`address3_temp${index}`}
                            placeholder="우편번호"
                            disabled={disabled}
                            value={address3}
                        />
                    </WithLabel>
                </div>
                <div className="col">
                    <MyInput
                        placeholder="주소2"
                        disabled={true}
                        value={address2}
                    />
                </div>
            </div>
        </>
    );
};
