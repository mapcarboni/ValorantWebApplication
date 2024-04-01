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
            setSuccessMessage("Alterações não salvas!!!");
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

    return (
        <div>
            <form onSubmit={enviar}>
                <label>Nome:</label><br/>
                <input type="text" name="displayName" value={detalhes?.displayName} onChange={alteracao} autoFocus required /><br/>
                <label>Descrição:</label><br/>
                <textarea name="description" value={detalhes?.description} onChange={alteracao} /><br/>
                <input type="submit" value="Salvar" />
                <p style={{ color: "green" }}>{successMessage}</p>
            </form>
            <Link to={`/detalhes/${uuid}`}>
                <button>Voltar</button>
            </Link>
        </div>
    );
}
export default Formulario;