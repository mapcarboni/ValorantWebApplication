import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BancoDeDados from '../bancoDeDados';

function Formulario() {
    const { uuid } = useParams();
    const [detalhes, setDetalhes] = useState({
        displayName: "",
        description: ""
    });

    let bancoDeDados = BancoDeDados.retornaBancoDeDados();
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const agenteEncontrado = bancoDeDados.retornaAgente(uuid);
                setDetalhes(agenteEncontrado);
            } catch (error) {
                console.error('Erro ao buscar agentes:', error);
            }
        };
        fetchData();
    }, [uuid, bancoDeDados]);

    const enviar = (e) => {
        e.preventDefault();
        try {
            bancoDeDados.salvarAgente(uuid, detalhes.displayName, detalhes.description);
            setSuccessMessage("Agente salvo com sucesso!!!");
        } catch (error) {
            setSuccessMessage("Alteracoes nao salvas!!!");
            console.log(error);
        }
    };

    const alteracao = (e) => {
        const { name, value } = e.target;
        setDetalhes((prev) => ({
            ...prev,
            [name]: value
        }));
};

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

    return (
        <div>
            <h1 style={styles.h1}>Edicao do Agente</h1>
            <div style={styles.coluna}>
            <form style={styles.form} onSubmit={enviar}>
                <label>Nome:</label><br/>
                <input type="text" name="displayName" value={detalhes?.displayName} onChange={alteracao} autoFocus required /><br/>
                <label>Descrição:</label><br/>
                <textarea style={{height: '200px'}} name="description" value={detalhes?.description} onChange={alteracao} /><br/>
                <input style={styles.button} type="submit" value="Salvar" />
                <p style={{ color: "green" }}>{successMessage}</p>
            </form>
            <Link to={`/detalhes/${uuid}`}>
                <button style={styles.button}>Voltar</button>
            </Link>
            </div>
        </div>
    );
}
export default Formulario;