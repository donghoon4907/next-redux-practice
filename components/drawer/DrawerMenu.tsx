import type { FC, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import {
    UncontrolledAccordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';
import { useDrawer } from '@hooks/use-drawer';
import { CoreMenuOption } from '@interfaces/core';
import { TabModule } from '@utils/storage';

interface Props {
    /**
     * 메뉴 생성에 필요한 데이터, 특정 형식을 따릅니다.
     */
    data: CoreMenuOption[];
}

export const DrawerMenu: FC<Props> = ({ data }) => {
    const router = useRouter();

    // const { onToggle } = useDrawer();

    const handleClick = (
        evt: MouseEvent<HTMLAnchorElement>,
        item: CoreMenuOption,
    ) => {
        evt.preventDefault();
        // Drawer를 닫습니다.
        // onToggle();

        if (router.pathname === item.to) {
            return;
        }
        // 현재 페이지가 아닐 때 탭을 생성하고 페이지를 이동
        const tab = new TabModule();

        tab.create({
            id: `tab${item.id}`,
            label: item.label,
            to: item.to,
            // panelId: `tabpanel${item.id}`,
        });

        router.push(item.to);
    };

    return (
        <>
            {data.map((v) =>
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
                                <DrawerMenu data={v.items} />
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
