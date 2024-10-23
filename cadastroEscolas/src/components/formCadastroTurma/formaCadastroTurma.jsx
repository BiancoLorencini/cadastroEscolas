import React, { useEffect, useState } from 'react';
import style from './formaCadastroTurma.module.css';

const FormCadastroTurma = ({ onSubmit, onCancel }) => {
  const [nomeEscola, setNomeEscola] = useState('');
  const [nomeTurma, setNomeTurma] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ nomeEscola, nomeTurma });
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.inputContainer}>
        <label htmlFor="nomeEscola">Nome da Escola:</label>
        <input 
          type="text" 
          id="nomeEscola" 
          value={nomeEscola} 
          onChange={(e) => setNomeEscola(e.target.value)} 
          required 
          placeholder="Digite o nome da escola" 
        />
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
