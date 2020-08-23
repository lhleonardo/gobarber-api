import { createConnection } from 'typeorm';

async function connect() {
  await createConnection();
}

console.log('Connecting...');

connect();
