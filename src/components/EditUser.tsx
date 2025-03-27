import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../interfaces/users_interfaces/User";
import { getUserById, updateUser } from "../services/users_services/UserServices";
import { alertError, alertSuccess } from "../utilities/toastify_utilities/Toastify";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import Loader from "./loader/Loader";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

interface EditUserProps {}

const EditUser: FunctionComponent<EditUserProps> = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { decodedToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return alertError("User ID is missing!");
    getUserById(id)
      .then((res) => {
        setUser(res);
        setIsLoading(false);
      })
      .catch((err) => {
        alertError(`Error loading user details: ${err}`);
        setIsLoading(false);
      });
  }, [id]);

  const formik = useFormik<FormikValues>({
    initialValues: {
      first: user?.name.first || "",
      middle: user?.name.middle || "",
      last: user?.name.last || "",
      phone: user?.phone || "",
      image: user?.image.url || "",
      alt: user?.image.alt || "",
      state: user?.address.state || "",
      country: user?.address.country || "",
      city: user?.address.city || "",
      street: user?.address.street || "",
      houseNumber: user?.address.houseNumber || "",
      zip: user?.address.zip || ""
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
      image: yup.string().min(14),
      alt: yup.string().min(2).max(256),
      state: yup.string().min(2).max(256),
      country: yup.string().min(2).max(256).required(),
      city: yup.string().min(2).max(256).required(),
      street: yup.string().min(2).max(256).required(),
      houseNumber: yup.number().min(2).max(250).required(),
      zip: yup.number().min(2).max(2500000000).required()
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      const normalizedUser = {
        name: {
          first: values.first,
          middle: values.middle || "",
          last: values.last
        },
        phone: values.phone,
        image: {
          url: values.image,
          alt: values.alt
        },
        address: {
          state: values.state || "",
          country: values.country,
          city: values.city,
          street: values.street,
          houseNumber: Number(values.houseNumber),
          zip: Number(values.zip)
        }
      };

      updateUser(id as string, normalizedUser)
        .then(() => {
          alertSuccess("User updated successfully! 😁");
          navigate('/user-crm');
        })
        .catch((err) => {
          alertError(`Error updating user: ${err}`);
        });
    }
  });

  return (
    <div className="container">
      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <Loader />
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-12 col-md-11 col-lg-8 d-flex flex-column align-items-center p-5">
            <form
              onSubmit={formik.handleSubmit}
              className={`card col-12 p-3 shadow-sm box-shadow ${theme === "dark" ? "form-light" : "form-dark"}`}>
              <div className="col-12 text-center">
                <h4 className="mb-3 fs-1 headline-font-width headline-first-char-style-font text-shadow">Edit User:</h4>
              </div>

              {/* Name Fields */}
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
                    <p className="text-danger text-shadow">{formik.errors.first}</p>
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
                    <p className="text-danger text-shadow">{formik.errors.middle}</p>
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
                    <p className="text-danger text-shadow">{formik.errors.last}</p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="row g-3 mt-3">
                <div className="col-sm-12">
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
                    <p className="text-danger text-shadow">{formik.errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Image Fields */}
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
                    <p className="text-danger text-shadow">{formik.errors.image}</p>
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

              {/* Address Fields */}
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
                    <p className="text-danger text-shadow">{formik.errors.state}</p>
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
                    <p className="text-danger text-shadow">{formik.errors.country}</p>
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
                    <p className="text-danger text-shadow">{formik.errors.city}</p>
                  )}
                </div>
              </div>

              {/* Street Address */}
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
                    <p className="text-danger text-shadow">{formik.errors.street}</p>
                  )}
                </div>
                <div className="col-sm-12 col-md-6">
                  <label htmlFor="houseNumber" className="form-label">
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
                    <p className="text-danger text-shadow">{formik.errors.houseNumber}</p>
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

              {/* Action Buttons */}
              <div className="d-flex justify-content-center mt-4">
                <button
                  type="submit"
                  className={`m-3 w-30 text-shadow box-shadow ${theme === "dark" ? "btn btn-light" : "btn btn-dark"}`}
                  disabled={!formik.dirty || !formik.isValid}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className={`m-3 w-30 text-shadow box-shadow ${theme === "dark" ? "btn btn-light" : "btn btn-dark"}`}
                  onClick={() => navigate('/user-crm')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser; 