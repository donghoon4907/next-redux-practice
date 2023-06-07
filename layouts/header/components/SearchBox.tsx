import type { FC } from 'react';
import { useState } from 'react';

interface Props {}

export const HeaderSearchBox: FC<Props> = () => {
    const [active, setActive] = useState<boolean>(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <div className={`search-wrapper ${active ? 'active' : ''}`}>
            <div className="input-holder">
                <input type="text" className="search-input" />
                <button
                    type="button"
                    className="search-icon"
                    onClick={handleClick}
                >
                    <span></span>
                </button>
            </div>
            {/* <button className="btn-close"></button> */}
        </div>
    );
};
