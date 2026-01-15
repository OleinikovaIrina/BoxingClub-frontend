import { useFormik } from "formik";
import * as Yup from "yup";
//import { register } from "../authSlice";
//import { useAppDispatch } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Button from "../../../components/button";
import { PasswordInput } from "../../../components/passwordInput/PasswordInput";

const Registration = () => {
    const [loading, setLoading] = useState(false);
    //const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .trim()
                .required("First name is required"),

            lastName: Yup.string()
                .trim()
                .required("Last name is required"),

            email: Yup.string()
                .trim()
                .email("Invalid email address")
                .required("Email is required"),

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
            setLoading(true);
            try {

                const response = await axios.post(
                    "http://localhost:8081/api/auth/register",
                    values
                );
                console.log("Registered:", response.data.email);
                navigate("/login");

            } catch (error) {
                console.error("REGISTER ERROR:", error);
            } finally {
                setLoading(false)
            }
        },
    });
    //const cleanedValues = {
    //  ...values,
    // email: values.email.trim().toLowerCase(),
    // };


    //const dispatchResult = await dispatch(register(cleanedValues));
    // if (register.fulfilled.match(dispatchResult)) {
    // navigate("/login");
    // }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <input
                    name="firstName"
                    placeholder="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded"
                />
                {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-sm text-red-600">
                        {formik.errors.firstName}
                    </p>
                )}

                <input
                    name="lastName"
                    placeholder="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-sm text-red-600">
                        {formik.errors.lastName}
                    </p>
                )}

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
                <Button
                    name="Register"
                    type="submit"
                    disabled={!formik.isValid}
                    loading={loading}
                />

            </form>

        </div>
    );




};
export default Registration;