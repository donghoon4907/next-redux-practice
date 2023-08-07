import type { FC, MouseEvent } from 'react';
import {
    UncontrolledAccordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';
// import { useDrawer } from '@hooks/use-drawer';
import { CoreMenuOption } from '@interfaces/core';
import { useLinkTab } from '@hooks/use-tab';

interface Props {
    /**
     * 메뉴 생성에 필요한 데이터, 특정 형식을 따릅니다.
     */
    menu: CoreMenuOption[];
    /**
     * menu depth
     */
    depth?: number;
}

export const DrawerMenu: FC<Props> = ({ menu, depth = 1 }) => {
    const tab = useLinkTab();

    // const { onToggle } = useDrawer();

    const handleClick = (
        evt: MouseEvent<HTMLAnchorElement>,
        item: CoreMenuOption,
    ) => {
        evt.preventDefault();

        tab.move(item.to);
    };

    return (
        <>
            {Object.entries(menu).map(([k, v]) => {
                const { id, label, to, ...rest } = v;

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
                            >
                                {label}
                            </AccordionHeader>
                            <AccordionBody
                                accordionId={id}
                                role="tabpanel"
                                aria-labelledby={id}
                            >
                                <DrawerMenu
                                    menu={rest as CoreMenuOption[]}
                                    depth={depth + 1}
                                />
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                ) : (
                    <a
                        key={id}
                        className="wr-drawer__subtitle"
                        href={to}
                        onClick={(evt) => handleClick(evt, v)}
                    >
                        {label}
                    </a>
                );
            })}
        </>
    );
};
