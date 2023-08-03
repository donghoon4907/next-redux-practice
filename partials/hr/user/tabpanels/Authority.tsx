import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyCheckbox } from '@components/checkbox';
import { UseCheckboxOutput } from '@hooks/use-checkbox';

interface Props extends MyTabpanelProps {
    editable: boolean;
    useWeb: UseCheckboxOutput;
    useMobile: UseCheckboxOutput;
}

export const AuthorityTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    useWeb,
    useMobile,
}) => {
    const labelType = editable ? 'active' : 'disable';

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-pages-detail__toolbar">
                <div className="wr-pages-detail__buttons">
                    <MyCheckbox label="최소허용" disabled />
                    <MyCheckbox label="전체허용" disabled />
                </div>
                <div>
                    <MyCheckbox label="엑셀다운로드 일괄허용" disabled />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-3">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__title">
                            <strong>시스템사용</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="wr-pages-detail__with">
                                <MyCheckbox
                                    disabled={!editable}
                                    label="웹"
                                    {...useWeb}
                                />
                                <MyCheckbox
                                    disabled={!editable}
                                    label="모바일"
                                    {...useMobile}
                                />
                                <MyCheckbox label="중복로그인" disabled />
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__lock">
                            <p>준비 중입니다.</p>
                        </div>
                        <div className="wr-pages-detail__title">
                            <strong>통계</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="wr-pages-detail__with">
                                <MyCheckbox label="본인" />
                                <MyCheckbox label="소속조직" />
                                <MyCheckbox label="회사전체" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="wr-pages-detail__block wr-ml">
                        <div className="wr-pages-detail__lock">
                            <p>준비 중입니다.</p>
                        </div>
                        <div className="wr-pages-detail__title">
                            <strong>모든게시판</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="wr-pages-detail__with">
                                <MyCheckbox label="열람" />
                                <MyCheckbox label="작성" />
                                <MyCheckbox label="승인" />
                                <MyCheckbox label="관리자" />
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-detail__block wr-ml">
                        <div className="wr-pages-detail__lock">
                            <p>준비 중입니다.</p>
                        </div>
                        <div className="wr-pages-detail__title">
                            <strong>목표관리</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="wr-pages-detail__with">
                                <MyCheckbox label="열람" />
                                <MyCheckbox label="설정" />
                                <MyCheckbox label="관리" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="wr-pages-detail__block wr-ml">
                        <div className="wr-pages-detail__lock">
                            <p>준비 중입니다.</p>
                        </div>
                        <div className="wr-pages-detail__title">
                            <strong>장기</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <WithLabel label="계약" type={labelType}>
                                <div className="wr-pages-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox label="열람" />
                                    <MyCheckbox label="작성" />
                                    <MyCheckbox label="승인" />
                                    <MyCheckbox label="관리자" />
                                </div>
                            </WithLabel>
                            <WithLabel label="실적" type={labelType}>
                                <div className="wr-pages-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox label="수정" />
                                    <MyCheckbox label="생성" />
                                    <MyCheckbox label="검증" />
                                </div>
                            </WithLabel>
                            <WithLabel label="엑셀" type={labelType}>
                                <div className="wr-pages-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox label="보유계약" />
                                    <MyCheckbox label="실적" />
                                    <MyCheckbox label="정산" />
                                    <MyCheckbox label="수금관리" />
                                    <MyCheckbox label="미유지" />
                                </div>
                            </WithLabel>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col-6">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__lock">
                            <p>준비 중입니다.</p>
                        </div>
                        <div className="wr-pages-detail__title">
                            <strong>인사/조직</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <WithLabel label="목록" type={labelType}>
                                <div className="wr-pages-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox label="소속조직" />
                                    <MyCheckbox label="회사전체" />
                                </div>
                            </WithLabel>
                            <WithLabel label="상세페이지" type={labelType}>
                                <div className="wr-pages-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox label="열람" />
                                    <MyCheckbox label="기본수정" />
                                    <MyCheckbox label="관리자" />
                                </div>
                            </WithLabel>
                        </div>
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
