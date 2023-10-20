import { useRouter } from 'next/router';

import { useLoading } from './use-loading';

export const useRoute = () => {
    const router = useRouter();

    const loading = useLoading();

    const replace = (to: string, callback?: () => void) => {
        // 현재 페이지인 경우
        if (router.pathname === to) {
            return;
        }

        callback?.();

        loading.on();

        router.replace(to);
    };

    return { replace };
};
