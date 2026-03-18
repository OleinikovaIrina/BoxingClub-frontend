import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../../shared/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Button from "../../../components/button";
import { PasswordInput } from "../../../components/passwordInput/PasswordInput";


const ResetPasswordConfirm = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [checking, setChecking] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);

    useEffect(() => {
        if (!token) {
            setChecking(false);
            setTokenValid(false);
            return;
        }
        const validateToken = async () => {
            try {
                await api.get(
                    "/api/password/validate",
                    { params: { token } }
                );
                setTokenValid(true);
            } catch {
                setTokenValid(false);
            } finally {
                setChecking(false);
            }
        };
        validateToken();
    }, [token]);


    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .trim()
                .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                    "Password must contain upper, lower, number and symbol"
                )
                .required("Password is required"),

            confirmPassword: Yup.string()
                .trim()
                .oneOf([Yup.ref("password")], "Password do not match")
                .required("Please confirm your password"),
        }),

        onSubmit: async (values) => {
            if (!token) return;

            setLoading(true);
            try {
                await api.post("/api/password/reset", {
                    passwordResetToken: token,
                    password: values.password,
                });
                setSuccess(true);
                setTimeout(() => navigate("/login"), 3000);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
    });

    if (checking) {
        return (
            <div className="text-center mt-10">
                Checking reset link…
            </div>
        );
    }

    if (!tokenValid) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
                <p className="text-center text-red-600">
                    This reset link is invalid or has expired.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold text-center mb-6"> Set a new password</h2>

            {success ? (
                <p className="text-green-600 text-center">
                    Password successfully changed. Redirecting to login…
                </p>
            ) : (
                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    <PasswordInput
                        name="password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password
                            ? formik.errors.password
                            : undefined}
                    />

                    <PasswordInput
                        name="confirmPassword"
                        label="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.confirmPassword
                                ? formik.errors.confirmPassword
                                : undefined
                        }
                    />

                    <div className="flex justify-center">
                        <Button
                            name="Set new password"
                            type="submit"
                            variant="primary"
                            loading={loading}
                            disabled={loading}
                        />
                    </div>

                </form>
            )}
        </div>
    );
};
export default ResetPasswordConfirm;
