import React from 'react'
import { Link } from 'react-router-dom'
export default function PrivateHome() {
  return (
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
  )
}
