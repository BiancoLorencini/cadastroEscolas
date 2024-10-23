import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from './escola.module.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Escola = () => {
  const navigate = useNavigate();
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popUpCadastro, setPopUpCadastro] = useState(false);
  const [popUpTurma, setPopUpTurma] = useState(false)
  const [escola, setEscola] = useState({});
  const [nomeEscola, setNomeEscola] = useState('');
  const [nomeTurma, setNomeTurma] = useState('');
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

  const handleAdicionarTurma = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/escolas');
      const escolas = response.data;
      const escola = escolas.find((e) => e.nome.toLowerCase() === nomeEscola.toLowerCase());
      if (escola) {
        const novaTurma = {
          id: escola.turmas ? escola.turmas.length + 1 : 1, 
          nome: nomeTurma
        };
        escola.turmas = escola.turmas ? [...escola.turmas, novaTurma] : [novaTurma];
        await axios.put(`http://localhost:3001/escolas/${escola.id}`, escola);
        toast.success('Turma adicionada com sucesso!');
        setNomeTurma('');
        setPopUpTurma(false);
      } else {
        toast.error('Escola não encontrada');
        setNomeEscola('');
        setNomeTurma('');
      }
    } catch (error) {
      console.error('Erro ao adicionar turma:', error);
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


  const openPopUpTurma = () => {
    setPopUpTurma(!popUpTurma);
  };

  const navigateLogin = () => {
    navigate('/');
  };


  if (loading) {
    return <p>Carregando...</p>; 
  }

  return (
    <>
    <div className={style.escolaContainer}>
      <div className={style.escolaListagem}>
        <h1>Listagem de Escolas e Turmas</h1>
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
        <button onClick={navigateLogin}>Voltar</button>
        <button onClick={openPopUp}>Cadastrar Escola</button>
        <button onClick={openPopUpTurma} >Cadastrar Turma</button>
      </div>

      {popUpTurma && (
        <div className={style.escolaPopUp}>
          <div className={style.escolaPopUpContainer}>
            <h2>Cadastro de turma</h2>
            <form onSubmit={handleAdicionarTurma}>
              <div className={style.inputContainer}>
                <label htmlFor="nome">Nome da Escola:</label>
                <input type="text" id="nome" value={nomeEscola} onChange={(event) => setNomeEscola(event.target.value)} required />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="nome">Nome da Turma:</label>
                <input type="text" id="nome" value={nomeTurma} onChange={(event) => setNomeTurma(event.target.value)} required />
              </div>
              <div className={style.buttonContainer}>
                <button type="button" onClick={openPopUpTurma}>Fechar</button>
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {popUpCadastro && (
        <div className={style.escolaPopUp}>
          <div className={style.escolaPopUpContainer}>
            <h2>Cadastro de escola</h2>
            <form onSubmit={cadastrarNovaEscola}>
              <div className={style.inputContainer}>
                <label htmlFor="nome">Nome da Escola:</label>
                <input type="text" id="nome" onChange={(event) => setEscola(event.target.value)} required placeholder='Digite o nome da escola' />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="endereco">Endereço da Escola:</label>
                <input type="text" id="endereco" onChange={(event) => setEndereco(event.target.value)} placeholder='Digite o endereço da escola'  required />
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
