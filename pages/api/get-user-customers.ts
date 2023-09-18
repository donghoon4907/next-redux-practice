import type { NextApiRequest, NextApiResponse } from 'next';
import customersService from '@services/customersService';
import { tokenMiddleware } from '@utils/middleware/next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    tokenMiddleware(req, res);

    const username = req.query.username as string;
    const userid = req.query.userid as string;

    try {
        const { data } = await customersService.getUserCustomers({
            username,
            userid,
        });

        res.status(200).json(data);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: '알 수 없는 문제가 발생했습니다.',
        });
    }
}
