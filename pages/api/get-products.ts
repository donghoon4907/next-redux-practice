import type { NextApiRequest, NextApiResponse } from 'next';
import type { Spe } from '@models/spe';
import hrsService from '@services/hrsService';
import { tokenMiddleware } from '@utils/middleware/next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    tokenMiddleware(req, res);

    const spe = req.query.spe as Spe;
    const wcode = req.query.wcode as string;
    const type = req.query.type as string;

    try {
        const { data } = await hrsService.getProducts({
            spe,
            wcode,
            type,
        });

        res.status(200).json(data);
    } catch {
        res.status(500).json({
            message: '알 수 없는 문제가 발생했습니다.',
        });
    }
}
