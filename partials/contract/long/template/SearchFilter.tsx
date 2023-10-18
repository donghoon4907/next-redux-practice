import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HrState } from '@reducers/hr';
import { AppState } from '@reducers/index';
import { LongState } from '@reducers/long';
import { useSelect } from '@hooks/use-select';
import longConstants from '@constants/options/long';
import { MySelect } from '@components/select';
import { SearchFilterForm } from '@partials/common/form/SearchFilter';
import { SearchFilterOrgaSelect } from '@partials/common/select/SearchFilterOrga';
import { SearchFilterUserSelect } from '@partials/common/select/SearchFilterUser';
import { SearchFilterDatepicker } from '@partials/common/datepicker/SearchFilter';
import { SearchFilterKeywordInput } from '@partials/common/input/SearchFilterKeyword';
import { findSelectOption } from '@utils/getter';
import { MyInput } from '@components/input';
import { MyCheckbox } from '@components/checkbox';
import { generateAllOption } from '@utils/generate';
import { SearchFilterDateTypeLabel } from '@partials/common/label/SearchFilterDateType';
import { useCheckbox } from '@hooks/use-checkbox';

interface Props {}

export const LongSearchFilter: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longViewCompanies } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    // const { longs } = useSelector<AppState, LongState>((props) => props.long);
    // 검색필터 - 보험사
    const [company, setCompany] = useSelect(
        generateAllOption(longViewCompanies),
    );
    // 검색필터 - 보종
    const [productType] = useSelect(longConstants.productType2);
    // 검색필터 - 현상태
    const [status] = useSelect(longConstants.status2);
    // 검색필터 - 납입주기
    const [cycle] = useSelect(longConstants.payCycle2);
    // 검색필터 - 고객경로
    const [sourceroot] = useSelect(longConstants.sourceroot);
    // 검색필터 - 금소법확인
    const [m1] = useSelect(longConstants.mCust);
    // 검색필터 - 완전판매모니터링
    const [m2] = useSelect(longConstants.mCust);
    // 검색필터 - 상품비교설명
    const [m3] = useSelect(longConstants.mCust);
    // 검색필터 - 개인정보동의
    const [m4] = useSelect(longConstants.mCust);
    // 검색필터 - 상품명
    // const [product, setProduct] = useSelect(longs.products, null);

    useEffect(() => {
        const { company, product } = router.query;

        if (company) {
            setCompany(findSelectOption(company, longViewCompanies));
        }

        // if (product) {
        //     setProduct(findSelectOption(product, longs.products));
        // }
    }, [router]);

    return (
        <SearchFilterForm>
            <div className={`${displayName}__left`}>
                <div className={`${displayName}__filters`}>
                    <div className={`${displayName}__filter`}>
                        <SearchFilterOrgaSelect activeUser />
                        <SearchFilterUserSelect />
                        <div className={`${displayName}__checkboxfield`}>
                            <MyCheckbox
                                id="check_user"
                                value="Y"
                                label="담당미지정"
                            />
                        </div>
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
                            <div style={{ width: 100 }}>
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
                                htmlFor="spec"
                            >
                                보종
                            </label>
                            <div style={{ width: 100 }}>
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
                                htmlFor="status"
                            >
                                현상태
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    id="status"
                                    fontSize={13}
                                    placeholder="선택"
                                    {...status}
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
                            <div style={{ width: 100 }}>
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
                                htmlFor="sourceroot"
                            >
                                고객경로
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    id="sourceroot"
                                    fontSize={13}
                                    placeholder="선택"
                                    {...cycle}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${displayName}__divider`}></div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                // htmlFor="t1"
                            >
                                금소법확인
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    // id="t2"
                                    fontSize={13}
                                    placeholder="선택"
                                    {...m1}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                // htmlFor="t1"
                            >
                                완전판매모니터링
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    // id="t2"
                                    fontSize={13}
                                    placeholder="선택"
                                    {...m2}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                // htmlFor="t1"
                            >
                                상품비교설명
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    // id="t2"
                                    fontSize={13}
                                    placeholder="선택"
                                    {...m3}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                // htmlFor="t1"
                            >
                                개인정보동의
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    // id="t2"
                                    fontSize={13}
                                    placeholder="선택"
                                    {...m4}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${displayName}__filters`}>
                    <div className={`${displayName}__filter`}>
                        {/* <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="product"
                            >
                                상품명
                            </label>
                            <div style={{ width: 320 }}>
                                <MySelect
                                    id="product"
                                    fontSize={13}
                                    placeholder="선택"
                                    {...product}
                                />
                            </div>
                        </div> */}
                        <div className={`${displayName}__field`}>
                            <SearchFilterDateTypeLabel
                                indateLabel="계약일자"
                                outdateLabel="상태반영일"
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
