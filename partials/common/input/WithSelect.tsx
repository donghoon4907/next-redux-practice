import type { FC } from 'react';
import type { UseInputOutput } from '@hooks/use-input';
import type { UseSelectOutput } from '@hooks/use-select';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';

interface Props {
    id: string;
    label: string;
    selectWidth: number;
    disabled?: boolean;
    inputHooks?: UseInputOutput;
    selectHooks?: UseSelectOutput;
    labelType: 'active' | 'disable';
}

export const WithSelectInput: FC<Props> = ({
    id,
    label,
    selectWidth,
    disabled = false,
    inputHooks,
    selectHooks,
    labelType,
}) => {
    return (
        <WithLabel id={id} label={label} type={labelType}>
            <MyInput
                type="text"
                id={id}
                placeholder={label}
                disabled={disabled}
                {...inputHooks}
            />
            <div
                className="wr-with__extension"
                style={{
                    width: selectWidth,
                }}
            >
                <MySelect
                    placeHolderFontSize={16}
                    height={variables.detailFilterHeight}
                    isDisabled={disabled}
                    placement="right"
                    {...selectHooks}
                />
            </div>
        </WithLabel>
    );
};
