import React, { useEffect } from "react";
import Album from "./Album";

function AlbumList({ user = {}, albums, setAlbums, baseUrl }) {
  const url = baseUrl + `/albums?userId=${user.id}`;
  useEffect(() => {
    const savedOriginal = document.title;
    document.title = "Awesome Album App";
    const abortController = new AbortController();
    async function loadAlbums() {
      try {
        const response = await fetch(url, { signal: abortController.signal });
        setAlbums(await response.json());
      } catch (error) {}
    }
    if (user.id) loadAlbums();
    return () => {
      abortController.abort();
      document.title = savedOriginal;
    };
  }, [user]);

  if (!user.id) return <p>Please click on a user name to the left</p>;

  return (
    <div>
      <h2>{user.name} Albums</h2>
      <ul className="user-list">
        {albums.map((album) => (
          <li key={album.id}>
            <Album album={album} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumList;
