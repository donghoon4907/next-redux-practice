import type { FC } from 'react';
import type { CoreTabOption } from '@interfaces/core';

interface Props extends CoreTabOption {
    /**
     * 활성화 여부
     */
    isActive?: boolean;
    /**
     * 확장 여부
     */
    isExpand?: boolean;
    /**
     * 클릭 이벤트
     */
    onClick: (tab: CoreTabOption) => void;
}

export const MyTab: FC<Props> = ({
    id,
    panelId,
    label = 'label props were not passed',
    isActive = true,
    isExpand = false,
    onClick,
}) => {
    return (
        <li className="nav-item wr-tab">
            <button
                type="button"
                className={`nav-link ${isExpand ? '' : 'single'} ${
                    isActive ? 'active' : ''
                }`}
                onClick={() => onClick({ id, panelId, label })}
                id={id}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
            >
                {label}
            </button>
        </li>
    );
};
