import "../../style/StyleElements.css";
import "../../style/Cards.css";
import { FunctionComponent, useState } from "react";
import { CardInterface } from "../../interfaces/card_interfaces/CardsInterface";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { deleteCardRequest } from "../../services/cards_services/CardsServices";
import {
  alertError,
  alertSuccess
} from "../../utilities/toastify_utilities/Toastify";
import { Modal, Button } from "react-bootstrap";

interface BcardsProps {
  card: CardInterface;
  likeCard: (cardId: string) => void;
}

const Bcards: FunctionComponent<BcardsProps> = ({ card, likeCard }) => {
  const { decodedToken } = useAuth();
  const { theme } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    deleteCardRequest(card._id, card.bizNumber!)
      .then(() => {
        alertSuccess(`Deleted successfully! 😁`);
        setShowDeleteModal(false);
        deleteCardRequest(card._id, card.bizNumber as number);
      })
      .catch((err) => {
        console.log(err);
        alertError(`Delete failed!`);
      });
  };

  return (
    <div
      className={`card ${
        theme === "dark" ? "card-dark" : "card-light box-shadow"
      } business-card animate-card d-flex flex-column card-hover`}
      style={{ height: "450px", width: "420px", display: "flex" }}
      id="b_card"
    >
      <div
        className="card-img-container bg-black m-2 overflow-hidden rounded"
        style={{ height: "180px" }}
      >
        <img
          className="card-img-top w-100 h-100"
          src={
            card.image?.url ||
            "https://img.freepik.com/free-photo/user-profile-interface-sign-symbol-icon-3d-rendering_56104-1956.jpg?t=st=1742416494~exp=1742420094~hmac=f1f6d0796d8e9e4ae6b93b01e208447b24ff2489e603dc5b8f9a7085783ee38d&w=1380"
          }
          alt={card.image?.alt || "card image is empty"}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="card-body d-flex flex-column flex-grow-1">
        <h2 className="card-title text-shadow fw-bolder david-liber-font">
          {card.title}
        </h2>
        <h5
          className={`px-2 card-subtitle mb-3 text-muted rounded ${
            theme === "dark" ? "card-dark" : "card-light"
          }`}
        >
          {card.subtitle}
        </h5>

        <ul
          className={`ounded list-group list-group-flush flex-grow-1 rounded`}
        >
          <li
            className={`list-group-item d-flex justify-content-between align-items-center  ${
              theme === "dark" ? "card-dark" : "card-light"
            }`}
          >
            <span className={`fw-bold`}>Phone:</span>
            <span>{card.phone}</span>
          </li>
          <li
            className={`list-group-item d-flex justify-content-between align-items-center  ${
              theme === "dark" ? "card-dark" : "card-light"
            }`}
          >
            <span className={`fw-bold`}>Address:</span>
            <span>{`${card.address.street} ${card.address.houseNumber}, ${card.address.city}`}</span>
          </li>
          <li
            className={`list-group-item d-flex justify-content-between align-items-center  ${
              theme === "dark" ? "card-dark" : "card-light"
            }`}
          >
            <span className={`fw-bold`}>Card - Number:</span>
            <span>{card.bizNumber}</span>
          </li>
        </ul>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <div className="col">
          {decodedToken && decodedToken.isAdmin && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="btn btn-link text-danger btn-action"
            >
              <i className="fa-solid fa-trash text-success text-shadow fs-4  element-hover"></i>
            </button>
          )}
        </div>
        <Link
          to={`tel:${card.phone}`}
          className="btn btn-link text-primary btn-action"
        >
          <i className="fa-solid fa-phone text-shadow fs-4"></i>
        </Link>
        {decodedToken && (
          <div className="d-flex align-items-center">
            <span className="headline-first-char-style-font fs-2 p-0 m-0 text-warning text-shadow">
              {card.likes?.length}
            </span>
            <button
              className="btn btn-link text-danger btn-action"
              onClick={() => likeCard(card._id)}
            >
              {card.likes?.includes(decodedToken._id) ? (
                <i className="fa-solid fa-heart text-shadow fs-4  element-hover"></i>
              ) : (
                <i className="fa-regular fa-heart text-shadow fs-4  element-hover"></i>
              )}
            </button>
          </div>
        )}
      </div>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        backdrop="static"
      >
        <div
          className={`card ${
            theme === "dark" ? "card-dark" : "card-light"
          } business-card d-flex flex-column`}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-danger text-shadow">
              Warning!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the card named:
            <strong> {card.title} </strong>? <br />
            This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Bcards;
