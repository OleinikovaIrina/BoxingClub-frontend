import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
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
        await axios.post("http://localhost:8081/api/password/request", null, {
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-center mb-6">Reset password</h2>

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
          <p className="text-sm text-red-600">{formik.errors.email}</p>
        )}
        {success ? (
          <p className="text-green-600 text-sm">
            If the email exists, a password reset link has been sent.
          </p>
        ) : (
          <Button
            name="Reset password"
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
          />
        )}
      </form>
    </div>
  );
};
export default PasswordReset;
