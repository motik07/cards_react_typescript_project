import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

interface ColorThemeToggleProps {}

const ColorThemeToggle: FunctionComponent<ColorThemeToggleProps> = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <p 
      className="fs-3 p-0 d-flex justify-content-center align-items-center m-1 cursor"
      onClick={() => {
        toggleTheme(); 
      }}
    >
      {theme === "light" ? (
        <i className="fa-solid fa-moon text-light text-shadow m-3"></i>
      ) : (
        <i className="fa-solid fa-sun text-light m-3"></i>
      )}
    </p>

    
  );
};

export default ColorThemeToggle;
