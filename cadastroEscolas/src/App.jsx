import { useState } from 'react'
import style from './App.module.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/loginForm/loginForm'
import SignUpForm from './components/signUpForm/signUpForm'


function App() {
  const [popUp, setPopUp] = useState(false)
  
  const cadastrar = () => {
    setPopUp(!popUp)
  }

  return (
    <div className={style.mainContainer}>
      <header className={style.header}>
        <h1 className={style.title}>Cadastro Escolas</h1>
      </header>
      <section className={`${style.sectionLogin} ${popUp ? style.fadeInBottom : ''}`} >
        <LoginForm />
        <a href="#" onClick={cadastrar}>Não possui uma conta?</a>
      </section>
      {popUp && (
        <div className={style.popUp}>
          <SignUpForm closePopup={cadastrar} />
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default App
