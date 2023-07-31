import type { UseInputOutput } from './use-input';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useInput } from './use-input';

interface UsePostcodeOption {
    disabled?: boolean;
}

interface UserPostcodeDefaultValue {
    postcode?: string;
    address1?: string;
    address2?: string;
}

interface UsePostcodeFunction {
    (defaultValue: UserPostcodeDefaultValue, option?: UsePostcodeOption): [
        UseInputOutput,
        UseInputOutput,
        UseInputOutput,
        () => void,
    ];
}

export const usePostcode: UsePostcodeFunction = (defaultValue = {}, option) => {
    const open = useDaumPostcodePopup();

    const [postcode, setPostcode] = useInput(defaultValue.postcode || '');

    const [address1, setAddress1] = useInput(defaultValue.address1 || '');

    const [address2, setAddress2] = useInput(defaultValue.address2 || '');

    const handleComplete = (data: any) => {
        // let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }

            if (data.buildingName !== '') {
                extraAddress +=
                    extraAddress !== ''
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }

            // fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setPostcode(data.zonecode);

        setAddress1(data.jibunAddress);

        setAddress2(`(${extraAddress})`);
    };

    const handleClick = () => {
        if (!option?.disabled) {
            open({ onComplete: handleComplete });
        }
    };

    return [postcode, address1, address2, handleClick];
};
