import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';
import { Fragment } from 'react';

interface Props extends CoreProps {
    /**
     * 셀렉트 너비
     *
     */
    label: string | string[];
    /**
     * label type
     *
     */
    type?: 'active' | 'disable';
    /**
     * 필수 여부
     *
     */
    isRequired?: boolean;
    /**
     * 확장 여부
     *
     */
    isExpand?: boolean;
}

export const WithText: FC<Props> = ({
    children,
    label,
    type = 'active',
    isRequired = false,
    isExpand = false,
}) => {
    const displayName = 'wr-with';

    return (
        <div className={`${displayName}__wrap`}>
            <div
                className={`${displayName}__label ${displayName}__label--${type} ${
                    isExpand ? `${displayName}__label--nowrap` : ''
                }`}
            >
                <div className={isRequired ? `wr-label--required` : ''}>
                    <span>
                        {Array.isArray(label)
                            ? label.map((v, index) => {
                                  if (index === 0) {
                                      return v;
                                  } else {
                                      return (
                                          <Fragment key={`wr-label-${v}`}>
                                              <br />
                                              {v}
                                          </Fragment>
                                      );
                                  }
                              })
                            : label}
                    </span>
                </div>
            </div>

            {children}
        </div>
    );
};
