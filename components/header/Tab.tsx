import { type FC, type MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { MdClose } from 'react-icons/md';
import { TabModule } from '@utils/storage';
import { removeTab } from '@actions/tab/tab.action';
import { IconWrapper } from '@components/IconWrapper';
import type { CoreMenuOption } from '@interfaces/core';

interface Props extends CoreMenuOption {
    /**
     * 단독 여부
     */
    isSingle: boolean;
}

export const Tab: FC<Props> = ({ id, label, to, isSingle }) => {
    const router = useRouter();

    const dispatch = useDispatch();

    const handleTab = (evt: MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();

        if (router.pathname === to) {
            return;
        }

        router.push(to);
    };

    const handleClose = (id: string) => {
        const tab = new TabModule();

        tab.remove(id);

        const tabs = tab.getAll();
        // 활성화된 탭인 경우
        if (router.pathname === to) {
            router.push(tabs[tabs.length - 1].to);
            // 이외에는 상태 업데이트
        } else {
            dispatch(removeTab(id));
        }
    };

    return (
        <li className="nav-item wr-tab">
            <a
                className={`nav-link ${
                    router.pathname === to ? 'active' : ''
                } ${isSingle ? 'single' : ''}`}
                aria-current="page"
                href={to}
                onClick={handleTab}
            >
                {label}
            </a>
            {!isSingle && (
                <div className="wr-tab__icon">
                    <IconWrapper onClick={(evt) => handleClose(id)}>
                        <MdClose size={15} color="black" />
                    </IconWrapper>
                </div>
            )}
        </li>
    );
};
