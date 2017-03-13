/**
 * Mailer Lambda Function
 *
 * Will be called daily
 *   - Look up mail jobs for the current day and for each one:
 *       - Apply Template
 *       - Send Email
 *       - Record success or errors
 */
'use strict';
const moment = require('moment');

const MailQueue = require('./models/mailqueue');


exports.handler = (event, context, callback) => {

    let dayStr = moment().format('YYYY/MM/DD');

    console.log('Processing mail for day ' + dayStr);

    MailQueue.where('deliveron', dayStr).fetchAll().then(function(queue) {
        console.log('Got ' + queue.length + ' items from the mail queue');

        queue.map(function(item) {
            console.log('    processing mail queue item: ' + JSON.stringify(item));
        });

        // handler is finished!
        callback('Executed mailer lambda.');
    }).catch(function(err) {
        console.error('Error processing mail queue!', err);
        callback('Error processing mail queue!');
    });
};
