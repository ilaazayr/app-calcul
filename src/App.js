import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignUpModal from "./components/SignUpModal";
import Private from "./pages/Private/Private";
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome";
import SignInModal from "./components/SignInModal";
import Calcul from "./pages/Private/Calcul";
import Contrat from "./pages/Private/Contrat";
import Compte from "./pages/Private/Compte";
function App() {
  return (
    <div>
      
      <SignUpModal/>
      <SignInModal/>
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/private" element = {<Private/>}>
          
          <Route path="/private/private-home" element = { <PrivateHome />}/>
          <Route path="/private/calcul" element = { <Calcul />}/>
          <Route path="/private/compte" element = { <Compte />}/>
          <Route path="/private/contrat" element = { <Contrat />}/>
        </Route>
      </Routes>
    </div>
    
  );
}

export default App;
