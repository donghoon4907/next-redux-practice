import type { GetPostsRequestPayload } from '@actions/board/get-posts.action';
import axios from 'axios';

export function getPosts(payload: GetPostsRequestPayload) {
    return axios.get('/posts.json');
}

const rootServices = {
    getPosts,
};

export default rootServices;
