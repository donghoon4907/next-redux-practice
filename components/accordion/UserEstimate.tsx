import type { FC } from 'react';
import type { CoreEditableComponent } from '@interfaces/core';
import {
    UncontrolledAccordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
} from 'reactstrap';
import { FloatInput } from '@components/input/Float';
import { FloatSelect } from '@components/select/Float';
import { UseInputOutput } from '@hooks/use-input';
import { UseSelectOutput } from '@hooks/use-select';

interface Props extends CoreEditableComponent {
    comNmHooks: UseInputOutput;
    comTypeHooks: UseSelectOutput;
    salesNmHooks: UseInputOutput;
    salesTypeHooks: UseSelectOutput;
    phoneHooks: UseInputOutput;
    phoneTypeHooks: UseSelectOutput;
    faxHooks: UseInputOutput;
    faxTypeHooks: UseSelectOutput;
    directHooks: UseInputOutput;
    directTypeHooks: UseSelectOutput;
    addressHooks: UseInputOutput;
    addressTypeHooks: UseSelectOutput;
}

export const UserEstimateAccordion: FC<Props> = ({
    editable,
    comNmHooks,
    comTypeHooks,
    salesNmHooks,
    salesTypeHooks,
    phoneHooks,
    phoneTypeHooks,
    faxHooks,
    faxTypeHooks,
    directHooks,
    directTypeHooks,
    addressHooks,
    addressTypeHooks,
}) => {
    return (
        <UncontrolledAccordion stayOpen>
            <AccordionItem>
                <AccordionHeader
                    targetId="user_estimate"
                    role="tab"
                    id="user_estimate"
                >
                    <div className="wr-pages-detail__title wr-mr">
                        비교견적 설정
                    </div>
                </AccordionHeader>

                <AccordionBody
                    accordionId="user_estimate"
                    role="tabpanel"
                    aria-labelledby="user_estimate"
                >
                    <div className="row wr-mt">
                        <div className="flex-fill d-flex">
                            <div className="flex-fill">
                                <FloatInput
                                    label="회사명"
                                    readOnly={!editable}
                                    isConnectAfter
                                    {...comNmHooks}
                                />
                            </div>
                            <div style={{ width: 120 }}>
                                <FloatSelect
                                    label=""
                                    isDisabled={!editable}
                                    isConnectBefore
                                    {...comTypeHooks}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="flex-fill d-flex">
                            <div className="flex-fill">
                                <FloatInput
                                    label="견적영업명"
                                    readOnly={!editable}
                                    isConnectAfter
                                    {...salesNmHooks}
                                />
                            </div>
                            <div style={{ width: 120 }}>
                                <FloatSelect
                                    label=""
                                    isDisabled={!editable}
                                    isConnectBefore
                                    {...salesTypeHooks}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="flex-fill d-flex">
                            <div className="flex-fill">
                                <FloatInput
                                    label="대표전화"
                                    readOnly={!editable}
                                    isConnectAfter
                                    {...phoneHooks}
                                />
                            </div>
                            <div style={{ width: 120 }}>
                                <FloatSelect
                                    label=""
                                    isDisabled={!editable}
                                    isConnectBefore
                                    {...phoneTypeHooks}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="flex-fill d-flex">
                            <div className="flex-fill">
                                <FloatInput
                                    label="팩스번호"
                                    readOnly={!editable}
                                    isConnectAfter
                                    {...faxHooks}
                                />
                            </div>
                            <div style={{ width: 120 }}>
                                <FloatSelect
                                    label=""
                                    isDisabled={!editable}
                                    isConnectBefore
                                    {...faxTypeHooks}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="flex-fill d-flex">
                            <div className="flex-fill">
                                <FloatInput
                                    label="직통전화"
                                    readOnly={!editable}
                                    isConnectAfter
                                    {...directHooks}
                                />
                            </div>
                            <div style={{ width: 120 }}>
                                <FloatSelect
                                    label=""
                                    isDisabled={!editable}
                                    isConnectBefore
                                    {...directTypeHooks}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="flex-fill d-flex">
                            <div className="flex-fill">
                                <FloatInput
                                    label="표기주소"
                                    readOnly={!editable}
                                    isConnectAfter
                                    {...addressHooks}
                                />
                            </div>
                            <div style={{ width: 120 }}>
                                <FloatSelect
                                    label=""
                                    isDisabled={!editable}
                                    isConnectBefore
                                    {...addressTypeHooks}
                                />
                            </div>
                        </div>
                    </div>
                </AccordionBody>
            </AccordionItem>
        </UncontrolledAccordion>
    );
};
