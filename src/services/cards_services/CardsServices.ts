import axios from "axios";
import { alertError } from "../../utilities/toastify_utilities/Toastify";
import { CardInterface } from "../../interfaces/card_interfaces/CardsInterface";

const API: string = import.meta.env.VITE_CARDS_API;

export const getAllCards = async () => {
  try {
    let response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.error(
      `ERROR - file: CardsServices.ts mission: fetch get all cards - getAllCards() ${error}`
    );
    throw error;
  }
};

export const getAllMyCards = async () => {
  try {
    let response = await axios.get(API + "/my-cards", {
      headers: { "x-auth-token": sessionStorage.getItem("token") }
    });
    return response.data;
  } catch (error) {
    console.error(
      `ERROR - file: CardsServices.ts mission: fetch get all cards - getAllCards() ${error}`
    );
    throw error;
  }
};

export const getCardById = async (id: string) => {
  try {
    let response = await axios.get(`${API}/${id}`, {
      headers: { "x-auth-token": sessionStorage.getItem("token") }
    });
    return response.data;
  } catch (error) {
    console.error(
      `ERROR - file: CardsServices.ts mission: fetch get card by id - getCardById() ${error}`
    );
    alertError(
      `ERROR - file: CardsServices.ts mission: fetch get card by id - getCardById() ${error}`
    );
  }
};

import { AxiosError } from "axios";

export const postNewCard = async (value: CardInterface) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated. No token found.");
    }
    console.log("postNewCard token being sent: ", token);
    const response = await axios.post(API, value, {
      headers: { "x-auth-token": token }
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "SERVER RESPONSE:",
      axiosError.response?.data || axiosError.message
    );
    if (axiosError.response?.status === 403) {
      throw new Error(
        "Authorization failed. You do not have permission to create a new card."
      );
    }
    if (
      (axiosError.response?.data as string)?.includes(
        "Mongoose Error: E11000 duplicate key error collection: business_card_app.cards index: email_1 dup key"
      )
    ) {
      throw new Error(
        "Card with this email exists, please enter another email."
      );
    }

    throw new Error("Creating card failed, please try again");
  }
};

export const patchLikeCard = async (cardId: string) => {
  try {
    const response = await axios.patch(`${API}/${cardId}`, undefined, {
      headers: {
        "x-auth-token": sessionStorage.getItem("token")
      }
    });

    console.log("# Post like/unliked successfully!", response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "❌ SERVER RESPONSE:",
      axiosError.response?.data || axiosError.message
    );
    throw new Error("Liking/unliking card failed, please try again");
  }
};

export const deleteCardRequest = async (cardId: string, bizNumber: number) => {
  try {
    const request = {
      headers: {
        "x-auth-token": sessionStorage.getItem("token")
      },
      data: {
        bizNumber: bizNumber
      }
    };
    const response = await axios.delete(`${API}/${cardId}`, request);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "❌ SERVER RESPONSE:",
      axiosError.response?.data || axiosError.message
    );
    throw new Error("Deleting card failed, please try again");
  }
};

export const updateCardRequest = async (
  cardId: string,
  updateValues: CardInterface
) => {
  try {
    const response = await axios.put(`${API}/${cardId}`, updateValues, {
      headers: { "x-auth-token": sessionStorage.getItem("token") }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Failed to update card");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred while updating the card");
    }
  }
};
