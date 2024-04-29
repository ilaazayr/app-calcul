
import React, {useContext, useRef, useState} from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function SignInModal() {
    const {modalState, toggleModals, signIn} = useContext(UserContext);

    const navigate = useNavigate();

    const [validation, setValidation] = useState("")

    const inputs =  useRef([])
    const addInputs = el => {
        if(el && !inputs.current.includes(el)){
            inputs.current.push(el)
        }
    }

    const formRef = useRef();



    const handleForm = async (e) => {
        e.preventDefault()

        try{
            await signIn(
                inputs.current[0].value,
                inputs.current[1].value
            )

            formRef.current.reset();
            setValidation("");
            toggleModals("close")
            navigate("/private/private-home")
        }catch{
            setValidation("mail ou password incorrect")
        }
    }

    const closeModal = () => {
        setValidation("")
        toggleModals("close")
    }

  return (
    <>

    {modalState.signInModal && (

    
    <div className='position-fixed top-0 vw-100 vh-100'>
        <div onClick={closeModal} className='w-100 h-100 bg-dark bg-opacity-75'>
            
        </div><div 
                className=" position-absolute top-50 start-50 
                translate-middle"
                style={{ minWidth:"400px" }}
            >
                <div className='modal-dialog'>
                    <div className='modal-content  contenuPopup'>
                    <div className="modal-header">
                            <h5 className="modal-title">Se connecter</h5>
                            <button onClick={closeModal} className='btn-close'></button>
                        </div>

                        <div className='modal-body'>
                            <form  ref={formRef} onSubmit={handleForm} className='sign-in-form'>
                                
                                <div className='inputStyle'>
                                    <label className='form-label'  htmlFor='signInEmail'>Adresse mail</label>
                                    <input 
                                        ref={addInputs}
                                        name="email" 
                                        type='email' 
                                        required 
                                        className='inputDesign' 
                                        id='signInEmail'>
                                    </input>
                                </div>
                                <div className='inputStyle'>
                                    <label className='form-label'  htmlFor='signInPwd'>Mot de passe</label>
                                    <input 
                                        ref={addInputs}
                                        name="pwd" 
                                        type='password' 
                                        required 
                                        className='inputDesign' 
                                        id='signInPwd'>
                                    </input>
                                </div>
                               
                                <p className='text-danger mt-1'>{validation}</p>
                                <button className='btnMot'>Se connecter</button>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        
    </div>
    )}
    </>
  )
}
