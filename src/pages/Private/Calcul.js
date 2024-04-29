import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { db } from '../../firebase-config'; 
import "../../css/Cacul.css";
import { collection, getDocs, query, where} from 'firebase/firestore';

import html2canvas from "html2canvas";
import jsPdf from "jspdf";

export default function Calcul() {
  const {currentUser} = useContext(UserContext);
  const contratsCollectionRef = collection(db, "contrat");
  const contratCollectionRef = query(contratsCollectionRef, where ("mail", "==", currentUser.email))

  const [contrats, setContrat] = useState([]);
  const getContrat = async () =>{
    const data = await getDocs(contratCollectionRef);
    setContrat(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }
  let date1 = new Date();
  let dateLocale = date1.toLocaleString('fr-FR',{
    year: 'numeric',
    month: 'long',
   });
  const [selectedContrat, setSelectedContrat] = useState('');
  const [newNbJour, setNewNbJour] = useState(0)
  const [MonContrat, setMonContrat] = useState([]);

  const contratChoixCollectionRef = query(contratsCollectionRef, where ("name", "==", selectedContrat), where ("mail", "==", currentUser.email))
  const get2Contrat = async () =>{
    
      const data = await getDocs(contratChoixCollectionRef);
      setMonContrat(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      

  }
  
    
  const printPDF = () => {
    const domElement = document.getElementById("contenuBlockCalcul");
    html2canvas(domElement, {
      onclone: document => {
        document.getElementById("print").style.visibility = "hidden";
      }
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf();
      pdf.addImage(imgData, "JPEG", 10, 10);
      pdf.save(`${selectedContrat + " " + dateLocale}.pdf`);
    })
  }

useEffect(() => {
  getContrat();
  get2Contrat();
 
}, [selectedContrat]);
  return (
    <div className='blockCentre contenuBlockCalcul'> 
      <h1>J'effectue mon calcul</h1>
      <div className='selectDesign inputStyle'>
      <div div>selectionner un contrat</div>
        <select className='inputDesign' name="contrat"  defaultValue={"---"} value={selectedContrat}
            onChange={e => setSelectedContrat(e.target.value)}>
              <option>---</option>
          {contrats.map((contrat) => { 
              return <>
              
              <option key={contrat.name} value={contrat.name}>{contrat.name}</option>
              </>
        
          })}
          
          </select> 
        </div>
        <div className='contenuCalcul'>
          
        {MonContrat.map((test) => { 
            return <>
            
            <div className='inputStyle'>
                  <label className='form-label'  htmlFor='HeureBase'>Nombre d'heure semaine</label>
                  <input  
                          className='inputDesign'
                          type="number" 
                          readOnly="readonly"
                          placeholder={test.NbHeureSemaine}
                          required
                          step=".01"
                          />
            </div>
            <div className='inputStyle'>
                  <label className='form-label'  htmlFor='nbSemaine'>Taux horaire</label>
                  <input  
                          className='inputDesign'
                          type="number" 
                          readOnly="readonly"
                          placeholder={test.TauxHoraire}
                          required
                          step="1"
                  />
            </div>
            <div className='inputStyle'>
                  <label className='form-label'  htmlFor='nbJourSemaine'>Frais repas</label>
                  <input  
                          className='inputDesign'
                          type="number" 
                          readOnly="readonly"
                          placeholder={test.FraisRepas}
                          required
                          step=".01"
                          />
            </div>
            <div className='inputStyle'>
                <label className='form-label'  htmlFor='nbJour'>Nombre de jours</label>
                <input  
                        className='inputDesign'
                        type="number"
                        placeholder="nombre heure retiré"
                        required
                        value={newNbJour}
                        onChange={(event) => {
                          setNewNbJour(event.target.value);
                      }}
                        step=".01"
                />
            </div>
            <div className='inputStyle'>
                  <label className='form-label'  htmlFor='FraisRepas'>Mensualisation</label>
                  <input  
                          className='inputDesign'
                          type="number" 
                          readOnly="readonly"
                          placeholder={((test.TauxHoraire*test.NbHeureSemaine*test.NbSemaine)/12).toFixed(2)}
                          required
                          step=".01"
                          />
            </div>
            <div id='contenuBlockCalcul'>
            <div >Mensualisation : {((test.TauxHoraire*test.NbHeureSemaine*test.NbSemaine)/12).toFixed(2)}</div>
            <div >Nombre d'heure par semaines : {test.NbHeureSemaine}</div>
            <div >Nombre de jours :{newNbJour}</div>
            <div >Frais x Nombre de jours :{test.frais} x {newNbJour} = {test.frais*newNbJour}</div>
            <div className='form-label'>Total :{((test.TauxHoraire*test.NbHeureSemaine*test.NbSemaine)/12).toFixed(2)} + {test.frais*newNbJour} = {((test.TauxHoraire*test.NbHeureSemaine*test.NbSemaine)/12 + test.frais*newNbJour).toFixed(2)}</div>
            </div>
            
            
            <button id="print" onClick={printPDF} className='btnMot'>Envoyer</button>  
                 
            </>
        })}
        </div> 
    </div>
  )
}
