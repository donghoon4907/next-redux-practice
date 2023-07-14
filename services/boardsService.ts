import type { CreatePostRequestPayload } from '@actions/board/create-post.action';
import type { GetPostsRequestPayload } from '@actions/board/get-posts.action';
import path from 'path';
import { getBackendAxios } from '@utils/axios/backend';

export function getPosts(payload: GetPostsRequestPayload) {
    return getBackendAxios().get(
        path.join(process.cwd(), 'data', 'posts.json'),
    );
}

export function createPost(payload: CreatePostRequestPayload) {
    return getBackendAxios().post('/board/new', payload);
}

const rootServices = {
    getPosts,
    createPost,
};

export default rootServices;
