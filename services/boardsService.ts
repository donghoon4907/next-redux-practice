import type { CreatePostRequestPayload } from '@actions/board/create-post.action';
// import type { GetPostsRequestPayload } from '@actions/board/get-posts.action';
import { getBackendAxios } from '@utils/axios/backend';

export function createPost(payload: CreatePostRequestPayload) {
    return getBackendAxios().post('/board/new', payload);
}

const rootServices = {
    createPost,
};

export default rootServices;
