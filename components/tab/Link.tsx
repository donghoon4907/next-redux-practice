import type { FC, MouseEvent } from 'react';
import type { CoreLinkTabOption } from '@interfaces/core';
import { useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { IconWrapper } from '@components/IconWrapper';
import variables from '@styles/_variables.module.scss';
import { useRoute } from '@hooks/use-route';
import { TabModule } from '@utils/storage';
import { removeTab } from '@actions/tab/tab.action';

interface Props extends CoreLinkTabOption {
    /**
     * 확장 여부
     */
    isExpand?: boolean;
    /**
     * 첫 번째 탭 여부
     */
    isFirst?: boolean;
}

export const LinkTab: FC<Props> = ({
    id,
    label = 'label props were not passed',
    to,
    isExpand,
    isFirst,
}) => {
    const dispatch = useDispatch();

    const route = useRoute();

    // const isActive = router.asPath.toLowerCase() === to.toLowerCase();
    const isActive = location.pathname === id;

    const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();

        route.push(to);
    };

    const handleClose = (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();

        const tab = new TabModule();

        tab.remove(id);

        const tabs = tab.getAll();
        // 활성화된 탭인 경우
        if (isActive) {
            // 가장 마지막 탭을 활성화 시킴
            route.replace(tabs[tabs.length - 1].to);
            // 상태만 변경
        } else {
            dispatch(removeTab(id));
        }
    };

    return (
        <li
            className={`wr-tab ${isActive ? 'active' : ''}  ${
                isFirst ? 'wr-border-l--hide' : ''
            }`}
            role="tab"
        >
            <a
                className={`wr-tab__link ${isExpand ? '' : 'single'}`}
                aria-current="page"
                href={to}
                onClick={handleClick}
                tabIndex={isActive ? 0 : -1}

                // aria-controls={panelId}
            >
                {label}
            </a>
            {isExpand && (
                <div className="wr-tab__icon">
                    <IconWrapper
                        onClick={handleClose}
                        tabIndex={isActive ? 0 : -1}
                    >
                        <span className="visually-hidden">탭 닫기</span>
                        <MdClose
                            size={13}
                            color={
                                isActive ? 'black' : variables.disableFontColor
                            }
                        />
                    </IconWrapper>
                </div>
            )}
        </li>
    );
};
