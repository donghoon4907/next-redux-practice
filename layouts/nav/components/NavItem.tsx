import type { FC } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import type { Gnb } from '../nav.interface';

interface Props extends Gnb {}

export const NavItem: FC<Props> = ({ label, icon, to, content }) => {
    const router = useRouter();

    const [toggle, setToggle] = useState(false);

    const isLnb = content.length > 0;

    const handleClick = (to: string | null) => {
        if (to === null) {
            setToggle(!toggle);
        } else {
            router.push(to);
        }
    };

    return (
        <div className="w-nav-menu-wrap">
            <ul className="w-nav-menu">
                <li className="w-nav-item">
                    <a
                        className="w-nav-link"
                        href={to || '#'}
                        onClick={() => handleClick(to)}
                    >
                        <i className={`w-nav-icon left ${icon}`}></i>
                        <span>{label}</span>
                        {!to && (
                            <i
                                className={`pe-7s-angle-${
                                    toggle ? 'up' : 'down'
                                } w-nav-icon right`}
                            ></i>
                        )}
                    </a>
                    {isLnb && (
                        <ul
                            className={`w-nav-menu lnb ${
                                toggle ? 'active' : ''
                            }`}
                        >
                            {content.map((lnb) => (
                                <li key={lnb.id} className="w-nav-item">
                                    <a
                                        className="w-nav-link"
                                        href={lnb.to}
                                        onClick={() => handleClick(lnb.to)}
                                    >
                                        {lnb.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};
