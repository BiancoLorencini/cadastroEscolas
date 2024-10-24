import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './formaCadastroTurma.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormCadastroTurma = ({ onSubmit, onCancel }) => {
  const [nomeEscola, setNomeEscola] = useState('');
  const [nomeTurma, setNomeTurma] = useState('');
  const [escolas, setEscolas] = useState([]);

  useEffect(() => {
    async function fetchEscolas() {
      try {
        const response = await axios.get('http://localhost:3001/escolas');
        setEscolas(response.data);
      } catch (error) {
        console.error('Erro ao buscar escolas:', error);
      }
    }

    fetchEscolas();
  }, [ escolas]);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ nomeEscola, nomeTurma });
    setNomeEscola('');
    setNomeTurma('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.inputContainer}>
        <label htmlFor="nomeEscola">Nome da Escola:</label>
        <select className={style.select} name="nomeEscola" id="" value={nomeEscola} onChange={(e) => setNomeEscola(e.target.value)} >
          <option value="">Selecione...</option>
          {escolas.map((escola) => (
            <option key={escola.id} value={escola.nome}>
              {escola.nome}
            </option>
          ))}
        </select>
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="nomeTurma">Nome da Turma:</label>
        <input 
          type="text" 
          id="nomeTurma" 
          value={nomeTurma} 
          onChange={(e) => setNomeTurma(e.target.value)} 
          required 
          placeholder="Digite o nome da turma" 
        />
      </div>
      <div className={style.buttonContainer}>
        <button type="button" onClick={onCancel}>Fechar</button>
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  );
};

export default FormCadastroTurma;
