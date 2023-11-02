import type { FC, ChangeEvent } from 'react';
import type { CoreEditableComponent } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import { useDispatch, useSelector } from 'react-redux';
import {
    UncontrolledAccordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
} from 'reactstrap';
import { MyCheckbox } from '@components/checkbox';
import { MyTableToolbar } from '@components/table/Toolbar';
import {
    createInfoCust,
    updateInfoCust,
} from '@actions/contract/long/set-info-cust.action';
import { generateIndex } from '@utils/generate';
import { FloatInput } from '@components/input/Float';
import { MyUnit } from '@components/Unit';
import { MyButton } from '@components/button';
import { IconWrapper } from '@components/IconWrapper';
import { BsPencil } from 'react-icons/bs';

interface Props extends CoreEditableComponent {}

export const InfoCustAccordion: FC<Props> = ({ editable }) => {
    const dispatch = useDispatch();

    const { infoCusts } = useSelector<AppState, LongState>(
        (state) => state.long,
    );

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        infoCusts.forEach((v) => {
            dispatch(updateInfoCust({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCreate = () => {
        dispatch(
            createInfoCust({
                index: generateIndex(infoCusts),
                checked: false,
            }),
        );
    };

    const handleDelete = () => {
        // if (pays.findIndex((v) => v.checked) === -1) {
        //     return alert('삭제할 설정을 선택해주세요.');
        // }
        // pays.filter((v) => v.checked).forEach((v) => {
        //     dispatch(deletePay({ index: v.index }));
        // });
    };

    return (
        <UncontrolledAccordion stayOpen>
            <AccordionItem>
                <AccordionHeader targetId="info_cust" role="tab" id="info_cust">
                    <div className="wr-pages-detail__title">관리정보</div>
                </AccordionHeader>

                <AccordionBody
                    accordionId="info_cust"
                    role="tabpanel"
                    aria-labelledby="info_cust"
                    className="wr-mt"
                >
                    <MyTableToolbar
                        editable={editable}
                        onCreate={handleCreate}
                        onDelete={handleDelete}
                    />
                    <div className="row">
                        <div className="flex-fill">
                            <FloatInput
                                label="테스트"
                                readOnly
                                before={
                                    <MyUnit placement="checkbox">
                                        <MyCheckbox
                                            label=""
                                            // onChange={handleAllCheck}
                                        />
                                    </MyUnit>
                                }
                                after={
                                    <MyUnit placement="last">
                                        <IconWrapper>
                                            <BsPencil size={20} />
                                        </IconWrapper>
                                    </MyUnit>
                                }
                                defaultValue="테스트"
                            />
                        </div>
                        <div className="flex-fill"></div>
                    </div>
                </AccordionBody>
            </AccordionItem>
        </UncontrolledAccordion>
    );
};
