import type { NextPage } from 'next';
import type { ChangeEvent } from 'react';
import type { MyColumnDef } from '@hooks/use-column';
import Head from 'next/head';
import { useMemo, useState, useRef } from 'react';
import { UploadSelect } from '@components/select/Upload';
import { MyTable } from '@components/table';
import { readAndConvert } from '@utils/xlsx';
import { convertForSelectUpload } from '@utils/converter';
import { useLoading } from '@hooks/use-loading';
import { MyLayout } from '@components/Layout';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { END } from 'redux-saga';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { MySelect } from '@components/select';
import { MyInput } from '@components/input';
import { MyButton } from '@components/button';
import { MyFooter } from '@components/footer';
import { CoreSelectOption } from '@interfaces/core';
import { MyLocalPagination } from '@components/pagination/local';
import { useApi } from '@hooks/use-api';
import { uploadLongRequest } from '@actions/contract/long/upload.action';
import longConstants from '@constants/options/long';

const LongUpload: NextPage = () => {
    // const dispatch = useDispatch();
    const uploadLong = useApi(uploadLongRequest);

    const loading = useLoading();

    const fileRef = useRef<HTMLInputElement>(null);
    // 업로드 파일명
    const [filename, setFilename] = useState('');
    // 테이블의 컬럼 목록
    const [fields, setFields] = useState<CoreSelectOption[]>([]);
    // 컬럼의 셀렉트 설정 목록
    const [selects, setSelects] = useState<Array<CoreSelectOption | null>>([]);
    // 불러온 데이터 원본
    const [originData, setOriginData] = useState<any[]>([]);
    // 해당 페이지에 보여지는 데이터
    const [displayData, setDisplayData] = useState<any[]>([]);

    const handleUpload = () => {
        const findIndex = selects.findIndex((v) => v && v.value === 'cnum');

        if (findIndex === -1) {
            return alert('계약번호가 지정되지 않았습니다.');
        }

        const selectsCount = selects.reduce((acc, cur) => {
            if (cur) {
                return (acc += 1);
            }

            return acc;
        }, 0);
        // 계약번호만 선택된 경우
        if (selectsCount === 1) {
            return alert('계약번호 외 다른 필드가 지정되어야 합니다.');
        }

        const cnumArr = originData.map((v) => v[findIndex + 1]);

        const cnumSet = new Set(cnumArr);

        // 중복요소가 있는지 확인
        if (cnumArr.length !== cnumSet.size) {
            return alert(
                '계약번호는 동일한 값을 가진 필드로 지정할 수 없습니다.',
            );
        }

        const data = [];
        for (let i = 0; i < originData.length; i++) {
            const obj: any = {};
            for (let j = 0; j < selects.length; j++) {
                if (selects[j]) {
                    obj[selects[j]!.value] = originData[i][j + 1];
                }
            }

            data.push(obj);
        }

        uploadLong({ data });
    };

    const handleClickFile = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };

    const handleChangeFile = async (evt: ChangeEvent<any>) => {
        const file = evt.target.files[0];

        loading.on();

        try {
            const converted = await readAndConvert(
                file,
                convertForSelectUpload,
            );
            // empty 필드 제거
            const filtedFields = converted.fields.filter((v) => v);

            setFields(filtedFields);

            setSelects(
                Array.from({ length: filtedFields.length }).map(() => null),
            );

            setOriginData(converted.data);

            setFilename(file.name);
        } catch (error) {
            console.error(error);
        } finally {
            loading.off();
        }
    };

    const columns = useMemo<MyColumnDef[]>(
        () =>
            fields.map(({ label, value }) => {
                return {
                    columns: [
                        {
                            header: (info: any) => <strong>{label}</strong>,
                            accessorKey: value,
                            cell: (info: any) => (
                                <span
                                    className="text-truncate d-block"
                                    style={{ width: 100 }}
                                >
                                    {info.getValue()}
                                </span>
                            ),
                        },
                    ],
                    header: (info: any) => {
                        let cellValue = info.column.id;

                        return (
                            <div>
                                <UploadSelect
                                    options={longConstants.fields}
                                    index={+cellValue - 1}
                                    values={selects}
                                    setValues={setSelects}
                                    height="30px"
                                />
                            </div>
                        );
                    },
                    accessorKey: value,
                };
            }),
        [fields, selects],
    );

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className="wr-pages-list">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__title">
                            <strong>장기 선택업로드</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <div style={{ width: 150 }}>
                                        <MySelect id="orga" />
                                    </div>

                                    <MyInput
                                        type="text"
                                        placeholder={filename}
                                        readOnly
                                        className="wr-border-l--hide"
                                        onClick={handleClickFile}
                                        button={{
                                            type: 'button',
                                            className: 'btn-primary btn-sm',
                                            onClick: handleClickFile,
                                            children: (
                                                <>
                                                    <span>파일찾기</span>
                                                </>
                                            ),
                                        }}
                                    />
                                </div>
                                <div>
                                    {originData.length > 0 && (
                                        <MyButton
                                            className="btn-primary"
                                            onClick={handleUpload}
                                        >
                                            업로드
                                        </MyButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-list__body wr-mt">
                        <div className="wr-table--scrollable h-100">
                            <MyTable
                                columns={columns}
                                data={displayData}
                                pageSize={displayData.length}
                            />
                        </div>
                    </div>
                    <MyFooter>
                        <MyLocalPagination
                            data={originData}
                            setDisplayData={setDisplayData}
                        >
                            <span>
                                건수: {originData.length.toLocaleString()}
                            </span>
                        </MyLocalPagination>
                    </MyFooter>
                </div>
                <input
                    type="file"
                    onChange={handleChangeFile}
                    hidden
                    ref={fileRef}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(getCompaniesRequest('long-use'));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default LongUpload;
