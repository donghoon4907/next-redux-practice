import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyCheckbox } from '@components/checkbox';
import { UseCheckboxOutput } from '@hooks/use-checkbox';

interface Props extends MyTabpanelProps {
    editable: boolean;
    useWeb: UseCheckboxOutput;
    useMobile: UseCheckboxOutput;
}

export const AuthorityTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    useWeb,
    useMobile,
}) => {
    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-pages-detail__toolbar">
                <div className="wr-pages-detail__buttons">
                    <MyCheckbox label="최소허용" disabled />
                    <MyCheckbox label="전체허용" disabled />
                </div>
                <div>
                    <MyCheckbox label="엑셀다운로드 일괄허용" disabled />
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="row">
                        <div className="col-8">
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content p-15">
                                    <div className="wr-pages-detail__subtitle">
                                        시스템사용
                                    </div>
                                    <div className="wr-pages-detail__toolbar wr-mt">
                                        <MyCheckbox
                                            disabled={!editable}
                                            label="웹"
                                            {...useWeb}
                                        />
                                        <MyCheckbox
                                            disabled={!editable}
                                            label="모바일"
                                            {...useMobile}
                                        />
                                        <MyCheckbox
                                            label="중복로그인"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </MyTabpanel>
    );
};
