import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showUserHistoryModal } from '@actions/modal/user-history.action';
import { MyTableExtension } from '@components/table/Extension';
import {
    UncontrolledAccordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
} from 'reactstrap';

interface Props {
    defaultTitle: string;
    data: Array<any>;
}

export const CustomerManagerAccordion: FC<Props> = ({ defaultTitle, data }) => {
    const dispatch = useDispatch();

    const { selectedUser } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const [title, setTitle] = useState(defaultTitle);

    const handleShowModal = () => {
        dispatch(showUserHistoryModal());
    };

    useEffect(() => {
        if (selectedUser) {
            setTitle(`${selectedUser.department} ${selectedUser.name}`);
        }
    }, [selectedUser]);

    return (
        <UncontrolledAccordion stayOpen>
            <AccordionItem>
                <div className="wr-group wr-accordion__button--hide">
                    <span className="wr-pages-detail__department">{title}</span>
                    <AccordionHeader
                        targetId="user_his"
                        role="tab"
                        id="user_his"
                    >
                        <span className="btn btn-primary btn-sm">
                            담당변경이력
                        </span>
                    </AccordionHeader>
                </div>

                <AccordionBody
                    accordionId="user_his"
                    role="tabpanel"
                    aria-labelledby="user_his"
                >
                    <div className="wr-table--normal wr-mt">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    <th style={{ width: '150px' }}>
                                        <strong>등록일</strong>
                                    </th>
                                    <th style={{ width: '150px' }}>
                                        <strong>등록자</strong>
                                    </th>
                                    <th>
                                        <strong>비고</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 && selectedUser === null && (
                                    <tr>
                                        <td colSpan={3}>이력이 없습니다.</td>
                                    </tr>
                                )}
                                {data.map((v, i) => (
                                    <tr key={`customerManagerHistory${i}`}>
                                        <td>
                                            <span>
                                                {v.insert_datetime
                                                    ? v.insert_datetime
                                                    : ''}
                                            </span>
                                        </td>
                                        <td>
                                            <span>{`${v.name} (${v.userid})`}</span>
                                        </td>
                                        <td>
                                            <span>{v.remark}</span>
                                        </td>
                                    </tr>
                                ))}
                                {selectedUser && (
                                    <tr>
                                        <td>
                                            <span>-</span>
                                        </td>
                                        <td>
                                            <span>{`${selectedUser.name} (${selectedUser.userid})`}</span>
                                        </td>
                                        <td>
                                            <span>{selectedUser.remark}</span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <MyTableExtension onClick={handleShowModal} />
                    </div>
                </AccordionBody>
            </AccordionItem>
        </UncontrolledAccordion>
    );
};
