import { FunctionComponent, useState } from "react";
import { CardInterface } from "../../interfaces/card_interfaces/CardsInterface";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { deleteCardRequest } from "../../services/cards_services/CardsServices";
import { alertError, alertSuccess } from "../../utilities/toastify_utilities/Toastify";
import { Modal, Button } from "react-bootstrap";

interface BMyCardsProps {
  card: CardInterface;
  likeCard: (cardId: string) => void;
  deleteCard: (cardId: string) => void;
}

const BMyCards: FunctionComponent<BMyCardsProps> = ({ card, likeCard, deleteCard }) => {
  const navigate = useNavigate();
  const { decodedToken } = useAuth();
  const { theme } = useTheme();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    deleteCardRequest(card._id, card.bizNumber!)
      .then(() => {
        alertSuccess(`Deleted successfully! 😁`);
        setShowDeleteModal(false);
        deleteCard(card._id); // עדכון הרשימה
      })
      .catch((err) => {
        console.log(err);
        alertError(`Delete failed!`);
      });
  };

  return (
    <>
      <div className={`col-12 card business-card animate-card d-flex flex-row card-hover ${theme === "dark" ? "card-dark" : "card-light box-shadow"}`} id="b_card">
        <div className="card-img-container bg-black m-2 overflow-hidden rounded" style={{ height: "180px", width: "180px" }}>
          <img
            className="card-img-top w-100 h-100"
            src={card.image?.url || "https://img.freepik.com/free-photo/user-profile-interface-sign-symbol-icon-3d-rendering_56104-1956.jpg"}
            alt={card.image?.alt || "card image is empty"}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="card-body d-flex flex-column justify-content-between flex-grow-1 p-2">
          <h2 className="card-title text-shadow fw-bolder david-liber-font">{card.title}</h2>
          <h5 className={`px-2 card-subtitle mb-3 text-muted rounded ${theme === "dark" ? "card-dark" : "card-light"}`}>{card.subtitle}</h5>

          <ul className={`list-group list-group-flush rounded`}>
            <li className={`list-group-item ${theme === "dark" ? "card-dark" : "card-light"}`}>
              <span className="fw-bold">Phone:</span> {card.phone}
            </li>
            <li className={`list-group-item ${theme === "dark" ? "card-dark" : "card-light"}`}>
              <span className="fw-bold">Address:</span> {`${card.address.street} ${card.address.houseNumber}, ${card.address.city}`}
            </li>
            <li className={`list-group-item ${theme === "dark" ? "card-dark" : "card-light"}`}>
              <span className="fw-bold">Card Number:</span> {card.bizNumber}
            </li>
          </ul>

          <div className="card-footer d-flex justify-content-between mt-3">
            {decodedToken && (
              <>
                <button className="btn btn-danger text-shadow text-light" onClick={() => setShowDeleteModal(true)}>
                <i className="fa-solid fa-trash text-shadow fs-6"></i> Delete this card               
                </button>
                <button className="btn btn-warning text-shadow text-light" onClick={() => navigate(`/edit-card/${card._id}`)}>
                  <i className="fa-regular fa-pen-to-square text-shadow fs-6"></i> Edit this card
                </button>
              </>
            )}

            {/* Phone Call Button */}
            <div className="d-flex align-items-center text-shadow">
              <Link to={`tel:${card.phone}`} className="btn btn-link text-primary btn-action">
                <i className="fa-solid fa-phone text-shadow fs-4"></i>
              </Link>

              {/* Likes Section */}
              {decodedToken && (
                <div className="d-flex align-items-center">
                  <span className="headline-first-char-style-font fs-4 p-0 m-0 text-warning text-shadow mx-2">
                    {card.likes?.length || 0}
                  </span>
                  <button className="btn btn-link text-danger btn-action" onClick={() => likeCard(card._id)}>
                    {card.likes?.includes(decodedToken._id) ? (
                      <i className="fa-solid fa-heart text-shadow fs-4"></i>
                    ) : (
                      <i className="fa-regular fa-heart text-shadow fs-4"></i>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Deletion */}

          <Modal 
      show={showDeleteModal} 
      onHide={() => setShowDeleteModal(false)} 
      centered
      backdrop="static"
    >
      <div className={`card ${theme === "dark" ? "card-dark" : "card-light"} business-card d-flex flex-column`}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger text-shadow">Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the card named: 
          <strong> {card.title} </strong>? <br />This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
    </>
  );
};

export default BMyCards;
