import type { FC } from 'react';
import type { TypeAttributes } from 'rsuite/esm/@types/common';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { UseInputOutput } from '@hooks/use-input';

interface Props {
    index: number;
    isMt?: boolean;
    disabled?: boolean;
    labelType: 'active' | 'disable';
    size: TypeAttributes.Size;
    postcodeHooks: UseInputOutput;
    address1Hooks: UseInputOutput;
    address2Hooks: UseInputOutput;
    address3Hooks: UseInputOutput;
    onClickPostcode: () => void;
}

export const PostcodeInput: FC<Props> = ({
    index,
    isMt = false,
    disabled = false,
    labelType,
    size,
    postcodeHooks,
    address1Hooks,
    address2Hooks,
    address3Hooks,
    onClickPostcode,
}) => {
    return (
        <>
            <div className={`row ${isMt ? 'wr-mt' : ''}`}>
                <div className="col">
                    <WithLabel
                        id={`postcode${index}`}
                        label="주소"
                        type={labelType}
                    >
                        <MyInput
                            id={`postcode${index}`}
                            placeholder="우편번호"
                            disabled
                            onClick={onClickPostcode}
                            {...postcodeHooks}
                            button={
                                disabled
                                    ? undefined
                                    : {
                                          type: 'button',
                                          className: `btn-primary btn-${size}`,
                                          disabled,
                                          onClick: onClickPostcode,
                                          children: (
                                              <>
                                                  <span>찾기</span>
                                              </>
                                          ),
                                      }
                            }
                        />
                    </WithLabel>
                </div>
                <div className="col">
                    <MyInput
                        id={`address1_${index}`}
                        placeholder="주소1"
                        disabled
                        {...address1Hooks}
                    />
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <WithLabel
                        id={`address3_${index}`}
                        label="상세주소"
                        type={labelType}
                    >
                        <MyInput
                            id={`address3_${index}`}
                            placeholder="상세주소"
                            disabled={disabled}
                            {...address3Hooks}
                        />
                    </WithLabel>
                </div>
                <div className="col">
                    <MyInput
                        id={`address2_${index}`}
                        placeholder="주소2"
                        disabled
                        {...address2Hooks}
                    />
                </div>
            </div>
        </>
    );
};
