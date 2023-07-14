import type { FC, ChangeEvent } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CoreSetState } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { UploadState } from '@reducers/upload';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyButton } from '@components/button';
import { useApi } from '@hooks/use-api';
import { uploadRequest } from '@actions/upload/upload.action';
import { MyCheckbox } from '@components/checkbox';

interface Props extends Pick<MyTabpanelProps, 'hidden'> {
    setFiles: CoreSetState<File[]>;
}

export const SetFileTabpanel: FC<Props> = ({ hidden, setFiles }) => {
    const upload = useApi(uploadRequest);

    const { uploadedFiles } = useSelector<AppState, UploadState>(
        (props) => props.upload,
    );

    const fileRef = useRef<HTMLInputElement>(null);

    const handleClickFile = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };

    const handleChangeFile = (evt: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(evt.target.files || []);

        setFiles(files);

        const formData = new FormData();

        files.forEach((file) => {
            formData.append('file', file);
        });

        upload({
            category: 'board',
            formData,
            lastIndex: uploadedFiles.length,
        });
    };

    return (
        <MyTabpanel id="tabpanelSetFile" tabId="tabSetFile" hidden={hidden}>
            <div className="wr-pages-create-board__attachment">
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
                                onChange={handleChangeFile}
                                multiple
                                hidden
                            />
                        </MyButton>
                        <div>최대 30MB 크기의 파일을 업로드할 수 있습니다.</div>
                    </div>
                    {/* <div>
                        <MyButton
                            className="btn-danger"
                            onClick={handleClickFile}
                        >
                            <span>선택 삭제</span>
                        </MyButton>
                    </div> */}
                </div>
                {uploadedFiles.length > 0 && (
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
                )}
            </div>
        </MyTabpanel>
    );
};
