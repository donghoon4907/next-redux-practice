import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';
import { initialzeBackendAxios } from '@utils/axios/backend';

export function tokenMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next?: () => void,
) {
    const token = getCookie(process.env.COOKIE_TOKEN_KEY || '', {
        req,
        res,
    });
    // axios 초기화
    initialzeBackendAxios(token);

    next?.();
}
