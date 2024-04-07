import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BancoDeDados from '../bancoDeDados';
import '../styles/formulario.css';

// Componente funcional Formulario, responsável pela edição de detalhes de um agente
function Formulario() {
    // Obtém o UUID do agente da URL
    const { uuid } = useParams();
    // Estado para armazenar os detalhes do agente
    const [detalhes, setDetalhes] = useState({
        displayName: "",
        description: ""
    });

    // Instância do banco de dados
    let bancoDeDados = BancoDeDados.retornaBancoDeDados();
    // Estado para armazenar mensagens de sucesso
    const [successMessage, setSuccessMessage] = useState("");

    // Efeito para buscar os detalhes do agente quando o componente é montado ou o UUID muda
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Busca os detalhes do agente pelo UUID
                const agenteEncontrado = bancoDeDados.retornaAgente(uuid);
                setDetalhes(agenteEncontrado);
            } catch (error) {
                console.error('Erro ao buscar agentes:', error);
            }
        };
        fetchData();
    }, [uuid, bancoDeDados]);

    // Função para lidar com o envio do formulário
    const enviar = async (e) => {        
        e.preventDefault();
        try {
            if(detalhes.displayName){
                // Salva as alterações do agente no banco de dados
                bancoDeDados.salvarAgente(uuid, detalhes.displayName, detalhes.description);
                setSuccessMessage("AGENTE SALVO COM SUCESSO!!!");                   
            }
        } catch (error) {
            setSuccessMessage("ALTERAÇÕES NÃO SALVAS!!!");
            console.log(error);
        }
    };

    // Função para lidar com as alterações nos campos do formulário
    const alteracao = (e) => {
        const { name, value } = e.target;
        setDetalhes((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Renderização do componente
    return (
        <div>
            <header>
                {/* Título do formulário */}
                <h1>Edição do Agente</h1>
            </header>
            <div class="formulario">
                {/* Formulário de edição dos detalhes do agente */}
                <form onSubmit={enviar}>
                    <label>Nome:</label><br/>
                    <input type="text" name="displayName" value={detalhes?.displayName} onChange={alteracao} autoFocus required /><br/>
                    <label>Descrição:</label><br/>
                    <textarea name="description" value={detalhes?.description} onChange={alteracao} /><br/>
                    {/* Botão para salvar as alterações */}
                    <button type="submit">Salvar</button>
                    {/* Botão "Voltar" fora do formulário */}
                    <Link to={`/detalhes/${uuid}`}>
                        <button type="button">Voltar</button>
                    </Link>
                </form>
            </div>
            {/* Mensagem de sucesso */}
            <p>{successMessage}</p>
        </div>
    );    
}
// Exportação do componente Formulario
export default Formulario;