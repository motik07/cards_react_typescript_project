import { FunctionComponent, useEffect, useState } from "react";
import { getAllCards, deleteCardRequest } from "../services/cards_services/CardsServices";
import { CardInterface } from "../interfaces/card_interfaces/CardsInterface";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Loader from "./loader/Loader";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { alertError, alertSuccess } from "../utilities/toastify_utilities/Toastify";

const AdminControl: FunctionComponent = () => {
  const navigate = useNavigate();
  const { decodedToken } = useAuth();
  const { theme } = useTheme();  // 🔥 שימוש ב-Theme
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    if (!decodedToken?.isAdmin) return;
    getAllCards()
      .then((res) => {
        setCards(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching all cards:", err);
        setIsLoading(false);
        setLoadingError("Failed to load cards. Please try again later.");
      });
  }, [decodedToken]);

  const deleteCardFromList = (cardId: string) => {
    setCards(prevCards => prevCards.filter(card => card._id !== cardId));
  };

  const handleDeleteCard = async (cardId: string, cardBizNumber: number) => {
    try {
      await deleteCardRequest(cardId, cardBizNumber);
      alertSuccess("Card deleted successfully! 😁");
      deleteCardFromList(cardId);
    } catch (err) {
      console.error("Error deleting card:", err);
      alertError("Failed to delete card. Please try again.");
    }
  };

  // return (
  //   <div className={`container-fluid m-0 p-0 d-flex flex-column align-items-center`}>
  //     {isLoading ? (
  //       <Loader />
  //     ) : loadingError ? (
  //       <div className="alert alert-danger">{loadingError}</div>
  //     ) : (
  //       <div className="col-12 d-flex flex-column align-items-center">
  //         <table className={`col-12 table table-bordered table-hover rounded rounded-4 box-shadow overflow-hidden m-3 ${theme === "dark" ? "table-dark" : "table-danger"}`}>
  //           <thead>
  //             <tr>
  //               <th>Image</th>
  //               <th>Title</th>
  //               <th>Subtitle</th>
  //               <th>Phone</th>
  //               <th>Biz Number</th>
  //               <th>Description</th>
  //               <th>Country</th>
  //               <th>City</th>
  //               <th>Biz Number</th>
  //               <th>Edit</th>
  //               <th>Delete</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {cards.map((card) => (
  //               <tr className="text-center" key={card._id}>
  //                 <td><img className=" rounded-circle" width={'70px'} height={'70px'} src={card.image?.url} alt="image" /></td>
  //                 <td>{card.title}</td>
  //                 <td>{card.subtitle}</td>
  //                 <td>{card.phone}</td>
  //                 <td>{card.bizNumber}</td>
  //                 <td>{card.description}</td>
  //                 <td>{card.address.country}</td>
  //                 <td>{card.address.city}</td>
  //                 <td>{card.bizNumber}</td>
  //                 <td>
  //                   <button className="btn btn-warning box-shadow" onClick={() => navigate(`/edit-card/${card._id}`)}>
  //                     Edit
  //                   </button>
  //                 </td>
  //                 <td>
  //                   <DeleteModal 
  //                     cardId={card._id} 
  //                     cardBizNumber={card.bizNumber as number}
  //                     handleDelete={handleDeleteCard} 
  //                   />
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    // <div className={`container-fluid m-0 p-0 d-flex flex-column align-items-center`}>
    //   {isLoading ? (
    //     <Loader />
    //   ) : loadingError ? (
    //     <div className="alert alert-danger">{loadingError}</div>
    //   ) : (
    //     <div className="row w-100 justify-content-center">
    //       <div className="col-lg-10 col-md-12 col-sm-12 col-12">
    //         <div className="table-responsive m-3 box-shadow"> 
    //           <table className={`table table-bordered table-hover rounded rounded-4 overflow-hidden ${theme === "dark" ? "table-dark" : "table-danger"}`}>
    //             <thead>
    //               <tr>
    //                 <th>Image</th>
    //                 <th>Title</th>
    //                 <th>Subtitle</th>
    //                 <th>Phone</th>
    //                 <th>Biz Number</th>
    //                 <th>Description</th>
    //                 <th>Country</th>
    //                 <th>City</th>
    //                 <th>Biz Number</th>
    //                 <th>Edit</th>
    //                 <th>Delete</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {cards.map((card) => (
    //                 <tr className="text-center" key={card._id}>
    //                   <td><img className="rounded-circle" width="70px" height="70px" src={card.image?.url} alt="image" /></td>
    //                   <td>{card.title}</td>
    //                   <td>{card.subtitle}</td>
    //                   <td>{card.phone}</td>
    //                   <td>{card.bizNumber}</td>
    //                   <td>{card.description}</td>
    //                   <td>{card.address.country}</td>
    //                   <td>{card.address.city}</td>
    //                   <td>{card.bizNumber}</td>
    //                   <td>
    //                     <button className="btn btn-warning box-shadow" onClick={() => navigate(`/edit-card/${card._id}`)}>
    //                       Edit
    //                     </button>
    //                   </td>
    //                   <td>
    //                     <DeleteModal 
    //                       cardId={card._id} 
    //                       cardBizNumber={card.bizNumber as number}
    //                       handleDelete={handleDeleteCard} 
    //                     />
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className={`col-12 m-0 p-0 d-flex flex-column align-items-center`}>
  {isLoading ? (
    <Loader />
  ) : loadingError ? (
    <div className="alert alert-danger">{loadingError}</div>
  ) : (
    <div className="row w-100 justify-content-center m-0 p-0 rounded rounded-4"> {/* סידור שורה כמו שצריך */}
      <div className="col-12 d-flex justify-content-center rounded rounded-4"> {/* ה-Container שלך */}
        <div className="table-responsive m-3 box-shadow rounded rounded-4"> {/* אין כאן הגדרות של col-12 וכו' */}
          <table className={`table table-bordered table-hover rounded rounded-4 overflow-hidden ${theme === "dark" ? "table-dark" : "table-danger"}`}>
            <thead className="table-primary ">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th className="d-sm-none d-md-none d-lg-none">Subtitle</th>
                <th>Phone</th>
                <th>Biz Number</th>
                <th className="d-sm-none d-md-none d-lg-none">Description</th>
                <th className="d-sm-none d-md-none d-lg-none">Country</th>
                <th className="d-sm-none d-md-none d-lg-none">City</th>
                <th>Biz Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr className="text-center align-middle" key={card._id}>
                  <td><img className="rounded-circle" width="70px" height="70px" src={card.image?.url} alt="image" /></td>
                  <td>{card.title}</td>
                  <td className="d-sm-none d-md-none d-lg-none">{card.subtitle}</td>
                  <td>{card.phone}</td>
                  <td>{card.bizNumber}</td>
                  <td  className="d-sm-none d-md-none d-lg-none">{card.description}</td>
                  <td className="d-sm-none d-md-none d-lg-none">{card.address.country}</td>
                  <td className="d-sm-none d-md-none d-lg-none">{card.address.city}</td>
                  <td>{card.bizNumber}</td>
                  <td>
                    <button className="btn btn-sm btn-warning box-shadow" onClick={() => navigate(`/edit-card/${card._id}`)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <DeleteModal 
                      cardId={card._id} 
                      cardBizNumber={card.bizNumber as number}
                      handleDelete={handleDeleteCard} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}
</div>

  );
  
};

export default AdminControl;
