import type { FC, FormEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { CustomerState } from '@reducers/customer';
import type { UserCustomer } from '@models/customer';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyRadio } from '@components/radio';
import { hideContractorSearchModal } from '@actions/modal/customer-search.action';
import { convertPhoneNumber, convertResidentNumber } from '@utils/converter';
import { updateLoadedContractor } from '@actions/contract/set-contractor.action';
import { ModalState } from '@reducers/modal';
import { useApi } from '@hooks/use-api';
import { getUserCustomersRequest } from '@actions/customer/get-user-customers';
import { useInput } from '@hooks/use-input';
import { isEmpty } from '@utils/validator/common';
import { FloatInput } from '@components/input/Float';
import { InputSearchButton } from '@components/button/InputSearch';
import { getCustomerRequest } from '@actions/customer/get-customer';

interface Props {
    userid: string;
}

export const CustomerSearchModal: FC<Props> = ({ userid }) => {
    const dispatch = useDispatch();

    const { userCustomers } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    const { isShowContractorSearchModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const getUserCustomers = useApi(getUserCustomersRequest);

    const getCustomer = useApi(getCustomerRequest);

    // 계약자명
    const [name] = useInput('');
    // 선택된 고객
    const [checked, setChecked] = useState<UserCustomer | null>(null);

    const handleSearch = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (isEmpty(name.value)) {
            return alert(`계약자명을 입력해주세요.`);
        }

        getUserCustomers({ userid, username: name.value });
    };

    const handleClose = () => {
        dispatch(hideContractorSearchModal());
    };

    const handleSubmit = () => {
        if (checked) {
            getCustomer({ idx: checked.idx.toString() }, ({ data }) => {
                dispatch(updateLoadedContractor(data));

                handleClose();
            });
        } else {
            alert('고객을 선택하세요');
        }
    };

    const handleClickRow = (v: UserCustomer) => {
        setChecked(v);
    };
    // 검색 시 선택 초기화
    useEffect(() => {
        setChecked(null);
    }, [userCustomers]);

    return (
        <Modal
            isOpen={isShowContractorSearchModal}
            toggle={handleClose}
            size="xl"
        >
            <ModalHeader toggle={handleClose}>계약자 검색</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="flex-fill"></div>
                    <div className="flex-fill"></div>
                    <form className="flex-fill" onSubmit={handleSearch}>
                        <FloatInput
                            type="search"
                            label="계약자명"
                            after={<InputSearchButton type="submit" />}
                            {...name}
                        />
                    </form>
                </div>
                <div
                    className="wr-table--scrollable wr-table--hover wr-mt wr-border wr-table__wrap"
                    style={{ maxHeight: 500 }}
                >
                    <table className="wr-table table">
                        <thead>
                            <tr>
                                <th style={{ width: '30px' }}>선택</th>
                                <th>고객구분</th>
                                <th>이름(회사명)</th>
                                <th>주민번호(사업자등록번호)</th>
                                <th>핸드폰(대표전화)</th>
                                <th>생일</th>
                                <th>최근 수정일</th>
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
                                    key={`customer${i}`}
                                    onClick={() => handleClickRow(v)}
                                >
                                    <td>
                                        <MyRadio
                                            label=""
                                            name="mProduct"
                                            readOnly
                                            checked={checked?.idx === v.idx}
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
