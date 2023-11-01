import type { FC } from 'react';
import type { CoreEditableComponent } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApi } from '@hooks/use-api';
import { FloatInput } from '@components/input/Float';
import { InputSearchButton } from '@components/button/InputSearch';
import { getUserCustomersRequest } from '@actions/customer/get-user-customers';
import { useInput } from '@hooks/use-input';
import { isEmpty } from '@utils/validator/common';
import {
    showContractorSearchModal,
    showInsuredSearchModal,
} from '@actions/modal/customer-search.action';

interface Props extends CoreEditableComponent {
    userid: string;
    type: '계약자' | '피보험자';
}

export const SearchContractorInput: FC<Props> = ({
    type,
    editable,
    userid,
}) => {
    const dispatch = useDispatch();

    const { loadedContract, loadedInsured } = useSelector<
        AppState,
        ContractState
    >((state) => state.contract);

    const [name, setName] = useInput('', { noSpace: true });

    const getUserCustomers = useApi(getUserCustomersRequest);

    const handleSearch = () => {
        if (isEmpty(name.value)) {
            return alert(`${type}를 입력해주세요.`);
        }

        getUserCustomers({ userid, username: name.value }, () => {
            if (type === '계약자') {
                dispatch(showContractorSearchModal());
            } else if (type === '피보험자') {
                dispatch(showInsuredSearchModal());
            }
        });
    };

    useEffect(() => {
        if (type === '계약자' && loadedContract) {
            setName(loadedContract.name);
        }
    }, [type, loadedContract]);

    useEffect(() => {
        if (type === '피보험자' && loadedInsured) {
            setName(loadedInsured.name);
        }
    }, [type, loadedInsured]);

    return (
        <FloatInput
            label={type}
            readOnly={!editable}
            isRequired
            after={editable && <InputSearchButton onClick={handleSearch} />}
            {...name}
        />
    );
};
