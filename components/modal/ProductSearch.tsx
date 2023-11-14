import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { HrState } from '@reducers/hr';
import type { Product } from '@models/product';
import type { Spe } from '@models/spe';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelect } from '@hooks/use-select';
import { useInput } from '@hooks/use-input';
import { hideProductSearchModal } from '@actions/modal/product-search.action';
import longConstants from '@constants/options/long';
import { MyRadio } from '@components/radio';
import { updateProduct } from '@actions/contract/common/set-product.action';
import { FloatSelect } from '@components/select/Float';
import { FloatInput } from '@components/input/Float';

interface Props {
    spe: Spe;
}

export const ProductSearchModal: FC<Props> = ({ spe }) => {
    const dispatch = useDispatch();

    const { isShowProductSearchModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { products } = useSelector<AppState, HrState>((state) => state.hr);

    // 보종
    const [pType] = useSelect(longConstants.productType, null);
    // 검색어
    const [search] = useInput('');
    // 선택된 상품
    const [checkedProduct, setCheckedProduct] = useState<Product | null>(null);

    // 검색어 필터링된 상품목록
    const filteredProducts = useMemo(
        () =>
            products.data.filter(
                (v) =>
                    v.title.includes(search.value) &&
                    (pType.value ? v.spec === pType.value.value : true),
            ),
        [products.data, pType.value, search.value],
    );

    const handleClose = () => {
        dispatch(hideProductSearchModal());
    };

    const handleSubmit = () => {
        if (checkedProduct) {
            if (spe === 'long') {
                dispatch(updateProduct(checkedProduct));
            } else if (spe === 'gen') {
                dispatch(
                    updateProduct({
                        ...checkedProduct,
                        subcategory: null,
                        cal_spec: null,
                    }),
                );
            } else if (spe === 'car') {
                dispatch(
                    updateProduct({
                        ...checkedProduct,
                        subcategory: null,
                    }),
                );
            }

            handleClose();
        } else {
            alert('상품을 선택하세요');
        }
    };

    const handleClickRow = (v: Product) => {
        setCheckedProduct(v);
    };

    useEffect(() => {
        setCheckedProduct(null);
    }, [filteredProducts]);

    return (
        <Modal isOpen={isShowProductSearchModal} toggle={handleClose} size="xl">
            <ModalHeader toggle={handleClose}>상품 검색</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="flex-fill">
                        <FloatSelect label="보종" {...pType} />
                    </div>
                    <div className="flex-fill">
                        <FloatInput label="상품명" {...search} />
                    </div>
                    <div className="flex-fill"></div>
                </div>
                <div
                    className="wr-table--scrollable wr-table--hover wr-mt wr-border wr-table__wrap"
                    style={{ maxHeight: 500 }}
                >
                    <table className="wr-table table">
                        <thead>
                            <tr>
                                <th style={{ width: '30px' }}>선택</th>
                                <th>코드</th>
                                <th>상품명</th>
                                <th>보종</th>
                                <th>세부보종</th>
                                <th>정산보종</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={6}>상품이 없습니다.</td>
                                </tr>
                            )}
                            {filteredProducts.map((v, i) => (
                                <tr
                                    key={`product${i}`}
                                    onClick={() => handleClickRow(v)}
                                >
                                    <td>
                                        <MyRadio
                                            label=""
                                            name="mProduct"
                                            readOnly
                                            checked={
                                                checkedProduct?.p_code ===
                                                v.p_code
                                            }
                                        />
                                    </td>

                                    <td>
                                        <span>{v.p_code}</span>
                                    </td>
                                    <td>
                                        <div className="text-start">
                                            {v.title}
                                        </div>
                                    </td>
                                    <td>
                                        <span>{v.spec}</span>
                                    </td>
                                    <td>
                                        <span>{v.subcategory}</span>
                                    </td>
                                    <td>
                                        <span>{v.cal_spec}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    적용
                </Button>
            </ModalFooter>
        </Modal>
    );
};
