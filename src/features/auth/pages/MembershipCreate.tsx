import { useFormik } from "formik";
import * as Yup from "yup";
//import { register } from "../authSlice";
//import { useAppDispatch } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Button from "../../../components/button";

const MembershipCreate = () => {
    const [loading, setLoading] = useState(false);
    //const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            type: "",
            duration: "",
            street: "",
            postalCode: "",
            city: "",
            iban: "",
            consentToSepa: false,
            consentToDataPolicy: false,
            hasDiscount: false,
        },
        validationSchema: Yup.object({
            type: Yup.string()
                .required("Membership type is required"),

            duration: Yup.string()
                .required("Membership duration is required"),

            street: Yup.string()
                .trim()
                .required("Street and number of house is required"),

            postalCode: Yup.string()
                .matches(/^\d{5}$/, "Postal code must be 5 digits")
                .required("Postal code is required"),

            city: Yup.string()
                .trim()
                .required("City is required"),

            iban: Yup.string()
                .matches(/^[A-Za-z]{2}\d{2}[A-Za-z0-9 ]{1,32}$/, {
                    message: "Invalid IBAN",
                    excludeEmptyString: true,
                }
                )
                .nullable()
                .notRequired(),

            consentToSepa: Yup.boolean()
                .oneOf([true], "SEPA consent is required"),

            consentToDataPolicy: Yup.boolean()
                .oneOf([true], "Data policy consent is required"),

            hasDiscount: Yup.boolean()
                .notRequired(),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    alert("You are not authenticated");
                    return;
                }
                const payload = {
                    ...values,
                    iban: values.iban?.trim() === "" ? null : values.iban
                }
                await axios.post(
                    "http://localhost:8081/api/user/memberships",
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                navigate("/");
            } catch (error) {
                console.error("Membership create ERROR: ", error);
            } finally {
                setLoading(false);
            }
        },

    });

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold text-center mb-6">Create Membership</h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <select
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select type</option>
                    <option value="ADULT">Adult</option>
                    <option value="CHILD">Child</option>
                    <option value="STUDENT">Student</option>
                    <option value="FAMILY">Family</option>
                </select>

                {formik.touched.type && formik.errors.type && (
                    <p className="text-sm text-red-600">
                        {formik.errors.type}
                    </p>
                )}
                <select
                    name="duration"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select duration</option>
                    <option value="TRIAL">Trial</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="YEARLY">Yearly</option>
                </select>

                {formik.touched.duration && formik.errors.duration && (
                    <p className="text-sm text-red-600">
                        {formik.errors.duration}
                    </p>
                )}

                <input
                    name="street"
                    placeholder="Street, number of house"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded"
                />
                {formik.touched.street && formik.errors.street && (
                    <p className="text-sm text-red-600">
                        {formik.errors.street}
                    </p>
                )}

                <input
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded"
                />
                {formik.touched.postalCode && formik.errors.postalCode && (
                    <p className="text-sm text-red-600">
                        {formik.errors.postalCode}
                    </p>
                )}

                <input
                    name="city"
                    placeholder="City"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded"
                />
                {formik.touched.city && formik.errors.city && (
                    <p className="text-sm text-red-600">
                        {formik.errors.city}
                    </p>
                )}

                <input
                    name="iban"
                    placeholder="IBAN"
                    value={formik.values.iban}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded"
                />
                {formik.touched.iban && formik.errors.iban && (
                    <p className="text-sm text-red-600">
                        {formik.errors.iban}
                    </p>
                )}
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="consentToSepa"
                        checked={formik.values.consentToSepa}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    I agree to SEPA direct debit
                </label>

                {formik.touched.consentToSepa && formik.errors.consentToSepa && (
                    <p className="text-sm text-red-600">
                        {formik.errors.consentToSepa}
                    </p>
                )}

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="consentToDataPolicy"
                        checked={formik.values.consentToDataPolicy}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    I agree to the data processing policy
                </label>

                {formik.touched.consentToDataPolicy && formik.errors.consentToDataPolicy && (
                    <p className="text-sm text-red-600">
                        {formik.errors.consentToDataPolicy}
                    </p>
                )}

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="hasDiscount"
                        checked={formik.values.hasDiscount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    I have a discount
                </label>

                <Button
                    name="Create Membership"
                    type="submit"
                    variant="primary"
                    disabled={!formik.isValid}
                    loading={loading}

                />
            </form>


        </div >

    );
}

export default MembershipCreate;