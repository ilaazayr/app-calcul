import React, { useEffect } from "react";

import { createContext, useState } from "react";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"

import { auth } from "../firebase-config";

export const UserContext = createContext()

export function UserContextProvider(props) {

    
  
    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)
    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)

    const [currentUser, setCurrentUser] = useState();
    const [loadingData, setLoadinData] = useState(true);

    useEffect(() => {

      const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        setCurrentUser(currentUser)
        setLoadinData(false)
      })

      return unsubscribe;

    }, [])


  // modal
  const [modalState, setModalState] = useState({
    signUpModal: false,
    signInModal: false
  })

  const toggleModals = modal => {
    if(modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true
      })
    }
    if(modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false
      })
    }
    if(modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false
      })
    }
  }

   // modalContrat
   const [modalContratState, setModalContratState] = useState({
    addContratModal: false,
    updateContratModal: false
  })

  const toggleModalsContrat = modal => {
    if(modal === "add") {
      setModalContratState({
        addContratModal: true,
        updateContratModal: false
      })
    }
    if(modal === "update") {
      setModalContratState({
        addContratModal: false,
        updateContratModal: true
      })
    }
    if(modal === "close") {
      setModalContratState({
        addContratModal: false,
        updateContratModal: false
      })
    }
  }

  return (
    <UserContext.Provider value={{modalState,modalContratState, toggleModals,toggleModalsContrat, signUp, currentUser, signIn}}>
      {!loadingData && props.children}
    </UserContext.Provider>
  )
}