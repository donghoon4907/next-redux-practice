import { useRouter } from 'next/router';
import { TabModule } from '@utils/storage';

import { useLoading } from './use-loading';

export const useSearch = () => {
    const router = useRouter();

    const loading = useLoading();

    const handleSearch = (search: string) => {
        const url = `${router.pathname}?${search}`;

        // 동일한 요청 시 reject
        if (url === router.asPath) {
            return;
        }

        const tab = new TabModule();
        tab.update(router.pathname, {
            to: url,
        });

        loading.on();

        router.replace(url);
    };

    return handleSearch;
};
