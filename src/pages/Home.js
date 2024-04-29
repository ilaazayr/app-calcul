import React, {useContext} from 'react';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom'
export default function Home() {

const {currentUser} = useContext(UserContext)

  return (
    <div className="container p-5">
        <h1 className="display-2">
            
            {currentUser ?  <div className="container p-5">
        <h1 className="display-2">
            <div className='container p-5'>
      <Link to="/private/contrat" className='navBar-brand'>
      <div className=''>
      <h1 >Mes contrats</h1>
          <div>Consulté, modifier, ajouter ou supprimer vos contracts depuis l’onglet mes contrats en toute simplicité</div>
      </div>
      </Link>
      <Link to="/private/calcul" className='navBar-brand'>
      <div className=''>
      <h1 >Mes calculs</h1>
          <div>Calculé simplement vos salaires
avec votre formulaire</div>
      </div>
      </Link>
      <Link to="/private/compte" className='navBar-brand'>
      <div className=''>
      <h1 >Mon compte</h1>
          <div>Consulté, modifier ou supprimer
votre porfil quand vous le souhaitez</div>
      </div>
      </Link>
    </div> 
        </h1>
    </div> : "Bonjour, connectez-vous ou inscrivez-vous pour faire vos calculs" }
        </h1>
    </div>
  )
}
