import { LoadingState } from '@reducers/common/loading';
import { AppState } from '@reducers/index';
import type { FC } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';

interface Props {}

export const MyLoading: FC<Props> = () => {
    const { loading } = useSelector<AppState, LoadingState>(
        (state) => state.loading,
    );

    let render = null;

    if (loading) {
        render = (
            <div className="wr-loading__wrap">
                <div className="wr-loading">
                    <AiOutlineLoading3Quarters />
                </div>
            </div>
        );
    }
    return render;
};
