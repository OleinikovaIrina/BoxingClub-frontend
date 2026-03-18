import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../../shared/api";
import { useState } from "react";
import Button from "../../../components/button";

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      try {
        await api.post("/api/password/request", null, {
          params: { email: values.email },
        });
        setSuccess(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-24">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">      <h2 className="text-2xl font-semibold text-center mb-6">Reset password</h2>

        <p className="text-sm text-gray-500 text-center mb-4">
          Enter your email and we’ll send you a reset link
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-600">{formik.errors.email}</p>
          )}
          {success ? (
            <p className="text-green-600 text-sm">
              If the email exists, a password reset link has been sent.
            </p>
          ) : (
            <div className="flex justify-center">
              <Button
                name="Reset password"
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default PasswordReset;
