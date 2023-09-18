import type { NextApiRequest, NextApiResponse } from 'next';
import hrsService from '@services/hrsService';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { ip, userid, password } = req.body;

    try {
        const { data } = await hrsService.verify({
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
