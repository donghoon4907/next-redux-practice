import { getLongRequest, getLongSuccess } from '@actions/long/get-long.action';
import { wrapper } from '@store/redux';
import Main from 'pages';
import { END } from 'redux-saga';

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch, sagaTask }) =>
        async (_) => {
            dispatch(
                getLongRequest({
                    successAction: getLongSuccess,
                    callback: () => {},
                }),
            );

            dispatch(END);

            await sagaTask?.toPromise();

            return {
                props: {},
            };
        },
);

export default Main;
