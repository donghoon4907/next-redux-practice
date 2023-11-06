import type { FC, MouseEvent } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import {
    UncontrolledAccordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';
import { TabModule } from '@utils/storage';
import { useRoute } from '@hooks/use-route';
import { CollapseButton } from '@components/Collapse';
import { hideDrawer, showDrawer } from '@actions/drawer/drawer.action';

interface Props {
    defaultOpen: boolean;
    /**
     * 메뉴 생성에 필요한 데이터, 특정 형식을 따릅니다.
     */
    menu: CoreMenuOption[];
    /**
     * menu depth
     */
    depth?: number;
}

export const DrawerMenu: FC<Props> = ({ defaultOpen, menu, depth = 1 }) => {
    const router = useRouter();

    const dispatch = useDispatch();

    const route = useRoute();

    const handleClick = (
        evt: MouseEvent<HTMLAnchorElement>,
        item: CoreMenuOption,
    ) => {
        evt.preventDefault();

        const tab = new TabModule();
        // 기존에 사용하던 탭 제거
        if (tab.read(item.to)) {
            tab.remove(item.to);
        }

        route.push(item.to);
    };

    const handleCollapse = (next: boolean) => {
        const key = process.env.COOKIE_NAV_COLLAPSE_KEY || '';

        setCookie(key, next ? 'Y' : 'N', {
            maxAge: 60 * 60 * 24 * 365,
        });

        if (next) {
            dispatch(showDrawer());
        } else {
            dispatch(hideDrawer());
        }
    };

    return (
        <>
            <CollapseButton
                type="vertical"
                expand={defaultOpen}
                setExpand={handleCollapse}
            />
            {Object.entries(menu).map(([k, v]) => {
                const { id, label, to, disabled, ...rest } = v;

                const [gnb, lnb] = id.split('-');

                const [_, gnb2, lnb2] = router.pathname.split('/');

                const isActive = gnb === gnb2 && lnb === lnb2;

                const children = Object.keys(rest);

                return children.length > 0 ? (
                    <UncontrolledAccordion
                        stayOpen
                        key={id}
                        style={{ paddingLeft: (depth - 1) * 15 }}
                    >
                        <AccordionItem>
                            <AccordionHeader
                                targetId={id}
                                role="tab"
                                id={id}
                                style={{ whiteSpace: 'nowrap' }}
                                className={isActive ? 'active' : ''}
                            >
                                {label}
                            </AccordionHeader>
                            <AccordionBody
                                accordionId={id}
                                role="tabpanel"
                                aria-labelledby={id}
                            >
                                <DrawerMenu
                                    defaultOpen={defaultOpen}
                                    menu={rest as CoreMenuOption[]}
                                    depth={depth + 1}
                                />
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                ) : (
                    !disabled && (
                        <a
                            key={id}
                            className="wr-drawer__subtitle"
                            href={to}
                            onClick={(evt) => handleClick(evt, v)}
                        >
                            {label}
                        </a>
                    )
                );
            })}
        </>
    );
};
