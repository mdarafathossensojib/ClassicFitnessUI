import {useState, useEffect} from 'react';
import apiClient from '../services/api_client';
import authApiClient from '../services/auth_api_client';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);

    const getToken = () => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;
    };

    const [authTokens, setAuthTokens] = useState(getToken());

    useEffect(() => {
        if (authTokens) fetchUserProfile();
    }, [authTokens]);

    const handleAPIError = (
        error,
        defaultMessage = "Something Went Wrong! Try Again"
    ) => {
        console.log(error);

        if (error.response && error.response.data) {
        const errorMessage = Object.values(error.response.data).flat().join("\n");
        setErrorMsg(errorMessage);
        return { success: false, message: errorMessage };
        }
        setErrorMsg(defaultMessage);
        return {
        success: false,
        message: defaultMessage,
        };
    };


    // Fetch user Profile
    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get("/auth/users/me", {
                headers: { Authorization: `JWT ${authTokens?.access}` },
            });
            setUser(response.data);
        } catch (error) {
            console.log("Error Fetching user", error);
        }
    };

    // Update User Profile
    const updateUserProfile = async (data) => {
        setErrorMsg("");
        try {
            await apiClient.put("/accounts/me/", data, {
                headers: {
                Authorization: `JWT ${authTokens?.access}`,
                },
            });
            await fetchUserProfile();
            return { success: true };
        } catch (error) {
            return handleAPIError(error);
        }
    };

    // Password Change
    const changePassword = async (data) => {
        setErrorMsg("");
        try {
        await apiClient.post("/auth/users/set_password/", data, {
            headers: {
            Authorization: `JWT ${authTokens?.access}`,
            },
        });
        } catch (error) {
            return handleAPIError(error);
        }
    };

    // Login User
    const loginUser = async (userData) => {
        setErrorMsg("");
        setLoading(true);
        try {
            const response = await apiClient.post("/auth/jwt/create/", userData);
            setAuthTokens(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data));

            // After login set user
            await fetchUserProfile();
            return { success: true };
        } catch (error) {
            setErrorMsg(error.response.data?.detail);
            return { success: false };
        }finally{
            setLoading(false);
        }
    };

    // Register User
    const registerUser = async (userData) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/", userData);
            return {
                success: true,
                message:
                "Registration successfull. Check your email to activate your account.",
            };
        } catch (error) {
            return handleAPIError(error, "Registration Failed! Try Again");
        }
    };

    // User Activation Resend
    const resendActivationEmail = async (userData) => {
        setErrorMsg("");
        try {
        await apiClient.post("/auth/users/resend_activation/", userData);
        return {
            success: true,
            message:
            "Email Resend successfull. Check your email to activate your account.",
        };
        } catch (error) {
            return handleAPIError(error, "Email Resend Failed! Try Again");
        }
    };

    //Forgott Password
    const ForgotPassword = async (userData) => {
        setErrorMsg("");
        try {
        await apiClient.post("/auth/users/reset_password/", userData);
        return {
            success: true,
            message:
            "Email send successfull. Check your email...",
        };
        } catch (error) {
            return handleAPIError(error, "Email send Failed! Try Again");
        }
    };

    const setNewPassword = async (userData) => {
        setErrorMsg("");
        try {
        await apiClient.post("/auth/users/reset_password_confirm/", userData);
        return {
            success: true,
            message:
            "Password Updated Successfully",
        };
        } catch (error) {
            return handleAPIError(error, "Password update Failed! Try Again");
        }
    }

    // Logout User
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("cartId");
    };

    // For Admin
    const updateMemberShip = async (data) => {
        setErrorMsg("");
        try {
        await authApiClient.post("/membership-plans/${planId}", data);
        } catch (error) {
            return handleAPIError(error);
        }
    };

    const updatePrograms = async (data) => {
        setErrorMsg("");
        try {
        await apiClient.put("/auth/users/me/", data, {
            headers: {
            Authorization: `JWT ${authTokens?.access}`,
            },
        });
        } catch (error) {
            return handleAPIError(error);
        }
    };

    const updateGallery = async (data) => {
        setErrorMsg("");
        try {
        await apiClient.put("/auth/users/me/", data, {
            headers: {
            Authorization: `JWT ${authTokens?.access}`,
            },
        });
        } catch (error) {
            return handleAPIError(error);
        }
    };

    const updateServices = async (data) => {
        setErrorMsg("");
        try {
        await apiClient.put("/auth/users/me/", data, {
            headers: {
            Authorization: `JWT ${authTokens?.access}`,
            },
        });
        } catch (error) {
            return handleAPIError(error);
        }
    };

    const updateFeedback = async (data) => {
        setErrorMsg("");
        try {
        await apiClient.put("/auth/users/me/", data, {
            headers: {
            Authorization: `JWT ${authTokens?.access}`,
            },
        });
        } catch (error) {
            return handleAPIError(error);
        }
    };

    return { user, loading, errorMsg, loginUser, registerUser, resendActivationEmail, logoutUser, updateUserProfile, changePassword, ForgotPassword, setNewPassword, updateMemberShip, updatePrograms, updateGallery, updateServices, updateFeedback };
};

export default useAuth;