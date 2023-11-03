import type { FC, ChangeEvent, MouseEvent } from 'react';
import type { CoreEditableComponent } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import type { KeyValue } from '@models/keyValue';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    UncontrolledAccordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
} from 'reactstrap';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import { MyCheckbox } from '@components/checkbox';
import { FloatInput } from '@components/input/Float';
import { MyUnit } from '@components/Unit';
import { IconWrapper } from '@components/IconWrapper';
import { chunkArray } from '@utils/array';
import {
    deleteInfoProduct,
    selectInfoProduct,
    updateInfoProduct,
} from '@actions/contract/long/set-info-product.action';
import { showSetInfoProductModal } from '@actions/modal/set-info-product.action';

interface Props extends CoreEditableComponent {}

export const InfoProductAccordion: FC<Props> = ({ editable }) => {
    const dispatch = useDispatch();

    const { infoProducts } = useSelector<AppState, LongState>(
        (state) => state.long,
    );

    const chunkedArray = useMemo(
        () => chunkArray(infoProducts, 2),
        [infoProducts],
    );

    const handleCreate = (evt: MouseEvent) => {
        evt.stopPropagation();

        dispatch(showSetInfoProductModal());
    };

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: KeyValue) => {
        dispatch(updateInfoProduct({ ...v, checked: evt.target.checked }));
    };

    const handleDelete = (evt: MouseEvent) => {
        evt.stopPropagation();

        if (infoProducts.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 설정을 선택해주세요.');
        }

        infoProducts
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteInfoProduct({ index: v.index }));
            });
    };

    const handleUpdate = (v: KeyValue) => {
        dispatch(selectInfoProduct(v));

        dispatch(showSetInfoProductModal());
    };

    return (
        <UncontrolledAccordion stayOpen>
            <AccordionItem>
                <AccordionHeader targetId="info_cust" role="tab" id="info_cust">
                    <div className="d-flex">
                        <div className="wr-pages-detail__title wr-mr">
                            기타계약정보
                        </div>
                        {editable && (
                            <>
                                <IconWrapper onClick={handleCreate}>
                                    <AiOutlinePlus size={20} />
                                </IconWrapper>
                                <IconWrapper onClick={handleDelete}>
                                    <AiOutlineMinus size={20} />
                                </IconWrapper>
                            </>
                        )}
                    </div>
                </AccordionHeader>

                <AccordionBody
                    accordionId="info_cust"
                    role="tabpanel"
                    aria-labelledby="info_cust"
                >
                    {infoProducts.length === 0 && (
                        <div className="row wr-mt">
                            <div className="flex-fill text-center">
                                등록된 기타계약정보가 없습니다.
                            </div>
                        </div>
                    )}
                    {chunkedArray.map(([a, b], i) => (
                        <div className="row wr-mt" key={`info-cust${uuidv4()}`}>
                            <div className="flex-fill">
                                {
                                    <FloatInput
                                        label={a.key}
                                        disabled
                                        before={
                                            <MyUnit placement="checkbox">
                                                <MyCheckbox
                                                    label=""
                                                    onChange={(evt) =>
                                                        handleCheck(evt, a)
                                                    }
                                                    checked={a.checked}
                                                />
                                            </MyUnit>
                                        }
                                        after={
                                            <MyUnit placement="last">
                                                <IconWrapper
                                                    onClick={() =>
                                                        handleUpdate(a)
                                                    }
                                                >
                                                    <BsPencil size={20} />
                                                </IconWrapper>
                                            </MyUnit>
                                        }
                                        value={a.val}
                                    />
                                }
                            </div>
                            <div className="flex-fill">
                                {b && (
                                    <FloatInput
                                        label={b.key}
                                        disabled
                                        before={
                                            <MyUnit placement="checkbox">
                                                <MyCheckbox
                                                    label=""
                                                    onChange={(evt) =>
                                                        handleCheck(evt, b)
                                                    }
                                                    checked={b.checked}
                                                />
                                            </MyUnit>
                                        }
                                        after={
                                            editable && (
                                                <MyUnit placement="last">
                                                    <IconWrapper
                                                        onClick={() =>
                                                            handleUpdate(b)
                                                        }
                                                    >
                                                        <BsPencil size={20} />
                                                    </IconWrapper>
                                                </MyUnit>
                                            )
                                        }
                                        value={b.val}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </AccordionBody>
            </AccordionItem>
        </UncontrolledAccordion>
    );
};
