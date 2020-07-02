import express from 'express';
import routes from './routes';

import './database';

import uploadConfig from './config/upload';

const app = express();

// corpo da requisição sempre convertido para json
app.use(express.json());
// rota estática para acessar arquivos que foram enviados
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

export default app;
