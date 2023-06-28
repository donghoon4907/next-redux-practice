import { useDispatch } from 'react-redux';

export const useAuth = () => {
    const dispatch = useDispatch();

    const validateToken = () => {
        const token = null; /*getCookie(COOKIE_TOKEN_KEY);*/

        if (token === null) {
            // dispatch(showLoginModal());
        }

        return token;
    };

    return { validateToken };
};
