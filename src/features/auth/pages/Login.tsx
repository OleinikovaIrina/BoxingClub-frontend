import { useFormik } from "formik";
import * as Yup from "yup";
//import { register } from "../authSlice";
//import { useAppDispatch } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Button from "../../../components/button";
import { PasswordInput } from "../../../components/passwordInput/PasswordInput";

const Login = () => {
    const [loading, setLoading] = useState(false);
    //const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
                const response = await axios.post(
                    "http://localhost:8081/api/auth/login",
                    values
                );
                const token = response.data.accessToken;
                localStorage.setItem("accessToken", token);
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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold text-center mb-6">User Login </h2>

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
                    <p className="text-sm text-red-600">
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

                <Button
                    name="Login"
                    type="submit"
                    disabled={!formik.isValid}
                    loading={loading}
                />

            </form>

        </div>
    );
};
export default Login;