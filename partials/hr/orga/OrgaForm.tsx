import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { OrgaState } from '@reducers/orga';
import type { UserState } from '@reducers/user';
import type { CoreSelectOption } from '@interfaces/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { ORGA_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { useApi } from '@hooks/use-api';
import { MyFooter } from '@components/footer';
import { MyButton } from '@components/button';
import { useTab } from '@hooks/use-tab';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { useInput, useNumbericInput, usePhoneInput } from '@hooks/use-input';
import { FloatSelect } from '@components/select/Float';
import { useDatepicker } from '@hooks/use-datepicker';
import { useSelect } from '@hooks/use-select';
import commonConstants from '@constants/options/common';
import orgaConstants from '@constants/options/orga';
import { SetPostcodeInput } from '@partials/common/input/SetPostcode';
import { usePostcode } from '@hooks/use-postcode';
import { createOrgaRequest } from '@actions/hr/orga/create-orga.action';
import { updateOrgaRequest } from '@actions/hr/orga/update-orga.action';
import { CreateOrgaDTO, UpdateOrgaDTO } from '@dto/hr/Orga.dto';
import { isEmpty } from '@utils/validator/common';
import { getLazyOrgasRequest } from '@actions/hr/orga/get-lazy-orgas.action';

import { OrgaQualManageTabpanel } from './tabpanels/QualManage';

interface Props {
    /**
     * 모드: 등록 / 수정
     */
    mode: 'create' | 'update';
    /**
     * PK
     */
    idx?: string;
    /**
     * 조직등급
     */
    defaultOrgaRank?: CoreSelectOption;
    /**
     * 소속
     */
    defaultUpperIdx?: CoreSelectOption;
    /**
     * 부서장
     */
    defaultManager?: CoreSelectOption;
    /**
     * 현황
     */
    defaultStatus?: CoreSelectOption;
    /**
     * 조직명
     */
    defaultName?: string;
    /**
     * 개설일
     */
    defaultIndate?: string;
    /**
     * 폐점일
     */
    defaultOutdate?: string;
    /**
     * 대표번호
     */
    defaultTel?: string;
    /**
     * fax
     */
    defaultFax?: string;
    /**
     * 우편번호 기본 값
     */
    defaultPostCode?: string;
    /**
     * 주소1 기본 값
     */
    defaultAddress1?: string;
    /**
     * 주소2 기본 값
     */
    defaultAddress2?: string;
    /**
     * 상세주소 기본 값
     */
    defaultAddress3?: string;
    /**
     * 은행
     */
    defaultBank?: CoreSelectOption;
    /**
     * 예금주
     */
    defaultIncomeName?: string;
    /**
     * 계좌
     */
    defaultIncomeAccount?: string;
    /**
     * 과세여부
     */
    defaultIncomeTax?: CoreSelectOption;
    /**
     * 손해보험협회
     */
    defaultDno?: string;
    defaultDcom?: CoreSelectOption;
    defaultDindate?: string;
    defaultDoutdate?: string;
    defaultDmanager?: CoreSelectOption;
    /**
     * 생명보험협회
     */
    defaultLno?: string;
    defaultLcom?: CoreSelectOption;
    defaultLindate?: string;
    defaultLoutdate?: string;
    defaultLmanager?: CoreSelectOption;
}

