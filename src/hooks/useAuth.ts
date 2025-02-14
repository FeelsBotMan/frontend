import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router";
import { useAlert } from "./useAlert";
import { SignupProps } from "@/pages/Signup";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";

export const useAuth = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const { storeLogin } = useAuthStore();

    const userLogin = (data: LoginProps) => {
        login(data).then(
            (res) => {
                storeLogin(res.token);

                showAlert("로그인이 완료되었습니다.");
                navigate(ROUTES.MAIN);
            },
            () => {
                showAlert("로그인이 실패하였습니다.");
            }
        );
    };

    const userSignup = (data: SignupProps) => {
        signup(data).then(() => {
            showAlert("회원가입이 완료되었습니다.");
            navigate(ROUTES.LOGIN);
        });
    };

    const userResetPassword = (data: SignupProps) => {
        resetPassword(data).then(() => {
            showAlert("비밀번호가 초기화되었습니다.");
            navigate(ROUTES.LOGIN);
        });
    };

    const [resetRequested, setResetRequested] = useState(false);

    const userResetRequest = (data: SignupProps) => {
        resetRequest(data).then(() => {
            setResetRequested(true);
        });
    };

    return {
        userLogin,
        userSignup,
        userResetPassword,
        userResetRequest,
        resetRequested,
    };
};