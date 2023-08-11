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

interface Props {
    defaultTitle: string;
    data: Array<any>;
}

export const LongManagerAccordion: FC<Props> = ({ defaultTitle, data }) => {
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
                        <MyTable columns={columns} data={data} />
                    </div>
                </AccordionBody>
            </AccordionItem>
        </UncontrolledAccordion>
    );
};
