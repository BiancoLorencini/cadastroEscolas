import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../../pages/listagemEscola/escola.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import lixo from '../../assets/img/lixo.svg'
import FormCadastroEscola from '../../components/formCadastroEscola/formCadastroEscola';
import FormCadastroTurma from '../../components/formCadastroTurma/formaCadastroTurma';
import Popup from '../../components/popUp/popUp';

const Escola = () => {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popUpCadastro, setPopUpCadastro] = useState(false);
  const [popUpTurma, setPopUpTurma] = useState(false);

  useEffect(() => {
    fetchEscolas();
  }, [escolas]);

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

  const handleAdicionarTurma = async ({ nomeEscola, nomeTurma }) => {
    try {
      const response = await axios.get('http://localhost:3001/escolas');
      const escola = response.data.find((e) => e.nome.toLowerCase() === nomeEscola.toLowerCase());
      if (escola) {
        const novaTurma = {
          id: escola.turmas ? escola.turmas.length + 1 : 1,
          nome: nomeTurma,
        };
        escola.turmas = escola.turmas ? [...escola.turmas, novaTurma] : [novaTurma];
        await axios.put(`http://localhost:3001/escolas/${escola.id}`, escola);
        toast.success('Turma adicionada com sucesso!');
        setPopUpTurma(false);
      } else {
        toast.error('Escola não encontrada');
      }
    } catch (error) {
      console.error('Erro ao adicionar turma:', error);
    }
  };

  const cadastrarNovaEscola = async ({ escola, endereco }) => {
    try {
      const response = await axios.post('http://localhost:3001/escolas', { nome: escola, endereco });
      setEscolas([...escolas, response.data]);
      setPopUpCadastro(false);
      toast.success('Escola cadastrada com sucesso!');
      setPopUpCadastro(false);
    } catch (error) {
      console.error('Erro ao cadastrar escola:', error);
      toast.error('Erro ao cadastrar escola');
    }
  };

  const handleDeleteEscola = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/escolas/${id}`);
      setEscolas(escolas.filter((escola) => escola.id !== id));
      toast.success('Escola excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir escola:', error);
      toast.error('Erro ao excluir escola');
    }
  };

  return (
    <>
      <div className={style.escolaContainer}>
        <div className={style.escolaListagem}>
          <h1>Listagem de Escolas</h1>
          {loading ? (
            <p>Carregando...</p>
          ) : escolas.length === 0 ? (
            <p>Não há escolas cadastradas.</p>
          ) : (
            escolas.map((escola) => (
              <div className={style.escolaLista} key={escola.id}>
                <div className={style.escolaInfo}>
                  <div className={style.escolaNome}>
                    <h3>{escola.nome}</h3>
                    <p>Endereço: {escola.endereco}</p>
                  </div>
                  <span className={style.spanDivider}></span>
                  <div className={style.escolaTurmas}>
                    <h4>Turmas:</h4>
                    <ul>
                      {escola.turmas?.map((turma) => (
                        <li key={turma.id}>{turma.nome}</li>
                      ))}
                    </ul>
                  </div>
                  <button><img onClick={() => handleDeleteEscola(escola.id)} className={style.lixo} src={lixo} alt="lixeira" /></button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={style.escolaButtons}>
          <button onClick={() => window.history.back()}>Voltar</button>
          <button onClick={() => setPopUpCadastro(true)}>Cadastrar Escola</button>
          <button onClick={() => setPopUpTurma(true)}>Cadastrar Turma</button>
        </div>

        <Popup isOpen={popUpCadastro} onClose={() => setPopUpCadastro(false)}>
          <FormCadastroEscola onSubmit={cadastrarNovaEscola} onCancel={() => setPopUpCadastro(false)} />
        </Popup>

        <Popup isOpen={popUpTurma} onClose={() => setPopUpTurma(false)}>
          <FormCadastroTurma onSubmit={handleAdicionarTurma} onCancel={() => setPopUpTurma(false)} />
        </Popup>

        <ToastContainer />
      </div>
    </>
  );
};

export default Escola;
