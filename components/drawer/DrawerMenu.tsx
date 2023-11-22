import type { FC, MouseEvent } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import { useRouter } from 'next/router';
import {
    UncontrolledAccordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';
import { useRoute } from '@hooks/use-route';

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

    const route = useRoute();

    const handleClick = (
        evt: MouseEvent<HTMLAnchorElement>,
        item: CoreMenuOption,
    ) => {
        evt.preventDefault();

        route.push(item.to);
    };

    return (
        <>
            {Object.entries(menu).map(([k, v]) => {
                const { id, label, to, disabled, ...rest } = v;
                // menu의 id와 URL은 정해진 규칙을 준수하여 작성
                const [root, child] = id.split('-');
                const [_, depth1, depth2] = router.pathname.split('/');
                // 활성화 메뉴 여부
                const isActive = root === depth1 && child === depth2;
                // 메뉴의 자식 메뉴
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
                    <a
                        key={id}
                        className="wr-drawer__subtitle"
                        href={to}
                        onClick={(evt) => handleClick(evt, v)}
                        hidden={disabled}
                    >
                        {label}
                    </a>
                );
            })}
        </>
    );
};
