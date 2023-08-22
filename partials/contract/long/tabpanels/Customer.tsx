import type { FC, FormEvent } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { MyCheckbox } from '@components/checkbox';
import { MyButton } from '@components/button';
import { useInput } from '@hooks/use-input';
import { useApi } from '@hooks/use-api';
import { getUserCustomersRequest } from '@actions/customer/get-user-customers';
import { isEmpty } from '@utils/validator/common';
import { convertPhoneNumber } from '@utils/converter';
import { InsuredPersonTemplate } from '../template/InsuredPerson';
import { InsuredPersonForm } from '../InsuredPersonForm';
import { showContractorSearchModal } from '@actions/modal/customer-search.action';

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

    const { loadedContract, insuredPeople } = useSelector<AppState, LongState>(
        (state) => state.long,
    );

    const getUserCustomers = useApi(getUserCustomersRequest);

    // 계약자명
    const [username, setUsername] = useInput('', { noSpace: true });

    // const [addCount, setAddCount] = useState(1);

    const labelType = editable ? 'active' : 'disable';

    const handleSearchCustomer = (evt: FormEvent) => {
        evt.preventDefault();

        if (isEmpty(username.value)) {
            return alert('계약자명을 입력하세요.');
        }

        getUserCustomers({ userid, username: username.value }, () => {
            dispatch(showContractorSearchModal());
        });
    };

    useEffect(() => {
        if (loadedContract) {
            setUsername(loadedContract.name);
        }
    }, [loadedContract, setUsername]);

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-7">
                    <div className="row">
                        <div className="col">
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__title">
                                    <strong>계약자 설정</strong>
                                    <div></div>
                                </div>
                                <div className="wr-pages-detail__content">
                                    <form onSubmit={handleSearchCustomer}>
                                        <WithLabel
                                            id="cname"
                                            label="계약자명"
                                            type={labelType}
                                        >
                                            <MyInput
                                                type="search"
                                                id="cname"
                                                placeholder="계약자명"
                                                disabled={!editable}
                                                {...username}
                                                button={{
                                                    type: 'submit',
                                                    className:
                                                        'btn-primary btn-md',
                                                    disabled: !editable,
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
                                    </form>
                                    {loadedContract && (
                                        <>
                                            <div className="row wr-mt">
                                                <div className="col-6">
                                                    <WithLabel
                                                        label="고객구분"
                                                        type="disable"
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            disabled={true}
                                                            value={
                                                                loadedContract.custtype ===
                                                                0
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
                                                                value={
                                                                    loadedContract.sourceroot
                                                                }
                                                            />
                                                        </WithLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row wr-mt">
                                                <div className="col-6">
                                                    <WithLabel
                                                        label="핸드폰"
                                                        type="disable"
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            placeholder="핸드폰"
                                                            disabled={true}
                                                            value={convertPhoneNumber(
                                                                loadedContract.mobile,
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
                                                                value={
                                                                    loadedContract.emailhome
                                                                }
                                                            />
                                                        </WithLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row wr-mt">
                                                <div className="col-6">
                                                    <WithLabel
                                                        label="우편번호"
                                                        type="disable"
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            placeholder="우편번호"
                                                            disabled={true}
                                                            value={
                                                                loadedContract.postcode
                                                            }
                                                        />
                                                    </WithLabel>
                                                </div>
                                                <div className="col-6">
                                                    <div className="wr-ml">
                                                        <MyInput
                                                            type="text"
                                                            placeholder="주소1"
                                                            disabled={true}
                                                            value={
                                                                loadedContract.address1
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row wr-mt">
                                                <div className="col-6">
                                                    <WithLabel
                                                        label="상세주소"
                                                        type="disable"
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            placeholder="우편번호"
                                                            disabled={true}
                                                            value={
                                                                loadedContract.address3
                                                            }
                                                        />
                                                    </WithLabel>
                                                </div>
                                                <div className="col-6">
                                                    <div className="wr-ml">
                                                        <MyInput
                                                            type="text"
                                                            placeholder="주소2"
                                                            disabled={true}
                                                            value={
                                                                loadedContract.address2
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wr-pages-detail__block wr-mt">
                        <div className="wr-pages-detail__title">
                            <strong>피보험자 등록</strong>
                            <div></div>
                        </div>
                        <div className="wr-pages-detail__content">
                            <InsuredPersonForm userid={userid} />
                        </div>
                    </div>
                    {insuredPeople.length > 0 && (
                        <div className="wr-pages-detail__block wr-mt">
                            <div className="wr-pages-detail__title">
                                <strong>피보험자 목록</strong>
                                <div>
                                    <MyButton className="btn-danger btn-sm">
                                        선택삭제
                                    </MyButton>
                                </div>
                            </div>
                            {insuredPeople.map((v, index) => (
                                <div
                                    className="wr-pages-detail__content"
                                    key={`iPerson${index}`}
                                >
                                    <div className="row">
                                        <div
                                            className="col-1"
                                            style={{ width: 20 }}
                                        >
                                            <MyCheckbox label="" />
                                        </div>
                                        <div className="col">
                                            <div className="wr-ml">
                                                <InsuredPersonTemplate {...v} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-5">
                    <div className="wr-ml">
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__title">
                                <strong>개인정보활용동의</strong>
                            </div>
                            <div className="wr-pages-detail__content">
                                <div className="wr-pages-detail__with">
                                    <div style={{ flex: 1 }}>
                                        <MyButton
                                            className="btn-primary"
                                            style={{ width: '100%' }}
                                        >
                                            NICE
                                        </MyButton>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <MyButton
                                            className="btn-primary"
                                            style={{ width: '100%' }}
                                        >
                                            모바일
                                        </MyButton>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <MyButton
                                            className="btn-primary"
                                            style={{ width: '100%' }}
                                        >
                                            업로드
                                        </MyButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__lock">
                                <p>준비 중입니다.</p>
                            </div>
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
                            <div className="wr-pages-detail__lock">
                                <p>준비 중입니다.</p>
                            </div>
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
                            <div className="wr-pages-detail__lock">
                                <p>준비 중입니다.</p>
                            </div>
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
                            <div className="wr-pages-detail__lock">
                                <p>준비 중입니다.</p>
                            </div>
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
                        </div> */}
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
