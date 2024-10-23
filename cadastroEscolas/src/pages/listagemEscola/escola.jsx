import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from './escola.module.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Escola = () => {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popUpCadastro, setPopUpCadastro] = useState(false);
  const [popUpTurma, setPopUpTurma] = useState(false)
  const [turmas, setTurmas] = useState([]);
  const [escola, setEscola] = useState({});
  const [endereco, setEndereco] = useState({});

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

  const cadastrarNovaEscola = async (event) => {
    event.preventDefault();
    const novaEscola = {
      nome: escola,
      endereco: endereco,      
    };
    try {
      const response = await axios.post('http://localhost:3001/escolas', novaEscola);
      setEscolas([...escolas, response.data]);
      setPopUpCadastro(false);
      toast.success('Escola cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar escola:', error);
      toast.error('Erro ao cadastrar escola');
    }
  }

  useEffect(() => {
    fetchEscolas();
  }, [escolas]);

  const openPopUp = () => {
    setPopUpCadastro(!popUpCadastro);
  };


  if (loading) {
    return <p>Carregando...</p>; 
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
                {escola.turmas && escola.turmas.map((turma) => (
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
        <button >Cadastrar turma</button>
      </div>
      {popUpCadastro && (
        <div className={style.escolaPopUp}>
          <div className={style.escolaPopUpContainer}>
            <h2>Cadastro de escola</h2>
            <form onSubmit={cadastrarNovaEscola}>
              <div className={style.inputContainer}>
                <label htmlFor="nome">Nome da Escola:</label>
                <input type="text" id="nome" onChange={(event) => setEscola(event.target.value)} required />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="endereco">Endereço da Escola:</label>
                <input type="text" id="endereco" onChange={(event) => setEndereco(event.target.value)}  required />
              </div>
              <div className={style.buttonContainer}>
                <button type="button" onClick={openPopUp}>Fechar</button>
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
    </>
  )
}

export default Escola
