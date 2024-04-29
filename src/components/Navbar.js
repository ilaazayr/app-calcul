import React, {useContext} from 'react'
import { UserContext } from '../context/userContext'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'
import "../css/Nav.css";

export default function Navbar() {

    const {currentUser} = useContext(UserContext)
    
    const {toggleModals} = useContext(UserContext);

    const navigate = useNavigate();

    const logOut = async () => {
        try{
            await signOut(auth)
            navigate("/")
        }catch{
            alert("for some resaons we can't deconnect, please check your internet connexion and retry")
        }
        window.location.reload();

    }
    if(!currentUser){
        return (
            <nav className ="navbar ">
       
        
        <div className='BtnAccueil'>
            <button onClick={() => toggleModals("signUp")} className='btnConnection'>
                S'inscrire
            </button>
            <button onClick={() => toggleModals("signIn")} className='btnConnection'>
                Se connecter
            </button>
        </div>
            </nav>
          )
    }
    if(currentUser){
        return (
    <nav className ="navbar navbar-expand-lg bg-body-tertiar">
      <div className="container-fluid">
      <a className="navbar-brand" href="#">Nounou</a>
    <div className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </div>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
        <Link to="/private/private-home" className="nav-link">
        Accueil
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/private/contrat" className="nav-link">
        Mes Contrats
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/private/calcul" className="nav-link">
        Mon calcul
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/private/compte" className="nav-link">
            Mon compte
        </Link>
        </li>
       
        <li className="nav-item">
            <button onClick={logOut} className='btn deco ms-2'>
                Se déconnecter
            </button></li>
        </ul>
        </div>
        
        </div>
            </nav>
          )
    }
 
}
