import type { FC } from 'react';
import { BsPlusSquare } from 'react-icons/bs';
import { IconWrapper } from '@components/IconWrapper';

interface Props {
    /**
     * 새로운 레코드 추가 외부 이벤트
     */
    onClick?: () => void;
}

export const MyTableExtension: FC<Props> = ({ onClick }) => {
    return (
        <div className="wr-table__extension">
            <IconWrapper onClick={onClick}>
                <BsPlusSquare size={20} fill="gray" />
            </IconWrapper>
        </div>
    );
};
