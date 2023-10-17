import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HrState } from '@reducers/hr';
import { AppState } from '@reducers/index';
import { LongState } from '@reducers/long';
import { useSelect } from '@hooks/use-select';
import { useNumbericInput } from '@hooks/use-input';
import longConstants from '@constants/options/long';
import { DISTS } from '@constants/selectOption';
import { MySelect } from '@components/select';
import { SearchFilterForm } from '@partials/common/form/SearchFilter';
import { SearchFilterOrgaSelect } from '@partials/common/select/SearchFilterOrga';
import { SearchFilterUserSelect } from '@partials/common/select/SearchFilterUser';
import { SearchFilterDatepicker } from '@partials/common/datepicker/SearchFilter';
import { SearchFilterKeywordInput } from '@partials/common/input/SearchFilterKeyword';
import { findSelectOption } from '@utils/getter';

interface Props {}

export const LongSearchFilter: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longViewCompanies } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    const { longs } = useSelector<AppState, LongState>((props) => props.long);

    // 검색필터 - 회차
    const [beforeRound] = useNumbericInput('1', { addComma: true });
    const [afterRound] = useNumbericInput('1', { addComma: true });
    // 검색필터 - 보험사
    const [company, setCompany] = useSelect(longViewCompanies, null);
    // 검색필터 - 보종
    const [productType] = useSelect(longConstants.productType, null);
    // 검색필터 - 상품명
    const [product, setProduct] = useSelect(longs.products, null);
    // 검색필터 - 납입주기
    const [cycle] = useSelect(longConstants.payCycle, null);
    // 검색필터 - 입금구분
    const [dist] = useSelect(DISTS, null);

    useEffect(() => {
        const { company, product } = router.query;

        if (company) {
            setCompany(findSelectOption(company, longViewCompanies));
        }

        if (product) {
            setProduct(findSelectOption(product, longs.products));
        }
    }, [router]);

    return (
        <SearchFilterForm>
            <div className={`${displayName}__filters`}>
                <div className={`${displayName}__filter`}>
                    <SearchFilterOrgaSelect activeUser />
                    <SearchFilterUserSelect />
                </div>
                <div className={`${displayName}__divider`}></div>
                <div className={`${displayName}__filter`}>
                    <div className={`${displayName}__field`}>
                        <label
                            className={`${displayName}__label`}
                            htmlFor="company"
                        >
                            보험사
                        </label>
                        <div style={{ width: 120 }}>
                            <MySelect
                                id="company"
                                fontSize={13}
                                placeholder="선택"
                                {...company}
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__field`}>
                        <label
                            className={`${displayName}__label`}
                            htmlFor="product"
                        >
                            상품명
                        </label>
                        <div style={{ width: 120 }}>
                            <MySelect
                                id="product"
                                fontSize={13}
                                placeholder="선택"
                                {...product}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${displayName}__divider`}></div>
                {/* <div className={`${displayName}__filter`}>
                    <div className={`${displayName}__field`}>
                        <label
                            className={`${displayName}__label`}
                            htmlFor="spec"
                        >
                            보종
                        </label>
                        <div style={{ width: 120 }}>
                            <MySelect
                                id="spec"
                                fontSize={13}
                                placeholder="선택"
                                {...productType}
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__field`}>
                        <label
                            className={`${displayName}__label`}
                            htmlFor="cycle"
                        >
                            납입주기
                        </label>
                        <div style={{ width: 120 }}>
                            <MySelect
                                id="cycle"
                                fontSize={13}
                                placeholder="선택"
                                {...cycle}
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__field`}>
                        <label
                            className={`${displayName}__label`}
                            htmlFor="dist"
                        >
                            입금구분
                        </label>
                        <div style={{ width: 120 }}>
                            <MySelect
                                id="dist"
                                fontSize={13}
                                placeholder="선택"
                                {...dist}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${displayName}__divider`}></div> */}
                <div className={`${displayName}__filter`}>
                    <div className={`${displayName}__field`}>
                        <span className={`${displayName}__label`}>계약일</span>
                        <SearchFilterDatepicker />
                    </div>
                    <SearchFilterKeywordInput />
                </div>
            </div>
        </SearchFilterForm>
    );
};
