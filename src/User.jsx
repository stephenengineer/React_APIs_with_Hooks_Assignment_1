import React from "react";

function User({user, setCurrentUser}) {

  return (
      <button type="button" onClick={() => setCurrentUser(user)}>
          {user.name}
      </button>
  )
}

export default User;