export const OrgaForm: FC<Props> = ({
    mode,
    idx = -1,
    defaultOrgaRank = null,
    defaultUpperIdx,
    defaultManager = null,
    defaultStatus = null,
    defaultName = '',
    defaultIndate,
    defaultOutdate,
    defaultTel = '',
    defaultFax = '',
    defaultPostCode = '',
    defaultAddress1 = '',
    defaultAddress2 = '',
    defaultAddress3 = '',
    defaultBank = null,
    defaultIncomeName = '',
    defaultIncomeAccount = '',
    defaultIncomeTax = null,
    defaultDno = '',
    defaultDcom = null,
    defaultDindate,
    defaultDoutdate,
    defaultDmanager = null,
    defaultLno = '',
    defaultLcom = null,
    defaultLindate,
    defaultLoutdate,
    defaultLmanager = null,
}) => {
    const displayName = 'wr-pages-orga-detail';

    const { banks, wrCompanies, codes } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { orgas } = useSelector<AppState, OrgaState>((state) => state.orga);

    const { users } = useSelector<AppState, UserState>((state) => state.user);

    const getLazyOrgas = useApi(getLazyOrgasRequest);

    // const getLazyUsers = useApi(getLazyUsersRequest);

    const createOrga = useApi(createOrgaRequest);

    const updateOrga = useApi(updateOrgaRequest);
    // 탭 관리
    const [tab, setTab] = useTab(ORGA_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    // 조직등급
    const [orga_rank] = useSelect(orgaConstants.grade, defaultOrgaRank);
    // 소속
    const [upper_idx] = useSelect(orgas, defaultUpperIdx);
    // 부서장
    const [manager] = useSelect(users, defaultManager);
    // 현황
    const [status] = useSelect(orgaConstants.status, defaultStatus);
    // 조직명
    const [orga_name] = useInput(defaultName);
    // 개설일
    const [indate] = useDatepicker(
        defaultIndate ? new Date(defaultIndate) : null,
    );
    // 폐점일
    const [outdate] = useDatepicker(
        defaultOutdate ? new Date(defaultOutdate) : null,
    );
    // 대표번호
    const [tel] = usePhoneInput(defaultTel);
    // fax
    const [fax] = usePhoneInput(defaultFax);
    // 우편번호
    const [postcode, address1, address2, onClickPostcode] = usePostcode(
        {
            postcode: defaultPostCode,
            address1: defaultAddress1,
            address2: defaultAddress2,
        },
        { disabled: !editable },
    );
    const [address3] = useInput(defaultAddress3);
    // 은행
    const [income_bank] = useSelect(banks, defaultBank);
    // 예금주
    const [income_name] = useInput(defaultIncomeName);
    // 계좌번호
    const [income_account] = useNumbericInput(defaultIncomeAccount);
    // 과세여부
    const [income_tax] = useSelect(commonConstants.yn, defaultIncomeTax);
    // 손보 등록번호
    const [d_no] = useInput(defaultDno, { noSpace: true });
    // 손보 등록보험사
    const [d_wcode] = useSelect(
        wrCompanies.filter((v) => v.origin.dist === '손보'),
        defaultDcom,
    );
    // 손보 등록일
    const [d_indate] = useDatepicker(
        defaultDindate ? new Date(defaultDindate) : null,
    );
    // 손보 해촉일
    const [d_outdate] = useDatepicker(
        defaultDoutdate ? new Date(defaultDoutdate) : null,
    );
    // 손보 지점장
    const [d_manager] = useSelect(users, defaultDmanager);
    // 생보 등록번호
    const [l_no] = useInput(defaultLno, { noSpace: true });
    // 생보 등록보험사
    const [l_wcode] = useSelect(
        wrCompanies.filter((v) => v.origin.dist === '생보'),
        defaultLcom,
    );
    // 생보 등록일
    const [l_indate] = useDatepicker(
        defaultLindate ? new Date(defaultLindate) : null,
    );
    // 생보 해촉일
    const [l_outdate] = useDatepicker(
        defaultLoutdate ? new Date(defaultLoutdate) : null,
    );
    // 생보 지점장
    const [l_manager] = useSelect(users, defaultLmanager);

    // 수정 버튼 클릭 핸들러
    const handleClickModify = () => {
        setEditable(true);
    };
    // 취소 버튼 클릭 핸들러
    const handleClickCancel = () => {
        const tf = confirm('수정을 취소하시겠습니까?');

        if (tf) {
            location.reload();
        }
    };
    const handleCreate = () => {
        const payload = createPayload();

        const createDto = new CreateOrgaDTO(payload);

        if (createDto.requiredValidate()) {
            createOrga(createDto.getPayload(), () => {
                alert('등록되었습니다.');
            });
        }
    };
    const handleUpdate = () => {
        const payload = createPayload();

        const updateDto = new UpdateOrgaDTO(payload);

        if (updateDto.requiredValidate()) {
            updateOrga(updateDto.getPayload(), ({ Message }) => {
                alert('수정되었습니다.');
            });
        }
    };
    const createPayload = () => {
        const payload: any = {
            associate: [
                {
                    type: '손보',
                    no: d_no.value,
                    wcode: d_wcode.value ? d_wcode.value.value : null,
                    indate: d_indate.value
                        ? dayjs(d_indate.value).format('YYYY-MM-DD')
                        : null,
                    outdate: d_outdate.value
                        ? dayjs(d_outdate.value).format('YYYY-MM-DD')
                        : null,
                    manager_id: d_manager.value ? d_manager.value.value : null,
                },
                {
                    type: '생보',
                    no: l_no.value,
                    wcode: l_wcode.value ? l_wcode.value.value : null,
                    indate: l_indate.value
                        ? dayjs(l_indate.value).format('YYYY-MM-DD')
                        : null,
                    outdate: l_outdate.value
                        ? dayjs(l_outdate.value).format('YYYY-MM-DD')
                        : null,
                    manager_id: l_manager.value ? l_manager.value.value : null,
                },
            ],
            insucode: codes,
        };

        if (idx !== -1) {
            payload['idx'] = idx;
        }

        if (orga_rank.value) {
            payload['orga_rank'] = orga_rank.value.value;
        }

        if (upper_idx.value) {
            payload['upper_idx'] = upper_idx.value.value;
        }

        if (!isEmpty(orga_name.value)) {
            payload['orga_name'] = orga_name.value;
        }

        if (manager.value) {
            payload['manager_id'] = manager.value.value;
        }

        if (status.value) {
            payload['status'] = status.value.value;
        }

        if (indate.value) {
            payload['indate'] = dayjs(indate.value).format('YYYY-MM-DD');
        }

        if (outdate.value) {
            payload['outdate'] = dayjs(outdate.value).format('YYYY-MM-DD');
        }

        if (!isEmpty(tel.value)) {
            payload['tel'] = tel.value.replace(/-/g, '');
        }

        if (!isEmpty(fax.value)) {
            payload['fax'] = fax.value.replace(/-/g, '');
        }

        if (!isEmpty(postcode.value)) {
            payload['postcode'] = postcode.value;
        }

        if (!isEmpty(address1.value)) {
            payload['address1'] = address1.value;
        }

        if (!isEmpty(address2.value)) {
            payload['address2'] = address2.value;
        }

        if (!isEmpty(address3.value)) {
            payload['address3'] = address3.value;
        }

        if (income_bank.value) {
            payload['income_bank'] = income_bank.value.value;
        }

        if (!isEmpty(income_name.value)) {
            payload['income_name'] = income_name.value;
        }

        if (!isEmpty(income_account.value)) {
            payload['income_account'] = income_account.value;
        }

        if (income_tax.value) {
            if (income_tax.value.value === 'Y') {
                payload['income_tax'] = true;
            } else if (income_tax.value.value === 'N') {
                payload['income_tax'] = false;
            }
        }

        return payload;
    };

    useEffect(() => {
        if (orga_rank.value) {
            getLazyOrgas({ rate: orga_rank.value.value });
        }
    }, [orga_rank.value]);

    // useEffect(() => {
    //     if (upper_idx.value) {
    //         getLazyUsers({ idx: upper_idx.value.value });
    //     }
    // }, [upper_idx.value]);

    return (
        <>
            <div className={`${displayName} wr-pages-detail wr-frame__tabbody`}>
                <div
                    className={`${displayName}__left wr-pages-detail__left wr-pages-detail__applydatepicker`}
                >
                    <div className="wr-pages-detail__inner">
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="조직등급"
                                            isDisabled={!editable}
                                            isRequired
                                            {...orga_rank}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="조직명"
                                            readOnly={!editable}
                                            isRequired
                                            {...orga_name}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                {orgas.length !== 0 && (
                                    <div className="row">
                                        <div className="flex-fill">
                                            <FloatSelect
                                                label="소속"
                                                isDisabled={!editable}
                                                isRequired
                                                {...upper_idx}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={`row ${
                                        orgas.length === 0 ? '' : 'wr-mt'
                                    }`}
                                >
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="부서장"
                                            isDisabled={!editable}
                                            isRequired
                                            {...manager}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="현황"
                                            isDisabled={!editable}
                                            isRequired
                                            {...status}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            id="indate"
                                            label="개설일"
                                            readOnly={!editable}
                                            isRequired
                                            hooks={indate}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            id="outdate"
                                            label="폐점일"
                                            readOnly={!editable}
                                            hooks={outdate}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="대표번호"
                                            readOnly={!editable}
                                            {...tel}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="FAX"
                                            readOnly={!editable}
                                            {...fax}
                                        />
                                    </div>
                                </div>
                                <SetPostcodeInput
                                    activeMarginTop
                                    disabled={!editable}
                                    postcodeHooks={postcode}
                                    address1Hooks={address1}
                                    address2Hooks={address2}
                                    address3Hooks={address3}
                                    onClickPostcode={onClickPostcode}
                                />
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="은행명"
                                            isDisabled={!editable}
                                            {...income_bank}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="예금주"
                                            readOnly={!editable}
                                            {...income_name}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="계좌번호"
                                            readOnly={!editable}
                                            {...income_account}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="과세여부"
                                            isDisabled={!editable}
                                            {...income_tax}
                                        />
                                    </div>
                                    <div className="flex-fill"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wr-pages-detail__right">
                    <ul className="wr-tab__wrap" role="tablist">
                        {ORGA_DETAIL_TABS.map((v) => (
                            <MyTab
                                key={v.id}
                                onClick={setTab}
                                isActive={v.id === tab.id}
                                {...v}
                            />
                        ))}
                        <li className="wr-tab__line"></li>
                    </ul>
                    <div className="wr-pages-detail__body">
                        <OrgaQualManageTabpanel
                            id="tabpanelAsso"
                            tabId="tabAsso"
                            hidden={tab.id !== 'tabAsso'}
                            editable={editable}
                            d_no={d_no}
                            d_company={d_wcode}
                            d_indate={d_indate}
                            d_outdate={d_outdate}
                            d_manager={d_manager}
                            l_no={l_no}
                            l_company={l_wcode}
                            l_indate={l_indate}
                            l_outdate={l_outdate}
                            l_manager={l_manager}
                        />
                        {/* <MyTabpanel id="test" tabId="test" hidden={false}>
                            <div className="row">
                                <div className="flex-fill">
                                    <div className="row">
                                        <div className="flex-fill">
                                            <label>자동차규정</label>
                                            <div className="wr-pages-detail__block wr-mt">
                                                <div className="wr-pages-detail__content">
                                                    <FloatInput label="규정명" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-fill">
                                            <label>일반규정</label>
                                            <div className="wr-pages-detail__block wr-mt">
                                                <div className="wr-pages-detail__content">
                                                    <FloatSelect label="지급율" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-fill"></div>
                            </div>
                        </MyTabpanel> */}
                    </div>
                </div>
            </div>
            <MyFooter>
                <div className="wr-footer__between">
                    <div></div>
                    <div className="wr-pages-detail__buttons">
                        {editable && (
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
                                등록
                            </MyButton>
                        )}
                        {mode === 'update' && (
                            <MyButton
                                type="button"
                                className="btn-primary btn-sm"
                                onClick={
                                    editable ? handleUpdate : handleClickModify
                                }
                            >
                                {editable ? '변경 사항 적용' : '수정'}
                            </MyButton>
                        )}
                    </div>
                </div>
            </MyFooter>
        </>
    );
};
