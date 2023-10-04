import type { FC, FormEvent } from 'react';
import { useRef } from 'react';
import { MyButton } from '@components/button';
import { MyFooter } from '@components/footer';
import { CompareDTO } from '@dto/contractor/Compare.dto';

import { FormCarGuarantee } from './FormCarGuarantee';
import { FormCarDetail } from './FormCarDetail';
import { FormCarRate } from './FormCarRate';
import { FormCarCustomer } from './FormCarCustomer';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';

export const CarCompareForm: FC = () => {
    const displayName = 'wr-pages-compare-car';

    const rightRef = useRef<HTMLDivElement>(null);

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
    };

    // 보험료 계산
    const handleCalculate = () => {
        if (formRef.current) {
            const formData = new FormData(formRef.current);

            const payload = Object.fromEntries(formData.entries());

            const compareDto = new CompareDTO(payload);

            if (compareDto.requiredValidate()) {
                if (rightRef.current) {
                    formData.set(
                        'jumin',
                        payload.jumin.toString().replace(/-/g, ''),
                    );
                    formData.set(
                        'carprice',
                        payload.carprice.toString().replace(/,/g, ''),
                    );
                    formData.set(
                        'bupum_price',
                        payload.bupum_price.toString().replace(/,/g, ''),
                    );
                    formData.set(
                        'il_price',
                        payload.il_price.toString().replace(/,/g, ''),
                    );

                    formData.append(
                        'ret_url',
                        'http://localhost:3000/calculate',
                    );
                    formData.append('com_name', 'woori!@#$');

                    const hiddenForm = document.createElement('form');
                    hiddenForm.action =
                        'http://cal.insnara.co.kr/estimate/outer_test_woori.asp';
                    hiddenForm.method = 'post';
                    hiddenForm.target = 'target_frame';
                    hiddenForm.style.display = 'none';
                    hiddenForm.acceptCharset = 'euc-kr';

                    // FormData를 hidden 폼으로 전송
                    for (const [key, value] of formData.entries()) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = value as string;
                        hiddenForm.appendChild(input);
                    }

                    rightRef.current.appendChild(hiddenForm);

                    hiddenForm.submit();

                    rightRef.current.removeChild(hiddenForm);
                }
            }
        }
    };

    return (
        <>
            <div className={`${displayName}__header row`}>
                <div className="col-6">
                    <div className="row">
                        <div className="col">
                            <WithLabel id="orga" label="지점" type="active">
                                <MySelect inputId="orga" />
                            </WithLabel>
                        </div>
                        <div className="col">
                            <WithLabel id="team" label="팀" type="active">
                                <MySelect inputId="team" />
                            </WithLabel>
                        </div>
                        <div className="col">
                            <WithLabel id="member" label="구성원" type="active">
                                <MySelect inputId="member" />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col">
                            <WithLabel id="manager" label="담당" type="active">
                                <MySelect inputId="manager" />
                            </WithLabel>
                        </div>
                        <div className="col">
                            <WithLabel
                                id="status"
                                label="처리상태"
                                type="active"
                            >
                                <MySelect inputId="status" />
                            </WithLabel>
                        </div>
                    </div>
                </div>
            </div>
            <form className={displayName} ref={formRef} onSubmit={handleSubmit}>
                <div className={`${displayName}__body row wr-mt`}>
                    <div
                        className={`${displayName}__left wr-pages-detail__left`}
                    >
                        <FormCarCustomer />
                        <FormCarDetail />
                        <FormCarGuarantee />
                        <FormCarRate />
                    </div>
                    <div
                        className={`${displayName}__right wr-pages-detail__right`}
                        ref={rightRef}
                    >
                        <iframe
                            name="target_frame"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-footer__between">
                        <div>
                            <div className="wr-pages-detail__buttons">
                                <MyButton
                                    type="button"
                                    className="btn-dark"
                                    onClick={handleCalculate}
                                >
                                    보험료계산
                                </MyButton>
                            </div>
                        </div>
                        <div>
                            <MyButton className="btn-primary">
                                계약정보저장
                            </MyButton>
                        </div>
                    </div>
                </MyFooter>
            </form>
        </>
    );
};
