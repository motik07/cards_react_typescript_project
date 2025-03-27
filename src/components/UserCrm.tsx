import { FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Loader from "./loader/Loader";
import { useNavigate } from "react-router-dom";
import { alertError, alertSuccess } from "../utilities/toastify_utilities/Toastify";
import { User } from "../interfaces/users_interfaces/User";
import { getAllUsers, patchUserBusiness } from "../services/users_services/UserServices";

const UserCrm: FunctionComponent = () => {
  const navigate = useNavigate();
  const { decodedToken } = useAuth();
  const { theme } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    if (!decodedToken?.isAdmin) return;
    getAllUsers()
      .then((res) => {
        setUsers(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching all users:", err);
        setIsLoading(false);
        setLoadingError("Failed to load users. Please try again later.");
      });
  }, [decodedToken]);

  const handleToggleBusiness = async (userId: string) => {
    try {
      const updatedUser = await patchUserBusiness(userId);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? updatedUser : user
        )
      );
      alertSuccess("User business status updated successfully! 😁");
    } catch (err) {
      console.error("Error updating user business status:", err);
      alertError("Failed to update user business status. Please try again.");
    }
  };

  return (
    <div className={`col-12 m-0 p-0 d-flex flex-column align-items-center`}>
      {isLoading ? (
        <Loader />
      ) : loadingError ? (
        <div className="alert alert-danger">{loadingError}</div>
      ) : (
        <div className="row w-100 justify-content-center m-0 p-0 rounded rounded-4">
          <div className="col-12 d-flex justify-content-center rounded rounded-4">
            <div className="table-responsive m-3 box-shadow rounded rounded-4">
              <table className={`table table-bordered table-hover rounded rounded-4 overflow-hidden ${theme === "dark" ? "table-dark" : "table-danger"}`}>
                <thead className="table-primary">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Business Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr className="text-center align-middle" key={user._id}>
                      <td>
                        <img 
                          className="rounded-circle" 
                          width="70px" 
                          height="70px" 
                          src={user.image?.url} 
                          alt={`${user.name.first} ${user.name.last}`} 
                        />
                      </td>
                      <td>{`${user.name.first} ${user.name.last}`}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{`${user.address.city}, ${user.address.country}`}</td>
                      <td>
                        <span className={`badge ${user.isBusiness ? 'bg-success' : 'bg-secondary'}`}>
                          {user.isBusiness ? 'Business' : 'Regular'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button 
                            className="btn btn-sm btn-warning box-shadow" 
                            onClick={() => navigate(`/edit-user/${user._id}`)}
                          >
                            Edit
                          </button>
                          <button 
                            className={`btn btn-sm ${user.isBusiness ? 'btn-danger' : 'btn-success'} box-shadow`}
                            onClick={() => handleToggleBusiness(user._id)}
                          >
                            {user.isBusiness ? 'Remove Business' : 'Make Business'}
                          </button>
                        </div>
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

export default UserCrm;
