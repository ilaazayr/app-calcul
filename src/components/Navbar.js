import React, {useContext} from 'react'
import { UserContext } from '../context/userContext'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'
import "../css/Nav.css";
import { useState } from 'react'
import {Icon} from 'react-icons-kit'
import {menu} from 'react-icons-kit/feather/menu'
import {x} from 'react-icons-kit/feather/x'

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


    const [toggle, setToggle]=useState(false);

    const toggleSign =()=>{
        toggleModals("signUp");
        handleToggle();
    }

    const toggleSignIn =()=>{
        toggleModals("signIn");
        handleToggle();
    }
  const handleToggle=()=>{
    setToggle(!toggle);
  }
    if(!currentUser){
        return (
            <nav className={toggle?'navbar expanded':'navbar'}>
             <h2 className='logo'>AssitCalcul</h2>
        <div className='toggle-icon' onClick={handleToggle}>
          {toggle?<Icon icon={x} size={28}/>:<Icon icon={menu} size={28}/>}
        </div>

        <ul className='links'>
        <li className="nav-item active">
        <a onClick={toggleSign} className='btnConnection'>S'inscrire</a>
        </li>
        <li className="nav-item active">
        <a onClick={toggleSignIn} className='btnConnection'>Se connecter</a>
        </li></ul></nav>
            
          )
    }
    if(currentUser){
        return (
            
            <nav className={toggle?'navbar expanded':'navbar'}>
             <h2 className='logo'><Link to="/private/private-home" className="nav-link" onClick={handleToggle}>AssitCalcul</Link></h2>
        <div className='toggle-icon' onClick={handleToggle}>
          {toggle?<Icon icon={x} size={28}/>:<Icon icon={menu} size={28}/>}
        </div>
     
      <ul className='links'>
        
        <li className="nav-item">
        <Link to="/private/contrat" className="nav-link" onClick={handleToggle}>
        Mes Contrats
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/private/calcul" className="nav-link" onClick={handleToggle}>
        Mon calcul
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/private/compte" className="nav-link" onClick={handleToggle}>
            Mon compte
        </Link>
        </li>
       
        <li className="nav-item">
            <a onClick={logOut}>
                Se déconnecter
            </a></li>
        </ul>
        
            </nav>
            
   
          )
    }
 
}
