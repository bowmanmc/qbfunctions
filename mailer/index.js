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
const Promise = require('bluebird');
const request = require('request');

const awsConfig = require('../aws.json');
const MailQueue = require('./models/mailqueue');


function processQueueItem(item) {
    const deferred = Promise.pending();
    console.log('    processing mail queue item: ' + JSON.stringify(item));
    // Read template from S3
    request(item.template, function(err, response, body) {
        console.log('Sending ' + item.template + ' to ' + item.studentemail);
        deferred.resolve();
    });
    return deferred.promise;
}

function processQueue(queue) {
    const deferred = Promise.pending();
    let promises = [];
    queue.map(function(item) {
        promises.push(processQueueItem(item.toJSON()));
    });
    Promise.all(promises).then(function() {
        deferred.resolve();
    })
    return deferred.promise;
}


exports.handler = (event, context, callback) => {

    let dayStr = moment().format('YYYY/MM/DD');

    console.log('Processing mail for day ' + dayStr);

    MailQueue.where('deliveron', dayStr).fetchAll().then(function(queue) {
        console.log('Got ' + queue.length + ' items from the mail queue');
        processQueue(queue).then(function() {
            callback();
        });
    }).catch(function(err) {
        console.error('Error processing mail queue!', err);
        callback('Error processing mail queue!');
    });
};
