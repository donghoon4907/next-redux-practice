import type { FC, FormEvent } from 'react';
import { LuSearch } from 'react-icons/lu';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { useInput } from '@hooks/use-input';

interface Props {}

export const BoardSearchFilterTemplate: FC<Props> = () => {
    const displayName = 'wr-pages-list';

    // 검색필터 - 검색어
    const [keyword] = useInput('');

    const handleSearch = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
    };

    return (
        <>
            <div className={`${displayName}__filter`}></div>
            <div className={`${displayName}__filter`}></div>
            <div className={`${displayName}__filter`}></div>
            <div className={`${displayName}__filter`}>
                <WithLabel id="searchKeyword" label="검색" type="active">
                    {/* <div
                    className="wr-with__extension"
                    style={{
                        width: 130,
                    }}
                >
                    <MySelect placeholder="선택" {...type} />
                </div> */}
                    <form
                        role="search"
                        className="wr-search__form"
                        onSubmit={handleSearch}
                    >
                        <MyInput
                            type="search"
                            // className="wr-border-l--hide"
                            button={{
                                type: 'submit',
                                className: 'btn-primary',
                                children: (
                                    <>
                                        <span className="visually-hidden">
                                            검색
                                        </span>
                                        <LuSearch size={15} />
                                    </>
                                ),
                            }}
                            {...keyword}
                        />
                    </form>
                </WithLabel>
            </div>
        </>
    );
};
