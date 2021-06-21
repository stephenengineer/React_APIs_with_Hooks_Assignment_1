import React, { useEffect, useState } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [albums, setAlbums] = useState([]);
  const baseUrl = "https://jsonplaceholder.typicode.com";

  const url = baseUrl + "/users";

  // useEffect(() => {
  //   const savedOriginal = document.title;
  //   if (currentUser.name) {
  //     document.title = savedOriginal;
  //   } else {
  //     document.title = "Awesome Album App";
  //   }
  // }, [currentUser]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadUsers() {
      console.log("abortController inside LoadUsers", abortController);
      try {
        console.log(
          "abortController signal inside try",
          abortController.signal
        );
        const response = await fetch(url, { signal: abortController.signal });
        const usersFromAPI = await response.json();
        setUsers(usersFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted", users);
        } else {
          throw error;
        }
      }
    }
    loadUsers();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="App">
      <div className="left column">
        <UserList
          users={users}
          setCurrentUser={setCurrentUser}
          baseUrl={baseUrl}
          setUsers={setUsers}
        />
      </div>
      <div className="right column">
        <AlbumList
          user={currentUser}
          albums={albums}
          setAlbums={setAlbums}
          baseUrl={baseUrl}
        />
      </div>
    </div>
  );
}

export default App;
