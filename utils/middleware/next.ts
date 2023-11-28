import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

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
