import { ChangeEvent } from 'react';

import { uploadImageRequest } from '../actions/upload/image.action';
import { useMutation } from '../hooks/use-mutation';
import { PhotoType } from '../types/photo';
import { CoreSetState } from '../types/core';

export const useUpload = (type: PhotoType, setState: CoreSetState<string>) => {
    // 업로드 요청 모듈
    const [uploadImage] = useMutation(uploadImageRequest);

    // 파일 변경 감지 모듈
    const handleChangeFile = async (evt: ChangeEvent<HTMLInputElement>) => {
        const { value, files } = evt.target;
        // 취소 버튼을 누른 경우
        if (!value) {
            return;
        }

        const [file] = files as any;

        const formData = new FormData();

        formData.append('file', file);

        uploadImage(
            {
                formData,
                type,
            },
            (fileName: string) => {
                setState(fileName);
            },
        );
    };

    return { handleChangeFile };
};
