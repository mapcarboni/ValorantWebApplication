import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BancoDeDados from '../bancoDeDados';

function Detalhes() {
    const { uuid } = useParams();
    const [agente, setAgente] = useState(null);
    const bancoDeDados = BancoDeDados.retornaBancoDeDados();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const agenteEncontrado = bancoDeDados.retornaAgente(uuid);
                setAgente(agenteEncontrado);
            } catch (error) {
                console.error('Erro ao buscar agentes:', error);
            }
        };
        fetchData();
    }, [uuid, bancoDeDados]);

    const deleteAgente = async () => {
        try {
            bancoDeDados.deletarAgente(uuid);
        } catch (error) {
            console.error('Erro ao deletar agente:', error);
        }
    };

    if (!agente) {
        return <p>Carregando...</p>;
    }

    const styles = {
        h1: {
            backgroundImage: 'linear-gradient(to right, lightgray, rgb(140, 140, 140))',
            marginBottom: '2rem',
            padding: '1rem',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0.1rem 0.1rem 1.5rem black',
        },
        button: {
            fontWeight: 'bolder',
            fontSize: '125%',
            backgroundColor: '#c0c0c0',
            borderRadius: '1rem',
            boxShadow: '0.5rem 0.25rem 0.75rem black',
            padding: '0.5rem',
            margin: '0.5rem',
        },
        img: {
            width: '300px',
            marginBottom: '1rem',
        },
        h2: {
            margin: '1rem',
        },
        coluna: {
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            columnGap: '4rem',
        }
    };

    return (
        <div>
            <h1 style={styles.h1}>{agente.displayName}</h1>
            <div>
            <Link to={`/formulario/${uuid}`}>
                <button style={styles.button}>Editar</button>
            </Link>
            <Link to={`/`}>
                <button style={styles.button} onClick={deleteAgente}>Deletar</button>
            </Link>
            <Link to={`/`}>
                <button style={styles.button}>Voltar</button>
            </Link>
            </div>
            <div style={styles.coluna}>
            <div>
                <img style={styles.img} id="teste" src={agente.fullPortrait} alt={agente.displayName} />
            </div>
            <h2 style={styles.h2}>{agente.description}</h2>
            </div>
        </div>
    );
}
export default Detalhes;