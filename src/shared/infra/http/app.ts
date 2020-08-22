import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';

import '@shared/infra/typeorm';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();

// corpo da requisição sempre convertido para json
app.use(cors());
app.use(express.json());
// rota estática para acessar arquivos que foram enviados
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    console.error(error);

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  },
);

export default app;
