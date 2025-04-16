import { FunctionComponent, useEffect, useState } from "react";
import {
  getAllCards,
  patchLikeCard
} from "../services/cards_services/CardsServices";
import { CardInterface } from "../interfaces/card_interfaces/CardsInterface";
import { alertError } from "../utilities/toastify_utilities/Toastify";
import Loader from "./loader/Loader";
import { useSearch } from "../context/SearchContext";
import Bcards from "./cards/Bcard";
interface CardProps {}

const Cards: FunctionComponent<CardProps> = () => {
  const { searchQuery } = useSearch();
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllCards()
      .then((res) => {
        setCards(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error: Cards.tsx useEffect() fetching cards:", err);
        setIsLoading(false);
        alertError(`Error: Cards.tsx useEffect() fetching cards: ${err}`);
      });
  }, []);

  const displayedCards =
    searchQuery.trim() === ""
      ? cards
      : cards.filter(
          (card) =>
            card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            card.phone.includes(searchQuery)
        );

  const likeCard = async (cardId: string) => {
    try {
      console.log("Un/Liking card");
      const response: CardInterface = await patchLikeCard(cardId); // The response is the new updated card (after like/unlike)
      setCards((cards) =>
        cards.map((currentCard) =>
          currentCard._id == cardId ? response : currentCard
        )
      );
    } catch (error) {
      alertError((error as Error).message);
    }
  };

  return (
    <div className="container-fluid">
      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <Loader />
        </div>
      ) : Array.isArray(displayedCards) ? (
        displayedCards.length === 0 ? (
          <div className="d-flex justify-content-center mt-5">
            <h2 className="text-danger text-shadow">No matches found!</h2>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 p-3">
            {displayedCards.map((card: CardInterface) => (
              <div key={card._id} className="col d-flex justify-content-center">
                <Bcards card={card} likeCard={likeCard} />
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <h2 className="text-danger text-shadow">Data format error</h2>
        </div>
      )}
    </div>
  );
};

export default Cards;
