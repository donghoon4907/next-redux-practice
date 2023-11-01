import type { FC } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IconWrapper } from '@components/IconWrapper';

interface Props {
    title?: string;
    onCreate?: () => void;
    onDelete?: () => void;
    editable?: boolean;
}

export const MyTableToolbar: FC<Props> = ({
    title = '',
    onCreate,
    onDelete,
    editable,
}) => {
    return (
        <div className="wr-table__toolbar">
            <span>{title}</span>
            {editable && (
                <div className="d-flex">
                    <IconWrapper onClick={onCreate}>
                        <AiOutlinePlus size={20} />
                    </IconWrapper>
                    <IconWrapper onClick={onDelete}>
                        <AiOutlineMinus size={20} />
                    </IconWrapper>
                </div>
            )}
        </div>
    );
};
