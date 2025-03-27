import "../style/NavBar.css"
import { FunctionComponent, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ColorThemeToggle from "./ColorThemeToggle";
import { alertSuccess } from "../utilities/toastify_utilities/Toastify";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext"; 


interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  const { setSearchQuery } = useSearch();
  const [ valSearch, setValSearch] = useState<string>(""); 
  const navigate = useNavigate();
  
  const { token, logout } = useAuth(); //^ חילוץ מהקונטקסט
  const { theme } = useTheme();

  
  const logOut = (): void => {
    logout()
    alertSuccess(`Log out succsessfuly!`)
  };
  
  return (
    <header className={`${theme === "dark" ? "navbar-dark theme-dark" : "navbar-light theme-light"} col-12 navbar-sticky container-fluid navbar navbar-expand-lg navbar-dark box-shadow mb-auto d-flex flex-column flex-sm-row justify-content-between align-items-center p-0 fw-bold`}>
      <div className="d-flex flex-wrap justify-content-center align-items-center text-sm-start">
        <div className="d-flex flex-row align-items-center justify-content-center m-1">
            <Link className="d-flex flex-column align-items-center justify-content-center flex-sm-row text-light text-decoration-none" to={'/'} onClick={() => setSearchQuery("")} >
              <img className="d-none d-md-block mx-2" width={'30px'} src="/public/panda_icon.png" alt="cardy pandy site logo" />
              <p className="fs-2 fw-bolder m-1 headline-first-char-style-font text-shadow">CardiPandi</p>
            </Link>
        </div>
       </div>
      <nav className="d-flex justify-content-center align-items-center flex-wrap m-2">
        <div style={{height:"30px", width:"270px"}} className="input-group m-1 rounded">
          <input
            type="text"
            className="form-control"
            placeholder="Search card name or username"
            aria-label="Search card name or username"
            aria-describedby="button-addon2"
            value={valSearch}
            onChange={(e) => {setValSearch(e.target.value); navigate('/')}}
            onKeyDown={(e) => {
              if (e.key === "Enter") setSearchQuery(valSearch);
              navigate('/');
            }}
          />
          <button onClick={() => setSearchQuery(valSearch)} className="btn btn-danger" type="button" id="button-addon2">
            Button
          </button>
        </div>
      </nav>
       <nav className="col-5 nav nav-masthead d-flex justify-content-start text-shadow align-items-center mx-2">
       {token && (<p onClick={ logOut } className="nav-link fw-bold py-1 px-1 active active head-baloon-font nav-links-style text-light m-0 cursor">LOG-OUT <i className="fa-solid fa-arrow-right-from-bracket"></i></p>)}
            { !token && <NavLink className="nav-link fw-bold py-1 px-2 active active head-baloon-font nav-links-style text-light" to={"/register"}>REGISTER</NavLink> }
            { !token && <NavLink className="nav-link fw-bold py-1 px-2 active active head-baloon-font nav-links-style text-light" to={"/login"}>LOGIN <i className="fa-solid fa-arrow-right-to-bracket"></i></NavLink> }
            <ColorThemeToggle />
      </nav>
    </header>
  );
};

export default NavBar;
