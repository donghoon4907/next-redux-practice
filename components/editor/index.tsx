import type { EditorProps } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { useRef, forwardRef } from 'react';
import { Editor as EditorType } from '@toast-ui/react-editor';
import { useApi } from '@hooks/use-api';
import { uploadImageRequest } from '@actions/upload/image.action';

import type { TuiEditorWithForwardedProps } from './TuiEditorWrapper';

interface EditorPropsWithHandlers extends EditorProps {
    onChange?(value: string): void;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(
    () => import('./TuiEditorWrapper'),
    { ssr: false },
);

const EditorWithForwardedRef = forwardRef<
    EditorType | undefined,
    EditorPropsWithHandlers
>((props, ref) => (
    <Editor
        {...props}
        forwardedRef={ref as React.MutableRefObject<EditorType>}
    />
));

interface Props extends EditorProps {
    onChange(value: string): void;

    valueType?: 'markdown' | 'html';
}

export const MyEditor: React.FC<Props> = ({
    onChange,
    valueType,
    initialValue,
    previewStyle,
    height,
    initialEditType,
    useCommandShortcut,
    ...rest
}) => {
    const upload = useApi(uploadImageRequest);

    const editorRef = useRef<EditorType>();

    const handleChange = () => {
        if (!editorRef.current) {
            return;
        }

        const instance = editorRef.current.getInstance();

        onChange(
            valueType === 'markdown'
                ? instance.getMarkdown()
                : instance.getHTML(),
        );
    };

    return (
        <div className="wr-editor">
            <EditorWithForwardedRef
                {...rest}
                initialValue={initialValue || ''}
                previewStyle={previewStyle || 'vertical'}
                height={height || '600px'}
                initialEditType={initialEditType || 'wysiwyg'}
                useCommandShortcut={useCommandShortcut || true}
                ref={editorRef}
                onChange={handleChange}
                hideModeSwitch
                toolbarItems={[
                    // ['undo', 'redo'],
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol', 'task', 'indent', 'outdent'],
                    ['table', 'image', 'link'],
                    ['code', 'codeblock'],
                    [
                        // {
                        //     el: createPhotoButton(),
                        //     tooltip: 'photos',
                        // },
                    ],
                ]}
                hooks={{
                    addImageBlobHook: async (blob: any, callback: any) => {
                        // const formData = new FormData();

                        // formData.append('file', blob);

                        // upload(
                        //     {
                        //         formData,
                        //     },
                        //     (fileName: string) => {
                        //         callback(fileName, '');
                        //     },
                        // );

                        callback(blob, '');

                        return false;
                    },
                }}
            />
        </div>
    );
};
