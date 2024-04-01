import Agente from './agente';
import { v4 as uuidv4 } from 'uuid';

class BancoDeDados {
    constructor () {
        this.agenteMapa = new Map();
    }

    async buscarArmazenarAgentes () {
        try {
            if (this.agenteMapa.size === 0) {
                const response = await fetch('https://valorant-api.com/v1/agents?language=pt-BR');
                if (!response.ok) {
                    throw new Error('Erro ao buscar agentes da API');
                }
    
                const dados = await response.json();
                dados.data.map(item => {
                    let agente = new Agente(item.uuid, item.displayName, item.displayIcon, item.description, item.fullPortrait);
                    this.agenteMapa.set(item.uuid, agente);
                    return null;
                });
            }
    
            return Array.from(this.agenteMapa).map(([uuid, agente]) => (agente));
        } catch (error) {
            console.error('Erro ao buscar agentes:', error);
            throw error;
        }    
    }

    retornaAgente(uuid) {
        return this.agenteMapa.get(uuid);
    }

    deletarAgente(uuid) {
        return this.agenteMapa.delete(uuid);
    }

    salvarAgente(uuid, displayName, description) {
        let agente = this.agenteMapa.get(uuid);
            agente.displayName = displayName;
            agente.description = description;
    }
    
    adicionarNovoAgente() {
        const bancoDeDados = BancoDeDados.retornaBancoDeDados();    
        const novoAgente = new Agente(uuidv4(), "Novo Agente", "icon-url", "DescriÃ§Ã£o do novo agente", "portrait-url");
            bancoDeDados.agenteMapa.set(novoAgente.uuid, novoAgente);
    }

    static retornaBancoDeDados() {
        return bancoDeDados;
    }
}
const bancoDeDados = new BancoDeDados();
export default BancoDeDados;