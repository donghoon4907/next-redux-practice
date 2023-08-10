import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { useState, Fragment } from 'react';
import { useColumn } from '@hooks/use-column';
import { LONG_CHANGE_HISTORY } from '@constants/column';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyCheckbox } from '@components/checkbox';
import { MyDatepicker } from '@components/datepicker';
import { MyButton } from '@components/button';
import { AiOutlinePicture } from 'react-icons/ai';
import { BirthDayInput } from '@partials/common/input/Birthday';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const CustomerTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const [addCount, setAddCount] = useState(1);

    const labelType = editable ? 'active' : 'disable';

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col">
                            <WithLabel
                                id="cname"
                                label="계약자"
                                type={labelType}
                            >
                                <MyInput
                                    type="text"
                                    id="cname"
                                    placeholder="계약자"
                                    disabled={!editable}
                                    button={{
                                        type: 'button',
                                        disabled: !editable,
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
                    <div className="row wr-mt">
                        <div className="col-6">
                            <WithLabel
                                id="division"
                                label="고객구분"
                                type={labelType}
                            >
                                <MySelect
                                    inputId="division"
                                    placeholder="선택"
                                    height={variables.detailFilterHeight}
                                    isDisabled={!editable}
                                    // {...division}
                                />
                            </WithLabel>
                        </div>
                        <div className="col-6">
                            <div className="wr-ml">
                                <WithLabel
                                    id="inflowPath"
                                    label="유입경로"
                                    type={labelType}
                                >
                                    <MySelect
                                        inputId="inflowPath"
                                        placeholder="유입경로"
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                    />
                                </WithLabel>
                            </div>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="col">
                            <WithLabel
                                id="mobile"
                                label="핸드폰"
                                type={labelType}
                            >
                                <MyInput
                                    type="text"
                                    id="mobile"
                                    className="wr-border-r--hide"
                                    placeholder="핸드폰"
                                    disabled={!editable}
                                />
                                <div style={{ width: 280 }}>
                                    <MySelect
                                        placeholder={'선택'}
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                    />
                                </div>
                            </WithLabel>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="col">
                            <WithLabel
                                id="email"
                                label="이메일"
                                type={labelType}
                            >
                                <MyInput
                                    type="text"
                                    id="email"
                                    className="wr-border-r--hide"
                                    placeholder="이메일"
                                    disabled={!editable}
                                />
                                <div style={{ width: 280 }}>
                                    <MySelect
                                        placeholder={'선택'}
                                        placeHolderFontSize={16}
                                        height={variables.detailFilterHeight}
                                        isDisabled={!editable}
                                    />
                                </div>
                            </WithLabel>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="col-6">
                            <WithLabel label="주소" type={labelType}>
                                <div className="wr-pages-detail__with">
                                    <MyInput
                                        type="text"
                                        placeholder="우편번호"
                                        disabled
                                    />
                                </div>
                            </WithLabel>
                        </div>
                        <div className="col-6">
                            <MyInput
                                type="text"
                                className="wr-border-l--hide"
                                placeholder="주소1"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="col">
                            <WithLabel
                                id="addr2"
                                label="상세주소"
                                type={labelType}
                            >
                                <MyInput
                                    type="text"
                                    id="addr2"
                                    placeholder="상세주소"
                                    disabled={!editable}
                                />
                            </WithLabel>
                        </div>
                    </div>
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
                                        label="집전화"
                                        type={labelType}
                                    >
                                        <MyInput
                                            type="text"
                                            id="homePhone"
                                            placeholder="집전화"
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
                                        <div style={{ width: 100 }}>
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
