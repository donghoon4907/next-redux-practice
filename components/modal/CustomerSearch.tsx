import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { CustomerState } from '@reducers/customer';
import type { UserCustomer } from '@models/customer';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyRadio } from '@components/radio';
import {
    hideContractorSearchModal,
    hideInsuredSearchModal,
} from '@actions/modal/customer-search.action';
import { convertPhoneNumber, convertResidentNumber } from '@utils/converter';
import { useApi } from '@hooks/use-api';
import { getCustomerRequest } from '@actions/customer/get-customer';
import {
    updateLoadedContractor,
    updateLoadedInsured,
} from '@actions/contract/set-contractor.action';

interface Props {
    type: 'contractor' | 'insured-person';
}

export const CustomerSearchModal: FC<Props> = ({ type }) => {
    const dispatch = useDispatch();

    const getCustomer = useApi(getCustomerRequest);

    const { userCustomers } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    // 선택된 고객
    const [checkedCustomer, setCheckedCustomer] = useState<UserCustomer | null>(
        null,
    );

    const handleClose = () => {
        if (type === 'contractor') {
            dispatch(hideContractorSearchModal());
        } else if (type === 'insured-person') {
            dispatch(hideInsuredSearchModal());
        }
    };

    const handleSubmit = () => {
        if (checkedCustomer) {
            getCustomer({ idx: checkedCustomer.idx }, ({ data }) => {
                if (type === 'contractor') {
                    dispatch(updateLoadedContractor(data));
                } else if (type === 'insured-person') {
                    dispatch(updateLoadedInsured(data));
                }
                handleClose();
            });
        } else {
            alert('고객을 선택하세요');
        }
    };

    const handleClickRow = (v: UserCustomer) => {
        setCheckedCustomer(v);
    };

    useEffect(() => {
        setCheckedCustomer(null);
    }, [userCustomers]);

    return (
        <Modal isOpen toggle={handleClose} size="xl">
            <ModalHeader toggle={handleClose}>고객 선택</ModalHeader>
            <ModalBody>
                <div
                    className="wr-table--scrollable wr-table--hover wr-mt wr-border wr-table__wrap"
                    style={{ maxHeight: 500 }}
                >
                    <table className="wr-table table">
                        <thead>
                            <tr>
                                {userCustomers.length !== 0 && (
                                    <th style={{ width: '30px' }}>선택</th>
                                )}
                                <th style={{ width: '100px' }}>
                                    <strong>고객구분</strong>
                                </th>
                                <th style={{ width: '100px' }}>
                                    <strong>이름(회사명)</strong>
                                </th>
                                <th style={{ width: '100px' }}>
                                    <strong>주민번호(사업자등록번호)</strong>
                                </th>
                                <th style={{ width: '100px' }}>
                                    <strong>핸드폰(대표전화)</strong>
                                </th>
                                <th style={{ width: '100px' }}>
                                    <strong>생일</strong>
                                </th>
                                <th style={{ width: '100px' }}>
                                    <strong>최근 수정일</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCustomers.length === 0 && (
                                <tr>
                                    <td colSpan={7}>고객이 없습니다.</td>
                                </tr>
                            )}
                            {userCustomers.map((v, i) => (
                                <tr
                                    key={`myCustomer${i}`}
                                    onClick={() => handleClickRow(v)}
                                >
                                    <td>
                                        <MyRadio
                                            label=""
                                            name="mProduct"
                                            readOnly
                                            checked={
                                                checkedCustomer?.idx === v.idx
                                            }
                                        />
                                    </td>
                                    <td>
                                        <span>{v.custtype}</span>
                                    </td>
                                    <td>
                                        <span>{v.name}</span>
                                    </td>
                                    <td>
                                        <span>
                                            {convertResidentNumber(v.idnum)}
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {convertPhoneNumber(v.mobile)}
                                        </span>
                                    </td>
                                    <td>
                                        <span>{v.birthday}</span>
                                    </td>
                                    <td>
                                        <span>{v.lastupdate}</span>
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
