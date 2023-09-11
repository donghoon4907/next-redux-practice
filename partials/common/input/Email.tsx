import type { FC } from 'react';
import type { UseInputOutput } from '@hooks/use-input';
import type { UseSelectOutput } from '@hooks/use-select';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';

interface Props {
    id: string;
    disabled?: boolean;
    inputHooks?: UseInputOutput;
    selectHooks?: UseSelectOutput;
    labelType: 'active' | 'disable';
}

export const EmailInput: FC<Props> = ({
    id,
    disabled = false,
    inputHooks,
    selectHooks,
    labelType,
}) => {
    return (
        <WithLabel id={id} label="이메일" type={labelType}>
            <MyInput
                type="text"
                id={id}
                placeholder="이메일"
                disabled={disabled}
                {...inputHooks}
            />
            <div
                className="wr-with__extension"
                style={{
                    width: 140,
                }}
            >
                <MySelect
                    
                    height={variables.detailFilterHeight}
                    isDisabled={disabled}
                    placement="right"
                    {...selectHooks}
                />
            </div>
        </WithLabel>
    );
};
