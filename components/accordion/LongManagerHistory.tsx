import type { FC } from 'react';
import type { CoreEditableComponent } from '@interfaces/core';
import {
    UncontrolledAccordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@reducers/index';
import { CommonState } from '@reducers/common';
import { MyTableExtension } from '@components/table/Extension';
import { MyRadio } from '@components/radio';
import { showUserHistoryModal } from '@actions/modal/user-history.action';
import { MyButton } from '@components/button';

interface Props extends CoreEditableComponent {}

export const LongManagerAccordion: FC<Props> = ({ editable }) => {
    const dispatch = useDispatch();

    const { userHistories } = useSelector<AppState, CommonState>(
        (state) => state.common,
    );

    const handleShowModal = () => {
        dispatch(showUserHistoryModal());
    };

    return (
        <UncontrolledAccordion stayOpen>
            <AccordionItem>
                <div className="wr-group wr-accordion__button--hide">
                    <span className="wr-pages-detail__department">
                        {`${userHistories[userHistories.length - 1].group} ${
                            userHistories[userHistories.length - 1].username
                        }`}
                    </span>
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
                                    <th style={{ width: '100px' }}>
                                        <strong>기준일</strong>
                                    </th>
                                    {/* <th style={{ width: '100px' }}>
                                        <strong>구분</strong>
                                    </th> */}
                                    <th style={{ width: '100px' }}>
                                        <strong>사원번호</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>사용인명</strong>
                                    </th>
                                    <th>
                                        <strong>사용인코드</strong>
                                    </th>
                                    {editable && (
                                        <th style={{ width: '30px' }}></th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {userHistories.length === 0 && (
                                    <tr>
                                        <td colSpan={editable ? 5 : 4}>
                                            이력이 없습니다.
                                        </td>
                                    </tr>
                                )}
                                {userHistories.map((v, i) => (
                                    <tr key={`longManagerHistory${i}`}>
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
                                        {editable && (
                                            <td>
                                                <MyButton className="btn-primary btn-sm">
                                                    수정
                                                </MyButton>
                                            </td>
                                        )}
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
