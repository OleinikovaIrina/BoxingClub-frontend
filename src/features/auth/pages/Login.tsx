import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/UseAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../../components/button";
import { PasswordInput } from "../../../components/passwordInput/PasswordInput";
import { api } from "../../../shared/api"


const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .trim()
                .email("Invalid email address")
                .required("Email is required"),

            password: Yup.string().required("Password is required")
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await api.post(
                    "/api/auth/login",
                    values
                );
                const { accessToken, role } = response.data;
                login(accessToken, role);
                navigate("/");
            } catch (error) {
                console.error("LOGIN ERROR: ", error);
                alert("Invalid email or password");
            } finally {
                setLoading(false);
            }

        },

    });
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">

                <h2 className="text-2xl font-bold text-center mb-6">
                    User Login
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border rounded"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-s text-red-600">
                            {formik.errors.email}
                        </p>
                    )}

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

                    <div className="flex justify-center">
                        <Button
                            name="Login"
                            type="submit"
                            variant="primary"
                            disabled={!formik.isValid}
                            loading={loading}
                        />
                    </div>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/password-reset")}
                            className="text-s text-blue-600 hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;