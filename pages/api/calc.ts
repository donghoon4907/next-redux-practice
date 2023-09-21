import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    console.log(req.method);
    if (req.method === 'POST') {
        const {
            hd_err,
            dy_err,
            ss_err,
            db_err,
            lg_err,
            ji_err,
            sd_err,
            sy_err,
            dh_err,
            ...rest
        } = req.body;

        const qs = Object.keys(rest)
            .map((key) => `${key}=${rest[key]}`)
            .join('&');

        res.redirect(`/calculate?${qs}`);
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
