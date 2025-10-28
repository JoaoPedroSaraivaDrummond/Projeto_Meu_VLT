

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mainRouter = require('./src/routes/index'); 

const app = express();
const PORT = process.env.API_PORT || 3000;

app.use(cors()); 
app.use(express.json());


app.use('/api', mainRouter); 

app.get('/', (req, res) => {
    res.send('API do Meu VLT está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
