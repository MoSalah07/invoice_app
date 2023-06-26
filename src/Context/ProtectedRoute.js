import React from "react";
import { Navigate } from "react-router-dom";
import { CTXAuth } from "../Context/ContextProviderAuth";

function ProtectedRoute({ children }) {
    const { user } = CTXAuth();
        if (!user) {
            return <Navigate to="/" />;
          }
  return children;
}

export default ProtectedRoute;
