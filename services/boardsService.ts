import type { GetPostsRequestPayload } from '@actions/board/get-posts.action';
import axios from 'axios';
import path from 'path';

export function getPosts(payload: GetPostsRequestPayload) {
    return axios.get(path.join(process.cwd(), 'data', 'posts.json'));
}

const rootServices = {
    getPosts,
};

export default rootServices;
