import type { FC } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import {
    DropdownToggle,
    DropdownMenu,
    Nav,
    Button,
    NavItem,
    NavLink,
    UncontrolledTooltip,
    UncontrolledButtonDropdown,
} from 'reactstrap';
import { IoIosArrowDown } from 'react-icons/io';
import { BiCalendar } from 'react-icons/bi';

interface Props {}

export const HeaderUserBox: FC<Props> = () => {
    const [active, setActive] = useState<boolean>(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <div className="header-btn-lg pe-0">
            <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                    <div className="widget-content-left">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color="link" className="p-0">
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image
                                        className="rounded-circle"
                                        src="/images/unknown_light.png"
                                        width="42"
                                        height="42"
                                        alt=""
                                    />
                                    <IoIosArrowDown className="ms-2 opacity-8" />
                                </div>
                            </DropdownToggle>
                            <DropdownMenu
                                end
                                className="rm-pointers dropdown-menu-lg"
                            >
                                <Nav vertical>
                                    <NavItem className="nav-item-header">
                                        Activity
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">
                                            Chat
                                            <div className="ms-auto badge bg-pill bg-info">
                                                8
                                            </div>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">
                                            Recover Password
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-item-header">
                                        My Account
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">
                                            Settings
                                            <div className="ms-auto badge bg-success">
                                                New
                                            </div>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">
                                            Messages
                                            <div className="ms-auto badge bg-warning">
                                                512
                                            </div>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">Logs</NavLink>
                                    </NavItem>
                                </Nav>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                    <div className="widget-content-left  ms-3 header-user-info">
                        <div className="widget-heading">Alina Mclourd</div>
                        <div className="widget-subheading">
                            VP People Manager
                        </div>
                    </div>

                    <div className="widget-content-right header-user-info ms-3">
                        <Button
                            className="btn-shadow p-1"
                            size="30"
                            onClick={() => {}}
                            color="info"
                            id="Tooltip-1"
                        >
                            <BiCalendar className="me-2 ms-2" />
                        </Button>
                        <UncontrolledTooltip
                            placement="left"
                            target="Tooltip-1"
                        >
                            Click for Toastify Notifications!
                        </UncontrolledTooltip>
                    </div>
                </div>
            </div>
        </div>
    );
};
