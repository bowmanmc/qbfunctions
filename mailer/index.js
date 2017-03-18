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
const AWS = require('aws-sdk');
const moment = require('moment');
const Promise = require('bluebird');
const request = require('request');

const awsConfig = require('../aws.json');
const MailQueue = require('./models/mailqueue');


function processQueueItem(item) {
    const deferred = Promise.pending();
    // Read template from S3
    console.log('Retrieving template from S3: ' + item.template);
    request(item.template, function(err, response, body) {
        console.log('Sending ' + item.template + ' to ' + item.studentemail);

        let ses = new AWS.SES({
            accessKeyId: awsConfig.accessKeyId,
            secretAccessKey: awsConfig.secretAccessKey,
            region: awsConfig.region
        });

        let emailParams = {
            Destination: {
                ToAddresses: [item.studentemail]
            },
            Message: {
                Body: {
                    Html: {
                        Data: body,
                        Charset: 'utf8'
                    }
                },
                Subject: {
                    Data: 'Quickbits Daily Lesson'
                }
            },
            Source: 'bowmanmc@gmail.com'
        };

        ses.sendEmail(emailParams, function(err, data) {
            if (err) {
                console.log(err.message, err.stack);
            }
            else {
                console.log('Email sent!!!');
                console.log('Data: ' + JSON.stringify(data));
            }
            deferred.resolve();
        });
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
