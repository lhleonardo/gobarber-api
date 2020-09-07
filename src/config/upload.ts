import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

/**
 * Configuração de upload de imagens para a API.
 *
 * Todos os arquivos enviados estarão na pasta tmp,
 * presente na raíz do projeto.
 *
 * O nome de cada um dos arquivos será renomeado para o formato:
 * hash_aleatorio-nome_arquivo_original.extensao
 */

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadFolder: path.resolve(tmpFolder, 'uploads'),
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder, // ../../tmp
    filename(request, file, callback) {
      const hash = crypto.randomBytes(10).toString('hex');
      const filename = `${hash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};
