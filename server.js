import { createServer } from 'http';
import { useApp } from './src/app';

const server = createServer((req, res) => useApp(req, res))

server.listen(1120, () => console.log('listening'))