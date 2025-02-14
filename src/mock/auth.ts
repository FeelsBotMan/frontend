import { HttpResponse, http } from 'msw'
import { fakerKO as faker } from '@faker-js/faker'
import { ROUTES } from '../constants/routes';
import { BASE_URL } from '../api/http';
// 로그인
export const login = http.post(`${BASE_URL}${ROUTES.LOGIN}`, async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string }

    if (email === 'test@test.com' && password === 'test1234') {
        return HttpResponse.json({
            token: faker.string.alphanumeric(32),  // 이 토큰이 localStorage에 저장됨
        })
    }

    return HttpResponse.json(
        { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
    )
});

// 회원가입
export const signup = http.post(`${BASE_URL}${ROUTES.SIGNUP}`, async () => {
    return HttpResponse.json(
        { message: '회원가입이 완료되었습니다.' },
        { status: 201 }
    )
});

// 비밀번호 재설정 요청
export const resetRequest = http.post(`${BASE_URL}${ROUTES.RESET_PASSWORD}`, async () => {
    return HttpResponse.json(
        { message: '비밀번호 재설정 이메일을 발송했습니다.' }
    )
});

// 비밀번호 재설정
export const resetPassword = http.put(`${BASE_URL}${ROUTES.RESET_PASSWORD}`, async () => {
    return HttpResponse.json(
        { message: '비밀번호가 재설정되었습니다.' }
    )
});
