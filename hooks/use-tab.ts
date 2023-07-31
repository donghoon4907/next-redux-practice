import type { CoreTabOption } from '@interfaces/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TabModule } from '@utils/storage';

export const useLinkTab = () => {
    const router = useRouter();

    const fire = (id: string, label: string, to: string) => {
        // 현재 페이지인 경우
        if (router.asPath === to) {
            return;
        }
        // 탭을 생성하고 페이지를 이동
        const tab = new TabModule();

        tab.create({
            id: `tab${id}`,
            label,
            to,
        });

        router.push(to);
    };

    const move = (to: string) => {
        // 현재 페이지인 경우
        if (router.asPath === to) {
            return;
        }

        router.push(to);
    };

    const replace = (to: string) => {
        // 현재 페이지인 경우
        if (router.asPath === to) {
            return;
        }

        router.replace(to);
    };

    return { fire, move, replace };
};

interface UseTabFunction {
    (defaultValue: CoreTabOption): [
        CoreTabOption,
        (value: CoreTabOption) => void,
    ];
}

export const useTab: UseTabFunction = (defaultValue) => {
    const [tab, setTab] = useState<CoreTabOption>(defaultValue);

    const onClick = (tab: CoreTabOption) => {
        setTab(tab);
    };

    return [tab, onClick];
};
