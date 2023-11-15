import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import { useState } from 'react';
import { MyFooter } from '@components/footer';
import { MyButton } from '@components/button';
import { CreateLongDTO } from '@dto/contractor/Long.dto';
import { LongSearchFilter } from './template/SearchFilter';
import { FloatInput } from '@components/input/Float';
import { FloatSelect } from '@components/select/Float';

interface Props {
    /**
     * 모드: 등록 / 수정
     */
    mode: 'create' | 'update';
    /**
     * PK
     */
    idx?: number;
    /**
     * 담당자 기본 ID
     */
    defaultUserid: string;
    /**
     * 수정 시
     */
    defaultOrganize?: string;
    /**
     * 담당자 조직 기본 ID
     */
    defaultOrga?: CoreSelectOption;
}

export const LongRuleForm: FC<Props> = ({
    mode,
    idx = -1,
    defaultUserid,
    defaultOrganize = '',
    defaultOrga = null,
}) => {
    const displayName = 'wr-pages-long-detail';

    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);

    // 취소 버튼 클릭 핸들러
    const handleClickCancel = () => {
        const tf = confirm('수정을 취소하시겠습니까?');

        if (tf) {
            location.reload();
        }
    };

    const handleCreate = () => {
        const payload = createPayload();

        const createDto = new CreateLongDTO(payload);

        if (createDto.requiredValidate()) {
            // createLong(createDto.getPayload(), () => {
            //     alert('등록되었습니다.');
            // });
        }
    };

    const createPayload = () => {
        // 필수값
        const payload: any = {};

        return payload;
    };

    return (
        <>
            <div className="d-flex justify-content-end wr-pages-detail__comment">
                &quot;공동규정&quot;과 &quot;지정규정&quot;이 같이 지정된 경우
                &quot;지정규정&quot;이 적용됩니다.
            </div>
            <div className="wr-pages-detail__block">
                <div className="wr-pages-detail__content p-15">
                    <div className="row">
                        <div className="col-2">
                            <FloatInput label="장기 지급 제도명" />
                        </div>
                        <div className="col-2">
                            <FloatInput label="제도 적용 등급" />
                        </div>
                        <div className="col-2">
                            <FloatSelect label="제도 적용 조직" />
                        </div>
                        <div className="col-2">
                            <FloatSelect label="사용유무" />
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="col-2">
                            <div className="row">
                                <div className="flex-fill">
                                    <FloatSelect label="구간 규정 여부" />
                                </div>
                                <div className="flex-fill">
                                    <FloatSelect label="구간등급" />
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <FloatSelect label="환수 제도" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${displayName} wr-pages-detail wr-mt`}>
                <div className="flex-fill">
                    <div className="wr-pages-detail__block h-100 w-100">
                        <div className="wr-pages-detail__content">
                            <div className="wr-pages-detail__subtitle wr-border-b">
                                <strong>테이블 지급 규정</strong>
                            </div>
                            <div className="row wr-mt">
                                <div className="col-3">
                                    <FloatSelect label="보험사" />
                                </div>
                                <div className="col-3">
                                    <FloatSelect label="수수료항목" />
                                </div>
                                <div className="col-3">
                                    <FloatSelect label="정산항목" />
                                </div>
                            </div>
                            <div className="wr-table--normal wr-mt">
                                <table className="wr-table table">
                                    <thead>
                                        <tr>
                                            <th>보험사</th>
                                            <th>수수료항목</th>
                                            <th>정산종목</th>
                                            <th>산출기준</th>
                                            <th>시작회차</th>
                                            <th>종료회차</th>
                                            <th>지급율</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={7}>
                                                규정이 없습니다.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-fill">
                    <div className="wr-pages-detail__block h-100 w-100">
                        <div className="wr-pages-detail__content">
                            <div className="wr-pages-detail__subtitle wr-border-b">
                                <strong>원수수료 기준 비례 지급 규정</strong>
                            </div>
                            <div className="row wr-mt">
                                <div className="col-3">
                                    <FloatSelect label="보험사" />
                                </div>
                                <div className="col-3">
                                    <FloatSelect label="수입수수료항목" />
                                </div>
                                <div className="col-3">
                                    <FloatSelect label="환수정산방식" />
                                </div>
                            </div>
                            <div className="wr-table--normal wr-mt">
                                <table className="wr-table table">
                                    <thead>
                                        <tr>
                                            <th>보험사</th>
                                            <th>지급수수료항목</th>
                                            <th>수입수수료종목</th>
                                            <th>시작회차</th>
                                            <th>종료회차</th>
                                            <th>비례율</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={7}>
                                                규정이 없습니다.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MyFooter>
                <div className="wr-footer__between">
                    <div></div>
                    <div className="wr-pages-detail__buttons">
                        {editable && mode === 'update' && (
                            <MyButton
                                className="btn-secondary btn-sm"
                                onClick={handleClickCancel}
                            >
                                취소
                            </MyButton>
                        )}
                        {mode === 'create' && (
                            <MyButton
                                type="button"
                                className="btn-primary btn-sm"
                                onClick={handleCreate}
                            >
                                저장
                            </MyButton>
                        )}
                    </div>
                </div>
            </MyFooter>
        </>
    );
};
