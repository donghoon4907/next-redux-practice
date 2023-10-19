import type { NextApiRequest, NextApiResponse } from 'next';
import hrsService from '@services/hrsService';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { data } = await hrsService.logout();

        res.status(200).send('');
    } catch {
        res.status(500).json({ message: '알 수 없는 문제가 발생했습니다.' });
    }
}
