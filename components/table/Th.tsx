import type { FC } from 'react';
import type { Header } from '@tanstack/react-table';
import { useEffect } from 'react';
import { BsArrowDown } from 'react-icons/bs';
import { useSearch } from '@hooks/use-search';
import { CoreSetState } from '@interfaces/core';

interface Props extends Header<any, unknown> {
    order: string;
    setOrder: CoreSetState<string>;
}

export const MyTh: FC<Props> = ({
    isPlaceholder,
    column,
    id,
    order,
    setOrder,
}) => {
    const search = useSearch();

    const [type, sort] = order.split(',');

    const handleClick = () => {
        if (type === id) {
            if (sort === 'desc') {
                setOrder(`${id},asc`);
            } else {
                setOrder(`${id},desc`);
            }
        } else {
            setOrder(`${id},desc`);
        }
    };

    useEffect(() => {
        if (type === id) {
            const searchParams = new URLSearchParams(location.search);

            searchParams.set('page', '1');

            searchParams.set('order', `${type},${sort}`);

            search(searchParams.toString());
        }
    }, [type, sort]);

    return (
        <th
        // colSpan={header.colSpan}
        // style={{
        //     width: header.getSize(),
        // }}
        >
            <div
                className="wr-table__header"
                role="button"
                onClick={handleClick}
            >
                <strong>
                    {isPlaceholder ? '' : (column.columnDef as any).headerText}
                </strong>
                {type === id && (
                    <div>
                        {sort === 'asc' && (
                            <BsArrowDown
                                size={13}
                                style={{ transform: 'rotate(180deg)' }}
                            />
                        )}
                        {sort === 'desc' && <BsArrowDown size={13} />}
                    </div>
                )}
            </div>

            {/* {isPlaceholder
                ? null
                : flexRender(column.columnDef.header, getContext())} */}
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
