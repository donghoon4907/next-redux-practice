import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { AppState } from '@reducers/index';
import type { CustomerState } from '@reducers/customer';
import { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlinePicture } from 'react-icons/ai';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyCheckbox } from '@components/checkbox';
import { MyDatepicker } from '@components/datepicker';
import { MyButton } from '@components/button';
import { useInput } from '@hooks/use-input';
import { useApi } from '@hooks/use-api';
import { showCustomerSearchModal } from '@actions/modal/customer-search.action';
import { getUserCustomersRequest } from '@actions/customer/get-user-customers';
import { isEmpty } from '@utils/validator/common';
import { convertPhoneNumber } from '@utils/converter';

interface Props extends MyTabpanelProps {
    editable: boolean;
    userid: string;
}

export const CustomerTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    userid,
}) => {
    const dispatch = useDispatch();

    const { customer } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    const getUserCustomers = useApi(getUserCustomersRequest);

    // 계약자명
    const [username, setUsername] = useInput('', { noSpace: true });

    const [addCount, setAddCount] = useState(1);

    const labelType = editable ? 'active' : 'disable';

    const handleClickConnectCustomer = () => {
        if (isEmpty(username.value)) {
            return alert('계약자명을 입력하세요.');
        }

        getUserCustomers({ userid, username: username.value }, () => {
            dispatch(showCustomerSearchModal());
        });
    };

    useEffect(() => {
        if (customer) {
            setUsername(customer.name);
        }
    }, [customer, setUsername]);

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col">
                            <WithLabel
                                id="cname"
                                label="계약자명"
                                type={labelType}
                            >
                                <MyInput
                                    type="text"
                                    id="cname"
                                    placeholder="계약자명"
                                    disabled={!editable}
                                    {...username}
                                    button={{
                                        type: 'button',
                                        className: 'btn-primary btn-md',
                                        disabled: !editable,
                                        onClick: handleClickConnectCustomer,
                                        children: (
                                            <>
                                                <span>고객정보연결</span>
                                            </>
                                        ),
                                    }}
                                />
                            </WithLabel>
                        </div>
                    </div>
                    {customer && (
                        <>
                            <div className="row wr-mt">
                                <div className="col-6">
                                    <WithLabel label="고객구분" type="disable">
                                        <MyInput
                                            type="text"
                                            disabled={true}
                                            value={
                                                customer.custtype === 0
                                                    ? '개인'
                                                    : '법인'
                                            }
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col-6">
                                    <div className="wr-ml">
                                        <WithLabel
                                            label="유입경로"
                                            type="disable"
                                        >
                                            <MyInput
                                                type="text"
                                                disabled={true}
                                                value={customer.sourceroot}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col-6">
                                    <WithLabel label="핸드폰" type="disable">
                                        <MyInput
                                            type="text"
                                            placeholder="핸드폰"
                                            disabled={true}
                                            value={convertPhoneNumber(
                                                customer.mobile,
                                            )}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col-6">
                                    <div className="wr-ml">
                                        <WithLabel
                                            label="이메일"
                                            type="disable"
                                        >
                                            <MyInput
                                                type="text"
                                                placeholder="이메일"
                                                disabled={true}
                                                value={customer.emailhome}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col-6">
                                    <WithLabel label="우편번호" type="disable">
                                        <MyInput
                                            type="text"
                                            placeholder="우편번호"
                                            disabled={true}
                                            value={customer.postcode}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col-6">
                                    <div className="wr-ml">
                                        <MyInput
                                            type="text"
                                            placeholder="주소1"
                                            disabled={true}
                                            value={customer.address1}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col-6">
                                    <WithLabel label="상세주소" type="disable">
                                        <MyInput
                                            type="text"
                                            placeholder="우편번호"
                                            disabled={true}
                                            value={customer.address3}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col-6">
                                    <div className="wr-ml">
                                        <MyInput
                                            type="text"
                                            placeholder="주소2"
                                            disabled={true}
                                            value={customer.address2}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <hr />
                    {Array.from({ length: addCount }).map((v, index) => (
                        <Fragment key={`iPerson${index}`}>
                            <div className="wr-pages-detail__toolbar wr-mt">
                                <div className="wr-pages-detail__buttons">
                                    <MyCheckbox
                                        label="계약자와 동일"
                                        disabled
                                    />
                                    <MyCheckbox label="태아" disabled />
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col">
                                    <WithLabel
                                        id="iPerson"
                                        label="피보험자"
                                        type={labelType}
                                    >
                                        <MyInput
                                            type="text"
                                            id="iPerson"
                                            placeholder="피보험자"
                                            disabled={!editable}
                                            button={{
                                                type: 'button',
                                                disabled: !editable,
                                                className: 'btn-primary btn-md',
                                                children: (
                                                    <>
                                                        <span>
                                                            고객정보연결
                                                        </span>
                                                    </>
                                                ),
                                            }}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col">
                                    <WithLabel
                                        id="homePhone"
                                        label="연락처"
                                        type={labelType}
                                    >
                                        <MyInput
                                            type="text"
                                            id="homePhone"
                                            placeholder="연락처"
                                            disabled={!editable}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col">
                                    <WithLabel
                                        id="birthday"
                                        label="생년월일"
                                        type={labelType}
                                    >
                                        <MyDatepicker
                                            id="birthday"
                                            size="md"
                                            placeholder="생년월일"
                                            disabled={!editable}
                                        />
                                        <div
                                            className="wr-with__extension wr-form__unit wr-border-l--hide"
                                            style={{ height: 36 }}
                                        >
                                            만 60세
                                        </div>
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col-6">
                                    <WithLabel
                                        id="job"
                                        label="직업"
                                        type={labelType}
                                    >
                                        <MySelect
                                            placeholder="선택"
                                            placeHolderFontSize={16}
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col-3">
                                    {index === addCount - 1 && index !== 0 && (
                                        <MyButton
                                            className="btn-danger"
                                            style={{ width: '100%' }}
                                            onClick={() =>
                                                setAddCount(addCount - 1)
                                            }
                                        >
                                            피보험자 제거
                                        </MyButton>
                                    )}
                                </div>
                                <div className="col-3">
                                    {index === addCount - 1 && (
                                        <MyButton
                                            className="btn-primary"
                                            style={{ width: '100%' }}
                                            onClick={() =>
                                                setAddCount(addCount + 1)
                                            }
                                        >
                                            피보험자 추가
                                        </MyButton>
                                    )}
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__title">
                                <strong>시스템사용</strong>
                            </div>
                            <div className="wr-pages-detail__content">
                                <div className="wr-pages-detail__with">
                                    <div>
                                        NICE&nbsp;&nbsp;&nbsp;&nbsp;2023-06-01
                                        14:15
                                    </div>
                                    <div>
                                        <MyButton className="btn-primary">
                                            보기
                                        </MyButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__title">
                                <strong>금융소비자보호법모니터링</strong>
                            </div>
                            <div className="wr-pages-detail__content">
                                <div className="wr-pages-detail__with">
                                    <div>
                                        NICE&nbsp;&nbsp;&nbsp;&nbsp;2023-06-01
                                        14:15
                                    </div>
                                    <div>
                                        <MyButton className="btn-primary">
                                            보기
                                        </MyButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__title">
                                <strong>완전판매모니터링</strong>
                            </div>
                            <div className="wr-pages-detail__content">
                                <div className="wr-pages-detail__subtitle">
                                    <div>
                                        모바일&nbsp;&nbsp;&nbsp;&nbsp;2023-06-01
                                        14:15
                                    </div>
                                    <div>
                                        <MyButton className="btn-primary">
                                            보기
                                        </MyButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__title">
                                <strong>상품비교설명확인</strong>
                            </div>
                            <div className="wr-pages-detail__content">
                                <div
                                    className="wr-pages-detail__center"
                                    style={{ width: '100%', height: 130 }}
                                >
                                    <AiOutlinePicture
                                        size={50}
                                        fill="#0B5ED7"
                                    />
                                </div>
                                <span>* 클릭시 확대</span>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__title">
                                <strong>청약관리</strong>
                            </div>
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="col">
                                        <WithLabel
                                            id="signature"
                                            label="고객서명"
                                            type={labelType}
                                        >
                                            <MySelect
                                                placeholder="선택"
                                                placeHolderFontSize={16}
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="col">
                                        <WithLabel
                                            id="sSubmit"
                                            label="청약서 제출"
                                            type={labelType}
                                        >
                                            <MySelect
                                                placeholder="선택"
                                                placeHolderFontSize={16}
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
