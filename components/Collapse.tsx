import type { FC } from 'react';
import {
    AiOutlineCaretDown,
    AiOutlineCaretLeft,
    AiOutlineCaretRight,
    AiOutlineCaretUp,
} from 'react-icons/ai';

interface Props {
    expand: boolean;
    setExpand: (next: boolean) => void;
    type: 'vertical' | 'horizontal';
}

export const CollapseButton: FC<Props> = ({ type, expand, setExpand }) => {
    const displayName = 'wr-collapse-btn';

    const handleExpand = () => {
        const next = !expand;

        setExpand(next);
    };

    return (
        <div className={`${displayName} ${type} ${expand ? 'expanded' : ''}`}>
            <button
                type="button"
                className={`${type} ${expand ? 'expanded' : ''}`}
                onClick={handleExpand}
            >
                {type === 'horizontal' ? (
                    expand ? (
                        <AiOutlineCaretUp size={8} />
                    ) : (
                        <AiOutlineCaretDown size={8} />
                    )
                ) : expand ? (
                    <AiOutlineCaretLeft size={8} />
                ) : (
                    <AiOutlineCaretRight size={8} />
                )}
            </button>
        </div>
    );
};
