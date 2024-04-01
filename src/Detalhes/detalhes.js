import React, { useEffect, useState } from 'react';
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

    return (
        <div>
            <h1>{agente.displayName}</h1>
            <Link to={`/formulario/${uuid}`}>
                <button>Editar</button>
            </Link>
            <Link to={`/`}>
                <button onClick={deleteAgente}>Deletar</button>
            </Link>
            <Link to={`/`}>
                <button>Voltar</button>
            </Link>
            <img src={agente.fullPortrait} alt={agente.displayName} />
            <h2>{agente.description}</h2>
        </div>
    );
}
export default Detalhes;