import type { NextPage } from 'next';
import type { ChangeEvent } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import {
    getPostsRequest,
    getPostsSuccess,
} from '@actions/board/get-posts.action';
import { MyLayout } from '@components/Layout';
import { WithLabel } from '@components/WithLabel';
import { MyButton } from '@components/button';
import { MyEditor } from '@components/editor';
import { MyFooter } from '@components/footer';
import { SearchInput } from '@components/input/Search';
import { MyPagination } from '@components/pagination';
import { MySelect } from '@components/select';
import { MyTable } from '@components/table';
import { useColumn } from '@hooks/use-column';
import { useTab } from '@hooks/use-tab';
import { BoardState } from '@reducers/board';
import { AppState } from '@reducers/index';
import { IconWrapper } from '@components/IconWrapper';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { AccessibleText } from '@components/AccessibleText';
import { MyInput } from '@components/input';
import { uploadRequest } from '@actions/upload/upload.action';
import { UploadState } from '@reducers/upload';
import { MyCheckbox } from '@components/checkbox';

const CreateBoard: NextPage = () => {
    const dispatch = useDispatch();

    const { boards } = useSelector<AppState, BoardState>(
        (props) => props.board,
    );

    const { uploadedFiles } = useSelector<AppState, UploadState>(
        (props) => props.upload,
    );

    const columns = useColumn(boards.fields);

    const tab = useTab();

    const fileRef = useRef<HTMLInputElement>(null);

    const [content, setContent] = useState<string>('');

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(evt.target.files || []);

        setSelectedFiles(files);

        const formData = new FormData();

        files.forEach((file) => {
            formData.append('file', file);
        });

        dispatch(
            uploadRequest({
                category: 'board',
                formData,
                lastIndex: uploadedFiles.length,
            }),
        );
    };

    const handleClickFile = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };

    const handleClickRow = (row: any) => {
        tab.fire(
            `board${row.idx}`,
            `게시글(${row.title})`,
            `/board/${row.idx}`,
        );
    };

    const handleSubmit = () => {};

    return (
        <>
            <Head>
                <title>게시물등록</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className="wr-pages-create-board">
                    <div className="wr-pages-create-board__header">
                        <div className="row">
                            <div className="col-9">
                                <WithLabel
                                    id="title"
                                    label="제목"
                                    type="active"
                                >
                                    <MyInput
                                        type="text"
                                        id="rtitle"
                                        placeholder="입력"
                                    />
                                </WithLabel>
                            </div>
                            <div className="col-3">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="tag"
                                        label="태그"
                                        type="active"
                                    >
                                        <MyInput
                                            type="text"
                                            id="tag"
                                            placeholder="쉼표(,)를 이용하여 복수 입력"
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-create-board__body wr-mt">
                        <MyEditor
                            height="415px"
                            previewStyle="tab"
                            initialEditType="wysiwyg"
                            initialValue={content}
                            onChange={(content) => setContent(content)}
                        />
                        <div className="wr-pages-create-board__attachment wr-mt">
                            <div className="wr-pages-create-board__toolbar">
                                <div className="wr-btn--with">
                                    <MyButton
                                        className="btn-primary"
                                        onClick={handleClickFile}
                                    >
                                        <AiOutlineFileAdd size={20} />
                                        <span>파일 첨부</span>
                                        <input
                                            type="file"
                                            ref={fileRef}
                                            onChange={handleFileChange}
                                            multiple
                                            hidden
                                        />
                                    </MyButton>
                                    <div>
                                        최대 30MB 크기의 파일을 업로드할 수
                                        있습니다.
                                    </div>
                                </div>
                                <div>
                                    <MyButton
                                        className="btn-danger"
                                        onClick={handleClickFile}
                                    >
                                        <span>선택 삭제</span>
                                    </MyButton>
                                </div>
                            </div>
                            <ul className="wr-pages-create-board__uploaded wr-mt">
                                {uploadedFiles.map((v, i) => (
                                    <li
                                        key={`uploadedList${i}`}
                                        className="wr-pages-create-board__uploaditem"
                                    >
                                        <div className="wr-pages-create-board__file">
                                            <div>
                                                <MyCheckbox
                                                    id={`uploadedList${i}`}
                                                    label=""
                                                />
                                            </div>

                                            <span>첨부 파일 {i + 1} -</span>
                                            <span>{`${v.file.name}(${(
                                                v.file.size / 1024
                                            ).toFixed(1)}
                                                KB)`}</span>
                                        </div>
                                        <div className="wr-pages-create-board__progress">
                                            <div
                                                className="progress"
                                                role="progressbar"
                                                aria-label="Basic example"
                                                aria-valuenow={v.progress}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            >
                                                <div
                                                    className="progress-bar"
                                                    style={{
                                                        width: `${v.progress}%`,
                                                    }}
                                                />
                                            </div>
                                            <span>
                                                {v.progress === 100
                                                    ? '완료'
                                                    : `${v.progress}%`}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="wr-pages-create-board__option wr-mt">
                            <div>
                                <MyCheckbox id="test1" label="댓글 허용" />
                            </div>
                            <div>
                                <MyCheckbox id="test2" label="알림 여부" />
                            </div>
                            <div>
                                <MyCheckbox id="test3" label="공개 여부" />
                            </div>
                        </div>
                    </div>
                    <MyFooter>
                        <div className="wr-pages-detail__footer">
                            <div></div>
                            <div>
                                <MyButton
                                    type="button"
                                    className="btn-primary"
                                    onClick={handleSubmit}
                                >
                                    등록
                                </MyButton>
                            </div>
                        </div>
                    </MyFooter>
                </div>
            </MyLayout>
        </>
    );
};

export async function getServerSideProps() {
    return {
        props: {},
    };
}

export default CreateBoard;
