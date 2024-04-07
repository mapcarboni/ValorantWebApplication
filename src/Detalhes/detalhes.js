import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BancoDeDados from '../bancoDeDados';
import '../styles/detalhes.css';

// Componente funcional Detalhes, responsável por exibir os detalhes de um agente
function Detalhes() {
    // Obtém o UUID do agente da URL
    const { uuid } = useParams();
    // Estado para armazenar os detalhes do agente
    const [agente, setAgente] = useState(null);
    // Instância do banco de dados
    const bancoDeDados = BancoDeDados.retornaBancoDeDados();

    // Efeito para buscar os detalhes do agente quando o componente é montado ou o UUID muda
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Busca os detalhes do agente pelo UUID
                const agenteEncontrado = bancoDeDados.retornaAgente(uuid);
                setAgente(agenteEncontrado);
            } catch (error) {
                console.error('Erro ao buscar agentes:', error);
            }
        };
        fetchData();
    }, [uuid, bancoDeDados]);

    // Função para deletar o agente
    const deleteAgente = async () => {
        try {
            var confirmacao = window.confirm("Tem certeza que deseja excluir este Agente?");
            if (confirmacao) {
                bancoDeDados.deletarAgente(uuid);
            }
        } catch (error) {
            console.error('Erro ao deletar agente:', error);
        }
    };

    // Se os detalhes do agente não foram carregados ainda, exibe uma mensagem de carregamento
    if (!agente) {
        return <p>Carregando...</p>;
    }

    // Renderização do componente
    return (
        <div class="bodydetalhes">
            <header>
                {/* Título com o nome do agente */}
                <h1>{agente.displayName}</h1>
            </header>
            <div class="botaoDescricao">
                {/* Botões para editar, deletar e voltar */}
                <Link to={`/formulario/${uuid}`}>
                    <button>Editar</button>
                </Link>
                <Link to={`/`}>
                    <button onClick={deleteAgente}>Deletar</button>
                </Link>
                <Link to={`/`}>
                    <button>Voltar</button>
                </Link>
            </div>
            <div class="fotoDescricao">
            {/* Coluna com a imagem e a descrição do agente */}
                <img class="retrato" id="teste" src={agente.fullPortrait} alt={agente.displayName} />
                <h3>{agente.description}</h3>
            </div>
        </div>
    );
}
// Exportação do componente Detalhes
export default Detalhes;