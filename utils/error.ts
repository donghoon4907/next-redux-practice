import axios, { AxiosError } from 'axios';

export function commonAxiosErrorHandler(err: any) {
    let message = '';
    let statusCode = -1;
    if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;

        message = axiosError.message;

        statusCode = axiosError.response?.status || -1;
    }

    return { message, statusCode };
}
