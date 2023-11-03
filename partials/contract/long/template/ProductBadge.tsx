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
                <span className="badge rounded-pill spec wr-badge">{spec}</span>
            )}
            {subcategory && (
                <span className="badge rounded-pill subcategory wr-badge">
                    {subcategory}
                </span>
            )}
            {calSpec && (
                <span className="badge rounded-pill calspec wr-badge">
                    {calSpec}
                </span>
            )}
        </div>
    );
};
