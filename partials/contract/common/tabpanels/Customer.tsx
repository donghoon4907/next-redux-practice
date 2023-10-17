import type { FC, FormEvent, ChangeEvent } from 'react';
import type { Insured } from '@models/insured';
import type { Spe } from '@models/spe';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import type { CoreEditableComponent } from '@interfaces/core';
import type { UseSelectOutput } from '@hooks/use-select';
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
import { showContractorSearchModal } from '@actions/modal/customer-search.action';
import {
    deleteInsured,
    updateInsured,
} from '@actions/contract/common/set-insured.action';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { CarInsuredForm } from '@partials/contract/car/InsuredForm';
import { GeneralInsuredForm } from '@partials/contract/general/InsuredForm';
import { LongInsuredForm } from '@partials/contract/long/InsuredForm';
import { LongInsuredTemplate } from '@partials/contract/long/template/Insured';
import { GeneralInsuredTemplate } from '@partials/contract/general/template/Insured';
import { CarInsuredTemplate } from '@partials/contract/car/template/Insured';
import { PostcodeTemplate } from '@partials/common/template/Postcode';

interface Props extends MyTabpanelProps, CoreEditableComponent {
    userid: string;
    spe: Spe;
    carfamilyHooks?: UseSelectOutput;
    carageHooks?: UseSelectOutput;
}

