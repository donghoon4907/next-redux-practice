import type { FC, ChangeEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CoreSetState } from '@interfaces/core';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { hideSetCaraccModal } from '@actions/modal/set-caracc.action';
import { MyInput } from '@components/input';
import { MyCheckbox } from '@components/checkbox';

const CAR_ACCS = [
    ['에어컨', '하이패스', '고급시트', '오디오장치'],
    ['루프캐리어', '칼라유리', '썬루프', '알루미늄휠'],
    ['ABS', '파워스티어링', '리어스포일러', '에어백'],
    ['듀얼에어백', '자동변속기', '드라이브와이즈', '어라운드뷰'],
    ['헤드업디스플레이', 'HID헤드램프', '스마트센스', '네비게이션'],
    ['이모빌라이저', '패키지', '블랙박스'],
];

interface Props {
    setExternalAccs: CoreSetState<{ name: string; price: string }[]>;
}

export const SetCarAccModal: FC<Props> = ({ setExternalAccs }) => {
    const dispatch = useDispatch();

    const { isShowSetCaraccModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const [accs, setAccs] = useState(
        CAR_ACCS.map((accArr) =>
            accArr.map((v) => ({
                label: v,
                checked: false,
                price: '0',
            })),
        ),
    );

    const handleCheck = (
        evt: ChangeEvent<HTMLInputElement>,
        arrFirstIdx: number,
        arrSecondIdx: number,
    ) => {
        const { checked } = evt.target;

        const flattenAccs = accs.flat();
        let checkedCount = 0;
        for (let i = 0; i < flattenAccs.length; i++) {
            if (flattenAccs[i].checked) {
                checkedCount++;
            }

            if (checkedCount === 4) {
                return alert('부속품은 4개까지 선택할 수 있습니다.');
            }
        }

        const next = [...accs];

        next[arrFirstIdx][arrSecondIdx] = {
            ...next[arrFirstIdx][arrSecondIdx],
            checked,
        };

        setAccs(next);
    };

    const handleChangePrice = (
        evt: ChangeEvent<HTMLInputElement>,
        arrFirstIdx: number,
        arrSecondIdx: number,
    ) => {
        const { value } = evt.target;

        const next = [...accs];

        next[arrFirstIdx][arrSecondIdx] = {
            ...next[arrFirstIdx][arrSecondIdx],
            price: value,
        };

        setAccs(next);
    };

    const handleClose = () => {
        dispatch(hideSetCaraccModal());
    };

    const handleSubmit = () => {
        const tf = confirm('선택한 정보로 입력하시겠습니까?');

        if (tf) {
            const next = Array.from({ length: 4 }).map((v) => ({
                name: '',
                price: '0',
            }));

            const checkedAccs = accs
                .flat()
                .filter((v) => v.checked)
                .map((v) => ({
                    name: v.label,
                    price: (+v.price).toLocaleString(),
                }));

            let checkedCount = 0;
            for (let i = 0; i < checkedAccs.length; i++) {
                next[checkedCount] = checkedAccs[i];

                checkedCount++;
            }

            setExternalAccs(next);

            handleClose();
        }
    };

    return (
        <Modal isOpen={isShowSetCaraccModal} toggle={handleClose} size="xl">
            <ModalHeader toggle={handleClose}>부속품 코드</ModalHeader>
            <ModalBody>
                <div className="wr-table--normal">
                    <table className="wr-table table">
                        <thead>
                            <tr>
                                <th colSpan={8}>
                                    <strong>구분</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {accs.map((accArr, i) => (
                                <tr key={`caracc${i}`}>
                                    {accArr.map((v, idx) => (
                                        <Fragment key={`caracc${v.label}`}>
                                            <td
                                                style={{
                                                    background: '#e8edef',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 120,
                                                    }}
                                                    className="d-flex justify-content-start align-items-center"
                                                >
                                                    <MyCheckbox
                                                        label={v.label}
                                                        checked={v.checked}
                                                        onChange={(evt) =>
                                                            handleCheck(
                                                                evt,
                                                                i,
                                                                idx,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <MyInput
                                                    className="text-end"
                                                    onChange={(evt) =>
                                                        handleChangePrice(
                                                            evt,
                                                            i,
                                                            idx,
                                                        )
                                                    }
                                                    value={v.price.toLocaleString()}
                                                    unit="만원"
                                                />
                                            </td>
                                        </Fragment>
                                    ))}
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
