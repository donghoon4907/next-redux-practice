import type { NextApiRequest, NextApiResponse } from 'next';
import type { Spe } from '@models/spe';
import rulesService from '@services/rulesService';
import { tokenMiddleware } from '@utils/middleware/next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    tokenMiddleware(req, res);

    const spe = req.query.spe as Spe;
    const wcode = req.query.wcode as string;

    try {
        const { data } = await rulesService.getCalspecs({
            spe,
            wcode,
        });

        res.status(200).json(data);
    } catch {
        res.status(500).json({
            message: '알 수 없는 문제가 발생했습니다.',
        });
    }
}
