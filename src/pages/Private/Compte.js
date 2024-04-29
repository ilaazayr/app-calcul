import React, {useRef, useState} from 'react'
import { getAuth, updatePassword } from "firebase/auth";
import "../../css/Compte.css";
export default function Compte() {

const auth = getAuth();

const user = auth.currentUser;

const [validation, setValidation] = useState("")

const inputs =  useRef([])
const addInputs = el => {
    if(el && !inputs.current.includes(el)){
        inputs.current.push(el)
    }
}

const formRef = useRef();
const handleForm = async (e) => {
  
const newPassword = document.getElementById('nouveauMdp').value;
  e.preventDefault()

 if((inputs.current[0].value.length<6)){
      setValidation ("nouveau mot de passe trop court")
      return;
  }

  try{
      await updatePassword(user, newPassword).then(() => {
        setValidation ("nouveau mot de passe prit en compte")
      }).catch((error) => {
        
      });

      formRef.current.reset();
      setValidation("");
  }catch (err){
      
      
  }
}


  return (
    <div className='blockCentre'>
      
      
    <div className='contenuBlock'>
        <h1>Information de mon compte</h1>
        <form  ref={formRef} onSubmit={handleForm} className='sign-up-form'>
        <div className='inputStyle'> 
        <label className='form-label'  htmlFor='Mail'>Adresse mail</label>
          <input 
                  className='inputDesign'
                  value={user.email}
                  readOnly="readonly"
                  type="mail"
                  name="mail" 
                  id="monMail"/>
        </div>
        <br></br>
        <div className='inputStyle'>
        <label className='form-label'  htmlFor='nouveauPassword'>Nouveau mot de passe</label>
          <input  ref={addInputs}
                  className='inputDesign'
                  type="password"
                  name="New Password" 
                  id="nouveauMdp"/>
        </div>
        
        
       
                  <p className='text-danger mt-1'>{validation}</p>
          <button className='btnMot'>
              Enregistrer
          </button>
        </form>
       
    </div></div>
  )
}
