import type { FC } from 'react';
import {
    UncontrolledAccordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
} from 'reactstrap';
import { MyTableExtension } from '@components/table/Extension';

interface Props {
    data: Array<any>;
}

export const CustomSettingAccordion: FC<Props> = ({ data }) => {
    // const columns = useColumn(LONG_USER_HISTORY);

    return (
        <UncontrolledAccordion stayOpen>
            <AccordionItem>
                <AccordionHeader targetId="user_his" role="tab" id="user_his">
                    임의 설정
                </AccordionHeader>

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
                                        <strong>설정명</strong>
                                    </th>
                                    <th>
                                        <strong>설정값</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 && (
                                    <tr>
                                        <td colSpan={2}>설정이 없습니다.</td>
                                    </tr>
                                )}
                                {/* <tr key={`customerManagerHistory${i}`}>
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
                                </tr> */}
                            </tbody>
                        </table>
                        <MyTableExtension onClick={() => {}} />
                    </div>
                </AccordionBody>
            </AccordionItem>
        </UncontrolledAccordion>
    );
};
