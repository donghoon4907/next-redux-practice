import type { GetPostsRequestPayload } from '@actions/board/get-posts.action';
import axios from 'axios';

export function getList(payload: GetPostsRequestPayload) {
    return axios.get('/');
}

const rootServices = {
    getList,
};

export default rootServices;
