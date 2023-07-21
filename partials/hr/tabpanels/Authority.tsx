import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTable } from '@components/table';
import { useColumn } from '@hooks/use-column';
import { LONG_COL_PERFORMANCE } from '@constants/column';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyInput } from '@components/input';
import { MyLabel } from '@components/label';
import { MyRadio } from '@components/radio';
import { MyCheckbox } from '@components/checkbox';
import { MyButton } from '@components/button';
import { useSelect } from '@hooks/use-select';
import { CALC_STANDARD } from '@constants/options/user';
import { useDispatch } from 'react-redux';
import { showGuaranteeSettingModal } from '@actions/modal/guarantee-setting.action';

interface Props extends MyTabpanelProps {
    // data: any[];
    editable: boolean;
    // addCount: number;
    // onAddCount: () => void;
}

export const AuthorityTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    // data,
    editable,
    // addCount,
    // onAddCount,
}) => {
    const dispatch = useDispatch();
    // const columns = useColumn(LONG_COL_PERFORMANCE)

    const [calcStandard] = useSelect(CALC_STANDARD);

    const labelType = editable ? 'active' : 'disable';

    const handleShowSettingModal = () => {
        dispatch(showGuaranteeSettingModal());
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-pages-hr-detail__toolbar">
                <div className="wr-pages-hr-detail__buttons">
                    <MyCheckbox label="최소허용" />
                    <MyCheckbox label="전체허용" />
                </div>
                <div>
                    <MyCheckbox label="엑셀다운로드 일괄허용" />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-3">
                    <div className="wr-pages-hr-detail__block">
                        <div className="wr-pages-hr-detail__title">
                            <strong>시스템사용</strong>
                        </div>
                        <div className="wr-pages-hr-detail__content">
                            <div className="wr-pages-hr-detail__with">
                                <MyCheckbox label="웹" />
                                <MyCheckbox label="모바일" />
                                <MyCheckbox label="중복로그인" />
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-hr-detail__block">
                        <div className="wr-pages-hr-detail__title">
                            <strong>통계</strong>
                        </div>
                        <div className="wr-pages-hr-detail__content">
                            <div className="wr-pages-hr-detail__with">
                                <MyCheckbox label="본인" />
                                <MyCheckbox label="소속조직" />
                                <MyCheckbox label="회사전체" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="wr-pages-hr-detail__block wr-ml">
                        <div className="wr-pages-hr-detail__title">
                            <strong>모든게시판</strong>
                        </div>
                        <div className="wr-pages-hr-detail__content">
                            <div className="wr-pages-hr-detail__with">
                                <MyCheckbox label="열람" />
                                <MyCheckbox label="작성" />
                                <MyCheckbox label="승인" />
                                <MyCheckbox label="관리자" />
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-hr-detail__block wr-ml">
                        <div className="wr-pages-hr-detail__title">
                            <strong>목표관리</strong>
                        </div>
                        <div className="wr-pages-hr-detail__content">
                            <div className="wr-pages-hr-detail__with">
                                <MyCheckbox label="열람" />
                                <MyCheckbox label="설정" />
                                <MyCheckbox label="관리" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="wr-pages-hr-detail__block wr-ml">
                        <div className="wr-pages-hr-detail__title">
                            <strong>장기</strong>
                        </div>
                        <div className="wr-pages-hr-detail__content">
                            <WithLabel label="계약" type={labelType}>
                                <div className="wr-pages-hr-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox label="열람" />
                                    <MyCheckbox label="작성" />
                                    <MyCheckbox label="승인" />
                                    <MyCheckbox label="관리자" />
                                </div>
                            </WithLabel>
                            <WithLabel label="실적" type={labelType}>
                                <div className="wr-pages-hr-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox label="수정" />
                                    <MyCheckbox label="생성" />
                                    <MyCheckbox label="검증" />
                                </div>
                            </WithLabel>
                            <WithLabel label="엑셀" type={labelType}>
                                <div className="wr-pages-hr-detail__with wr-border wr-pl wr-pr">
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
                    <div className="wr-pages-hr-detail__block">
                        <div className="wr-pages-hr-detail__title">
                            <strong>인사/조직</strong>
                        </div>
                        <div className="wr-pages-hr-detail__content">
                            <WithLabel label="목록" type={labelType}>
                                <div className="wr-pages-hr-detail__with wr-border wr-pl wr-pr">
                                    <MyCheckbox label="소속조직" />
                                    <MyCheckbox label="회사전체" />
                                </div>
                            </WithLabel>
                            <WithLabel label="상세페이지" type={labelType}>
                                <div className="wr-pages-hr-detail__with wr-border wr-pl wr-pr">
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
