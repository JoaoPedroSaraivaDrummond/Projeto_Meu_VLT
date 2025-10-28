
document.addEventListener('DOMContentLoaded', () => {

    
    const API_URL_BASE = 'http://localhost:3000/api';
    const URL_CADASTRO = `${API_URL_BASE}/usuarios`;
    const URL_LOGIN = `${API_URL_BASE}/login`;

    // Seleciona os formulários e a div de mensagem
    const formCadastro = document.getElementById('form-cadastro');
    const formLogin = document.getElementById('form-login');
    const mensagemDiv = document.getElementById('mensagem-api');

    // --- LÓGICA DE CADASTRO ---
    formCadastro.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Pega os dados do formulário de cadastro
        const dadosCadastro = {
            nome: document.getElementById('cadastro-nome').value,
            email: document.getElementById('cadastro-email').value,
            senha: document.getElementById('cadastro-senha').value,
            tipo: document.getElementById('cadastro-tipo').value
        };

        // Chama a API de cadastro
        await fazerRequisicao(URL_CADASTRO, dadosCadastro);
    });

    // --- LÓGICA DE LOGIN ---
    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Pega os dados do formulário de login
        const dadosLogin = {
            email: document.getElementById('login-email').value,
            senha: document.getElementById('login-senha').value
        };

        // Chama a API de login
        await fazerRequisicao(URL_LOGIN, dadosLogin);
    });

    // --- FUNÇÃO REUTILIZÁVEL PARA CHAMAR A API ---
    async function fazerRequisicao(url, dados) {
        // Limpa mensagens antigas
        mostrarMensagem('', 'sucesso'); // Limpa a classe

        try {
            const resposta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const dadosResposta = await resposta.json();

            if (resposta.ok) { // Se o status for 200-299
                // Se for resposta de login, mostra a mensagem de boas-vindas
                const mensagem = dadosResposta.mensagem 
                                 ? `${dadosResposta.mensagem} Bem-vindo, ${dadosResposta.usuario.nome}!`
                                 : `Usuário ${dadosResposta.nome} criado com sucesso!`;
                
                mostrarMensagem(mensagem, 'sucesso');
            } else { // Se for um erro (4xx, 5xx)
                mostrarMensagem(`Erro: ${dadosResposta.erro}`, 'erro');
            }

        } catch (error) {
            // Erro de rede (API desligada, URL errada, etc)
            console.error('Falha na requisição:', error);
            mostrarMensagem('Erro: Não foi possível conectar à API. Verifique o console.', 'erro');
        }
    }

    // Função para exibir mensagens na tela
    function mostrarMensagem(texto, tipo) {
        mensagemDiv.innerText = texto;
        mensagemDiv.className = tipo; // 'sucesso' ou 'erro'
    }
});