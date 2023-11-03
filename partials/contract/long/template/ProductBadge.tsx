import { textToBadgeColor } from '@utils/color';
import type { FC } from 'react';

interface Props {
    spec?: string;
    subcategory?: string | null;
    calSpec?: string | null;
}

export const ProductBadgeTemplate: FC<Props> = ({
    spec,
    subcategory,
    calSpec,
}) => {
    return (
        <div className="wr-badge__wrap">
            {spec && (
                <span
                    className={`badge rounded-pill wr-badge ${textToBadgeColor(
                        spec,
                    )}`}
                >
                    {spec}
                </span>
            )}
            {subcategory && (
                <span className={`badge rounded-pill wr-badge lightgray`}>
                    {subcategory}
                </span>
            )}
            {calSpec && (
                <span className={`badge rounded-pill wr-badge lightblue`}>
                    {calSpec}
                </span>
            )}
        </div>
    );
};
