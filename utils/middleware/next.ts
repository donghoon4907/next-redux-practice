import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';
import Cors from 'cors';
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

export function corsMiddleware(req: NextApiRequest, res: NextApiResponse) {
    const cors = Cors({
        origin: '*',
    });

    return new Promise((resolve, reject) => {
        cors(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}
