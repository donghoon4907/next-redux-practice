import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MySelect } from '@components/select';
import { useSelect } from '@hooks/use-select';
import orgaConstants from '@constants/options/orga';
import { findSelectOption } from '@utils/getter';
import { SearchFilterDatepicker } from '@partials/common/datepicker/SearchFilter';
import { SearchFilterOrgaSelect } from '@partials/common/select/SearchFilterOrga';
import { SearchFilterKeywordInput } from '@partials/common/input/SearchFilterKeyword';
import { SearchFilterForm } from '@partials/common/form/SearchFilter';
import { SearchFilterDateTypeLabel } from '@partials/common/label/SearchFilterDateType';

interface Props {}

export const OrgaSearchFilter: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();
    // 검색필터 - 조직등급
    const [rate, setRate] = useSelect(orgaConstants.rate);
    // 검색필터 - 현상태
    const [status, setStatus] = useSelect(orgaConstants.status);

    useEffect(() => {
        const { orga_rate, status } = router.query;

        if (orga_rate) {
            setRate(findSelectOption(orga_rate, orgaConstants.rate));
        }

        if (status) {
            setStatus(findSelectOption(status, orgaConstants.status));
        }
    }, [router]);

    return (
        <SearchFilterForm>
            <div className={`${displayName}__filters`}>
                <div className={`${displayName}__filterrow`}>
                    <div className={`${displayName}__filter`}>
                        <SearchFilterOrgaSelect />
                        <div className={`${displayName}__divider`}></div>
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="orga_rank"
                            >
                                조직등급
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    id="orga_rank"
                                    placeholder="선택"
                                    {...rate}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="status"
                            >
                                현상태
                            </label>
                            <div style={{ width: 100 }}>
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
                                indateLabel="등록일"
                                outdateLabel="폐점일"
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
