import { Bounce, Flip, toast } from "react-toastify";

export const alertMessage = (mssage: string): void => {
  toast(mssage, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
  });
};

export const alertError = (mssage: string): void => {
  toast.error(mssage, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip
  });
};

export const alertSuccess = (mssage: string): void => {
  toast.success(mssage, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip
  });
};

export const alertWarning = (mssage: string): void => {
  toast.warn(mssage, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip
  });
};

export const alertInfo = (message: string): void => {
  toast.info(message, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip
  });
};

export const alertDark = (message: string): void => {
  toast(message, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    className: "alertDark-toast-style"
  });
};

export const alertTell = (message: string): void => {
  toast(message, {
    position: "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    className: "tell-toast-style"
  });
};
