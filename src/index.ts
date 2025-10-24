import { FastMCP } from 'fastmcp';
import pJson from '../package.json';
import { getBondsTool } from './tools/bonds';
// Создаем экземпляр FastMCP сервера

const version = `${pJson.version}` as `${number}.${number}.${number}`;
const port = parseInt(process.env.PORT || '8080');

const server = new FastMCP({
	name: 'dohod-ru-mcp',
	version,
});

// Регистрируем инструменты
server.addTool(getBondsTool);

// Запускаем сервер
server.start({
	transportType: 'httpStream',
	httpStream: {
		host: '0.0.0.0',
		port,
		endpoint: '/mcp',
	},
});

console.info(`MCP сервер dohod-ru запущен и готов к работе на порту ${port}`);
