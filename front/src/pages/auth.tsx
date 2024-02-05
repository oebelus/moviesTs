import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './identification/login'
import Register from './identification/register'
import Password from './identification/password'

interface AuthProps {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    authenticated: boolean,
}

export default function Auth({visible, setVisible}: AuthProps) {
    const [number, setNumber] = useState("0")
    const nav = useNavigate()

    useEffect(() => {
        console.log(number);
      }, [number]);

    const crossClick = () => {
        setVisible(false);
        nav('/')
    }

    const registerButton = () => {
        setNumber("1")
    }

    const passwordButton = () => {
        setNumber("2")
    }

    const goLogin = () => {
        setNumber("0")
    }

    return(
        <div>
            <Modal 
                className="modal-thing"
                isOpen={visible}
                ariaHideApp={false}
                style={{
                    overlay: {
                      position: 'fixed',
                      backgroundColor: 'transparent'
                    },
                    content: {
                      position: 'absolute',
                      top: '10%',
                      left: '30%',
                      right: '30%',
                      bottom: '10%',
                      border: '1px solid #191919',
                      background: '#191919',
                      WebkitOverflowScrolling: 'touch',
                      padding: '20px',
                      borderRadius: '10px',
                      height: 'fit-content'
                    }
                  }}    
            >
                <div className='cross' onClick={crossClick}>x</div>
                {number === "0" ? 
                <Login registerButton={registerButton} passwordButton={passwordButton}/> 
                : number === "1" ? 
                <Register goLogin={goLogin}/>
                : number === "2" ? 
                <Password goLogin={goLogin}/>
                : null}
            </Modal>
        </div>
    )
}