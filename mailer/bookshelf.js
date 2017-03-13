'use strict';

const bookshelf = require('bookshelf');
const knex = require('knex');
const config = require('./config');


const knexInstance = knex(config.knex);
const bs = bookshelf(knexInstance);

module.exports = bs;
