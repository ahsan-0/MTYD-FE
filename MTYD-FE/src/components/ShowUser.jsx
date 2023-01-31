import React from "react";
import { useAuth } from "./authComponents/AuthProvider";
function Showuser() {
  const { currentUser } = useAuth();
  if(currentUser){
    return <h3>Welcome {currentUser.email}</h3>
  }else {
    return <h3>login to save your score</h3>
  }
}

export default Showuser;
