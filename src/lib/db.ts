import { Pool } from 'pg';

let pool;

if (!pool) {
	pool = new Pool({
		user: process.env.PGSQL_USER,
		password: process.env.PGSQL_PASSWORD,
		host: process.env.PGSQL_HOST,
		port: process.env.PGSQL_PORT,
		database: process.env.PGSQL_DATABASE,
	});
}

async function dbquery(text, params = [], callback: any = () => {}) {
	return pool.query(text, params);
}

export default dbquery;

