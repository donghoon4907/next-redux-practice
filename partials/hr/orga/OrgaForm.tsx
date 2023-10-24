import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HR_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { useApi } from '@hooks/use-api';
import { showDepartSearchModal } from '@actions/modal/depart-search.action';
import { MyFooter } from '@components/footer';
import { MyButton } from '@components/button';
import { showImageUploadModal } from '@actions/modal/image-upload.action';
import { useTab } from '@hooks/use-tab';
import { CoreSelectOption } from '@interfaces/core';
import { CreateUserDTO, UpdateUserDTO } from '@dto/hr/User.dto';
import { createUserRequest } from '@actions/hr/create-user.action';
import { getOrgaRequest } from '@actions/hr/get-orga';
import { updateUserRequest } from '@actions/hr/update-user.action';
import { uploadPortraitRequest } from '@actions/upload/portrait.action';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { useInput } from '@hooks/use-input';
import { FloatSelect } from '@components/select/Float';
import { useDatepicker } from '@hooks/use-datepicker';

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

    const dispatch = useDispatch();

    const { orgas } = useSelector<AppState, HrState>((props) => props.hr);

    const createUser = useApi(createUserRequest);

    const updateUser = useApi(updateUserRequest);
    // 탭 관리
    const [tab, setTab] = useTab(HR_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    const labelType = editable ? 'active' : 'disable';
    // d
    const [name] = useInput('');
    // d
    const [indate] = useDatepicker(null);

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
            createUser(createUserDto.getPayload(), ({ userid }) => {});
        }
    };
    const handleUpdate = () => {
        const payload = createPayload();

        const updateUserDto = new UpdateUserDTO(payload);

        if (updateUserDto.requiredValidate()) {
            updateUser(updateUserDto.getPayload(), ({ Message }) => {});
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
            <div className={`${displayName} wr-pages-detail`}>
                <div className={`${displayName}__left wr-pages-detail__left`}>
                    <div className="wr-pages-detail__inner">
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="조직등급"
                                            isRequired
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="조직명"
                                            isRequired
                                            {...name}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatInput label="부서장" isRequired />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput label="현황" isRequired />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            id="test"
                                            label="개설일"
                                            isRequired
                                            hooks={indate}
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatDatepicker
                                            id="test"
                                            label="폐점일"
                                            isRequired
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        <FloatSelect label="지역" isRequired />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="우편번호"
                                            isRequired
                                            onSearch={() => {}}
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatInput label="주소1" isRequired />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatInput label="주소2" isRequired />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="상세주소"
                                            isRequired
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__block">
                            <div className="wr-pages-detail__content">
                                <div className="row">
                                    <div className="flex-fill">
                                        <FloatSelect
                                            label="은행명"
                                            isRequired
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <FloatInput label="예금주" isRequired />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="flex-fill">
                                        <FloatInput
                                            label="계좌번호"
                                            isRequired
                                        />
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <FloatSelect label="과세여부" isRequired />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wr-pages-detail__right">
                    <ul className="wr-tab__wrap" role="tablist">
                        {HR_DETAIL_TABS.map((v) => (
                            <MyTab
                                key={v.id}
                                onClick={setTab}
                                isActive={v.id === tab.id}
                                {...v}
                            />
                        ))}
                        <li className="wr-tab__line"></li>
                    </ul>
                    <div className="wr-pages-detail__body"></div>
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
