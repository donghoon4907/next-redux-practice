import type { FC } from 'react';
import {
    UncontrolledAccordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
} from 'reactstrap';
import { MyTable } from '@components/table';
import { useColumn } from '@hooks/use-column';
import { LONG_USER_HISTORY } from '@constants/column';
import { useSelector } from 'react-redux';
import { AppState } from '@reducers/index';
import { CommonState } from '@reducers/common';

interface Props {
    defaultTitle: string;
}

export const LongManagerAccordion: FC<Props> = ({ defaultTitle }) => {
    const { userHistories } = useSelector<AppState, CommonState>(
        (state) => state.common,
    );

    const columns = useColumn(LONG_USER_HISTORY);

    return (
        <UncontrolledAccordion stayOpen>
            <AccordionItem>
                <div className="wr-group wr-accordion__button--hide">
                    <span className="wr-pages-detail__department">
                        {defaultTitle}
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
                        <MyTable columns={columns} data={userHistories} />
                    </div>
                </AccordionBody>
            </AccordionItem>
        </UncontrolledAccordion>
    );
};
