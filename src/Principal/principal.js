import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BancoDeDados from '../bancoDeDados';
import Usuario from './imagem/adicionarUsuario.png';
import './principal.css';

function Principal() {
    // Estado para armazenar a lista de agentes
    const [agentes, setAgentes] = useState([]);
    // Hook para permitir a navegacao programÃ¡tica
    const navigate = useNavigate();
    // Instanncia do banco de dados
    const bancoDeDados = BancoDeDados.retornaBancoDeDados();

    // Funcao para lidar com a adicao de um novo agente
    const handleAdicionar = async () => {
        try {
            // Adicionar um novo agente ao banco de dados
            await bancoDeDados.adicionarNovoAgente();
            // Buscar e atualizar a lista de agentes
            const updatedAgentes = await bancoDeDados.buscarArmazenarAgentes();
            setAgentes(updatedAgentes);
            // Navegar para a pagina de formulario do novo agente
            navigate(`/formulario/${updatedAgentes[updatedAgentes.length - 1].uuid}`);
        } catch (error) {
            console.log('Erro ao adicionar novo agente:', error);
        }
    };

    // Efeito para buscar agentes quando o componente foi montado ou o banco de dados muda
    useEffect(() => {
        bancoDeDados.buscarArmazenarAgentes()
            .then(data => setAgentes(data))
            .catch(error => console.log('Erro ao buscar agentes:', error));
    }, [bancoDeDados]);

    return (
        <div id="geral">
            <header>
                <h1>Valorant Agents</h1>
                <div class="light"></div>
            </header>
            <main>
                <ul>
                    <li>
                        <a href="https://google.com">
                            <img class="adicionar" src={Usuario} alt="Icone de adicionar um novo agente" />
                        </a> 
                        <button>Criar novo Agente</button>
                    </li> 
                    {agentes.map(agente => {
                        return (
                            <li key={agente.uuid}>
                                <a href="https://google.com">
                                    <img src={agente.displayIcon} alt={agente.displayName} />
                                </a>
                                <button>{agente.displayName}</button>
                            </li>
                        )
                    })}
                </ul>
            </main>
        </div>
    );
}
export default Principal;