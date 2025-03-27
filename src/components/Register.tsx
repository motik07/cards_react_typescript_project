import { NormalizedUserInterface } from "../interfaces/users_interfaces/NormalizedUserInterface";
import { alertError, alertSuccess } from "../utilities/toastify_utilities/Toastify";
import { normalizeUserFunction } from "../services/users_services/NormalizeUser";
import { registerUser } from "../services/users_services/UserServices";
import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
      isBusiness: false
    },
    validationSchema: yup.object({
      first: yup.string().min(2).max(256).required(),
      middle: yup.string().min(2).max(256),
      last: yup.string().min(2).max(256).required(),
      phone: yup
      .string()
      .min(9)
      .max(11)
      .matches(/^\d{9,11}$/, "Phone number must be 9 to 11 digits and contain only numbers")
      .required("Phone number is required"),
      email: yup.string().min(5).required(),
      password: yup
        .string()
        .min(7, "Password must be at least 7 characters length!").max(20, "Password must be at maximum 20 characters!")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter (a-z)")
        .matches(/\d/, "Password must contain at least one number (0-9)")
        .matches(/[!@#$%^&*-]/, "Password must contain at least one special character (!@#$%^&*-)")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Please enter the same password in both fields")
        .required("Confirm Password is required"),
      image: yup.string().min(14),
      alt: yup.string().min(2).max(256),
      state: yup.string().min(2).max(256),
      country: yup.string().min(2).max(256).required(),
      city: yup.string().min(2).max(256).required(),
      street: yup.string().min(2).max(256).required(),
      houseNumber: yup.number().min(2).max(250).required(),
      zip: yup.number().min(2).max(2500000000).required(),
      isBusiness: yup.boolean().required()
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      const normalizedUser = normalizeUserFunction(values as NormalizedUserInterface);
      console.log(normalizedUser);
      registerUser(normalizedUser)
        .then((res) => {
          console.log(`register response: ${res}`);
          alertSuccess(`👍 ${res.email} registered successfully!`);
          resetForm();
          navigate('/');
        })
        .catch((err) => {
          console.log( `Invalid input. Please check details: status: ${err.response.status} error: ${err} data: ${err.response.data}`);
          alertError(`${err.response.data}`);
        });
    }
  });
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-11 col-lg-8 d-flex flex-column align-items-center p-5">
          <form
            onSubmit={formik.handleSubmit}
            className={`card col-12 p-3 shadow-sm box-shadow ${theme === "dark" ? "form-light" : "form-dark"}`}>
            <div className="col-12 text-center">
              <h4 className="mb-3 fs-1 headline-font-width headline-first-char-style-font text-shadow">Register:</h4>
            </div>
            {/* שורת שם מלא */}
            <div className="row g-3">
              <div className="col-sm-12 col-md-4">
                <label htmlFor="firstName" className="form-label">
                  First name:
                </label>
                <input
                  type="text"
                  name="first"
                  id="firstName"
                  className="form-control"
                  required
                  value={formik.values.first}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.first && formik.errors.first && (
                  <p className="text-danger text-shadow">
                    {formik.errors.first}
                  </p>
                )}
              </div>
              <div className="col-sm-12 col-md-4">
                <label htmlFor="middleName" className="form-label">
                  Middle name:
                </label>
                <input
                  type="text"
                  name="middle"
                  id="middleName"
                  className="form-control"
                  value={formik.values.middle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.middle && formik.errors.middle && (
                  <p className="text-danger text-shadow">
                    {formik.errors.middle}
                  </p>
                )}
              </div>
              <div className="col-sm-12 col-md-4">
                <label htmlFor="lastName" className="form-label">
                  Last name:
                </label>
                <input
                  type="text"
                  name="last"
                  id="lastName"
                  className="form-control"
                  required
                  value={formik.values.last}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.last && formik.errors.last && (
                  <p className="text-danger text-shadow">
                    {formik.errors.last}
                  </p>
                )}
              </div>
            </div>

            {/* שורת פרטי יצירת קשר */}
            <div className="row g-3 mt-3">
              <div className="col-sm-12 col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone:
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="form-control"
                  required
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-danger text-shadow">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div className="col-sm-12 col-md-6">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-danger text-shadow">
                    {formik.errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* שורת סיסמאות */}
            <div className="row g-3 mt-3">
              <div className="col-sm-12 col-md-6">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-danger text-shadow">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="col-sm-12 col-md-6">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm password:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control"
                  required
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-danger text-shadow">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            {/* שורת תמונה */}
            <div className="row g-3 mt-3">
              <div className="col-sm-12 col-md-6">
                <label htmlFor="image" className="form-label">
                  Profile image:
                </label>
                <input
                  type="url"
                  name="image"
                  id="image"
                  className="form-control"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image && formik.errors.image && (
                  <p className="text-danger text-shadow">
                    {formik.errors.image}
                  </p>
                )}
              </div>
              <div className="col-sm-12 col-md-6">
                <label htmlFor="alt" className="form-label">
                  Alternative text:
                </label>
                <input
                  type="text"
                  name="alt"
                  id="alt"
                  className="form-control"
                  value={formik.values.alt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.alt && formik.errors.alt && (
                  <p className="text-danger text-shadow">{formik.errors.alt}</p>
                )}
              </div>
            </div>

            {/* שורת כתובת: מדינה - מחוז - עיר */}
            <div className="row g-3 mt-3">
              <div className="col-sm-12 col-md-4">
                <label htmlFor="state" className="form-label">
                  State:
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  className="form-control"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.state && formik.errors.state && (
                  <p className="text-danger text-shadow">
                    {formik.errors.state}
                  </p>
                )}
              </div>
              <div className="col-sm-12 col-md-4">
                <label htmlFor="country" className="form-label">
                  Country:
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="form-control"
                  required
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.country && formik.errors.country && (
                  <p className="text-danger text-shadow">
                    {formik.errors.country}
                  </p>
                )}
              </div>
              <div className="col-sm-12 col-md-4">
                <label htmlFor="city" className="form-label">
                  City:
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="form-control"
                  required
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-danger text-shadow">
                    {formik.errors.city}
                  </p>
                )}
              </div>
            </div>

            {/* שורת כתובת: מדינה - מחוז - עיר */}
            <div className="row g-3 mt-3">
              <div className="col-12">
                <label htmlFor="street" className="form-label">
                  Street:
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="form-control"
                  required
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.street && formik.errors.street && (
                  <p className="text-danger text-shadow">
                    {formik.errors.street}
                  </p>
                )}
              </div>
              <div className="col-sm-12 col-md-6">
                <label htmlFor="housNumber" className="form-label">
                  Number:
                </label>
                <input
                  type="number"
                  name="houseNumber"
                  id="houseNumber"
                  className="form-control"
                  required
                  value={formik.values.houseNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.houseNumber && formik.errors.houseNumber && (
                  <p className="text-danger text-shadow">
                    {formik.errors.houseNumber}
                  </p>
                )}
              </div>
              <div className="col-sm-12 col-md-6">
                <label htmlFor="zip" className="form-label">
                  Zip:
                </label>
                <input
                  type="number"
                  name="zip"
                  id="zip"
                  className="form-control"
                  required
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.zip && formik.errors.zip && (
                  <p className="text-danger text-shadow">{formik.errors.zip}</p>
                )}
              </div>
            </div>

            <div className="form-check my-3">
              <input
                className="form-check-input"
                name="isBusiness"
                type="checkbox"
                id="isBusiness"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isBusiness}
              />
              {formik.touched.isBusiness && formik.errors.isBusiness && (
                <p className="text-danger text-shadow">
                  {formik.errors.isBusiness}
                </p>
              )}
              <label className="form-check-label" htmlFor="isBusiness">
                Is business?
              </label>
            </div>

            <div className="d-flex justify-content-center mb-4">
              <button
                type="submit"
                className={`m-3 w-30 text-shadow box-shadow ${theme === "dark" ? "btn btn-light" : "btn btn-dark"}`}
                disabled={!formik.dirty || !formik.isValid}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
