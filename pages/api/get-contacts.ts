import type { NextApiRequest, NextApiResponse } from 'next';
import type { Spe } from '@models/spe';
import commonsService from '@services/commonsService';
import { tokenMiddleware } from '@utils/middleware/next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    tokenMiddleware(req, res);

    const cust_idx = req.query.cust_idx as string;
    const spe = req.query.cust_idx as Spe;
    const cnum = req.query.cust_idx as string;

    try {
        const { data } = await commonsService.getContacts({
            cust_idx,
            spe,
            cnum,
        });

        res.status(200).json(data);
    } catch {
        res.status(500).json({
            message: '알 수 없는 문제가 발생했습니다.',
        });
    }
}
