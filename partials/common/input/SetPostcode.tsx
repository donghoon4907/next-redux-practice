import type { FC } from 'react';
import { UseInputOutput } from '@hooks/use-input';
import { FloatInput } from '@components/input/Float';
import { InputSearchButton } from '@components/button/InputSearch';

interface Props {
    activeMarginTop?: boolean;
    disabled?: boolean;
    postcodeHooks: UseInputOutput;
    address1Hooks: UseInputOutput;
    address2Hooks: UseInputOutput;
    address3Hooks: UseInputOutput;
    onClickPostcode: () => void;
}

export const SetPostcodeInput: FC<Props> = ({
    activeMarginTop = false,
    disabled = false,
    postcodeHooks,
    address1Hooks,
    address2Hooks,
    address3Hooks,
    onClickPostcode,
}) => {
    return (
        <>
            <div className={`row ${activeMarginTop ? 'wr-mt' : ''}`}>
                <div className="flex-fill">
                    <FloatInput
                        label="우편번호"
                        disabled
                        after={
                            !disabled && (
                                <>
                                    <InputSearchButton
                                        onClick={onClickPostcode}
                                    />
                                </>
                            )
                        }
                        {...postcodeHooks}
                    />
                </div>
                <div className="flex-fill">
                    <FloatInput label="주소1" disabled {...address1Hooks} />
                </div>
            </div>
            <div className="row wr-mt">
                <div className="flex-fill">
                    <FloatInput label="주소2" disabled {...address2Hooks} />
                </div>
            </div>
            <div className="row wr-mt">
                <div className="flex-fill">
                    <FloatInput
                        label="상세주소"
                        readOnly={disabled}
                        {...address3Hooks}
                    />
                </div>
            </div>
        </>
    );
};
