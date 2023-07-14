import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { AppState } from '@reducers/index';
import type { BoardState } from '@reducers/board';
import { useDispatch, useSelector } from 'react-redux';
import { LuSearch } from 'react-icons/lu';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { AccessibleText } from '@components/AccessibleText';
import { showSetViewerModal } from '@actions/modal/set-viewer.action';

interface Props extends Pick<MyTabpanelProps, 'hidden'> {}

export const SetViewTabpanel: FC<Props> = ({ hidden }) => {
    const dispatch = useDispatch();

    const { viewer } = useSelector<AppState, BoardState>(
        (state) => state.board,
    );

    const handleClickSearchViewer = () => {
        dispatch(showSetViewerModal());
    };

    return (
        <MyTabpanel id="tabpanelSetFile" tabId="tabSetFile" hidden={hidden}>
            <div className="wr-pages-create-board__option row">
                <div className="col-4 wr-pages-create-board__optionitem">
                    <WithLabel id="tag" label="조회대상지정" type="active">
                        <MyInput
                            type="text"
                            readOnly
                            placeholder={
                                viewer.length > 0
                                    ? `${viewer[0].name} 외 ${
                                          viewer.length - 1
                                      }명`
                                    : ''
                            }
                            button={{
                                type: 'button',
                                onClick: handleClickSearchViewer,
                                children: (
                                    <>
                                        <AccessibleText>검색</AccessibleText>
                                        <LuSearch size={15} />
                                    </>
                                ),
                            }}
                        />
                    </WithLabel>
                </div>
            </div>
        </MyTabpanel>
    );
};
