import type { FC, MouseEvent } from 'react';
import {
    UncontrolledAccordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';
// import { useDrawer } from '@hooks/use-drawer';
import { CoreMenuOption } from '@interfaces/core';
import { useTab } from '@hooks/use-tab';

interface Props {
    /**
     * 메뉴 생성에 필요한 데이터, 특정 형식을 따릅니다.
     */
    menu: CoreMenuOption[];
}

export const DrawerMenu: FC<Props> = ({ menu }) => {
    const tab = useTab();

    // const { onToggle } = useDrawer();

    const handleClick = (
        evt: MouseEvent<HTMLAnchorElement>,
        item: CoreMenuOption,
    ) => {
        evt.preventDefault();

        tab.fire(`tab${item.id}`, item.label, item.to);
    };

    return (
        <>
            {menu.map((v) =>
                v.items && v.items.length > 0 ? (
                    <UncontrolledAccordion
                        stayOpen
                        key={v.id}
                        style={{ paddingLeft: (v.level - 1) * 15 }}
                    >
                        <AccordionItem>
                            <AccordionHeader
                                targetId={v.id}
                                role="tab"
                                id={v.id}
                            >
                                {v.label}
                            </AccordionHeader>
                            <AccordionBody
                                accordionId={v.id}
                                role="tabpanel"
                                aria-labelledby={v.id}
                            >
                                <DrawerMenu menu={v.items} />
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                ) : (
                    <a
                        key={v.id}
                        className="wr-drawer__subtitle"
                        href={v.to}
                        onClick={(evt) => handleClick(evt, v)}
                    >
                        {v.label}
                    </a>
                ),
            )}
        </>
    );
};
