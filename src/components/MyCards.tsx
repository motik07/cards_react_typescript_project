import { FunctionComponent, useEffect, useState } from "react";
import { getAllMyCards, patchLikeCard } from "../services/cards_services/CardsServices";
import { CardInterface } from "../interfaces/card_interfaces/CardsInterface";
import { useAuth } from "../context/AuthContext";
import Loader from "./loader/Loader";
import { alertError } from "../utilities/toastify_utilities/Toastify";
import BMyCards from "./cards/BMyCards";
import { Link } from "react-router-dom";

const MyCards: FunctionComponent = () => {
  const { decodedToken } = useAuth();
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!decodedToken?._id) {
      return;
    }

    getAllMyCards()
      .then((res) => {
        setCards(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching my cards:", err);
        alertError("Can't fetch my cards, please try again later.");
        setIsLoading(false);
      });
  }, [decodedToken]);

  const likeCard = async (cardId: string) => {
    try {
      console.log("Un/Liking card");
      const response: CardInterface = await patchLikeCard(cardId);
      setCards(cards => cards.map(currentCard => currentCard._id === cardId ? response : currentCard));
    } catch (error) {
      alertError((error as Error).message);
    }
  };
  const deleteCard = (cardId: string) => {
    setCards(prevCards => prevCards.filter(card => card._id !== cardId));
  };

  return (
    <div className="col-12">
      {isLoading ? (
        <Loader />
      ) : cards.length === 0 ? (
        <div className="col-12 d-flex flex-column align-items-center mt-5">
          <img className="animated-image rounded-circle" width={'200px'} src="https://icons.iconarchive.com/icons/iconarchive/incognito-animal-2/256/Giraffe-icon.png" alt="" />
          <h2 className="text-light text-shadow david-liber-font">You have no cards yet.....!</h2>
          <Link className="fs-3 fw-bold text-light text-shadow david-liber-font text-decoration-none" to={"/new-card"}>Want to create new card? click <span className="text-danger">→ HERE! ←</span></Link>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center g-3 p-3">
          {cards.map((card) => (
            <div key={card._id} className="col-12 m-3">
              <BMyCards 
                card={card} 
                likeCard={() => likeCard(card._id)} 
                deleteCard={deleteCard}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCards;
