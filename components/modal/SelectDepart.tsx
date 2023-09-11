import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { HrState } from '@reducers/hr';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { hideDepartSearchModal } from '@actions/modal/depart-search.action';
import { updateDepart } from '@actions/hr/set-depart.action';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import { useSelect } from '@hooks/use-select';

interface Props {}

export const SelectDepartModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowdepartSearchModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { orgas } = useSelector<AppState, HrState>((state) => state.hr);

    const [depart, setDepart] = useSelect(orgas, null);

    const handleClose = () => {
        dispatch(hideDepartSearchModal());
    };

    const handleSubmit = () => {
        if (depart.value === null) {
            return alert('부서를 선택하세요.');
        }

        const tf = confirm('선택한 부서를 적용하시겠습니까?');

        if (tf) {
            dispatch(updateDepart(depart.value));

            handleClose();
        }
    };

    useEffect(() => {
        setDepart(orgas[0]);
    }, [orgas]);

    return (
        <Modal isOpen={isShowdepartSearchModal} toggle={handleClose}>
            <ModalHeader toggle={handleClose}>부서 선택</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col">
                        <WithLabel id="depart" label="부서" type="active">
                            <MySelect
                                inputId="depart"
                                placeholder={'선택'}
                                
                                {...depart}
                            />
                        </WithLabel>
                    </div>
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
