import type { NextApiRequest, NextApiResponse } from 'next';
import commonsService from '@services/commonsService';
import { tokenMiddleware } from '@utils/middleware/next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    tokenMiddleware(req, res);

    const { body } = req;

    try {
        const { data } = await commonsService.createContact(body);

        res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: '알 수 없는 문제가 발생했습니다.',
        });
    }
}
