import type { NextPage } from 'next';
import type { FormEvent, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaUser, FaKey, FaPowerOff, FaHeadset } from 'react-icons/fa';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import { MyCheckbox } from '@components/checkbox';
import { useInput } from '@hooks/use-input';
import { wrapper } from '@store/redux';
import externalsService from '@services/externalsService';
import { useCheckbox } from '@hooks/use-checkbox';
import { isEmpty } from '@utils/validator/common';
import { useApi } from '@hooks/use-api';
import { loginRequest } from '@actions/user/login.action';
import { MyHelmet } from '@components/Helmet';

interface LoginPageProps {
    ip: string;
}
// 로그인 페이지 컴포넌트
const Login: NextPage<LoginPageProps> = ({ ip }) => {
    const displayName = 'wr-pages-login';
    // 라우팅 모듈 활성화
    const router = useRouter();
    // 로그인 요청 모듈 활성화
    const login = useApi(loginRequest);
    // 사용자 ID
    const [userid, setUserid] = useInput('');
    // 패스워드
    const [password] = useInput('');
    // ID 저장 여부
    const [checkSaveId, setCheckSaveId] = useCheckbox(false);
    // 패스워드 초기화 클릭 이벤트
    const handleResetPassword = (evt: MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();

        alert('준비중입니다.');
    };

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault();
        // 로그인 API 요청
        login(
            {
                ip,
                userid: userid.value,
                password: password.value,
            },
            // API 성공 후 실행되는 콜백
            (access_token) => {
                const idKey = process.env.COOKIE_RECENT_LOGIN_KEY;
                if (isEmpty(idKey)) {
                    alert('error: COOKIE_RECENT_LOGIN_KEY is empty');
                } else {
                    // ID 저장 여부에 따라 쿠키 설정
                    if (checkSaveId.checked) {
                        setCookie(idKey!, userid.value, {
                            maxAge: 60 * 60 * 24 * 365,
                        });
                    } else {
                        deleteCookie(idKey!);
                    }
                }

                router.replace('/contract/long/bo');
            },
        );
    };
    // 페이지 진입 시 한번 실행
    useEffect(() => {
        const idKey = process.env.COOKIE_RECENT_LOGIN_KEY || '';
        // 쿠키에 저장된 ID 저장 여부 로드 및 설정
        const _userid = getCookie(idKey) as string;
        if (_userid) {
            setUserid(_userid);

            setCheckSaveId(true);
        }
    }, []);

    return (
        <>
            <MyHelmet />
            <div className={`${displayName}__wrap`}>
                <div className={`${displayName}`}>
                    <div className={`${displayName}__left`}>
                        <img
                            src="/static/images/main.png"
                            alt="Wooriinsumanlife"
                        />
                    </div>
                    <div className={`${displayName}__right`}>
                        <div className={`${displayName}__header`}>
                            <div className={`${displayName}__secret`}>
                                대외비
                            </div>
                        </div>
                        <form
                            className={`${displayName}__body`}
                            onSubmit={handleSubmit}
                        >
                            <div className="wr-login-input__wrap">
                                <div className="wr-login-input__icon">
                                    <FaUser size={30} />
                                </div>
                                <input
                                    id="userid"
                                    className="wr-login-input"
                                    placeholder="사원번호"
                                    required
                                    {...userid}
                                />
                            </div>
                            <div className="wr-login-input__wrap">
                                <div className="wr-login-input__icon">
                                    <FaKey size={30} />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    className="wr-login-input"
                                    placeholder="Password"
                                    required
                                    {...password}
                                />
                            </div>
                            <button
                                type="submit"
                                className={`${displayName}__button wr-mt`}
                            >
                                <span className="wr-btn btn">로그인</span>
                                <div>
                                    <FaPowerOff size={25} />
                                </div>
                            </button>
                        </form>
                        <div className={`${displayName}__services`}>
                            <div>
                                <MyCheckbox
                                    id="save_id"
                                    label="사원번호 또는 ID 저장"
                                    {...checkSaveId}
                                />
                            </div>
                            <div className={`${displayName}__expand`}>
                                <a
                                    onClick={handleResetPassword}
                                    className={`${displayName}__reset`}
                                >
                                    비밀번호 초기화
                                </a>
                            </div>
                        </div>
                        <div className={`${displayName}__phone`}>
                            <div>
                                <FaHeadset size={25} />
                            </div>
                            <div>Help Desk 070-4881-6003</div>
                        </div>
                        <div className={`${displayName}__services wr-mt`}>
                            <a
                                className="btn btn-success w-100 text-center"
                                href="https://939.co.kr/7800"
                                target="_blank"
                                rel="noreferrer"
                            >
                                본사원격지원
                            </a>
                        </div>
                        <div className={`${displayName}__footer`}>
                            <span>
                                우리인슈맨라이프 사용자를 위한 시스템으로
                                인가된분만 사용가능합니다.
                            </span>
                            <br />
                            <span>
                                Copyrightⓒ by Wooriinsumanlife Co., Ltd. All
                                rights reserved
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
// 서버사이드에서 필요한 정보 요청 및 처리
export const getServerSideProps = wrapper.getServerSideProps(
    (_) => async (_) => {
        const output: any = {
            props: {},
        };

        try {
            // 클라이언트 IP 조회 API 요청
            const { data } = await externalsService.getIp({ isIPv6: true });

            output.props.ip = data.ip;
        } catch {
            console.error('ip is undefined');
        }

        return output;
    },
);

export default Login;
