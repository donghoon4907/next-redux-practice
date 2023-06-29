import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = path.join(process.cwd(), 'data', 'overrides.json');

    const jsonData = fs.readFileSync(filePath, 'utf8');

    const data = JSON.parse(jsonData);

    res.status(200).json(data);
}
