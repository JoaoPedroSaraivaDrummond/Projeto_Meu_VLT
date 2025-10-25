
const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes');

router.use('/', usuarioRoutes); 


const dotenv = require('dotenv');
const cors = require('cors'); // <-- Importe o CORS

dotenv.config();

const app = express();
// ...

// Configure o CORS para permitir requisições de qualquer origem (em desenvolvimento)
app.use(cors()); 

app.use(express.json());

// ... (o resto das suas rotas)

module.exports = router;
