import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from './escola.module.css'
const Escola = () => {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popUpCadastro, setPopUpCadastro] = useState(false);

  const fetchEscolas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/escolas');
      setEscolas(response.data);
      setLoading(false); 
    } catch (error) {
      console.error('Erro ao buscar escolas:', error);
      setLoading(false);
    }
  };

  const cadastrarTurma = async (escolaId, turmaId) => {
    try {
      await axios.post(`http://localhost:3001/escolas/${escolaId}/turmas/${turmaId}`);
      fetchEscolas();
    } catch (error) {
      console.error('Erro ao cadastrar turma:', error);
    }
  };

  useEffect(() => {
    fetchEscolas();
  }, [escolas]);

  const openPopUp = () => {
    setPopUpCadastro(!popUpCadastro);
  };


  if (loading) {
    return <p>Carregando...</p>; // Exibe uma mensagem de carregamento enquanto os dados são carregados
  }

  return (
    <>
    <div className={style.escolaContainer}>
      <div className={style.escolaListagem}>
        <h1>Listagem de Escolas</h1>
        {escolas.length === 0 ? (
          <p>Não há escolas cadastradas.</p>
        ) : (
          escolas.map((escola) => (
            <div className={style.escolaLista} key={escola.id}>
              <div className={style.escolaInfo}>
                <h3>{escola.nome}</h3>
                <p>Endereço: {escola.endereco}</p>
              </div>
              <div className={style.escolaInfo} >
              <h4>Turmas:</h4>
                <ul>
                  {escola.turmas.map((turma) => (
                    <li key={turma.id}>{turma.nome}</li>
                  ))}
                </ul>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
      <div className={style.escolaButtons}>
        <button onClick={() => window.history.back()}>Voltar</button>
        <button onClick={openPopUp}>Cadastrar escola</button>
      </div>

      {popUpCadastro && (
        <div className={style.escolaPopUp}>
          <div className={style.escolaPopUpContainer}>
            <h2>Cadastro de escola</h2>
            <form>
              <div className={style.inputContainer}>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="endereco">Endereço:</label>
                <input type="text" id="endereco" />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="turmas">Turmas:</label>
                <select id="turmas">
                  <option value="">Selecione uma turma</option>
                  <option value="1">1º Ano</option>
                  <option value="2">2º Ano</option>
                  <option value="3">3º Ano</option>
                  <option value="4">4º Ano</option>
                </select>
              </div>
              <div className={style.buttonContainer}>
                <button type="button" onClick={openPopUp}>Fechar</button>
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default Escola
