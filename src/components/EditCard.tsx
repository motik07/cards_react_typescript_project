import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardInterface } from "../interfaces/card_interfaces/CardsInterface";
import { getCardById, updateCardRequest } from "../services/cards_services/CardsServices";
import { alertError, alertSuccess } from "../utilities/toastify_utilities/Toastify";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import Loader from "./loader/Loader";
import { normalizeCard } from "../services/cards_services/NormalizedCardInterface";
import { UnNormalizedCardInterface } from "../interfaces/card_interfaces/UnNormalizedCardInterface";
import { useTheme } from "../context/ThemeContext";

interface EditCardProps {
  
}
 
const EditCard: FunctionComponent<EditCardProps> = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<CardInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Card ID:", id);
    if (!id) return alertError("Card ID is missing!");
    getCardById(id)
      .then((res) => {
        setCard(res);
        setIsLoading(false);
      })
      .catch((err) => {
        alertError(`Error loading card details: ${err}`);
        setIsLoading(false);
      });
  }, [id]);


  let formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      title: card?.title || "",
      subtitle: card?.subtitle || "",
      description: card?.description || "",
      email: card?.email || "",
      web: card?.web || "",
      url: card?.image?.url || "",
      alt: card?.image?.alt || "",
      phone: card?.phone || "",
      state: card?.address?.state || "", 
      country: card?.address?.country || "",
      city: card?.address?.city || "",
      street: card?.address?.street || "",
      houseNumber: card?.address?.houseNumber || "",
      zip: card?.address?.zip || "",
    },
    validationSchema: yup.object({
      title: yup.string().min(2).max(256).required(),
      subtitle: yup.string().min(2).max(256).required(),
      description: yup.string().min(2).max(1024).required(),
      phone: yup
        .string()
        .min(9)
        .max(11)
        .matches(
          /^0\d{1,2}-?\d{6,7}$/,
          "Phone number must start with 0, may include a hyphen, and be 9 to 11 characters long"
        )        
        .required("Phone number is required"),
      email: yup
        .string()
        .trim()
        .min(5)
        .email("Invalid email format")
        .required("Email is required"),
      web: yup.string().trim().min(14).url("Invalid URL format"),
      url: yup
        .string()
        .trim()
        .url("Invalid image URL")
        .min(14, "Image URL is too short")
        .required(),
      alt: yup.string().min(2).max(256), 
      state: yup.string().min(2).max(256),
      country: yup.string().min(2).max(256).required(),
      city: yup.string().min(2).max(256).required(),
      street: yup.string().min(2).max(256).required(),
      houseNumber: yup.number().min(2).max(250).required(),
      zip: yup.number().min(2).max(2500000000)
    }),

    enableReinitialize: true,

    onSubmit: (values) => {
      let normalizedCard = normalizeCard(
        values as UnNormalizedCardInterface
      );
      console.log(`edit card:`);
      console.log(normalizedCard);
      updateCardRequest(id as string, normalizedCard)
      .then((res)=>{
        console.log(res);
        alertSuccess(`Card updated successfully! 😁`)
      }).catch((err)=>{
        alertError(`Error: EditCard.tsx update edit card failed! error: ${err}`)
      })
      navigate('/')
  }

  })
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
          className={`card col-12 p-3 h-100 shadow-sm box-shadow ${theme === "dark" ? "form-light" : "form-dark"}`}
          onSubmit={formik.handleSubmit}
        >
          <div className="col-12 text-center">
            <h4 className="mb-1 fs-1 headline-font-width headline-first-char-style-font text-shadow">
                Edit Card:
            </h4>
          </div>
          <div className="row g-3 mt-3">
            <div className="col-sm-12 col-md-6">
              <label
                htmlFor="title"
                className="form-label head-baloon-font px-2 fw-bold"
              >
                <span className="text-danger text-shadow">*</span> TITLE:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control box-shadow"
                required
                placeholder="writ title here...."
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-danger text-shadow">
                  {formik.errors.title}
                </p>
              )}
            </div>
            <div className="col-sm-12 col-md-6">
              <label
                htmlFor="subtitle"
                className="form-label head-baloon-font px-2 fw-bold"
              >
                <span className="text-danger text-shadow">*</span> SUBTITLE:
              </label>
              <input
                type="text"
                name="subtitle"
                id="subtitle"
                className="form-control box-shadow"
                required
                placeholder="your subtitle..."
                value={formik.values.subtitle} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.subtitle && formik.errors.subtitle && (
                <p className="text-danger text-shadow">
                  {formik.errors.subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="row g-3 mt-3">
            <div className="col-sm-12 col-md-6">
              <label
                htmlFor="phone"
                className="form-label head-baloon-font px-2 fw-bold"
              >
                <span className="text-danger text-shadow">*</span> PHONE:
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="form-control box-shadow"
                required
                placeholder="your phone number...."
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
              <label
                htmlFor="email"
                className="form-label head-baloon-font px-2 fw-bold"
              >
                <span className="text-danger text-shadow">*</span> EMAIL:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control box-shadow"
                required
                placeholder="email@mail.com...."
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

          <div className="row g-3 mt-3">
            <div className="col-12">
              <label
                htmlFor="web"
                className="form-label head-baloon-font px-2 fw-bold"
              >
                WEB:
              </label>
              <input
                type="url"
                name="web"
                id="web"
                className="form-control box-shadow"
                placeholder="https://www.example.com...."
                value={formik.values.web}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.web && formik.errors.web && (
                <p className="text-danger text-shadow">{formik.errors.web}</p>
              )}
            </div>
            <div className="col-12">
              <label
                htmlFor="image"
                className="form-label head-baloon-font px-2 fw-bold"
              >
                <span className="text-danger text-shadow">*</span> IMAGE:
              </label>
              <input
                type="url"
                name="url"
                id="url"
                className="form-control box-shadow"
                placeholder="url..."
                required
                value={formik.values.url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.url && formik.errors.url && (
                <p className="text-danger text-shadow">
                  {formik.errors.url}
                </p>
              )}
            </div>

            <div className="col-12">
              <label
                htmlFor="alt"
                className="form-label head-baloon-font px-2 fw-bold"
              >
                ALTERNATIVE TEXT:
              </label>
              <input
                type="text"
                name="alt"
                id="alt"
                className="form-control box-shadow"
                placeholder="Enter your short explaining description..."
                value={formik.values.alt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.alt && formik.errors.alt && (
                <p className="text-danger text-shadow">{formik.errors.alt}</p>
              )}
            </div>
          </div>

          <div className="col-12 mt-2">
            <label
              htmlFor="description"
              className="form-label head-baloon-font mt-3 px-2 fw-bold"
            >
              <span className="text-danger text-shadow">*</span> DESCRIPTION:
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control box-shadow"
              placeholder="Enter your brief description..."
              required
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ resize: "none", height: "200px" }}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-danger text-shadow">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="row g-3 mt-2">
            <div className="col-sm-12 col-md-4">
              <label
                htmlFor="state"
                className="form-label head-baloon-font px-2 fw-bold"
              >
                STATE:
              </label>
              <input
                type="text"
                name="state"
                id="state"
                className="form-control box-shadow"
                placeholder="Enter your state...."
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
              <label
                htmlFor="country"
                className="form-label fw-bold head-baloon-font px-2"
              >
                <span className="text-danger text-shadow">*</span> COUNTRY:
              </label>
              <input
                type="text"
                name="country"
                id="country"
                className="form-control box-shadow"
                required
                placeholder="Enter your country...."
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
              <label
                htmlFor="city"
                className="form-label fw-bold head-baloon-font px-2"
              >
                <span className="text-danger text-shadow">*</span> CITY:
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="form-control box-shadow"
                required
                placeholder="Enter your city...."
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

          <div className="row g-3 mt-2">
            <div className="col-12">
              <label
                htmlFor="street"
                className="form-label head-baloon-font px-2 fw-bold"
              >
                <span className="text-danger text-shadow">*</span> STREET:
              </label>
              <input
                type="text"
                name="street"
                id="street"
                className="form-control box-shadow"
                required
                placeholder="Enter your street...."
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
              <label
                htmlFor="housNumber"
                className="form-label fw-bold  head-baloon-font px-2"
              >
                <span className="text-danger text-shadow">*</span> NUMBER:
              </label>
              <input
                type="number"
                name="houseNumber"
                id="houseNumber"
                className="form-control box-shadow"
                required
                placeholder="Enter your house number...."
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
              <label
                htmlFor="zip"
                className="form-label head-baloon-font px-2 fw-bold"
              >
                ZIP:
              </label>
              <input
                type="number"
                name="zip"
                id="zip"
                className="form-control box-shadow"
                placeholder="Enter your zip code...."
                value={formik.values.zip}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.zip && formik.errors.zip && (
                <p className="text-danger text-shadow">{formik.errors.zip}</p>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button
              type="submit"
              className={`m-3 w-30 text-shadow box-shadow ${theme === "dark" ? "btn btn-light" : "btn btn-dark"}`}
              disabled={!formik.dirty || !formik.isValid}
            >
              Save change's
            </button>
            <button
            className={`m-3 w-30 text-shadow box-shadow ${theme === "dark" ? "btn btn-light" : "btn btn-dark"}`}
              onClick={()=>navigate(-1)}
            >
              Go back without save
            </button>

          </div>
        </form>
      </div>
    </div>

      )}


  </div>
   );
}
 
export default EditCard;