import type { FC } from 'react';
import type { CoreEditableComponent } from '@interfaces/core';
import type { Spe } from '@models/spe';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import { useDispatch, useSelector } from 'react-redux';
import { showProductSearchModal } from '@actions/modal/product-search.action';
import { useApi } from '@hooks/use-api';
import { getProductsRequest } from '@actions/hr/get-products';
import { FloatInput } from '@components/input/Float';
import { ProductBadgeTemplate } from '../../long/template/ProductBadge';
import { InputSearchButton } from '@components/button/InputSearch';
import { MyUnit } from '@components/Unit';

interface Props extends CoreEditableComponent {
    // 보험사 코드
    wcode?: string;
    // 상품명
    defaultTitle: string;
    defaultSpec: string;
    defaultSubcategory: string | null;
    defaultCalSpec: string | null;
    spe: Spe;
}

export const SearchProductInput: FC<Props> = ({
    editable,
    wcode,
    defaultTitle,
    defaultSpec,
    defaultSubcategory,
    defaultCalSpec,
    spe,
}) => {
    const dispatch = useDispatch();

    const { selectedProduct } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    const getProducts = useApi(getProductsRequest);

    const title = selectedProduct ? selectedProduct.title : defaultTitle;
    const spec = selectedProduct ? selectedProduct.spec : defaultSpec;
    const subcategory = selectedProduct
        ? selectedProduct.subcategory
        : defaultSubcategory;
    const calSpec = selectedProduct ? selectedProduct.cal_spec : defaultCalSpec;

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
                defaultValue={title}
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
            <div style={{ marginTop: 5 }}>
                <ProductBadgeTemplate
                    spec={spec}
                    subcategory={subcategory}
                    calSpec={calSpec}
                />
            </div>
        </>
    );
};
