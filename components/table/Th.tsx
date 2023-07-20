import type { FC } from 'react';
import type { Header } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

interface Props extends Header<any, unknown> {}

export const MyTh: FC<Props> = ({ isPlaceholder, column, getContext }) => {
    return (
        <th
        // colSpan={header.colSpan}
        // style={{
        //     width: header.getSize(),
        // }}
        >
            {isPlaceholder
                ? null
                : flexRender(column.columnDef.header, getContext())}
            {/* <div
                                    {...{
                                        onMouseDown: header.getResizeHandler(),
                                        onTouchStart: header.getResizeHandler(),
                                        className: `resizer ${
                                            header.column.getIsResizing()
                                                ? 'isResizing'
                                                : ''
                                        }`,
                                    }}
                                /> */}
        </th>
    );
};
