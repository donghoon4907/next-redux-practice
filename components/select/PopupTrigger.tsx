import type { FC, MouseEvent, ReactElement } from 'react';
import type { CoreProps, CoreSetState } from '@interfaces/core';
import { useState, useEffect, cloneElement } from 'react';

interface Props extends CoreProps {
    title?: string;
    setTitle?: CoreSetState<string>;
    id: string;
}

export const PopupTriggerSelect: FC<Props> = ({
    children,
    title,
    setTitle,
    id,
}) => {
    const displayName = 'wr-like-select';

    const [open, setOpen] = useState(false);

    const handleToggle = (evt: MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();

        setOpen(!open);
    };

    const handleClickInDialog = (evt: MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
    };

    useEffect(() => {
        const handleDocumentClick = () => {
            if (open) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [open]);

    return (
        <div className={`${displayName}__wrap`}>
            <input type="hidden" name={id} value={title} />
            <div className={`${displayName}`} onClick={handleToggle}>
                <div className={`${displayName}__value`}>{title}</div>
                <div className={`${displayName}__indicator`}>
                    <svg
                        height="20"
                        width="20"
                        className={`${displayName}__icon`}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>
                </div>
            </div>

            {open && (
                <div
                    className={`${displayName}__dialog`}
                    onClick={handleClickInDialog}
                    role="dialog"
                >
                    {cloneElement(children as ReactElement, {
                        title,
                        setTitle,
                        setOpen,
                    })}
                </div>
            )}
        </div>
    );
};
