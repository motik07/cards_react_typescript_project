
import { NormalizedUserInterface } from "../../interfaces/users_interfaces/NormalizedUserInterface";
import { User } from "../../interfaces/users_interfaces/User";

export function normalizeUserFunction(values: NormalizedUserInterface):User {
  return {
    name: {
      first: values.first,
      middle: values.middle,
      last: values.last
    },
    phone: values.phone,
    email: values.email,
    password: values.password,
    image: {
      url: values.image || "", 
      alt: values.alt || ""
    },    
    address: {
      state: values.state,
      country: values.country,
      city: values.city,
      street: values.street,
      houseNumber: values.houseNumber,
      zip: values.zip
    },
    isBusiness: values.isBusiness
  };
}
