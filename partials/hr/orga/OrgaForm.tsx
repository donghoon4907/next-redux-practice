import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { ORGA_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { useApi } from '@hooks/use-api';
import { MyFooter } from '@components/footer';
import { MyButton } from '@components/button';
import { useTab } from '@hooks/use-tab';
import { CoreSelectOption } from '@interfaces/core';
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
import { createOrgaRequest } from '@actions/hr/create-orga.action';
import { CreateOrgaDTO } from '@dto/hr/Orga.dto';
import { isEmpty } from '@utils/validator/common';
import { getUsersRequest } from '@actions/hr/get-users';

import { OrgaQualManageTabpanel } from './tabpanels/QualManage';

interface Props {
    /**
     * 모드: 등록 / 수정
     */
    mode: 'create' | 'update';
    /**
     * 사원번호
     */
    userid?: string;
    /**
     * PK
     */
    idx?: string;
    /**
     * 별칭 기본 값
     */
    defaultNick?: string;
    /**
     * 재직 현황 기본 값
     */
    defaultStatus?: CoreSelectOption;
}

export const OrgaForm: FC<Props> = ({ mode, userid = '', idx = -1 }) => {
    const displayName = 'wr-pages-orga-detail';

    const { users, banks, allCompanies, codes } = useSelector<
        AppState,
        HrState
    >((state) => state.hr);

    const dispatch = useDispatch();

    const createOrga = useApi(createOrgaRequest);

    // const updateOrga = useApi(updateOrgaRequest);
    // 탭 관리
    const [tab, setTab] = useTab(ORGA_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    // 조직등급
    const [orga_rank] = useSelect(orgaConstants.grade, null);
    // 부서장
    const [manager] = useSelect(users, null);
    // 현황
    const [status] = useSelect(orgaConstants.status, null);
    // 조직명
    const [orga_name] = useInput('');
    // 개설일
    const [indate] = useDatepicker(new Date());
    // 폐점일
    const [outdate] = useDatepicker(null);
    // 대표번호
    const [tel] = usePhoneInput('');
    // fax
    const [fax] = usePhoneInput('');
    // 우편번호
    const [postcode, address1, address2, onClickPostcode] = usePostcode(
        {
            postcode: '',
            address1: '',
            address2: '',
        },
        { disabled: !editable },
    );
    const [address3] = useInput('');
    // 은행
    const [income_bank] = useSelect(banks, null);
    // 예금주
    const [income_name] = useInput('');
    // 계좌번호
    const [income_account] = useNumbericInput('');
    // 과세여부
    const [income_tax] = useSelect(commonConstants.yn, null);
    // 손보 등록번호
    const [d_no] = useInput('', { noSpace: true });
    // 손보 등록보험사
    const [d_wcode] = useSelect(
        allCompanies.filter((v) => v.origin.dist === '손보'),
        null,
    );
    // 손보 등록일
    const [d_indate] = useDatepicker(null);
    // 손보 해촉일
    const [d_outdate] = useDatepicker(null);
    // 손보 지점장
    const [d_manager] = useSelect(users, null);
    // 생보 등록번호
    const [l_no] = useInput('', { noSpace: true });
    // 생보 등록보험사
    const [l_wcode] = useSelect(
        allCompanies.filter((v) => v.origin.dist === '생보'),
        null,
    );
    // 생보 등록일
    const [l_indate] = useDatepicker(null);
    // 생보 해촉일
    const [l_outdate] = useDatepicker(null);
    // 생보 지점장
    const [l_manager] = useSelect(users, null);

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

        const createUserDto = new CreateOrgaDTO(payload);

        if (createUserDto.requiredValidate()) {
            createOrga(createUserDto.getPayload(), () => {
                alert('조직이 등록되었습니다.');
            });
        }
    };
    const handleUpdate = () => {
        const payload = createPayload();

        // const updateUserDto = new UpdateUserDTO(payload);

        // if (updateUserDto.requiredValidate()) {
        //     updateUser(updateUserDto.getPayload(), ({ Message }) => {});
        // }
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

        if (orga_rank.value) {
            payload['orga_rank'] = orga_rank.value.value;
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
            let flag = false;
            if (income_tax.value.value === 'Y') {
                flag = true;
            }

            payload['income_tax'] = flag;
        }

        return payload;
    };

    useEffect(() => {
        dispatch(getUsersRequest({ idx: '1' }));
    }, []);
    return (
        <>
            <form className={`${displayName} wr-pages-detail`}>
                <div className={`${displayName}__left wr-pages-detail__left`}>
                    <div className="wr-pages-detail__inner">
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="조직등급"
                                            {...orga_rank}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="조직명"
                                            {...orga_name}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="부서장"
                                            {...manager}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatSelect label="현황" {...status} />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            id="indate"
                                            label="개설일"
                                            hooks={indate}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            id="outdate"
                                            label="폐점일"
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
                                        <FloatInput label="대표번호" {...tel} />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput label="FAX" {...fax} />
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
                                            {...income_bank}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="예금주"
                                            {...income_name}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="계좌번호"
                                            {...income_account}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="과세여부"
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
            </form>
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
