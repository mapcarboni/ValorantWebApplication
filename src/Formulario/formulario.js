import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BancoDeDados from '../bancoDeDados';

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
    const enviar = (e) => {
        e.preventDefault();
        try {
            // Salva as alterações do agente no banco de dados
            bancoDeDados.salvarAgente(uuid, detalhes.displayName, detalhes.description);
            setSuccessMessage("Agente salvo com sucesso!!!");
        } catch (error) {
            setSuccessMessage("Alterações não salvas!!!");
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

    // Estilos utilizados no componente
    const styles = {
        h1: {
            backgroundImage: 'linear-gradient(to right, lightgray, rgb(140, 140, 140))',
            marginBottom: '2rem',
            padding: '1rem',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0.1rem 0.1rem 1.5rem black',
        },
        form: {
            fontSize: '100%',
            padding: '1rem',
        },
        button: {
            fontWeight: 'bolder',
            fontSize: '125%',
            backgroundColor: '#c0c0c0',
            borderRadius: '1rem',
            boxShadow: '0.5rem 0.25rem 0.75rem black',
            padding: '0.5rem',
        },
        p: {
            textAlign: 'center',
        },
        coluna: {
            textAlign: 'center',
        }
    };

    // Renderização do componente
    return (
        <div>
            {/* Título do formulário */}
            <h1 style={styles.h1}>Edição do Agente</h1>
            <div style={styles.coluna}>
                {/* Formulário de edição dos detalhes do agente */}
                <form style={styles.form} onSubmit={enviar}>
                    <label>Nome:</label><br/>
                    <input type="text" name="displayName" value={detalhes?.displayName} onChange={alteracao} autoFocus required /><br/>
                    <label>Descrição:</label><br/>
                    <textarea style={{height: '200px'}} name="description" value={detalhes?.description} onChange={alteracao} /><br/>
                    {/* Botão para salvar as alterações */}
                    <input style={styles.button} type="submit" value="Salvar" />
                    {/* Mensagem de sucesso */}
                    <p style={{ color: "green" }}>{successMessage}</p>
                </form>
                {/* Link para voltar à página de detalhes do agente */}
                <Link to={`/detalhes/${uuid}`}>
                    <button style={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}
// Exportação do componente Formulario
export default Formulario;