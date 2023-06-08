import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { createPostRequest } from '../actions/post/create-post.action';

import { deletePostRequest } from '../actions/post/delete-post.action';
import { updatePostRequest } from '../actions/post/update-post.action';

export const useCreatePost = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const fireEvent = (content: string, categories: string[]) => {
        dispatch(
            createPostRequest({
                content,
                categories,
                callbackFunc: () => {
                    router.replace(router.asPath);
                },
            }),
        );
    };

    return [fireEvent];
};

export const useUpdatePost = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const fireEvent = (id: string, content: string, categories: string[]) => {
        dispatch(
            updatePostRequest({
                id,
                content,
                categories,
                callbackFunc: () => {
                    router.replace(router.asPath);
                },
            }),
        );
    };

    return [fireEvent];
};

export const useRemovePost = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const fireEvent = (id: string) => {
        dispatch(
            deletePostRequest({
                id,
                callbackFunc: () => {
                    router.replace(router.asPath);
                },
            }),
        );
    };

    return [fireEvent];
};
