import type { FC, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInput } from '@hooks/use-input';
import { isEmpty } from '@utils/validator/common';
import { useSearch } from '@hooks/use-search';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import { DateRangePicker } from 'rsuite';

interface Props {}

export const OrgaSearchFilterTemplate: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const search = useSearch();

    // 검색필터 - 검색어
    const [keyword, setKeyword] = useInput('');
    // 검색필터 - 검색종류
    // const [type, setType] = useSelect(searchConstants.userSearchTypes);

    const handleSearch = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const { nums } = router.query;

        const searchParams = new URLSearchParams();

        if (!isEmpty(keyword.value)) {
            searchParams.append('search', keyword.value);
            // if (type.value) {
            //     searchParams.append('type', type.value.value);
            // }
        }

        searchParams.append('page', '1');

        if (nums) {
            searchParams.append('nums', nums as string);
        }

        search(searchParams.toString());
    };

    useEffect(() => {
        const searchKeyword = router.query.search as string;
        // const searchType = router.query.type as string;

        if (!isEmpty(searchKeyword)) {
            setKeyword(searchKeyword);
        }

        // if (!isEmpty(searchType)) {
        //     setType(
        //         findSelectOption(searchType, searchConstants.userSearchTypes),
        //     );
        // }
    }, [router]);

    return (
        <>
            <div className={`${displayName}__filters`}>
                <div className={`${displayName}__filter`}>
                    <div className={`${displayName}__field`}>
                        <label className={`${displayName}__label`}>
                            영업조직
                        </label>
                        <div style={{ width: 350 }}>
                            <MySelect
                                placeHolderFontSize={13}
                                placeholder="회사 > 개인영업1 > 1경기광주사업단 > 업무보전"
                            />
                        </div>
                    </div>
                </div>
                <div className={`${displayName}__divider`}></div>
                <div className={`${displayName}__filter`}>
                    <div className={`${displayName}__field`}>
                        <label className={`${displayName}__label`}>
                            조직등급
                        </label>
                        <div style={{ width: 120 }}>
                            <MySelect
                                placeHolderFontSize={13}
                                placeholder="선택"
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__field`}>
                        <label className={`${displayName}__label`}>
                            현상태
                        </label>
                        <div style={{ width: 120 }}>
                            <MySelect
                                placeHolderFontSize={13}
                                placeholder="선택"
                            />
                        </div>
                    </div>
                </div>
                <div className={`${displayName}__divider`}></div>
                <div className={`${displayName}__filter`}>
                    <div className={`${displayName}__field`}>
                        <div className={`${displayName}__labels`}>
                            <label
                                className={`${displayName}__label ${displayName}__label--active`}
                            >
                                등록일
                            </label>
                            <div
                                className={`${displayName}__labeldivider`}
                            ></div>
                            <label
                                className={`${displayName}__label ${displayName}__label--disable`}
                            >
                                폐점일
                            </label>
                        </div>

                        <div style={{ width: 250 }}>
                            <DateRangePicker
                                id="contdate"
                                format="yyyy-MM-dd"
                                placeholder="기간을 입력 혹은 선택하세요"
                                size="sm"
                                placement="autoVerticalEnd"
                                style={{
                                    width: '100%',
                                }}
                                shouldDisableDate={(date) => date > new Date()}
                                defaultValue={[new Date(), new Date()]}
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__field`}>
                        <label className={`${displayName}__label`}>검색</label>
                        <div style={{ width: 250 }}>
                            <MyInput
                                type="search"
                                placeholder="검색어를 입력하세요."
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${displayName}__search`}>
                <button type="submit">조회</button>
            </div>
        </>
    );
};
