import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { loginUser } from "../services/users_services/UserServices";
import { UserLogin } from "../interfaces/users_interfaces/UserLogin";
import { alertError, alertSuccess } from "../utilities/toastify_utilities/Toastify";
import { decodeToken } from "../services/token_service/TokenDecode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
    const { theme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().min(5).required(),
      password: yup.string()
        .min(9, "Password must be at least 9 characters long")
        .matches( /[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter (a-z)")
        .matches(/\d/, "Password must contain at least one number (0-9)")
        .matches(/[!@#$%^&*-]/, "Password must contain at least one special character (!@#$%^&*-)")
        .required("Password is required"),
    }),
    onSubmit: (values) => {

      loginUser(values as UserLogin).then((response)=>{

          const token = response;

          if (token) {
            login(token);
          } else {
            console.error("Login failed, token is invalid.");
          }
          
          alertSuccess(`${values.email} login successfully!`);
          console.log(values);
          console.log("Login check admin type:"+decodeToken(token)?.isAdmin);
          navigate('/');
        }).catch((err)=>{
          if(err.response){
            alertError("Network error! Please check your internet connection.");
          }
          console.error( `Invalid input. Please check details: ${err.response.status} ${err} ${err.response}` );
          alertError( `${err.response.data}` );
        })
    }
  });
  return (
    <div className="container-fluid m-0 p-0 d-flex flex-column align-items-center">
        <div className="col-12 col-md-11 col-lg-8 d-flex flex-column align-items-center p-5">
          <form onSubmit={formik.handleSubmit} className={`card col-6  p-3 shadow-sm box-shadow ${theme === "dark" ? "form-light" : "form-dark"}`}>
           <div className="col-12 text-center">
           <h4 className="mt-3 headline-font-width fs-1 headline-first-char-style-font text-shadow">Login</h4>
           </div>

            {/* שורת סיסמאות */}
            <div className="col g-3 m-0">
            <div className="col-12">
                <label htmlFor="email" className="form-label m-2">
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
                  <p className="text-danger head-baloon-font text-shadow m-2">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="password" className="form-label m-2">
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
                  <p className="text-danger head-baloon-font text-shadow m-2">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>
            <div className="d-flex flex-column align-items-center mb-4">
              <button
                type="submit"
                className={`m-3 w-30 text-shadow box-shadow ${theme === "dark" ? "btn btn-light" : "btn btn-dark"}`}
                disabled={!formik.dirty || !formik.isValid}
              >
                Submit
              </button>
              <p className="fs-5 nav-links-style diary-santa-font cursor text-shadow text-danger" onClick={()=>navigate('/register')}>
                → don't have account? Click Here! ←
                </p>
            </div>
          </form>
        </div>
    </div>
  );
};

export default Login;
