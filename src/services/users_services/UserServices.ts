import axios from 'axios';
import { User } from '../../interfaces/users_interfaces/User';
import { UserLogin } from '../../interfaces/users_interfaces/UserLogin';
import { alertError } from '../../utilities/toastify_utilities/Toastify';
const API: string = import.meta.env.VITE_USERS_API;

export const registerUser = async (normalizedUserArg: User) => {
    try {
      const response = await axios.post(API, normalizedUserArg);
      return response.data;
    } catch (error) {
      console.error("Error RGISTER: UserService.ts post registerUser() error:", error);
      alertError(`Error RGISTER: UserService.ts post registerUser() error: ${error}`);
      throw error;
    }
  };
  
  export const loginUser = async (user: UserLogin) => {
    try {
      const response = await axios.post(`${API}/login`, user);
      return response.data;
    } catch (error) {
      console.error("Error LOGIN: ** server log-in bad response... UserService.ts post loginUser() error:", error);
      alertError(`Error LOGIN: ** server log-in bad response... UserService.ts post loginUser() error: ${error}`)
      throw error;
    }
  };
  
  export const getUserById = async (id: string) => {
    try {
      let response = await axios.get(`${API}/${id}`, { headers: { "x-auth-token": sessionStorage.getItem("token") }});
      return response.data;
    } catch (error) {
      console.error(`ERROR - file: UserServices.ts mission: fetch get card by id - getUserById() ${error}`);
      alertError(`ERROR - file: UserServices.ts mission: fetch get card by id - getUserById() ${error}`)
    }
  };
  
  