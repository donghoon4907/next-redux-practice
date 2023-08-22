import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { HrState } from '@reducers/hr';
import type { Product } from '@models/product';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import { useSelect } from '@hooks/use-select';
import { MyInput } from '@components/input';
import { useInput } from '@hooks/use-input';
import { hideProductSearchModal } from '@actions/modal/product-search.action';
import { PRODUCT_TYPE } from '@constants/selectOption';
import { getProductsRequest } from '@actions/hr/get-products';
import { MyRadio } from '@components/radio';
import { updateLongProduct } from '@actions/long/set-long-product.action';

interface Props {
    wname: string;
    wcode: string;
}

export const ProductSearchModal: FC<Props> = ({ wname, wcode }) => {
    const dispatch = useDispatch();

    const { isShowProductSearchModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { products } = useSelector<AppState, HrState>((state) => state.hr);

    // 보종
    const [pType] = useSelect(PRODUCT_TYPE, null);
    // 검색어
    const [search] = useInput('');
    // 선택된 상품
    const [checkedProduct, setCheckedProduct] = useState<Product | null>(null);

    // 검색어 필터링된 상품목록
    const filteredProducts = useMemo(
        () => products.filter((v) => v.title.includes(search.value)),
        [products, search.value],
    );

    const handleClose = () => {
        dispatch(hideProductSearchModal());
    };

    const handleSubmit = () => {
        if (checkedProduct) {
            dispatch(updateLongProduct(checkedProduct));

            handleClose();
        } else {
            alert('상품을 선택하세요');
        }
    };

    const handleClickRow = (v: Product) => {
        setCheckedProduct(v);
    };

    useEffect(() => {
        dispatch(
            getProductsRequest({
                wcode,
                spe: 'long',
                type: pType.value ? pType.value.value : 'all',
            }),
        );
    }, [dispatch, wcode, pType.value]);

    useEffect(() => {
        setCheckedProduct(null);
    }, [filteredProducts]);

    return (
        <Modal isOpen={isShowProductSearchModal} toggle={handleClose} size="lg">
            <ModalHeader toggle={handleClose}>{wname} 상품 검색</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <WithLabel id="mPtype" label="보종" type="active">
                            <MySelect
                                inputId="mPtype"
                                placeholder="선택"
                                placeHolderFontSize={16}
                                {...pType}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel
                                id="mPtitle"
                                label="상품명"
                                type="active"
                            >
                                <MyInput
                                    type="text"
                                    id="mPtitle"
                                    placeholder="상품명"
                                    {...search}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div
                    className="wr-table--scrollable wr-table--hover wr-mt wr-border wr-table__wrap"
                    style={{ maxHeight: 500 }}
                >
                    <table className="wr-table table">
                        <thead>
                            <tr>
                                {filteredProducts.length !== 0 && (
                                    <th style={{ width: '30px' }}>선택</th>
                                )}

                                <th style={{ width: '100px' }}>
                                    <strong>코드</strong>
                                </th>
                                <th>
                                    <strong>상품명</strong>
                                </th>
                                <th style={{ width: '100px' }}>
                                    <strong>보종</strong>
                                </th>
                                <th style={{ width: '100px' }}>
                                    <strong>세부보종</strong>
                                </th>
                                <th style={{ width: '100px' }}>
                                    <strong>정산보종</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5}>상품이 없습니다.</td>
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
                                        <div
                                            className="text-truncate"
                                            style={{ width: 320 }}
                                        >
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