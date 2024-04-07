import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BancoDeDados from '../bancoDeDados';
import Usuario from '../imagem/adicionarUsuario.png';
import '../styles/principal.css';

// Componente funcional Principal, responsável por renderizar a página principal da aplicação
function Principal() {
    // Estado para armazenar a lista de agentes
    const [agentes, setAgentes] = useState([]);
    // Hook para permitir a navegação programática
    const navigate = useNavigate();
    // Instância do banco de dados
    const bancoDeDados = BancoDeDados.retornaBancoDeDados();

    // Função para lidar com a adição de um novo agente
    const handleAdicionar = async () => {
        try {
            // Adicionar um novo agente ao banco de dados
            await bancoDeDados.adicionarNovoAgente();
            // Buscar e atualizar a lista de agentes
            const updatedAgentes = await bancoDeDados.buscarArmazenarAgentes();
            setAgentes(updatedAgentes);
            // Navegar para a página de formulário do novo agente
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

    // Renderização do componente
    return (
        <div class="body">
            <header>
            {/* Cabeçalho da página */}
                <h1>Valorant Agents</h1>
                <div class="light"></div>
            </header>
            {/* Corpo da página */}
                <ul>
                    {/* Item para adicionar um novo agente */}
                    <li>
                        <img class="iconeAgente" src={Usuario} alt="Icone de adicionar um novo agente" onClick={handleAdicionar} />
                        <h2>Criar novo Agente</h2>
                    </li> 
                    {/* Mapeamento dos agentes e renderização de suas informações */}
                    {agentes.map(agente => (
                        <li key={agente.uuid}>
                            <Link to={`/detalhes/${agente.uuid}`}>
                                <img class="icone" src={agente.displayIcon} alt={agente.displayName} />
                            </Link>
                            <h2>{agente.displayName}</h2>
                        </li>
                    ))}
                </ul>
        </div>
    );
}
// Exportação do componente Principal
export default Principal;