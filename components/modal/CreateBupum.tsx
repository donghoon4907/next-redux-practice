import type { FC } from 'react';
import type { Bupum } from '@models/bupum';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CarState } from '@reducers/car';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { isEmpty } from '@utils/validator/common';
import { generateIndex } from '@utils/generate';
import { createBupum } from '@actions/car/set-bupum.action';
import { hideCreateBupumModal } from '@actions/modal/create-bupum.action';

interface Props {}

export const CreateBupumModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowCreateBupumModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { bupums } = useSelector<AppState, CarState>((state) => state.car);

    // 부속명
    const [name] = useInput('', { noSpace: true });
    // 부속가액
    const [price] = useNumbericInput('', {
        addComma: true,
    });

    const handleClose = () => {
        dispatch(hideCreateBupumModal());
    };

    const handleSubmit = () => {
        if (isEmpty(name.value)) {
            return alert('부속명을 입력하세요');
        }

        if (isEmpty(price.value)) {
            return alert('부속가액을 입력하세요');
        }

        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            dispatch(createBupum(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        const payload: Bupum = {
            index: generateIndex(bupums),
            checked: false,
            name: name.value,
            price: +price.value.replace(/,/g, ''),
        };

        return payload;
    };

    return (
        <Modal isOpen={isShowCreateBupumModal} toggle={handleClose} size="lg">
            <ModalHeader toggle={handleClose}>추가부속 설정</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <WithLabel id="bupumName" label="부속명" type="active">
                            <MyInput
                                type="text"
                                id="bupumName"
                                placeholder="부속명"
                                {...name}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel
                                id="bupumName"
                                label="부속가액"
                                type="active"
                            >
                                <MyInput
                                    type="text"
                                    id="bupumName"
                                    placeholder="0"
                                    {...price}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    등록
                </Button>
            </ModalFooter>
        </Modal>
    );
};
