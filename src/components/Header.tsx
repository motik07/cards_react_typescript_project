import "../style/NavBar.css";
import { FunctionComponent, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getUserById } from "../services/users_services/UserServices";
import { User } from "../interfaces/users_interfaces/User";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; 

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const [user, setUser] = useState<User | null>(null);
  const [imageChanging, setImageChanging] = useState<boolean>(false);

  const { token, decodedToken } = useAuth();
  const { theme } = useTheme();

  const DEFAULT_IMAGE = "/public/panda_icon.png"; 

  useEffect(() => {
    if (decodedToken && decodedToken._id) {
      console.log("Getting user by id");
      getUserById(decodedToken._id)
        .then((res: User) => {
          setImageChanging(true);
          setUser(res);
          setTimeout(() => setImageChanging(false), 400);
        })
        .catch((err) => {
          console.error(`Error: Header.tsx fetching token to user details: ${err}`);
        });
    } else {
      setUser(null); 
    }
  }, [decodedToken]);

  const upperCapitalLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.substring(1);
  };

  return (
    <header className={`${theme === "dark" ? "navbar-dark theme-dark" : "navbar-light theme-light"} p-0 col-12 navbar navbar-expand-lg navbar-dark box-shadow mb-auto d-flex flex-column flex-sm-row justify-content-start align-items-center fw-bold`}>
      <div className="d-flex flex-wrap justify-content-center align-items-center text-sm-start">
        <div className="d-flex flex-row align-items-center justify-content-center">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "55px", height: "55px" }}
          >
            <img
              className={`user-image ${imageChanging ? "image-change" : ""}`}
              src={ user && user.image.url ? user.image.url : DEFAULT_IMAGE }
              alt="User Avatar"
              style={{
                width: "27px",
                height: "27px",
                objectFit: "cover",
                borderRadius: "5px"
              }}
            />
          </div>
          <Link className="d-flex flex-column align-items-center justify-content-center flex-sm-row text-light text-decoration-none" to={'/'}>
            <p className="fs-6 text-shadow head-baloon-font">
              {token && user ? `Welcome ${upperCapitalLetter(user.name.first)} ${upperCapitalLetter(user.name.last)}` : "Welcome Guest"}
            </p>
          </Link>
        </div>
      </div>
      
      <nav className="col-3 nav nav-masthead d-flex justify-content-start flex-wrap text-shadow flex-wrap">
        <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"about"}>ABOUT</NavLink>

        {decodedToken && decodedToken.isAdmin ? (
          <div className="nav-dropdown">
            {token && <a className="cursor nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style nav-dropbtn text-light">Menu</a>}
            <div className={`nav-dropdown-content overflow-hidden rounded ${theme === "dark" ? "navbar-dark theme-dark" : "navbar-light theme-light"}`}>
              {token && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"favorite-cards"}>FAVORITE-CARDS</NavLink>}
              {decodedToken && (decodedToken.isAdmin || decodedToken.isBusiness) && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"my-cards"}>MY-CARDS</NavLink>}
              {(decodedToken?.isAdmin || decodedToken?.isBusiness) && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"/new-card"}>NEW-CARD</NavLink>}
              {decodedToken && decodedToken.isAdmin && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-warning" to={"admin-panel"}>ADMIN-CONTROL</NavLink>}
              {decodedToken && decodedToken.isAdmin && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-warning" to={"user-crm"}>USER-CRM</NavLink>}
            </div>
          </div>
        ) : (
          <div className="nav-dropdown">
            {token && <a className="cursor nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style nav-dropbtn text-light">Menu</a>}
            <div className={`nav-dropdown-content overflow-hidden rounded ${theme === "dark" ? "nav-dropdown-content-dark" : "nav-dropdown-content-light"}`}>
              {token && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"favorite-cards"}>FAVORITE-CARDS</NavLink>}
              {decodedToken && (decodedToken.isAdmin || decodedToken.isBusiness) && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"my-cards"}>MY-CARDS</NavLink>}
              {(decodedToken?.isAdmin || decodedToken?.isBusiness) && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"/new-card"}>NEW-CARD</NavLink>}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

