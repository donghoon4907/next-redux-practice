import type { FC, ChangeEvent } from 'react';
import type { Contact } from '@models/contact';
import type { Spe } from '@models/spe';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CommonState } from '@reducers/common';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CreateContactPayload } from '@actions/common/set-contact.action';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyCheckbox } from '@components/checkbox';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyDatepicker } from '@components/datepicker';
import { MyButton } from '@components/button';
import { useSelect } from '@hooks/use-select';
import customerConstants from '@constants/options/customer';
import { useDatepicker } from '@hooks/use-datepicker';
import { useInput } from '@hooks/use-input';
import {
    createContact,
    deleteContact,
    updateContact,
} from '@actions/common/set-contact.action';
import { generateIndex } from '@utils/generate';
import { findSelectOption } from '@utils/getter';

interface Props extends MyTabpanelProps {
    editable: boolean;
    spe: Spe;
    // cnum: string;
}

export const ContactTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    spe,
}) => {
    const dispatch = useDispatch();

    const findSpeSelectOption = findSelectOption(spe, customerConstants.spe);

    const { loggedInUser } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );
    const { contacts } = useSelector<AppState, CommonState>(
        (state) => state.common,
    );
    // 상담구분
    const [kind, setKind] = useSelect(customerConstants.counselingDivision);
    // 채널
    const [channel, setChannel] = useSelect(customerConstants.channel);
    // 계약종목
    const [_spe] = useSelect(customerConstants.spe, findSpeSelectOption);
    // 사유발생일
    const [issuedate, setIssuedate] = useDatepicker(null);
    // 응대예정일시
    const [replydatetime, setReplydatetimet] = useDatepicker(null);
    // 계약번호(미구현)
    // 진행상태
    const [status, setStatus] = useSelect(customerConstants.status, null);
    // 내용
    const [comment, setComment] = useInput('');

    const labelType = editable ? 'active' : 'disable';

    const handleReset = () => {
        const tf = confirm('설정한 내용을 초기화하시겠습니까?');

        if (tf) {
            setKind(customerConstants.counselingDivision[0]);
            setChannel(customerConstants.channel[0]);
            setIssuedate(null);
            setReplydatetimet(null);
            setStatus(null);
            setComment('');
        }
    };

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        contacts.forEach((v) => {
            dispatch(updateContact({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Contact) => {
        dispatch(updateContact({ ...v, checked: evt.target.checked }));
    };

    const handleCreate = () => {
        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            dispatch(createContact(payload));
        }
    };

    const handleDelete = () => {
        if (contacts.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 설정을 선택해주세요.');
        }

        contacts
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteContact({ index: v.index }));
            });
    };

    const createPayload = () => {
        const payload: CreateContactPayload = {
            index: generateIndex(contacts),
            kind: kind.value!.value,
            channel: channel.value!.value,
            comment: comment.value,
            insert_username: loggedInUser.user_info.name,
            insert_userid: loggedInUser.userid,
            checked: false,
            // spe: _spe.value!.value,
            // spe_label: _spe.value!.label,
        };

        if (issuedate.value) {
            payload['issuedate'] = dayjs(issuedate.value).format('YYYY-MM-DD');
        }

        if (replydatetime.value) {
            payload['replydatetime'] = dayjs(replydatetime.value).format(
                'YYYY-MM-DD HH:mm',
            );
        }

        if (status.value) {
            payload['status'] = status.value.value;
        }

        return payload;
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__title">
                            <strong>상담 설정</strong>
                            {/* <span className="wr-pages-detail__description">
                                작성일시: 2023-12-12 13:22
                            </span> */}
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="col">
                                    <WithLabel
                                        id="cot_kind"
                                        label="상담구분"
                                        type={labelType}
                                        // isRequired={editable}
                                    >
                                        <MySelect
                                            id="cot_kind"
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                            {...kind}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="cot_channel"
                                        label="채널"
                                        type={labelType}
                                        // isRequired={editable}
                                    >
                                        <MySelect
                                            id="cot_channel"
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                            {...channel}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="cot_spe"
                                        label="계약종목"
                                        type={labelType}
                                    >
                                        <MySelect
                                            id="cot_spe"
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={true}
                                            {..._spe}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col">
                                    <WithLabel
                                        id="cot_issuedate"
                                        label="사유발생일"
                                        type={labelType}
                                    >
                                        <MyDatepicker
                                            id="cot_issuedate"
                                            size="md"
                                            placeholder="사유발생일"
                                            disabled={!editable}
                                            hooks={issuedate}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="cot_replydatetime"
                                        label="응대예정일시"
                                        type={labelType}
                                    >
                                        <MyDatepicker
                                            id="cot_replydatetime"
                                            size="md"
                                            placeholder="응대예정일시"
                                            format="yyyy-MM-dd HH:mm"
                                            disabled={!editable}
                                            hooks={replydatetime}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <div className="position-relative">
                                        <div className="wr-pages-detail__lock">
                                            <p>준비 중입니다.</p>
                                        </div>
                                        <WithLabel
                                            id="cot_cnum"
                                            label="계약번호"
                                            type={labelType}
                                        >
                                            <MySelect
                                                id="cot_cnum"
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={true}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col-8">
                                    <div className="form-floating">
                                        <textarea
                                            className="form-control"
                                            placeholder="내용"
                                            id="cot_memo"
                                            {...comment}
                                            style={{
                                                height: editable ? 128 : 82,
                                            }}
                                            disabled={!editable}
                                        />
                                        <label htmlFor="cot_memo">내용</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="cot_status"
                                        label="진행상태"
                                        type={labelType}
                                    >
                                        <MySelect
                                            id="cot_status"
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                            {...status}
                                        />
                                    </WithLabel>
                                    <WithLabel
                                        id="cot_writer"
                                        label="작성자"
                                        type={labelType}
                                        // isRequired={editable}
                                    >
                                        <MyInput
                                            id="cot_writer"
                                            placeholder={`${loggedInUser.user_info.name} (${loggedInUser.userid})`}
                                            disabled
                                        />
                                    </WithLabel>
                                    {editable && (
                                        <div className="wr-pages-detail__toolbar wr-mt">
                                            <MyButton
                                                className="btn-outline-secondary btn-md"
                                                onClick={handleReset}
                                                disabled={!editable}
                                            >
                                                원래대로
                                            </MyButton>
                                            <MyButton
                                                className="btn-primary btn-md"
                                                onClick={handleCreate}
                                                disabled={!editable}
                                            >
                                                저장
                                            </MyButton>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {editable && (
                <div className="wr-pages-detail__subtitle wr-mt">
                    <div></div>
                    <div>
                        <MyButton
                            className="btn-danger btn-sm"
                            onClick={handleDelete}
                        >
                            선택삭제
                        </MyButton>
                    </div>
                </div>
            )}

            <div className="wr-table--normal wr-mt">
                <table className="wr-table table">
                    <thead>
                        <tr>
                            {editable && (
                                <th style={{ width: '30px' }}>
                                    <MyCheckbox
                                        id="cot_allcheck"
                                        label=""
                                        onChange={handleAllCheck}
                                    />
                                </th>
                            )}

                            <th style={{ width: '100px' }}>
                                <strong>상담구분</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>채널</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>계약종목</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>계약번호</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>사유발생일</strong>
                            </th>
                            <th>
                                <strong>내용</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>작성자</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>작성일시</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>응대예정일시</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>상태</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.length === 0 && (
                            <tr>
                                <td colSpan={editable ? 11 : 10}>
                                    접촉 이력이 없습니다.
                                </td>
                            </tr>
                        )}
                        {contacts.map((v, i) => (
                            <tr key={`contact${i}`}>
                                {editable && (
                                    <td>
                                        <MyCheckbox
                                            id={`cot_check${i}`}
                                            label=""
                                            checked={v.checked}
                                            onChange={(evt) =>
                                                handleCheck(evt, v)
                                            }
                                        />
                                    </td>
                                )}

                                <td>
                                    <span>{v.kind}</span>
                                </td>
                                <td>
                                    <span>{v.channel}</span>
                                </td>
                                <td>
                                    <span>{findSpeSelectOption.label}</span>
                                </td>
                                <td>
                                    <span>{v.cnum ? v.cnum : '-'}</span>
                                </td>
                                <td>
                                    <span>
                                        {v.issuedate ? v.issuedate : '-'}
                                    </span>
                                </td>
                                <td>
                                    <div
                                        className="text-truncate"
                                        style={{ width: 150 }}
                                    >
                                        {v.comment}
                                    </div>
                                </td>
                                <td>
                                    <span>{v.insert_username}</span>
                                    <br />
                                    <span>({v.insert_userid})</span>
                                </td>
                                <td>
                                    <span>
                                        {v.insert_datetime
                                            ? v.insert_datetime
                                            : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {v.replydatetime
                                            ? v.replydatetime
                                            : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>{v.status ? v.status : '-'}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MyTabpanel>
    );
};
