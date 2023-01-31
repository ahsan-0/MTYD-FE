import React from "react";
import { useAuth } from "./AuthProvider";

export const Logout = () => {
    const {logout} = useAuth()
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
