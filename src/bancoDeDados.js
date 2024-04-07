import Agente from './agente'; // Importação da classe Agente
import { v4 as uuidv4 } from 'uuid'; // Importação da função uuidv4
import NovoAgente from './imagem/novoUsuario.png';
import FullAgente from './imagem/agente.png';

class BancoDeDados {
    constructor () {
        this.agenteMapa = new Map(); // Inicialização do mapa para armazenar agentes
    }

    async buscarArmazenarAgentes () {
        try {
            // Verifica se o mapa de agentes está vazio
            if (this.agenteMapa.size === 0) {
                // Busca os agentes da API Valorant
                const response = await fetch('https://valorant-api.com/v1/agents?language=pt-BR');
                if (!response.ok) {
                    throw new Error('Erro ao buscar agentes da API');
                }
    
                // Converte a resposta para JSON
                const dados = await response.json();
                // Mapeia os dados e cria objetos Agente, armazenando-os no mapa
                dados.data.map(item => {
                    let agente = new Agente(item.uuid, item.displayName, item.displayIcon, item.description, item.fullPortrait);
                    this.agenteMapa.set(item.uuid, agente);
                    return null;
                });
            }
    
            // Retorna um array com todos os agentes do mapa
            return Array.from(this.agenteMapa).map(([uuid, agente]) => (agente));
        } catch (error) {
            console.error('Erro ao buscar agentes:', error);
            throw error;
        }    
    }

    // Retorna um agente com base no UUID
    retornaAgente(uuid) {
        return this.agenteMapa.get(uuid);
    }

    // Deleta um agente com base no UUID
    deletarAgente(uuid) {
        return this.agenteMapa.delete(uuid);
    }

    // Salva as alterações de displayName e description de um agente
    salvarAgente(uuid, displayName, description) {
        let agente = this.agenteMapa.get(uuid);
        agente.displayName = displayName;
        agente.description = description;
}
    
    // Adiciona um novo agente ao banco de dados
    adicionarNovoAgente() {
        // Obtém a instância do banco de dados
        const bancoDeDados = BancoDeDados.retornaBancoDeDados();
        // Cria um novo agente com UUID gerado pelo uuidv4
        const novoAgente = new Agente(uuidv4(), "Novo Agente", NovoAgente, "Descrever informacoes do novo agente", FullAgente);
        // Adiciona o novo agente ao mapa de agentes
        bancoDeDados.agenteMapa.set(novoAgente.uuid, novoAgente);
    }

    // Método estático para retornar a instância única do banco de dados
    static retornaBancoDeDados() {
        return bancoDeDados;
    }
}
// Instância única do banco de dados
const bancoDeDados = new BancoDeDados();
// Exportação do banco de dados
export default BancoDeDados;