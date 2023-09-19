import type { NextApiRequest, NextApiResponse } from 'next';
import generalsService from '@services/generalsService';
import { tokenMiddleware } from '@utils/middleware/next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    tokenMiddleware(req, res);

    const { body } = req;

    try {
        const { data } = await generalsService.createGeneral(body);

        const message = data.Message;

        res.status(200).json({ message });
    } catch {
        res.status(500).json({
            message: '알 수 없는 문제가 발생했습니다.',
        });
    }
}
