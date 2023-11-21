import type { NextApiRequest, NextApiResponse } from 'next';
import usersService from '@services/usersService';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        // await corsMiddleware(req, res);

        const { ip, userid, password } = req.body;

        const { data } = await usersService.verify({
            ip,
            userid,
            password,
        });

        const { access_token, Message: message } = data;

        if (access_token) {
            res.status(200).json({ access_token });
        } else {
            res.status(401).json({ message });
        }
    } catch {
        res.status(500).json({ message: '알 수 없는 문제가 발생했습니다.' });
    }
}
