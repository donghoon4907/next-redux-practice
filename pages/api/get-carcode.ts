import type { NextApiRequest, NextApiResponse } from 'next';
import carsService from '@services/carsService';
import { tokenMiddleware } from '@utils/middleware/next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    tokenMiddleware(req, res);

    const payload: any = {};

    if (req.query) {
        payload['type'] = req.query.type;
        payload['idate'] = req.query.idate;

        if (req.query.params) {
            payload['params'] = JSON.parse(req.query.params as any);
        }
    }

    try {
        const { data } = await carsService.getCarcode(payload);

        res.status(200).json(data);
    } catch {
        res.status(500).json({
            message: '알 수 없는 문제가 발생했습니다.',
        });
    }
}
