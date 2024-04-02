import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BancoDeDados from '../bancoDeDados';
import Usuario from '../imagem/adicionarUsuario.png';

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

    // Estilos utilizados no componente
    const styles = {
        header: {   
            position: 'fixed',
            top: '0.5%',
            left: '1%',
            width: '98%',
            zIndex: 100,
        },
        h1: {
            backgroundImage: 'linear-gradient(to right, lightgray, rgb(140, 140, 140))',
            marginBottom: '2rem',
            padding: '1rem',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0.1rem 0.1rem 1.5rem black',
        },
        main: {
            padding: '2rem',
        },
        ul: {
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            columnGap: '4rem',
            rowGap: '5rem',
        },
        li: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '2rem',
        },
        img: {
            width: '225px',
            borderRadius: '1rem',
            margin: '1rem 0',
            boxShadow: '0.25rem 0.25rem 1rem black',
        },
        button: {
            fontWeight: 'bolder',
            fontSize: '125%',
            backgroundColor: '#c0c0c0',
            borderRadius: '1rem',
            boxShadow: '0.5rem 0.25rem 0.75rem black',
            marginTop: '-1.3rem',
            zIndex: 10,
            padding: '0.2rem',
            margin: '-1.5rem 1rem',
        },
        adicionar: {
            filter: 'none',
            transform: 'scale(0.95)',
            width: '225px',
        }
    };

    // Renderização do componente
    return (
        <div>
            {/* Cabeçalho da página */}
            <header style={styles.header}>
                <h1 style={styles.h1}>Valorant Agents</h1>
            </header>
            {/* Corpo da página */}
            <main style={styles.main}>
                <ul style={styles.ul}>
                    {/* Item para adicionar um novo agente */}
                    <li style={styles.li}>
                        <img style={styles.adicionar} src={Usuario} alt="Icone de adicionar um novo agente" onClick={handleAdicionar} />
                        <button style={styles.button}>Criar novo Agente</button>
                    </li> 
                    {/* Mapeamento dos agentes e renderização de suas informações */}
                    {agentes.map(agente => (
                        <li style={styles.li} key={agente.uuid}>
                            <Link to={`/detalhes/${agente.uuid}`}>
                                <img style={styles.img} src={agente.displayIcon} alt={agente.displayName} />
                            </Link>
                            <button style={styles.button}>{agente.displayName}</button>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
// Exportação do componente Principal
export default Principal;