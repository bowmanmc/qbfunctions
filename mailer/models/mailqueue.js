'use strict';

const bookshelf = require('../bookshelf');


const MailQueue = bookshelf.Model.extend({
    tableName: 'mailqueue'
});

module.exports = MailQueue;
