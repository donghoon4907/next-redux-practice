import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelect } from '@hooks/use-select';
import { MySelect } from '@components/select';
import userConstants from '@constants/options/user';
import { SearchFilterDatepicker } from '@partials/common/datepicker/SearchFilter';
import { SearchFilterOrgaSelect } from '@partials/common/select/SearchFilterOrga';
import { SearchFilterUserSelect } from '@partials/common/select/SearchFilterUser';
import { SearchFilterForm } from '@partials/common/form/SearchFilter';
import { SearchFilterKeywordInput } from '@partials/common/input/SearchFilterKeyword';
import { SearchFilterDateTypeLabel } from '@partials/common/label/SearchFilterDateType';
import { findSelectOption } from '@utils/getter';

interface Props {}

export const UserSearchFilter: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    // 검색필터 - 영업구분
    const [userType, setUserType] = useSelect(userConstants.type2);

    // 검색필터 - 협회등록
    const [asso, setAsso] = useSelect(userConstants.asso);

    // 검색필터 - 재직현황
    const [status, setStatus] = useSelect(userConstants.status2);

    useEffect(() => {
        const { user_type, asso, status } = router.query;

        if (user_type) {
            setUserType(findSelectOption(user_type, userConstants.type2));
        }

        if (asso) {
            setAsso(findSelectOption(asso, userConstants.asso));
        }

        if (status) {
            setStatus(findSelectOption(status, userConstants.status2));
        }
    }, [router]);

    return (
        <SearchFilterForm>
            <div className={`${displayName}__filters`}>
                <div className={`${displayName}__filterrow`}>
                    <div className={`${displayName}__filter`}>
                        <SearchFilterOrgaSelect />
                        <SearchFilterUserSelect />
                        <div className={`${displayName}__divider`}></div>
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="user_type"
                            >
                                영업구분
                            </label>
                            <div style={{ width: 110 }}>
                                <MySelect
                                    id="user_type"
                                    placeholder="선택"
                                    {...userType}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="asso"
                            >
                                협회등록
                            </label>
                            <div style={{ width: 110 }}>
                                <MySelect
                                    id="asso"
                                    placeholder="선택"
                                    {...asso}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="status"
                            >
                                재직현황
                            </label>
                            <div style={{ width: 110 }}>
                                <MySelect
                                    id="status"
                                    placeholder="선택"
                                    {...status}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__divider`}></div>
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__field`}>
                            <SearchFilterDateTypeLabel
                                options={[
                                    {
                                        label: '입사일',
                                        value: 'indate',
                                    },
                                    {
                                        label: '퇴사일',
                                        value: 'outdate',
                                    },
                                ]}
                            />
                            <SearchFilterDatepicker />
                        </div>
                        <SearchFilterKeywordInput />
                    </div>
                </div>
            </div>
        </SearchFilterForm>
    );
};
