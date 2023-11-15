import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyCheckbox } from '@components/checkbox';
import { UseCheckboxOutput } from '@hooks/use-checkbox';
import { WithText } from '@components/WithText';

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
            <div className="row wr-mt">
                <div className="col">
                    <div className="row">
                        <div className="col-8">
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content p-15">
                                    <div className="wr-pages-detail__subtitle">
                                        시스템사용
                                    </div>
                                    <div className="wr-pages-detail__toolbar wr-mt">
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
                                        <MyCheckbox
                                            label="중복로그인"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__lock">
                                    <p>준비 중입니다.</p>
                                </div>
                                <div className="wr-pages-detail__title">
                                    <strong>통계</strong>
                                </div>
                                <div className="wr-pages-detail__content">
                                    <div className="wr-pages-detail__with">
                                        <MyCheckbox
                                            id="at_is_me"
                                            label="본인"
                                        />
                                        <MyCheckbox
                                            id="at_is_orga"
                                            label="소속조직"
                                        />
                                        <MyCheckbox
                                            id="at_is_com"
                                            label="회사전체"
                                        />
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {/* <div className="col">
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__lock">
                                    <p>준비 중입니다.</p>
                                </div>
                                <div className="wr-pages-detail__title">
                                    <strong>모든게시판</strong>
                                </div>
                                <div className="wr-pages-detail__content">
                                    <div className="wr-pages-detail__with">
                                        <MyCheckbox
                                            id="at_is_bopen"
                                            label="열람"
                                        />
                                        <MyCheckbox
                                            id="at_is_bwrite"
                                            label="작성"
                                        />
                                        <MyCheckbox
                                            id="at_is_bapprove"
                                            label="승인"
                                        />
                                        <MyCheckbox
                                            id="at_is_badmin"
                                            label="관리자"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__lock">
                                    <p>준비 중입니다.</p>
                                </div>
                                <div className="wr-pages-detail__title">
                                    <strong>목표관리</strong>
                                </div>
                                <div className="wr-pages-detail__content">
                                    <div className="wr-pages-detail__with">
                                        <MyCheckbox
                                            id="at_is_gopen"
                                            label="열람"
                                        />
                                        <MyCheckbox
                                            id="at_is_gset"
                                            label="설정"
                                        />
                                        <MyCheckbox
                                            id="at_is_gmanage"
                                            label="관리"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="col">
                    {/* <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__lock">
                            <p>준비 중입니다.</p>
                        </div>
                        <div className="wr-pages-detail__title">
                            <strong>장기</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <WithText label="계약" type={labelType}>
                                <div className="wr-pages-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox id="at_is_lopen" label="열람" />
                                    <MyCheckbox
                                        id="at_is_lwrite"
                                        label="작성"
                                    />
                                    <MyCheckbox
                                        id="at_is_lapprove"
                                        label="승인"
                                    />
                                    <MyCheckbox
                                        id="at_is_lmanage"
                                        label="관리자"
                                    />
                                </div>
                            </WithText>
                            <WithText label="실적" type={labelType}>
                                <div className="wr-pages-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox
                                        id="at_is_perfmodify"
                                        label="수정"
                                    />
                                    <MyCheckbox
                                        id="at_is_perfcreate"
                                        label="생성"
                                    />
                                    <MyCheckbox
                                        id="at_is_perfverify"
                                        label="검증"
                                    />
                                </div>
                            </WithText>
                            <WithText label="엑셀" type={labelType}>
                                <div className="wr-pages-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox
                                        id="at_is_excelcont"
                                        label="보유계약"
                                    />
                                    <MyCheckbox
                                        id="at_is_excelperf"
                                        label="실적"
                                    />
                                    <MyCheckbox
                                        id="at_is_excelpay"
                                        label="정산"
                                    />
                                    <MyCheckbox
                                        id="at_is_excelmanage"
                                        label="수금관리"
                                    />
                                    <MyCheckbox
                                        id="at_is_excelkeep"
                                        label="미유지"
                                    />
                                </div>
                            </WithText>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__lock">
                            <p>준비 중입니다.</p>
                        </div>
                        <div className="wr-pages-detail__title">
                            <strong>인사/조직</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <WithText label="목록" type={labelType}>
                                <div className="wr-pages-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox
                                        id="at_is_lorga"
                                        label="소속조직"
                                    />
                                    <MyCheckbox
                                        id="at_is_lcom"
                                        label="회사전체"
                                    />
                                </div>
                            </WithText>
                            <WithText label="상세페이지" type={labelType}>
                                <div className="wr-pages-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox id="at_is_dopen" label="열람" />
                                    <MyCheckbox
                                        id="at_is_dmodify"
                                        label="기본수정"
                                    />
                                    <MyCheckbox
                                        id="at_is_dmanage"
                                        label="관리자"
                                    />
                                </div>
                            </WithText>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div> */}
        </MyTabpanel>
    );
};
