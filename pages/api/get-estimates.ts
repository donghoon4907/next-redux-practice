import type { NextApiRequest, NextApiResponse } from 'next';
import type { GetEstimatesRequestPayload } from '@actions/car/get-estimates.action';
import carsService from '@services/carsService';
import { tokenMiddleware } from '@utils/middleware/next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    tokenMiddleware(req, res);

    const payload: GetEstimatesRequestPayload = {
        userid: req.query.userid as string,
        bo_datefrom: req.query.bo_datefrom as string,
    };

    try {
        const { data } = await carsService.getEstimates(payload);

        res.status(200).json(data);
    } catch {
        res.status(500).json({
            message: '알 수 없는 문제가 발생했습니다.',
        });
    }
}
