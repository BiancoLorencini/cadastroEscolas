import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import style from './signUpForm.module.css';

const SignUpForm = ({ closePopup }) => {
  const [cadastroEmail, setCadastroEmail] = useState('');
  const [cadastroPassword, setCadastroPassword] = useState('');

  const handleCadastrar = async (event) => {
    event.preventDefault();
    const novoCadastro = { cadastroEmail, cadastroPassword };
    try {
      const response = await axios.post('http://localhost:3001/login', novoCadastro);
      console.log(response.data);
      toast.success('Cadastrado com sucesso!');
      setCadastroEmail('');
      setCadastroPassword('');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao cadastrar usuário');
    }
    closePopup();
  };

  return (
    <form className={style.cadastroContainerPopUp} onSubmit={handleCadastrar}>
      <h2>Cadastre-se</h2>
      <div className={style.inputContainer}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={cadastroEmail} onChange={(e) => setCadastroEmail(e.target.value)} required />
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" value={cadastroPassword} onChange={(e) => setCadastroPassword(e.target.value)} required />
      </div>
      <div className={style.inputButtonContainer}>
        <button onClick={closePopup}>Voltar</button>
        <button type='submit'>Cadastrar</button>
      </div>
    </form>
  );
};

export default SignUpForm;
