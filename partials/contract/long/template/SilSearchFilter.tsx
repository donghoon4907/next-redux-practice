import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { HrState } from '@reducers/hr';
import { AppState } from '@reducers/index';
import { useSelect } from '@hooks/use-select';
import longConstants from '@constants/options/long';
import { MySelect } from '@components/select';
import { SearchFilterForm } from '@partials/common/form/SearchFilter';
import { SearchFilterOrgaSelect } from '@partials/common/select/SearchFilterOrga';
import { SearchFilterUserSelect } from '@partials/common/select/SearchFilterUser';
import { SearchFilterDatepicker } from '@partials/common/datepicker/SearchFilter';
import { SearchFilterKeywordInput } from '@partials/common/input/SearchFilterKeyword';
import { findSelectOption } from '@utils/getter';
import { generateAllOption, generateAllOptionWcode } from '@utils/generate';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { IconWrapper } from '@components/IconWrapper';
import { SearchFilterUserCheckbox } from '@partials/common/checkbox/SearchFilterCheckUser';

interface Props {}

export const LongSilSearchFilter: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longViewCompanies } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    const memorizedCompany = useMemo(
        () => generateAllOption(generateAllOptionWcode(longViewCompanies)),
        [],
    );
    // 확장 여부
    const [expand, setExpand] = useState(false);
    // 검색필터 - 보험사
    const [company, setCompany] = useSelect(memorizedCompany);
    // 검색필터 - 보종
    const [spec, setSpec] = useSelect(longConstants.productType2);
    // 검색필터 - 현상태
    const [status, setStatus] = useSelect(longConstants.silStatus);
    // 검색필터 - 납입주기
    const [pay_cycle, setPayCycle] = useSelect(longConstants.payCycle2);
    // 검색필터 - 납입방법
    const [cycle, setCycle] = useSelect(longConstants.payCycle2);
    // 검색필터 - 입금구분
    const [sildist, setSildist] = useSelect(longConstants.silDist);

    const handleExpand = () => {
        setExpand(!expand);
    };

    useEffect(() => {
        const { company, spec, status, pay_cycle, cycle, sildist } =
            router.query;

        if (company) {
            setCompany(findSelectOption(company, memorizedCompany));
        }

        if (spec) {
            setSpec(findSelectOption(spec, longConstants.productType2));
        }

        if (status) {
            setStatus(findSelectOption(status, longConstants.silStatus));
        }

        if (pay_cycle) {
            setPayCycle(findSelectOption(pay_cycle, longConstants.payCycle2));
        }

        if (cycle) {
            setCycle(findSelectOption(cycle, longConstants.payCycle2));
        }

        if (sildist) {
            setSildist(findSelectOption(sildist, longConstants.silDist));
        }
    }, [router]);

    return (
        <SearchFilterForm>
            <div
                className={`${displayName}__extension ${
                    expand ? `${displayName}__extension--expanded` : ''
                }`}
            >
                <IconWrapper onClick={handleExpand}>
                    {expand ? (
                        <AiOutlineCaretUp size={20} fill="#BED3F2" />
                    ) : (
                        <AiOutlineCaretDown size={20} fill="#BED3F2" />
                    )}
                </IconWrapper>
            </div>
            <div className={`${displayName}__filters`}>
                <div className={`${displayName}__filterrow`}>
                    <div className={`${displayName}__filter`}>
                        <SearchFilterOrgaSelect activeUser />
                        <SearchFilterUserSelect />
                        <SearchFilterUserCheckbox />
                        <div className={`${displayName}__divider`}></div>
                    </div>
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
                                htmlFor="spec"
                            >
                                보종
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    id="spec"
                                    fontSize={13}
                                    placeholder="선택"
                                    {...spec}
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
                            <div style={{ width: 110 }}>
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
                                htmlFor="pay_cycle"
                            >
                                납입주기
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    id="pay_cycle"
                                    fontSize={13}
                                    placeholder="선택"
                                    {...pay_cycle}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__divider`}></div>
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="date_type"
                            >
                                영수일
                            </label>
                            <input
                                type="hidden"
                                name="date_type"
                                value="sildate"
                            />
                            <SearchFilterDatepicker />
                        </div>
                        <SearchFilterKeywordInput />
                    </div>
                </div>
                {expand && (
                    <div className={`${displayName}__filterrow wr-border-t`}>
                        <div className={`${displayName}__filter`}>
                            <div className={`${displayName}__field`}>
                                <label
                                    className={`${displayName}__label`}
                                    htmlFor="cycle"
                                >
                                    납입방법
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
                                    htmlFor="sildist"
                                >
                                    입금구분
                                </label>
                                <div style={{ width: 110 }}>
                                    <MySelect
                                        id="sildist"
                                        fontSize={13}
                                        placeholder="선택"
                                        {...sildist}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SearchFilterForm>
    );
};
