import { FunctionComponent } from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
interface DeleteModalProps {
  cardId: string;
  cardBizNumber: number;
  handleDelete: (cardId: string, cardBizNumber: number) => void;
}
const DeleteModal: FunctionComponent<DeleteModalProps> = ({
  cardId,
  cardBizNumber,
  handleDelete
}) => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-danger box-shadow" onClick={handleShow}>
        Delete
      </button>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
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
            Are you sure you want to delete? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDelete(cardId, cardBizNumber);
                handleClose();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
