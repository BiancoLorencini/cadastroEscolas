import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './App.module.css'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [popUp, setPopUp] = useState(false)
  const navigate = useNavigate()
  const [cadastroEmail, setCadastroEmail] = useState('')
  const [cadastroPassword, setCadastroPassword] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/login');
      const users = response.data;
      const user = users.find(user => user.cadastroEmail === email && user.cadastroPassword === password);
      if (user) {
        console.log('Login bem-sucedido:', user);
        navigate('/escola');
      } else {
        toast.error('Email ou senha inválidos');
        console.log('Email ou senha inválidos', user);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setError('Erro ao realizar login');
    }
  };

  const handleCadastrar = async () => {
    event.preventDefault();
    const novoCadastro = { cadastroEmail, cadastroPassword };
    try {
      const response = await axios.post('http://localhost:3001/login', novoCadastro)
      console.log(response.data)
      toast.success('Cadastrado com sucesso!')
      setCadastroEmail('')
      setCadastroPassword('')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao cadastrar usuário')
    }
    setPopUp(!popUp)
  }

  const cadastrar = () => {
    setPopUp(!popUp)
  }

  return (
    <div className={style.mainContainer}>
      <header className={style.header}>
        <h1 className={style.title}>Cadastro Escolas</h1>
      </header>
      <section className={`${style.sectionLogin} ${popUp ? style.fadeInBottom : ''}`} >
        <h2>Login</h2>
        <div className={style.inputContainer}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <a href="#" onClick={cadastrar}>Não possui uma conta?</a>
        <button onClick={handleLogin}>Entrar</button>
      </section>

      {popUp && (
        <div className={style.popUp}>
          <h2>Cadastre-se</h2>
          <div className={style.inputContainer}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={cadastroEmail} onChange={(e) => setCadastroEmail(e.target.value)} />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" value={cadastroPassword} onChange={(e) => setCadastroPassword(e.target.value)} />
          </div>
          <div className={style.inputButtonContainer}>
            <button onClick={cadastrar}>Voltar</button>
            <button onClick={handleCadastrar}  >Cadastrar</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
    
  
}

export default App
