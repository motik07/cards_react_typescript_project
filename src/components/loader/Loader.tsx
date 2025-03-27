import { FunctionComponent } from "react";

interface LoaderProps {}

const Loader: FunctionComponent<LoaderProps> = () => {
  return (
    <div className="col-12 d-flex flex-column align-items-center">
      <h1 className="display-1 headline-first-char-style-font text-light text-shadow m-4">Loading...</h1>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
