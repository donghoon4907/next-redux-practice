import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CarState } from '@reducers/car';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyRadio } from '@components/radio';
import { hideEstimateSearchModal } from '@actions/modal/estimate-search.action';
import { useApi } from '@hooks/use-api';
import { getLazyEstimateRequest } from '@actions/car/get-lazy-estimate.action';

interface Props {}

export const EstimateSearchModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowEstimateSearchModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { estimates } = useSelector<AppState, CarState>((state) => state.car);
    // 비교견적 상세
    const getEstimate = useApi(getLazyEstimateRequest);
    // 선택된 상품
    const [checkedIndex, setCheckedIndex] = useState<number>(-1);

    const handleClose = () => {
        dispatch(hideEstimateSearchModal());
    };

    const handleSubmit = () => {
        if (checkedIndex === -1) {
            alert('비교견적을 선택하세요');
        } else {
            getEstimate({ idx: checkedIndex }, () => {
                handleClose();
            });
        }
    };

    const handleClickRow = (index: number) => {
        setCheckedIndex(index);
    };

    const handleOpened = () => {
        setCheckedIndex(-1);
    };

    return (
        <Modal
            isOpen={isShowEstimateSearchModal}
            toggle={handleClose}
            size="xl"
            onOpened={handleOpened}
        >
            <ModalHeader toggle={handleClose}>비교견적 가져오기</ModalHeader>
            <ModalBody>
                <div
                    className="wr-table--scrollable wr-table--hover wr-mt wr-border wr-table__wrap"
                    style={{ maxHeight: 500 }}
                >
                    <table className="wr-table table">
                        <thead>
                            <tr>
                                <th style={{ width: '30px' }}>선택</th>
                                {Object.entries(estimates.fields).map(
                                    ([k, v]) => (
                                        <th key={`eth-${k}`}>{v as string}</th>
                                    ),
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {estimates.rows.length === 0 && (
                                <tr>
                                    <td colSpan={6}>비교견적이 없습니다.</td>
                                </tr>
                            )}
                            {estimates.rows.map((v: any) => (
                                <tr
                                    key={`etd-${v.est_idx}`}
                                    onClick={() => handleClickRow(v.est_idx)}
                                >
                                    <td>
                                        <MyRadio
                                            label=""
                                            name="mEstimate"
                                            readOnly
                                            checked={checkedIndex === v.est_idx}
                                        />
                                    </td>

                                    <td>{v.est_idx}</td>
                                    <td>{v.p_name}</td>
                                    <td>{v.carnum}</td>
                                    <td>{v.carname}</td>
                                    <td>{v.bo_datefrom}</td>
                                    <td>{v.insert_datetime}</td>
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
