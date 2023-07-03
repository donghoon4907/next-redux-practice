import { useRouter } from 'next/router';
import { TabModule } from '@utils/storage';

export const useTab = () => {
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

    return { fire };
};
