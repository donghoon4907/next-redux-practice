import { useRouter } from 'next/router';

import { useAuthenticate } from './use-authenticate';

export const useRoute = () => {
    const router = useRouter();

    const { validateToken } = useAuthenticate();

    const move = (href: string) => {
        router.push(href).then(() => {
            document.querySelector('#main')?.scrollTo(0, 0);
        });
    };

    const authMove = (href: string) => {
        const token = validateToken();

        if (token !== null) {
            move(href);
        }
    };

    return { move, authMove };
};
