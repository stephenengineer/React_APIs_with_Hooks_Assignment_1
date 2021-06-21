import React from "react";

function Album({album}) {
    return <p>{album.id} - {album.title}</p>;
}

export default Album;