import type { FC } from 'react';
import type { CoreEditableComponent } from '@interfaces/core';
import type { Spe } from '@models/spe';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import { useDispatch, useSelector } from 'react-redux';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { showProductSearchModal } from '@actions/modal/product-search.action';
import { useApi } from '@hooks/use-api';
import { getProductsRequest } from '@actions/hr/get-products';

interface Props extends CoreEditableComponent {
    // 보험사 코드
    wcode?: string;
    // 상품명
    title: string;
    spec: string;
    subcategory: string | null;
    calSpec: string | null;
    spe: Spe;
}

export const SearchProductInput: FC<Props> = ({
    editable,
    wcode,
    title,
    spec,
    subcategory,
    calSpec,
    spe,
}) => {
    const dispatch = useDispatch();

    const { selectedProduct } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    const getProducts = useApi(getProductsRequest);

    const labelType = editable ? 'active' : 'disable';
    const _title = selectedProduct ? selectedProduct.title : title;
    const _spec = selectedProduct ? selectedProduct.spec : spec;
    const _subcategory = selectedProduct
        ? selectedProduct.subcategory
        : subcategory;
    const _calSpec = selectedProduct ? selectedProduct.cal_spec : calSpec;

    let pTitlePaddingRate = 0;
    if (spec) {
        pTitlePaddingRate += 1;
    }

    if (_subcategory) {
        pTitlePaddingRate += 1;
    }

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
        <div className="row wr-mt">
            <div className="col">
                <WithLabel
                    id="title"
                    label="상품명"
                    type={labelType}
                    isRequired={editable}
                >
                    <div className="wr-with__badge">
                        <MyInput
                            type="text"
                            id="title"
                            className={`wr-with__badge--inside-left-${pTitlePaddingRate}`}
                            placeholder=""
                            disabled={true}
                            value={_title}
                            button={
                                editable
                                    ? {
                                          className: 'btn-md btn-primary',
                                          onClick: handleSearch,
                                          children: (
                                              <>
                                                  <span>찾기</span>
                                              </>
                                          ),
                                      }
                                    : undefined
                            }
                            unit={_calSpec || ''}
                        />

                        <div className="wr-with__badge--left wr-badge__wrap">
                            {_spec && (
                                <span className="badge rounded-pill bg-primary wr-badge">
                                    {_spec}
                                    <span className="visually-hidden">
                                        {_spec}
                                    </span>
                                </span>
                            )}
                            {_subcategory && (
                                <span className="badge rounded-pill bg-warning wr-badge">
                                    {_subcategory}
                                    <span className="visually-hidden">
                                        {_subcategory}
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                </WithLabel>
            </div>
        </div>
    );
};
