import React from 'react'
import { Link } from 'react-router-dom'
import '../../../css/accueil.css'
export default function PrivateHome() {
  return (
    <div className='container accueilBlockPresentation'>
      <Link to="/private/contrat" className='navBar-brand'>
      <div className='blockPresentation'>
      <h2 >Mes contrats</h2>
          <div>Consulté, modifier, ajouter ou supprimer vos contracts depuis l’onglet mes contrats en toute simplicité</div>
      </div>
      </Link>
      <Link to="/private/calcul" className='navBar-brand'>
      <div className='blockPresentation'>
      <h2 >Mes calculs</h2>
          <div>Calculé simplement vos salaires
avec votre formulaire</div>
      </div>
      </Link>
      <Link to="/private/compte" className='navBar-brand'>
      <div className='blockPresentation'>
      <h2 >Mon compte</h2>
          <div>Consulté, modifier ou supprimer
votre porfil quand vous le souhaitez</div>
      </div>
      </Link>
    </div>
  )
}
