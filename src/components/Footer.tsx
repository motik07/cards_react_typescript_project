
import "../style/NavBar.css";
import { FunctionComponent, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getUserById } from "../services/users_services/UserServices";
import { User } from "../interfaces/users_interfaces/User";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; 

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const [user, setUser] = useState<User | null>(null);

  const { token, decodedToken } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (decodedToken && decodedToken._id) {
      console.log("Getting user by id");
      getUserById(decodedToken._id)
        .then((res: User) => {
          setUser(res);
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
    <footer className={`fixed-bottom ${theme === "dark" ? "navbar-dark theme-dark" : "navbar-light theme-light"} p-0 col-12 navbar navbar-expand-lg navbar-dark box-shadow mb-auto d-flex flex-column flex-sm-row justify-content-center align-items-center p-1 fw-bold`}>
      <div className="d-flex flex-wrap justify-content-center align-items-center text-sm-start">
        <div className="d-flex flex-row align-items-center justify-content-center m-2">
          <Link className="d-flex flex-column align-items-center justify-content-center flex-sm-row text-light text-decoration-none" to={'/'}>
            <p className="fs-4 text-shadow headline-first-char-style-font"><span className="fs-6 head-baloon-font">Welcome </span>
              {token && user ? `${upperCapitalLetter(user.name.first)} ${upperCapitalLetter(user.name.last)}` : "Welcome Guest"}
            </p>
          </Link>
        </div>
      </div>
      
      <nav className="nav nav-masthead d-flex justify-content-start text-shadow flex-wrap">
        {decodedToken && decodedToken.isAdmin ? (
          <div className={`d-flex overflow-hidden rounded ${theme === "dark" ? "navbar-dark theme-dark" : "navbar-light theme-light"}`}>
              <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"about"}>ABOUT</NavLink>
              {token && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"favorite-cards"}>FAVORITE-CARDS</NavLink>}
              {decodedToken && (decodedToken.isAdmin || decodedToken.isBusiness) && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"my-cards"}>MY-CARDS</NavLink>}
              {(decodedToken?.isAdmin || decodedToken?.isBusiness) && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"/new-card"}>NEW-CARD</NavLink>}
              {decodedToken && decodedToken.isAdmin && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-warning" to={"admin-panel"}>ADMIN-CONTROL</NavLink>}
          </div>
        ) : (
          <div  className={`d-flex overflow-hidden rounded ${theme === "dark" ? "navbar-dark theme-dark" : "navbar-light theme-light"}`}>
              <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"about"}>ABOUT</NavLink>
              {token && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"favorite-cards"}>FAVORITE-CARDS</NavLink>}
              {decodedToken && (decodedToken.isAdmin || decodedToken.isBusiness) && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"my-cards"}>MY-CARDS</NavLink>}
              {(decodedToken?.isAdmin || decodedToken?.isBusiness) && <NavLink className="nav-link fw-bold py-1 px-2 active head-baloon-font nav-links-style text-light" to={"/new-card"}>NEW-CARD</NavLink>}
          </div>
        )}
      </nav>
    </footer>
  );
};

export default Footer;

