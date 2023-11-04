import { useEffect, useState } from "react";

import * as userService from "../services/userService.js"; //дай ми всички експорти, които ги има в този файл и ги обедини в един обект, който се казва userService

import UserListItem from "./UserListItem.jsx";
import CreateUserModal from "./CreateUserModal.jsx";
import UserInfoModal from "./UserInfoModal.jsx";
import UserDeleteModal from "./UserDeleteModal.jsx";
import Spinner from "./Spinner.jsx";

const UserListTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [showCreate, setShowCreate] = useState(false); // и по-надолу казваме ако това е true покажи това, ако е фалсе нищо няма да показваш
  const [showInfo, setShowInfo] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  console.log(users);

  useEffect(() => {
    setIsloading(true);
    userService
      .getAll()
      .then(setUsers)
      .catch((err) => console.log(err))
      .finally( () => {
       setTimeout(() =>  setIsloading(false), 300)
      });
  }, []);

  const createUserClickHandler = () => {
    setShowCreate(true); //при клик винаги да се показва
  };

  const hideCreateUserModal = () => {
    setShowCreate(false);
  };

  const userCreateHandler = async (e) => {
    //1. Stop page from Refreshing
    e.preventDefault();

    //2. Get data from form data
    const data = Object.fromEntries(new FormData(e.currentTarget));

    //3. Create new user at the server
    const newUser = await userService.create(data);

    //4.Add newly created user to the local state
    setUsers((state) => [...state, newUser]); // просто вземи новия user, който е обект, вземи стария стейт, създай нова референция, която е масив, спретни стария стейт вътре и добави новия

    //5. Close the modal
    setShowCreate(false);
  };

  const userInfoClickHandler = async (userId) => {
    setSelectedUser(userId); // сетваме че юзера е селектнат и да се включи showInfo
    setShowInfo(true);
  };

  //Delete
  const deleteUserClickHandler = (userId) => {
    setSelectedUser(userId);
    setShowDelete(true);
  };

  const deleteUserHandler = async () => {
    //Remove user from server
    const result = await userService.remove(selectedUser);

    //Remove user from state
    setUsers(state => state.filter(user => user._id !== selectedUser));

    //Close the delete modal

    setShowDelete(false);
  };

  return (
    <div className="table-wrapper">
      {showCreate && (
        <CreateUserModal
          hideModal={hideCreateUserModal}
          onUserCreate={userCreateHandler}
        />
      )}

      {showInfo && (
        <UserInfoModal
          onClose={() => setShowInfo(false)}
          userId={selectedUser}
        />
      )}

      {showDelete && (
        <UserDeleteModal
          onClose={() => setShowDelete(false)}
          onDelete={deleteUserHandler}
        />
      )}

      {isLoading && <Spinner/>}

      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>
              First name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Last name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Email
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Phone
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Created
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- Table row component --> */}
          {users.map((user) => (
            <UserListItem
              key={user._id}
              userId={user._id}
              createdAt={user.createdAt}
              email={user.email}
              firstName={user.firstName}
              imageUrl={user.imageUrl}
              lastName={user.lastName}
              phoneNumber={user.phoneNumber}
              onInfoClick={userInfoClickHandler}
              onDeleteClick={deleteUserClickHandler}
            />
          ))}
        </tbody>
      </table>

      <button className="btn-add btn" onClick={createUserClickHandler}>
        Add new user
      </button>
    </div>
  );
};

export default UserListTable;
