

const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const UsuarioModel = {
    // Busca um usuário pelo email (para o Login)
    findByEmail: async (email) => {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
        return rows[0];
    },

    
    create: async ({ nome, email, senha, tipo }) => {
      
        const senhaHash = await bcrypt.hash(senha, 10);
        
        const [result] = await pool.query(
            'INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
            [nome, email, senhaHash, tipo]
        );
        return { id: result.insertId, nome, email, tipo };
    }
};

module.exports = UsuarioModel;
