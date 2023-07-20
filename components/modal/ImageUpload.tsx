import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { HrState } from '@reducers/hr';
import { useState, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { hideImageUploadModal } from '@actions/modal/image-upload.action';
import { useApi } from '@hooks/use-api';
import { uploadPortraitRequest } from '@actions/upload/portrait.action';

// import Uppy from '@uppy/core';
// import { Dashboard } from '@uppy/react';
// import { MyButton } from '@components/button';

interface Props {}

export const ImageUploadModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowImageUploadModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { loggedInUser } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const upload = useApi(uploadPortraitRequest);

    const cropperRef = createRef<ReactCropperElement>();

    const [image, setImage] = useState('');

    const handleChange = (e: any) => {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };

        reader.readAsDataURL(files[0]);
    };

    const handleClose = () => {
        dispatch(hideImageUploadModal());
    };

    const handleSubmit = () => {
        const tf = confirm('이미지를 적용하시겠습니까?');

        if (tf) {
            cropperRef.current?.cropper
                .getCroppedCanvas()
                .toBlob(function (blob) {
                    if (blob) {
                        const formData = new FormData();

                        const file = new File([blob], 'example.jpg', {
                            type: 'image/jpeg',
                        });

                        formData.append('file', file);

                        upload(
                            {
                                userid: loggedInUser.userid,
                                formData,
                            },
                            (filename) => {
                                handleClose();
                            },
                        );
                    }
                });
        }
    };

    // const uppy = new Uppy({
    //     id: 'uppyUploader',
    //     autoProceed: true,
    //     restrictions: {
    //         maxFileSize: 5242880, // 최대 파일 크기 (5MB)
    //         allowedFileTypes: ['.jpg', '.jpeg', '.png'], // 허용되는 파일 유형
    //     },
    // });

    return (
        <Modal
            isOpen={isShowImageUploadModal}
            toggle={handleClose}
            size={image ? 'xl' : 'lg'}
        >
            <ModalHeader toggle={handleClose}>프로필 사진 설정</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <input type="file" onChange={handleChange} />
                        <br />
                        <br />
                        <Cropper
                            ref={cropperRef}
                            style={{ height: 400, width: '100%' }}
                            zoomTo={0.5}
                            aspectRatio={200 / 220}
                            preview=".img-preview"
                            src={image}
                            viewMode={1}
                            // cropBoxResizable={false}
                            background={true}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            guides={true}
                        />
                    </div>
                    {image && (
                        <div className="col-6">
                            <div className="wr-ml">
                                <h3>Preview</h3>
                                <div
                                    className="img-preview"
                                    style={{
                                        width: '100%',
                                        height: '250px',
                                        overflow: 'hidden',
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* <div className="upload-files-container">
                    <div className="drag-file-area">
                        <h3 className="dynamic-message">Drag & Drop</h3>
                    </div>
                    <span className="cannot-upload-message">
                        {' '}
                        <span className="material-icons-outlined">
                            error
                        </span>{' '}
                        Please select a file first{' '}
                        <span className="material-icons-outlined cancel-alert-button">
                            cancel
                        </span>{' '}
                    </span>
                    <div className="file-block">
                        <div className="file-info">
                            {' '}
                            <span className="material-icons-outlined file-icon">
                                description
                            </span>{' '}
                            <span className="file-name"> </span> |{' '}
                            <span className="file-size"></span>{' '}
                        </div>
                        <span className="material-icons remove-file-icon">
                            delete
                        </span>
                        <div className="progress-bar"> </div>
                    </div>
                    <button type="button" className="upload-button">
                        {' '}
                        Upload{' '}
                    </button>
                </div> */}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    적용
                </Button>
            </ModalFooter>
        </Modal>
    );
};
