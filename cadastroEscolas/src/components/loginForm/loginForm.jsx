import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from './loginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        setPassword('');
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  return (
    <form className={style.form} onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className={style.inputContainer}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;

