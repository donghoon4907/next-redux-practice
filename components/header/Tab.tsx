import type { FC } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { TabModule } from '@utils/storage';
import { removeTab } from '@actions/tab/tab.action';
import { LinkTab } from '@components/tab/Link';

interface Props extends CoreMenuOption {
    /**
     * 단독 여부
     */
    isSingle: boolean;
}

export const HeaderTab: FC<Props> = ({ to, isSingle, ...props }) => {
    const router = useRouter();

    const dispatch = useDispatch();

    const handleClose = (id: string) => {
        const tab = new TabModule();

        tab.remove(id);

        const tabs = tab.getAll();
        // 활성화된 탭인 경우
        if (router.pathname === to) {
            // 가장 마지막 탭을 활성화 시킴
            router.push(tabs[tabs.length - 1].to);
            // 상태만 변경
        } else {
            dispatch(removeTab(id));
        }
    };

    return (
        <LinkTab
            to={to}
            isExpand={!isSingle}
            onClose={handleClose}
            {...props}
        />
    );
};
