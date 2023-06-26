import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../configFirebase/configFirebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const useContextAuth = createContext();

function ContextProviderAuth({ children }) {
  // For Test Only
  const [showDetailsInvoice, setShowDetailsInvoice] = useState(false);

  const [user, setUser] = useState(null);

  const createEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <useContextAuth.Provider
      value={{
        createEmailPassword,
        signInEmailPassword,
        logout,
        user,
        showDetailsInvoice,
        setShowDetailsInvoice,
      }}
    >
      {children}
    </useContextAuth.Provider>
  );
}

export const CTXAuth = () => {
  return useContext(useContextAuth);
};

export default ContextProviderAuth;
