import React from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';

export interface TuiEditorWithForwardedProps extends EditorProps {
    forwardedRef?: React.MutableRefObject<Editor>;
}

const TuiEditorWrapper = (props: TuiEditorWithForwardedProps) => (
    <Editor {...props} ref={props.forwardedRef} />
);

export default TuiEditorWrapper;
