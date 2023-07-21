import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { WithInput } from '@components/WithInput';
import { IconWrapper } from '@components/IconWrapper';
import { BsPlusSquare } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { showCreateEtcModal } from '@actions/modal/create-etc.action';

interface Props extends MyTabpanelProps {
    editable: boolean;
    etcs: Array<any>;
}

export const EtcsTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    etcs,
}) => {
    const dispatch = useDispatch();

    const handleAddEtc = () => {
        dispatch(showCreateEtcModal());
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                {Object.entries(etcs).map(([key, value], i) => (
                    <div className="col-4" key={key}>
                        <div
                            className={`${i % 3 !== 0 ? 'wr-ml' : ''} ${
                                i > 2 ? 'wr-mt' : ''
                            }`}
                        >
                            {editable ? (
                                <WithInput defaultValue={key} type="active">
                                    <MyInput
                                        type="text"
                                        id={`etcField${key}`}
                                        placeholder={key}
                                        readOnly={!editable}
                                        defaultValue={value as string}
                                    />
                                </WithInput>
                            ) : (
                                <WithLabel
                                    id={`etcField${key}`}
                                    label={key}
                                    type="disable"
                                >
                                    <MyInput
                                        type="text"
                                        id={`etcField${key}`}
                                        placeholder={key}
                                        readOnly
                                        defaultValue={value as string}
                                    />
                                </WithLabel>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <hr />
            {editable && (
                <div className="wr-pages-long-detail__extension">
                    <IconWrapper onClick={handleAddEtc}>
                        <BsPlusSquare size={20} />
                    </IconWrapper>
                </div>
            )}
        </MyTabpanel>
    );
};
