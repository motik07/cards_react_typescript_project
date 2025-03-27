import axios, { AxiosError } from 'axios';
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
      const response = await axios.get(`${API}/${id}`, { headers: { "x-auth-token": sessionStorage.getItem("token") }});
      return response.data;
    } catch (error) {
      console.error(`ERROR - file: UserServices.ts mission: fetch get card by id - getUserById() ${error}`);
      alertError(`ERROR - file: UserServices.ts mission: fetch get card by id - getUserById() ${error}`)
    }
  };
  
  export const getAllUsers: () => Promise<User[]>  = async () => {
    try {
      const response = await axios.get(API, { headers: { "x-auth-token": sessionStorage.getItem("token") }});
      return response.data;
    } catch (error) {
      console.error("Error GET ALL USERS: UserService.ts getAllUsers() error:", error);
      alertError(`Error GET ALL USERS: UserService.ts getAllUsers() error: ${error}`);
      throw error;
    }
  }

  export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
    try {
      const response = await axios.put(`${API}/${id}`, userData, { 
        headers: { "x-auth-token": sessionStorage.getItem("token") }
      });
      return response.data;
    } catch (error) {
      console.error("Error UPDATE USER: UserService.ts updateUser() error:", error);
      console.error((error as AxiosError).response)
      alertError(`Error UPDATE USER: UserService.ts updateUser() error: ${error}`);
      throw error;
    }
  }

  export const patchUserBusiness = async (id: string): Promise<User> => {
    try {
      const response = await axios.patch(`${API}/${id}`, null , { 
        headers: { "x-auth-token": sessionStorage.getItem("token") }
      });
      return response.data;
    } catch (error) {
      console.error("Error PATCH USER BUSINESS: UserService.ts patchUserBusiness() error:", error);
      alertError(`Error PATCH USER BUSINESS: UserService.ts patchUserBusiness() error: ${error}`);
      throw error;
    }
  }