export const CustomerTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    userid,
    spe,
    carfamilyHooks,
    carageHooks,
}) => {
    const dispatch = useDispatch();

    const { loadedContract, insureds } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    const getUserCustomers = useApi(getUserCustomersRequest);

    // 계약자명
    const [username, setUsername] = useInput('', { noSpace: true });

    const labelType = editable ? 'active' : 'disable';
    // 계약자 설정을 안했다는 알림 보이기 여부
    const isShowNoContractAlert = !editable && !loadedContract;
    // 피보험자 설정을 안했다는 알림 보이기 여부
    const isShowNoInsuredAlert = !editable && insureds.length === 0;

    const handleSearchCustomer = (evt: FormEvent) => {
        evt.preventDefault();

        if (isEmpty(username.value)) {
            return alert('계약자명을 입력하세요.');
        }

        getUserCustomers({ userid, username: username.value }, () => {
            dispatch(showContractorSearchModal());
        });
    };

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Insured) => {
        dispatch(updateInsured({ ...v, checked: evt.target.checked }));
    };

    const handleDelete = () => {
        if (insureds.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 피보험자를 선택해주세요.');
        }

        insureds
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteInsured({ index: v.index }));
            });
    };

    useEffect(() => {
        if (loadedContract) {
            setUsername(loadedContract.name);
        } else {
            setUsername('');
        }
    }, [loadedContract]);

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-7 wr-frame__tabbody overflow-auto">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__title">
                            <strong>계약자 설정</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            {isShowNoContractAlert ? (
                                <div className="wr-pages-detail__center">
                                    계약자가 설정되지 않았습니다.
                                </div>
                            ) : (
                                <form onSubmit={handleSearchCustomer}>
                                    <WithLabel
                                        id="ct_name"
                                        label="계약자명"
                                        type={labelType}
                                    >
                                        <MyInput
                                            type="search"
                                            id="ct_name"
                                            placeholder="계약자명"
                                            disabled={!editable}
                                            {...username}
                                            button={
                                                editable
                                                    ? {
                                                          type: 'submit',
                                                          className:
                                                              'btn-primary btn-md',
                                                          children: (
                                                              <>
                                                                  <span>
                                                                      고객정보연결
                                                                  </span>
                                                              </>
                                                          ),
                                                      }
                                                    : undefined
                                            }
                                        />
                                    </WithLabel>
                                </form>
                            )}

                            {loadedContract && (
                                <>
                                    <div className="row wr-mt">
                                        <div className="col">
                                            <WithLabel
                                                id="ct_custtype"
                                                label="고객구분"
                                                type="disable"
                                            >
                                                <MyInput
                                                    id="ct_custtype"
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
                                        <div className="col">
                                            <WithLabel
                                                id="ct_sourceroot"
                                                label="유입경로"
                                                type="disable"
                                            >
                                                <MyInput
                                                    id="ct_sourceroot"
                                                    disabled={true}
                                                    value={
                                                        loadedContract.sourceroot
                                                    }
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col">
                                            <WithLabel
                                                id="ct_mobile"
                                                label="핸드폰"
                                                type="disable"
                                            >
                                                <MyInput
                                                    id="ct_mobile"
                                                    placeholder="핸드폰"
                                                    disabled={true}
                                                    value={convertPhoneNumber(
                                                        loadedContract.mobile,
                                                    )}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col">
                                            <WithLabel
                                                id="ct_email"
                                                label="이메일"
                                                type="disable"
                                            >
                                                <MyInput
                                                    id="ct_email"
                                                    placeholder="이메일"
                                                    disabled={true}
                                                    value={
                                                        loadedContract.emailhome
                                                    }
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    {loadedContract.custtype === 0 && (
                                        <PostcodeTemplate
                                            index={0}
                                            isMt={true}
                                            labelType="disable"
                                            disabled={true}
                                            postcode={loadedContract.postcode}
                                            address1={loadedContract.address1}
                                            address2={loadedContract.address2}
                                            address3={loadedContract.address3}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {spe === 'car' && (
                        <div className="row wr-mt">
                            <div className="col">
                                <WithLabel
                                    label="운전자범위"
                                    id="ct_carfamily"
                                    type={labelType}
                                >
                                    <MySelect
                                        id="ct_carfamily"
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...carfamilyHooks}
                                    />
                                </WithLabel>
                            </div>
                            <div className="col">
                                <WithLabel
                                    label="최저연령"
                                    id="ct_carage"
                                    type={labelType}
                                >
                                    <MySelect
                                        id="ct_carage"
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                        {...carageHooks}
                                    />
                                </WithLabel>
                            </div>
                        </div>
                    )}
                    <div className="wr-pages-detail__block wr-mt">
                        <div className="wr-pages-detail__title">
                            <strong>
                                {spe === 'gen'
                                    ? '피보험물(자) 목록'
                                    : '피보험자 목록'}
                            </strong>
                            {editable && (
                                <div>
                                    <MyButton
                                        className="btn-danger btn-sm"
                                        onClick={handleDelete}
                                    >
                                        선택삭제
                                    </MyButton>
                                </div>
                            )}
                        </div>
                        {isShowNoInsuredAlert && (
                            <div className="wr-pages-detail__content">
                                <div className="wr-pages-detail__center">
                                    데이터가 없습니다.
                                </div>
                            </div>
                        )}

                        {insureds.map((v, index) => (
                            <div
                                className="wr-pages-detail__content"
                                key={`insureds${index}`}
                            >
                                <div className="row">
                                    {editable && (
                                        <div
                                            className="col-1"
                                            style={{ width: 20 }}
                                        >
                                            <MyCheckbox
                                                id="ct_all_check"
                                                label=""
                                                checked={v.checked}
                                                onChange={(evt) =>
                                                    handleCheck(evt, v)
                                                }
                                            />
                                        </div>
                                    )}

                                    <div className="col">
                                        {spe === 'long' && (
                                            <LongInsuredTemplate {...v} />
                                        )}
                                        {spe === 'gen' && (
                                            <GeneralInsuredTemplate {...v} />
                                        )}
                                        {spe === 'car' && (
                                            <CarInsuredTemplate {...v} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {editable && (
                            <>
                                {spe === 'long' && (
                                    <LongInsuredForm userid={userid} />
                                )}
                                {spe === 'gen' && (
                                    <GeneralInsuredForm userid={userid} />
                                )}
                                {spe === 'car' && <CarInsuredForm />}
                            </>
                        )}
                    </div>
                </div>
                <div className="col">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__lock">
                            <p>준비 중입니다.</p>
                        </div>
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
                                                "
                                                
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
                                                "
                                                
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
        </MyTabpanel>
    );
};
