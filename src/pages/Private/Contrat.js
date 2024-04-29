import React, { useState, useRef, useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { db } from '../../firebase-config'; 
import "../../css/Contrat.css";
import { collection, getDocs, addDoc, updateDoc, doc, query, where, deleteDoc} from 'firebase/firestore'
export default function Contrat() {

    const {currentUser, modalContratState, toggleModalsContrat} = useContext(UserContext);
    
    
    //pour modal ajout
    const [newName, setNewName] = useState("")
    const [newFraisEntretien, setNewFraisEntretien] = useState(0)
    const [newNbSemaine, setNewNbSemaine] = useState(0)
    const [newNbHeureSemaine, setNewNbHeureSemaine] = useState(0)
    const [newTauxHoraire, setNewTauxHoraire] = useState(0)
    const [newFraisRepas, setNewFraisRepas] = useState(0)

    //pour modal modif
   
    const [id, setId] = useState('')
    const formRef = useRef();

    const [contrats, setContrat] = useState([]);
    const contratsCollectionRef = collection(db, "contrat");
    const contratCollectionRef = query(contratsCollectionRef, where ("mail", "==", currentUser.email))
    const createContrat = async () => {
        try{
        await addDoc(contratsCollectionRef, {   
            name: newName, 
            frais: Number(newFraisEntretien),
            NbSemaine: Number(newNbSemaine), 
            NbHeureSemaine: Number(newNbHeureSemaine), 
            TauxHoraire: Number(newTauxHoraire),
            FraisRepas: Number(newFraisRepas),    
            mail:currentUser.email});

            window.location.reload();
        }catch (err){
            console.error("createContrat failed. reason :", err)
        }
        
    }
    
   

    const deleteContrat = async (id) => {
        await deleteDoc(doc(db, "contrat", id));
        getContrat();
    }

        const getContrat = async () =>{
            const data = await getDocs(contratCollectionRef);
            setContrat(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        useEffect(() => {
            getContrat();
            //updateContrat()
          }, []);

    const inputs =  useRef([])
    const addInputs = el => {
        if(el && !inputs.current.includes(el)){
            inputs.current.push(el)
        }
    }
    const [validation, setValidation] = useState("")

    const closeModal = () => {
        
        setValidation("")
        toggleModalsContrat("close")
    }


    const [show, setShow] = useState(false)
    const handleEdit = async (id, name, frais, NbSemaine, NbHeureSemaine, TauxHoraire, FraisRepas) =>{
        setNewName(name)
        setNewFraisEntretien(frais)
        setNewNbSemaine(NbSemaine)
        setNewNbHeureSemaine(NbHeureSemaine)
        setNewTauxHoraire(TauxHoraire)
        setNewFraisRepas(FraisRepas)
        
        setId(id)
        setShow(true)
        toggleModalsContrat("update")
    }

   
    const handleUpdate = async() => {
        const updateData = doc(db, "contrat", id)
        await updateDoc(updateData,{name:newName, frais: newFraisEntretien,NbSemaine:newNbSemaine, NbHeureSemaine:newNbHeureSemaine, TauxHoraire:newTauxHoraire, FraisRepas:newFraisRepas})
        window.location.reload();
    }

  return (

    <div >
        {modalContratState.addContratModal && (
            <div className='position-fixed top-0 vw-100 vh-100'>
            <div onClick={closeModal} className='w-100 h-100 bg-dark bg-opacity-75'>
                
            </div><div 
                    className=" position-absolute top-50 start-50 
                    translate-middle"
                    style={{ minWidth:"400px" }}
                >
                    <div className='modal-dialog'>
                        <div className='modal-content contenuPopup'>
                        
    
                            <div className="modal-header">
                                <h3 className="modal-title">Créer un nouveau contrat</h3>
                                <button onClick={closeModal} className='btn-close'></button>
                            </div>
                            <div className='modal-body'>
                                    <div className='inputStyle'>
                                        <label className='form-label'  htmlFor='Nom'>Nom</label>
                                        <input  
                                                ref={addInputs}
                                                className='inputDesign'
                                                placeholder="Nom..." 
                                                required
                                                onChange={(event) => {
                                                    setNewName(event.target.value);
                                                }}/>
                                        
                                        
                                    </div>
                                    <div className='inputStyle'>
                                        <label className='form-label'  htmlFor='FraisEntretien'>Frais d'entretien</label>
                                        <input  
                                                className='inputDesign'
                                                ref={addInputs}
                                                type="number" 
                                                placeholder="Frais entretien"
                                                required
                                                onChange={(event) => {
                                                    setNewFraisEntretien(event.target.value);
                                                }}/>
                                    </div>
                                 
                                    <div className='inputStyle'>
                                        <label className='form-label'  htmlFor='nbSemaine'>Nombre de semaine</label>
                                        <input  
                                                className='inputDesign'
                                                ref={addInputs}
                                                type="number" 
                                                placeholder="Nombre de semaine"
                                                required
                                                onChange={(event) => {
                                                    setNewNbSemaine(event.target.value);
                                                }}/>
                                    </div>
                                    <div className='inputStyle'>
                                        <label className='form-label'  htmlFor='nbHeureSemaine'>Nombre d'heure par semaine</label>
                                        <input  
                                                className='inputDesign'
                                                ref={addInputs}
                                                type="number"
                                                placeholder="nombre d'heure/semaine" 
                                                required
                                                onChange={(event) => {
                                                    setNewNbHeureSemaine(event.target.value);
                                                }}/>
                                        
                                        
                                    </div>
                                    <div className='inputStyle'>
                                        <label className='form-label'  htmlFor='TauxHoraire'>Taux horaire</label>
                                        <input  
                                                className='inputDesign'
                                                ref={addInputs}
                                                type="number" 
                                                placeholder="Taux horaire"
                                                required
                                                onChange={(event) => {
                                                    setNewTauxHoraire(event.target.value);
                                                }}/>
                                    </div>
                                    <div className='inputStyle'>
                                        <label className='form-label'  htmlFor='FraisRepas'>Frais repas</label>
                                        <input  
                                                className='inputDesign'
                                                ref={addInputs}
                                                type="number" 
                                                placeholder="Frais repas"
                                                required
                                                onChange={(event) => {
                                                    setNewFraisRepas(event.target.value);
                                                }}/>
                                    </div>
                                    
                                    <p className='text-danger mt-1'>{validation}</p>
                                    <button onClick={() =>createContrat()} className='btnMot'>Créer</button>
                              
                            </div>
                            </div>
                    </div>
                </div>
            
        </div>
        )}
     { modalContratState.updateContratModal && (
        <div className='text-black position-fixed top-0 vw-100 vh-100'>
        <div onClick={closeModal} className='w-100 h-100 bg-dark bg-opacity-75'>
            
        </div><div 
                className=" position-absolute top-50 start-50 
                translate-middle"
                style={{ minWidth:"400px" }}
            >
                <div className='modal-dialog'>
                    <div className='modal-content contenuPopup'>
                    <div className="modal-header">
                            <h5 className="modal-title">Modifier le contrat: </h5>
                            <button onClick={closeModal} className='btn-close'></button>
                        </div>

                        <div className='modal-body'>
                                <div className='inputStyle'>
                                    <label className='form-label'  htmlFor='NomUpdate'>Nom</label>
                                    <input  
                                            ref={addInputs}
                                            className='inputDesign'
                                            type='text'
                                            id="NomUpdate"
                                            placeholder="Nom..." 
                                            value={newName}
                                            onChange={(event) => {
                                                setNewName(event.target.value);
                                            }}
                                            />
                                    
                                    
                                </div>
                               
                                <div className='inputStyle'>
                                    <label className='form-label'  htmlFor='FraisEntretienUpdate'>Frais d'entretien</label>
                                    <input  

                                            id="FraisEntretienUpdate"
                                            ref={addInputs}
                                            className='inputDesign'
                                            type="number" 
                                            placeholder="Frais entretien"
                                            required
                                            step=".01"
                                            value={newFraisEntretien}
                                            onChange={(event) => {
                                                setNewFraisEntretien(event.target.value);
                                            }}/>
                                </div>
                             
                                <div className='inputStyle'>
                                    <label className='form-label'  htmlFor='nbSemaineUpdate'>Nombre de semaine</label>
                                    <input  
                                            id="nbSemaineUpdate"
                                            ref={addInputs}
                                            className='inputDesign'
                                            type="number" 
                                            placeholder="Nombre de semaine"
                                            value={newNbSemaine}
                                            required
                                            step="1"
                                            onChange={(event) => {
                                                setNewNbSemaine(event.target.value);
                                            }}/>
                                </div>
                               
                                <div className='inputStyle'>
                                    <label className='form-label'  htmlFor='nbHeureSemaineUpdate'>Nombre d'heure par semaine</label>
                                    <input  
                                            id="nbHeureSemaineUpdate"
                                            ref={addInputs}
                                            className='inputDesign'
                                            type="number"
                                            placeholder="nombre d'heure/semaine" 
                                            required
                                            value={newNbHeureSemaine}
                                            step=".01"
                                            onChange={(event) => {
                                                setNewNbHeureSemaine(event.target.value);
                                            }}/>
                                    
                                    
                                </div>
                                <div className='inputStyle'>
                                    <label className='form-label'  htmlFor='TauxHoraireUpdate'>Taux horaire</label>
                                    <input  
                                            id="TauxHoraireUpdate"
                                            ref={addInputs}
                                            className='inputDesign'
                                            type="number" 
                                            placeholder="Taux horaire"
                                            required
                                            value={newTauxHoraire}
                                            step=".01"
                                            onChange={(event) => {
                                                setNewTauxHoraire(event.target.value);
                                            }}/>
                                </div>
                                <div className='inputStyle'>
                                    <label className='form-label'  htmlFor='FraisRepasUpdate'>Frais repas</label>
                                    <input  
                                            id="FraisRepasUpdate"
                                            ref={addInputs}
                                            className='inputDesign'
                                            type="number" 
                                            placeholder="Frais repas"
                                            required
                                            value={newFraisRepas}
                                            step=".01"
                                            onChange={(event) => {
                                                setNewFraisRepas(event.target.value);
                                            }}/>
                                </div>
                                
                                <p className='text-danger mt-1'>{validation}</p>
                                <button onClick={() =>handleUpdate()} className='btnMot'>Modifier</button>
                           
                        </div>
                        
                    </div>
                </div>
            </div>
        
    </div>
    )}  
      
    <div className='blockCentre'>

    
        
      
        <div className="nomEtBouton">
            <h1 id='titre'>Contrat</h1>
            <button className='btnContratAdd' onClick={() => toggleModalsContrat("add")}>Créer un nouveau contrat</button>
        </div>
        
        <div className='gridContrat'>{contrats.map((contrat) => 
            <div className='contrat'>
                <h3>{contrat.name}</h3>
                <hr></hr>
                <div className='prix'>
                    <div>taux horaires</div><div>{contrat.TauxHoraire}€</div> 
                </div>
                <div className='prix'>
                    <div>frais d'entretien</div><div>{contrat.frais}€</div> 
                </div>
                <div className='btnContrat'>
                    <button className='btnContratAddDelete' onClick={() => handleEdit(contrat.id, contrat.name, contrat.frais, contrat.NbSemaine, contrat.NbHeureSemaine, contrat.TauxHoraire, contrat.FraisRepas)}>Modifier</button>
                    <button className='btnContratAddDelete' onClick={() => {deleteContrat(contrat.id)}}>Supprimer</button>
                </div>
                
            </div>
            
        )}
        </div>    
    </div>
    </div>
  )
  
}
