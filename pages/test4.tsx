import { demoRequest, demoSuccess } from '@actions/demo/demo.action';
import { wrapper } from '@store/redux';
import Main from 'pages';
import { END } from 'redux-saga';

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch, sagaTask }) =>
        async (_) => {
            dispatch(
                demoRequest({
                    successAction: demoSuccess,
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
