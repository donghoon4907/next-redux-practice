import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { CommonState } from '@reducers/common';
import type { CoreEditableComponent } from '@interfaces/core';
import {
    UncontrolledAccordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MyTableExtension } from '@components/table/Extension';
import { showUserHistoryModal } from '@actions/modal/user-history.action';

interface Props extends CoreEditableComponent {
    defaultTitle: string;
}

export const LongManagerAccordion: FC<Props> = ({ editable, defaultTitle }) => {
    const dispatch = useDispatch();

    const { userHistories, newUserHistory } = useSelector<
        AppState,
        CommonState
    >((state) => state.common);

    const handleShowModal = () => {
        dispatch(showUserHistoryModal());
    };

    let title = '';
    // 소속이 있는지 여부(이관된 데이터의 경우 없을 수 있음)
    // let isGroup = false;
    if (newUserHistory) {
        title += `${newUserHistory.department} ${newUserHistory.username}`;
    } else {
        title = defaultTitle;
        // const lastHistory = userHistories[userHistories.length - 1];
        // if (lastHistory.group) {
        //     title += `${lastHistory.group} ${lastHistory.username}`;
        //     isGroup = true;
        // } else {
        //     title += lastHistory.username;
        // }
    }

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
                                    <th>기준일</th>
                                    <th>사원번호</th>
                                    <th>사용인명</th>
                                    <th>사용인코드</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userHistories.length === 0 && (
                                    <tr>
                                        <td colSpan={4}>이력이 없습니다.</td>
                                    </tr>
                                )}
                                {userHistories.map((v, i) => (
                                    <tr key={`user_his${i}`}>
                                        <td>
                                            <span>
                                                {v.gdate ? v.gdate : '-'}
                                            </span>
                                        </td>
                                        {/* <td>
                                            <span>{v.dist ? v.dist : '-'}</span>
                                        </td> */}
                                        <td>
                                            <span>
                                                {v.userid ? v.userid : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.username ? v.username : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.fccode ? v.fccode : '-'}
                                            </span>
                                        </td>
                                        {/* {editable && (
                                            <td style={{ width: 30 }}>
                                                <MyButton className="btn-primary btn-sm">
                                                    수정
                                                </MyButton>
                                            </td>
                                        )} */}
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
