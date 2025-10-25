

const UsuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');

const UsuarioController = {
    
    
    cadastrar: async (req, res) => {
        const { nome, email, senha, tipo } = req.body;

        if (!nome || !email || !senha || !tipo) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
        }
        
        
        if (senha.length < 8) {
             return res.status(400).json({ erro: 'A senha deve ter no mínimo 8 caracteres.' });
        }

        try {
            const usuarioExistente = await UsuarioModel.findByEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({ erro: 'Este email já está cadastrado.' });
            }

            const novoUsuario = await UsuarioModel.create({ nome, email, senha, tipo });
            res.status(201).json(novoUsuario);

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ erro: 'Erro interno no servidor.' });
        }
    },

    
    login: async (req, res) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
        }

        try {
            const usuario = await UsuarioModel.findByEmail(email);

            if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
                return res.status(401).json({ erro: 'Email ou senha inválidos.' });
            }

          
            res.status(200).json({
                mensagem: 'Login bem-sucedido!',
                usuario: {
                    id: usuario.id_usuario,
                    nome: usuario.nome,
                    tipo: usuario.tipo
                }
            });

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({ erro: 'Erro interno no servidor.' });
        }
    }
};

module.exports = UsuarioController;
