import type { FC } from 'react';
import type { Spe } from '@models/spe';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CommonState } from '@reducers/common';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CreateContactRequestPayload } from '@actions/common/create-contact.action';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyButton } from '@components/button';
import { useSelect } from '@hooks/use-select';
import customerConstants from '@constants/options/customer';
import { useDatepicker } from '@hooks/use-datepicker';
import { useInput } from '@hooks/use-input';
import { findSelectOption } from '@utils/getter';
import { FloatSelect } from '@components/select/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { FloatInput } from '@components/input/Float';
import { useApi } from '@hooks/use-api';
import { getContactsRequest } from '@actions/common/get-contacts.action';
import { CreateContactDTO } from '@dto/common/Contact.dto';
import { createContactRequest } from '@actions/common/create-contact.action';

interface Props extends MyTabpanelProps {
    editable: boolean;
    cust_idx: number;
    spe_idx: number;
    spe: Spe;
    cnum: string;
}

export const SingleContactTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    cust_idx,
    spe_idx,
    spe,
    cnum,
}) => {
    const { loggedInUser } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );
    const { singleContacts } = useSelector<AppState, CommonState>(
        (state) => state.common,
    );

    const getContacts = useApi(getContactsRequest);

    const createContact = useApi(createContactRequest);

    // 상담구분
    const [kind, setKind] = useSelect(customerConstants.counselingDivision);
    // 채널
    const [channel, setChannel] = useSelect(customerConstants.channel);
    // 사유발생일
    const [issuedate, setIssuedate] = useDatepicker(null);
    // 응대예정일시
    const [replydatetime, setReplydatetimet] = useDatepicker(null);
    // 진행상태
    const [status, setStatus] = useSelect(customerConstants.status, null);
    // 내용
    const [comment, setComment] = useInput('');

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

    const handleCreate = () => {
        const payload = createPayload();

        const createDto = new CreateContactDTO(payload);

        if (createDto.requiredValidate()) {
            createContact(createDto.getPayload(), () => {
                alert('등록되었습니다.');

                getContacts({
                    cust_idx,
                    spe,
                    cnum,
                });
            });
        }
    };

    const createPayload = () => {
        const payload: CreateContactRequestPayload = {
            spe,
            cnum,
            m_idx: cust_idx,
            spe_idx,
            insert_userid: loggedInUser.userid,
        };

        if (kind.value) {
            payload['kind'] = kind.value.value;
        }

        if (channel.value) {
            payload['channel'] = channel.value.value;
        }

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

        if (comment.value) {
            payload['comment'] = comment.value;
        }

        return payload;
    };

    useEffect(() => {
        getContacts({
            cust_idx,
            spe,
            cnum,
        });
    }, [cust_idx, spe, cnum]);

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row wr-pages-detail__applydatepicker">
                <div className="flex-fill">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content p-15">
                            <div className="wr-table__toolbar">
                                <span>상담 설정</span>
                                <div className="d-flex">
                                    <MyButton
                                        className="btn-warning btn-sm"
                                        onClick={handleReset}
                                    >
                                        원래대로
                                    </MyButton>
                                    <MyButton
                                        className="btn-primary btn-sm wr-ml"
                                        onClick={handleCreate}
                                    >
                                        저장
                                    </MyButton>
                                </div>
                            </div>
                            <div className="row">
                                <div className="flex-fill">
                                    <FloatSelect label="상담구분" {...kind} />
                                </div>
                                <div className="flex-fill">
                                    <FloatSelect label="채널" {...channel} />
                                </div>
                                <div className="flex-fill">
                                    <FloatDatepicker
                                        label="사유발생일"
                                        hooks={issuedate}
                                    />
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="flex-fill">
                                    <FloatDatepicker
                                        label="응대예정일"
                                        format="yyyy-MM-dd HH:mm"
                                        hooks={replydatetime}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <FloatSelect label="진행상태" {...status} />
                                </div>
                                <div className="flex-fill">
                                    <FloatInput
                                        label="작성자"
                                        readOnly
                                        defaultValue={`${loggedInUser.user_info.name} (${loggedInUser.userid})`}
                                    />
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="flex-fill">
                                    <div className="form-floating">
                                        <textarea
                                            id="cot_memo"
                                            className="form-control wr-pages-detail__textarea"
                                            placeholder="내용"
                                            {...comment}
                                            style={{
                                                height: 128,
                                            }}
                                        />
                                        <label htmlFor="cot_memo">내용</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="wr-table--normal wr-mt">
                <table className="wr-table table">
                    <thead>
                        <tr>
                            {Object.entries(singleContacts.fields).map(
                                ([key, value]) => (
                                    <th key={`contact-${key}`}>
                                        {value as string}
                                    </th>
                                ),
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {singleContacts.rows.length === 0 && (
                            <tr>
                                <td colSpan={editable ? 11 : 10}>
                                    접촉 이력이 없습니다.
                                </td>
                            </tr>
                        )}
                        {singleContacts.rows.map((v: any, i: number) => (
                            <tr key={`contact${i}`}>
                                <td>{v.kind}</td>
                                <td>{v.channel}</td>
                                <td>
                                    {
                                        findSelectOption(
                                            spe,
                                            customerConstants.spe,
                                        ).label
                                    }
                                </td>
                                <td>{v.cnum ? v.cnum : '-'}</td>
                                <td>{v.issuedate ? v.issuedate : '-'}</td>
                                <td>
                                    {v.replydatetime ? v.replydatetime : '-'}
                                </td>

                                <td>{v.status}</td>
                                <td style={{ maxWidth: 150 }}>
                                    <div className="text-truncate">
                                        {v.comment}
                                    </div>
                                </td>
                                <td>
                                    {v.insert_datetime
                                        ? v.insert_datetime
                                        : '-'}
                                </td>
                                <td>
                                    {v.insert_userid ? v.insert_userid : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MyTabpanel>
    );
};
