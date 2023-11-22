import type { FC } from 'react';
import type { CoreEditableComponent } from '@interfaces/core';
import type { Spe } from '@models/spe';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import { useDispatch, useSelector } from 'react-redux';
import { showProductSearchModal } from '@actions/modal/product-search.action';
import { useApi } from '@hooks/use-api';
import { getProductsRequest } from '@actions/hr/get-products.action';
import { FloatInput } from '@components/input/Float';
import { InputSearchButton } from '@components/button/InputSearch';

import { ProductBadgeTemplate } from '../../long/template/ProductBadge';

interface Props extends CoreEditableComponent {
    // 보험사 코드
    wcode?: string;
    spe: Spe;
}

export const SearchProductInput: FC<Props> = ({ editable, wcode, spe }) => {
    const dispatch = useDispatch();

    const { selectedProduct } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    const getProducts = useApi(getProductsRequest);

    const handleSearch = () => {
        if (wcode) {
            getProducts(
                {
                    wcode,
                    spe,
                    type: 'all',
                },
                () => {
                    dispatch(showProductSearchModal());
                },
            );
        } else {
            alert('보험사를 선택하세요.');
        }
    };

    return (
        <>
            <FloatInput
                label="상품명"
                readOnly
                value={selectedProduct?.title ?? ''}
                isRequired
                // before={
                //     (spec || subcategory) && (
                //         <ProductBadgeTemplate
                //             spec={spec}
                //             subcategory={subcategory}
                //         />
                //     )
                // }
                after={
                    <>
                        {/* {calSpec && (
                            <MyUnit placement="middle">{calSpec}</MyUnit>
                        )} */}
                        {editable && (
                            <InputSearchButton onClick={handleSearch} />
                        )}
                    </>
                }
            />
            <div style={{ marginTop: selectedProduct ? 10 : 0 }}>
                <ProductBadgeTemplate
                    spec={selectedProduct?.spec ?? ''}
                    subcategory={selectedProduct?.subcategory ?? ''}
                    calSpec={selectedProduct?.cal_spec ?? ''}
                />
            </div>
        </>
    );
};
