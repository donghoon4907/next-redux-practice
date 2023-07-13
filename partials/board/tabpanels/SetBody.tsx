import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CoreSetState } from '@interfaces/core';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyEditor } from '@components/editor';

interface Props extends Pick<MyTabpanelProps, 'hidden'> {
    content: string;
    setContent: CoreSetState<string>;
    editorHeight: number;
}

export const SetBodysTabpanel: FC<Props> = ({
    hidden,
    content,
    setContent,
    editorHeight,
}) => {
    return (
        <MyTabpanel id="tabpanelSetBody" tabId="tabSetBody" hidden={hidden}>
            <MyEditor
                height={`${editorHeight}px`}
                previewStyle="tab"
                initialEditType="wysiwyg"
                initialValue={content}
                onChange={(content) => setContent(content)}
            />
        </MyTabpanel>
    );
};
