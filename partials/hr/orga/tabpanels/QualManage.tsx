import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { UseInputOutput } from '@hooks/use-input';
import { UseSelectOutput } from '@hooks/use-select';
import { UseDatepickerOutput } from '@hooks/use-datepicker';
import { AssoCodeTemplate } from '../template/AssoCode';

interface Props extends MyTabpanelProps {
    editable: boolean;
    d_no: UseInputOutput;
    d_company: UseSelectOutput;
    d_indate: UseDatepickerOutput;
    d_outdate: UseDatepickerOutput;
    d_manager: UseSelectOutput;
    l_no: UseInputOutput;
    l_company: UseSelectOutput;
    l_indate: UseDatepickerOutput;
    l_outdate: UseDatepickerOutput;
    l_manager: UseSelectOutput;
}

export const OrgaQualManageTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    d_no,
    d_company,
    d_indate,
    d_outdate,
    d_manager,
    l_no,
    l_company,
    l_indate,
    l_outdate,
    l_manager,
}) => {
    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="flex-fill">
                    <AssoCodeTemplate
                        dist="손보"
                        no={d_no}
                        company={d_company}
                        indate={d_indate}
                        outdate={d_outdate}
                        manager={d_manager}
                        title="손해보험협회"
                        subtitle="손해보험사코드"
                        editable={editable}
                    />
                </div>
                <div className="wr-divider__vertical orga"></div>
                <div className="flex-fill">
                    <AssoCodeTemplate
                        dist="생보"
                        no={l_no}
                        company={l_company}
                        indate={l_indate}
                        outdate={l_outdate}
                        manager={l_manager}
                        title="생명보험협회"
                        subtitle="생명보험사코드"
                        editable={editable}
                    />
                </div>
            </div>
        </MyTabpanel>
    );
};
