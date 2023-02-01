import React from "react";
import { useAuth } from "./authComponents/AuthProvider";
import "./ShowUser.css";

function Showuser() {
  const { currentUser } = useAuth();
  if (currentUser) {
    if (currentUser.displayName) {
      return (
        <>
          <img
            src={
              currentUser.photoURL
                ? currentUser.photoURL
                : "https://image.shutterstock.com/image-vector/thin-line-user-icon-on-260nw-519039097.jpg"
            }
          ></img>
          <h3>Welcome {currentUser.displayName}</h3>
        </>
      );
    }
    return <h3>Welcome {currentUser.email}</h3>;
  } else {
    return <h3>Login to save your score</h3>;
  }
}

export default Showuser;
