import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';
import { Fragment } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { IconWrapper } from './IconWrapper';

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
    /**
     * 이전 아이콘 핸들러
     */
    onPrev?: () => void;
    /**
     * 다음 아이콘 핸들러
     */
    onNext?: () => void;
}

export const WithArrow: FC<Props> = ({
    children,
    label,
    type = 'active',
    isRequired = false,
    isExpand = false,
    onPrev,
    onNext,
}) => {
    const displayName = 'wr-with';

    return (
        <div className={`${displayName}__wrap`}>
            <div
                className={`${displayName}__label ${displayName}__label--${type} ${
                    isExpand ? `${displayName}__label--nowrap` : ''
                }`}
            >
                {onPrev && (
                    <IconWrapper onClick={onPrev}>
                        <MdPlayArrow
                            size={20}
                            style={{ transform: 'rotate(180deg)' }}
                        />
                    </IconWrapper>
                )}

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
                {onNext && (
                    <IconWrapper onClick={onNext}>
                        <MdPlayArrow size={20} />
                    </IconWrapper>
                )}
            </div>

            {children}
        </div>
    );
};
