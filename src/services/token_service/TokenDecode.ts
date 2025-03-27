import { jwtDecode } from "jwt-decode";
import { DecodedTokLoginInterface } from "../../interfaces/token_interface/DecodedTokLoginInterface";

export function decodeToken(token: any): DecodedTokLoginInterface | null {
  try {
    if (!token) {
      console.log("No token in session storage");
      return null;
    }

    const decodedJwtToken = jwtDecode<DecodedTokLoginInterface>(
      token as string
    );
    
    return decodedJwtToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
