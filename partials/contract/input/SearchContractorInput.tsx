import type { FC } from 'react';
import type { CoreEditableComponent } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FloatInput } from '@components/input/Float';
import { InputSearchButton } from '@components/button/InputSearch';
import { showContractorSearchModal } from '@actions/modal/customer-search.action';

interface Props extends CoreEditableComponent {}

export const SearchContractorInput: FC<Props> = ({ editable }) => {
    const dispatch = useDispatch();

    const router = useRouter();

    const { loadedContract } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    const handleSearch = () => {
        dispatch(showContractorSearchModal());
    };

    const handleMove = () => {
        if (loadedContract) {
            router.push(`/customer/join/${loadedContract.idx}`);
        }
    };

    return (
        <FloatInput
            label="계약자"
            readOnly
            isRequired
            after={
                editable ? (
                    <InputSearchButton onClick={handleSearch} />
                ) : loadedContract ? (
                    <button
                        type="button"
                        className="wr-detail-input__button"
                        onClick={handleMove}
                    >
                        상세
                    </button>
                ) : (
                    ''
                )
            }
            value={loadedContract ? loadedContract.name : ''}
        />
    );
};
