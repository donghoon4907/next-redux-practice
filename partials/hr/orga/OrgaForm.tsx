import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ORGA_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { useApi } from '@hooks/use-api';
import { MyFooter } from '@components/footer';
import { MyButton } from '@components/button';
import { useTab } from '@hooks/use-tab';
import { CoreSelectOption } from '@interfaces/core';
import { CreateUserDTO, UpdateUserDTO } from '@dto/hr/User.dto';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { useInput, useNumbericInput, usePhoneInput } from '@hooks/use-input';
import { FloatSelect } from '@components/select/Float';
import { useDatepicker } from '@hooks/use-datepicker';
import { useSelect } from '@hooks/use-select';
import commonConstants from '@constants/options/common';
import orgaConstants from '@constants/options/orga';
import { QualManageTabpanel } from '../user/tabpanels/QualManage';
import { SetPostcodeInput } from '@partials/common/input/SetPostcode';
import { usePostcode } from '@hooks/use-postcode';

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

    const { users } = useSelector<AppState, HrState>((state) => state.hr);

    // const dispatch = useDispatch();

    // const create = useApi(createUserRequest);

    // const update = useApi(updateUserRequest);
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
    const [indate] = useDatepicker(null);
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
    // 예금주
    const [income_name] = useInput('');
    // 계좌번호
    const [income_account] = useNumbericInput('');
    // 과세여부
    const [income_tax] = useSelect(commonConstants.yn, null);

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

        const createUserDto = new CreateUserDTO(payload);

        if (createUserDto.requiredValidate()) {
            // createUser(createUserDto.getPayload(), ({ userid }) => {});
        }
    };
    const handleUpdate = () => {
        const payload = createPayload();

        const updateUserDto = new UpdateUserDTO(payload);

        if (updateUserDto.requiredValidate()) {
            // updateUser(updateUserDto.getPayload(), ({ Message }) => {});
        }
    };
    const createPayload = () => {
        const payload: any = {};

        if (idx !== -1) {
            payload['idx'] = idx;
        }

        return payload;
    };
    return (
        <>
            <form className={`${displayName} wr-pages-detail`}>
                <div className={`${displayName}__left wr-pages-detail__left`}>
                    <div className="wr-pages-detail__inner">
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                {/* <div className="row">
                                    <div className="flex-fill">
                                        <FloatSelect label="소속" isRequired />
                                    </div>
                                </div> */}
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
                                        <FloatSelect label="은행명" />
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
                        {/* <QualManageTabpanel
                            id="tabpanelAsso"
                            tabId="tabAsso"
                            hidden={tab.id !== 'tabAsso'}
                            editable={editable}
                            giaNo={giaNo}
                            giaComp={giaComp}
                            giaIndate={giaIndate}
                            giaOutdate={giaOutdate}
                            giaQualification={giaQualification}
                            liaNo={liaNo}
                            liaComp={liaComp}
                            liaIndate={liaIndate}
                            liaOutdate={liaOutdate}
                            liaQualification={liaQualification}
                        /> */}
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
