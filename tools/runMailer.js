/**
 * runMailer
 * This is just for test purposes to run locally. In production, the mailer
 * is executed as a scheduled event in AWS Lambda
 */
const mailer = require('../mailer');
const process = require('process');


let evt = {};
let ctx = {};
let cb = function() {
    console.log('tools/runMailer.js is finished!');
    process.exit(0);
}

mailer.handler(evt, ctx, cb);
