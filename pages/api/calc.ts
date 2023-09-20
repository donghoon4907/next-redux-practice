import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import scssParser from 'scss-parser';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'POST') {
        console.log(JSON.stringify(req.body, null, 4));

        // const mainScss = fs.readFileSync(
        //     process.cwd() + '/styles/_table.scss',
        //     'utf-8',
        // );

        // const parser = scssParser.parse(mainScss);

        // const cssString = scssParser.stringify(parser);

        // const css = parser.toCSS();

        // console.log(css);

        const html = `
        <style>
            
        </style>
        <div class="wr-table--scrollable">
            <table class="wr-table table">
                <colgroup>
                    <col width="100px" class="wr-pages-compare-car__label" />
                    <col width="100px" />
                </colgroup>
                <thead>
                    <tr>
                        <th colspan="2">
                            <span>보험사</span>
                        </th>
                        <th>
                            <strong>롯데</strong>
                        </th>
                        <th>
                            <strong>삼성</strong>
                        </th>
                        <th>
                            <strong>현대</strong>
                        </th>
                        <th>
                            <strong>메리츠</strong>
                        </th>
                        <th>
                            <strong>한화</strong>
                        </th>
                        <th>
                            <strong>흥국</strong>
                        </th>
                        <th>
                            <strong>DB</strong>
                        </th>
                        <th>
                            <strong>KB</strong>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2">
                            <span>총 보험료</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>(차액)</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>대인 I</span>
                        </td>
                        <td class="text-center">
                            <span>의무가입</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>대인 II</span>
                        </td>
                        <td class="text-center">
                            <span>무한</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>대물</span>
                        </td>
                        <td class="text-center">
                            <span>2억</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>자기신체</span>
                        </td>
                        <td class="text-center">
                            <span>5천/1.5천</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>무보험</span>
                        </td>
                        <td class="text-center">
                            <span>2억</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>자차</span>
                        </td>
                        <td class="text-center">
                            <span>20%/20/50</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>긴급출동</span>
                        </td>
                        <td class="text-center">
                            <span>가입</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>운전범위</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>연령특약</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>연령변경</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>비고</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>가입경력율</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>할인할증율</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>법규위반율</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>특별할증율</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>중고차율</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>ABS</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>오토</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>이모빌</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>에어백</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>블랙박스</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>마일리지</span>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                        <td class="text-end">
                            <strong>854,700</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;

        res.status(200).send(html);
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
