

import { FunctionComponent, useEffect, useState } from "react";
import Bcards from "./cards/Bcard";
import {  getAllCards, patchLikeCard } from "../services/cards_services/CardsServices";
import { CardInterface } from "../interfaces/card_interfaces/CardsInterface";
import { useAuth } from "../context/AuthContext";
import Loader from "./loader/Loader";
import { alertError } from "../utilities/toastify_utilities/Toastify";

const FavoriteCards: FunctionComponent = () => {
  const { decodedToken } = useAuth();
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!decodedToken?._id) {
      return;
    }
  
    getAllCards()
      .then((res) => {
        const favoriteCards = res.filter((card: CardInterface) => 
          card.likes?.includes(decodedToken._id as string) 
        );
        setCards(favoriteCards);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching favorite cards:", err);
        setIsLoading(false);
      });
  }, [decodedToken]);

  const likeCard = async (cardId: string) => {
    try {
      console.log("Un/Liking card")
      const response: CardInterface = await patchLikeCard(cardId) 
      setCards(cards => cards.map(currentCard => currentCard._id === cardId ? response : currentCard))
    } catch (error) {
      alertError((error as Error).message)
    }
  }

  return (
    <div className="container-fluid">
      {isLoading ? 
        <div className="col-12 d-flex justify-content-center mt-5">
          <Loader />
        </div> 
        : 
        (
        <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 p-2">
          {cards.length ? (
            <>
                      {cards.map((card) => (
              <div key={card._id} className="col d-flex justify-content-center">
                <Bcards key={card._id} card={card} likeCard={likeCard} />
              </div>
          ))}
          </>
          ) : (
            <div className="col-12 d-flex flex-column align-items-center">
                          <div className="text-center mb-5">
              <h4 className="fs-1 alert-heading diary-santa-font text-shadow text-light"> Soory you don't like no card!</h4>
              <p className="mb-0 diary-santa-font">Join the wildest networking platform today and then you see cards you like! 🐼</p>
            </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default FavoriteCards;
