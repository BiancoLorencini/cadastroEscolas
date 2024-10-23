import React, { useState } from 'react';
import style from './formCadastroEscola.module.css';

const FormCadastroEscola = ({ onSubmit, onCancel }) => {
  const [escola, setEscola] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ escola, endereco });
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h2>Cadastro da Escola</h2>
      <div className={style.inputContainer}>
        <label htmlFor="escola">Nome da Escola:</label>
        <input 
          type="text" 
          id="escola" 
          value={escola} 
          onChange={(e) => setEscola(e.target.value)} 
          required 
          placeholder="Digite o nome da escola" 
        />
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="endereco">Endereço da Escola:</label>
        <input 
          type="text" 
          id="endereco" 
          value={endereco} 
          onChange={(e) => setEndereco(e.target.value)} 
          required 
          placeholder="Digite o endereço da escola" 
        />
      </div>
      <div className={style.buttonContainer}>
        <button type="button" onClick={onCancel}>Fechar</button>
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  );
};

export default FormCadastroEscola;
