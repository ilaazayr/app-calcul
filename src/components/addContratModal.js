
import React, {useContext, useRef, useState} from "react";
import { UserContext } from "../context/userContext";
export default function addContratModal() {
  return (
    <div>addContratModal</div>
  )
}





export default function SignInModal() {
    const {modalState, toggleModals, addIn} = useContext(UserContext);


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
                    <div className='modal-content bg-light text-center'>
                    <div className="modal-header">
                            <h5 className="modal-title">Sign Up</h5>
                            <button onClick={closeModal} className='btn-close'></button>
                        </div>

                        <div className='modal-body'>
                            <form  ref={formRef} onSubmit={handleForm} className='sign-in-form'>
                                <div className='mb-3'>
                                    <label className='form-label'  htmlFor='signInEmail'>Email Adress</label>
                                    <input 
                                        ref={addInputs}
                                        name="email" 
                                        type='email' 
                                        required 
                                        className='form-control' 
                                        id='signInEmail'>
                                    </input>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'  htmlFor='signInPwd'>PassWord</label>
                                    <input 
                                        ref={addInputs}
                                        name="pwd" 
                                        type='password' 
                                        required 
                                        className='form-control' 
                                        id='signInPwd'>
                                    </input>
                                </div>
                               
                                <p className='text-danger mt-1'>{validation}</p>
                                <button className='btn btn-primary'>Submit</button>
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
