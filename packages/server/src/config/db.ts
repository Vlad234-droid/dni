import {Pool} from 'pg';

// TODO: Configure connection from config file
export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    port: Number(process.env.DB_PORT)
});

// TODO: Check http://www.pgbouncer.org/