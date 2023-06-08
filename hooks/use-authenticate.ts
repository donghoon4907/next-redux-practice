import { useDispatch } from 'react-redux';

import { showLoginModal } from '../actions/switch/login-modal.action';
import { getCookie } from '../lib/cookie/cookie.client';
import { COOKIE_TOKEN_KEY } from '../lib/cookie/cookie.key';

export const useAuthenticate = () => {
    const dispatch = useDispatch();

    const validateToken = () => {
        const token = getCookie(COOKIE_TOKEN_KEY);

        if (token === null) {
            dispatch(showLoginModal());
        }

        return token;
    };

    return { validateToken };
};

export type UseAuthenticateType = ReturnType<typeof useAuthenticate>;
