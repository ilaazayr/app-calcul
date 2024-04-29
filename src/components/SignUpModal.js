
import React, {useContext, useRef, useState} from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function SignUpModal() {
    const {modalState, toggleModals, signUp} = useContext(UserContext);

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
        

        if((inputs.current[1].value.length || inputs.current[2].value.length)<6){
            setValidation ("6 characters min")
            return;
        }

        else if((inputs.current[1].value.length !== inputs.current[2].value.length)){
            setValidation ("password do not match")
            return;
        }

        try{
            await signUp(
                inputs.current[0].value,
                inputs.current[1].value
            )

            formRef.current.reset();
            setValidation("");
            toggleModals("close")
            navigate("/private/private-home")
        }catch (err){
            if(err.code === "auth/invalid-email"){
                setValidation("pas bon format email");
            }
            if(err.code === "auth/email-already-in-use"){
                setValidation("cette email est déjà use");
            }
            
        }
    }

    const closeModal = () => {
        setValidation("")
        toggleModals("close")
    }

  return (
    <>

    {modalState.signUpModal && (

    
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
                            <h5 className="modal-title">S'inscrire</h5>
                            <button onClick={closeModal} className='btn-close'></button>
                        </div>

                        <div className='modal-body'>
                            <form  ref={formRef} onSubmit={handleForm} className='sign-up-form'>
                                <div className='inputStyle'>
                                    <label className='form-label'  htmlFor='signUpEmail'>Adresse mail</label>
                                    <input 
                                        className='inputDesign'
                                        ref={addInputs}
                                        name="email" 
                                        type='email' 
                                        required 
                                        id='signUpEmail'>
                                    </input>
                                </div>
                                <div className='inputStyle'>
                                    <label className='form-label'  htmlFor='signUpPwd'>Mot de passe</label>
                                    <input 
                                        className='inputDesign'
                                        ref={addInputs}
                                        name="pwd" 
                                        type='password' 
                                        required 
                                        id='signUpPwd'>
                                    </input>
                                </div>
                                <div className='inputStyle'>
                                    <label className='form-label' htmlFor='repeatPwd'>Confirmation mot de passe</label>
                                    <input 
                                        className='inputDesign'
                                        ref={addInputs}
                                        name="pwd" 
                                        type='password' 
                                        required 
                                        id='repeatPwd'>
                                    </input>
                                </div>
                                <p className='text-danger mt-1'>{validation}</p>
                                <button className='btnMot'>S'inscrire</button>
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
