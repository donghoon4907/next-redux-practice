import type { FC } from 'react';
import type { CoreSetState } from '@interfaces/core';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

interface Props {
    // 확장 상태
    expand: boolean;
    setExpand: CoreSetState<boolean>;
}

export const SearchFilterCollapseButton: FC<Props> = ({
    expand,
    setExpand,
}) => {
    const displayName = 'wr-pages-list2';

    const handleExpand = () => {
        setExpand(!expand);
    };

    return (
        <div
            className={`${displayName}__extension ${
                expand ? `${displayName}__extension--expanded` : ''
            }`}
        >
            <button
                type="button"
                className={`${displayName}__extbtn ${
                    expand ? `${displayName}__extbtn--expanded` : ''
                }`}
                onClick={handleExpand}
            >
                {expand ? (
                    <AiOutlineCaretUp size={8} />
                ) : (
                    <AiOutlineCaretDown size={8} />
                )}
            </button>
        </div>
    );
};
