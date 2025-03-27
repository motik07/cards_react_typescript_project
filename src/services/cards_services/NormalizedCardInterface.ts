import { CardInterface } from "../../interfaces/card_interfaces/CardsInterface";
import { UnNormalizedCardInterface } from "../../interfaces/card_interfaces/UnNormalizedCardInterface";

export function normalizeCard(values: UnNormalizedCardInterface): CardInterface {
  return {
    _id:values._id,
    title: values.title,
    subtitle: values.subtitle, 
    description: values.description,
    phone: values.phone,
    email: values.email,
    web: values.web,
    image: {
      url: values.url,
      alt: values.alt,
    },
    address: {
      state: values.state,
      country: values.country,
      city: values.city,
      street: values.street,
      houseNumber: values.houseNumber,
      zip: values.zip,
    }
  };
}
