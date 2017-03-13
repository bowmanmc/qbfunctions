'use strict';
const env = process.env;

const dbhost = env['DB_HOST'] || 'localhost';
const dbport = env['DB_PORT'] || '5432';
const dbuser = env['DB_USER'] || 'qb';
const dbpass = env['DB_PASS'] || 'qb';
const dbdb = env['DB_DATABASE'] || 'qb';

module.exports = {
    knex: {
        client: 'pg',
        connection: {
            host: dbhost,
            port: dbport,
            user: dbuser,
            password: dbpass,
            database: dbdb,
            charset: 'utf8',
            timezone: 'UTC'
        }
    }
}
