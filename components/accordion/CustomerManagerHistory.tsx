import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { CommonState } from '@reducers/common';
import type { CoreEditableComponent } from '@interfaces/core';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    UncontrolledAccordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
} from 'reactstrap';
import { showUserHistoryModal } from '@actions/modal/user-history.action';
import { MyTableExtension } from '@components/table/Extension';

interface Props extends CoreEditableComponent {
    defaultTitle: string;
}

export const CustomerManagerAccordion: FC<Props> = ({
    defaultTitle,
    editable,
}) => {
    const dispatch = useDispatch();

    const { userHistories, newUserHistory } = useSelector<
        AppState,
        CommonState
    >((state) => state.common);

    const [title, setTitle] = useState(defaultTitle);

    const handleShowModal = () => {
        dispatch(showUserHistoryModal());
    };

    useEffect(() => {
        if (newUserHistory) {
            setTitle(`${newUserHistory.department} ${newUserHistory.username}`);
        }
    }, [newUserHistory]);

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
                                    <th>등록일</th>
                                    <th>등록자</th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userHistories.length === 0 && (
                                    <tr>
                                        <td colSpan={3}>이력이 없습니다.</td>
                                    </tr>
                                )}
                                {userHistories.map((v, i) => (
                                    <tr key={`user_his${i}`}>
                                        <td>
                                            <span>
                                                {v.insert_date
                                                    ? v.insert_date
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>{`${v.username} (${v.userid})`}</span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.remark ? v.remark : '-'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {editable && (
                            <MyTableExtension onClick={handleShowModal} />
                        )}
                    </div>
                </AccordionBody>
            </AccordionItem>
        </UncontrolledAccordion>
    );
};
