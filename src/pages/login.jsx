import LoginComponent from '../components/loginComponent';
import CreateComponent from '../components/createComponent';
import PopUpComponent from '../components/popUpComponent';
import { useState } from 'react';

function Login() {
  const [toggle, setToggle] = useState(true)
  const [popUp, setPopUp] = useState(false);


  return (
    <>
      <div className="w-full h-screen flex px-20  flex-col justify-center  items-center">


        {toggle ? <CreateComponent setPopUp={setPopUp} /> : <LoginComponent />}

        {/*  */}
        <div className='text-start  mt-3 w-1/2 px-33'>

          <button onClick={() => setToggle(!toggle)} className='text-blue-400 cursor-pointer'>{toggle ? "have an accout ?" : "dont have account ?"}</button>
        </div>


      </div>
      {
        popUp && <PopUpComponent setPopUp={setPopUp} />
      }
    </>
  )
}

export default Login
