import React, { useEffect } from "react";
import User from "./User";

function UserList({ users, setCurrentUser, baseUrl, setUsers }) {
  const url = baseUrl + "/users";
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   async function loadUsers() {
  //     try {
  //       const response = await fetch(url, {signal: abortController.signal});
  //       const usersFromAPI = await response.json();
  //       setUsers(usersFromAPI);
  //     } catch (error) {}
  //   }
  //   loadUsers();
  //   return () => {abortController.abort();}
  // }, [user]);

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>
          <User user={user} setCurrentUser={setCurrentUser} />
        </li>
      ))}
    </ul>
  );
}

export default UserList;
