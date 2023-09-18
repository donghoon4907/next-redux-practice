import axios, { AxiosError } from 'axios';

export function commonAxiosErrorHandler(err: any) {
    let message = '';
    let statusCode = -1;
    if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;

        if (axiosError.response) {
            const data = axiosError.response.data as Record<string, string>;
            if (data) {
                message = data.message;
            }

            statusCode = axiosError.response.status || -1;
        }
    }

    return { message, statusCode };
}
