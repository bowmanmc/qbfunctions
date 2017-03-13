/**
 * Mailer Lambda Function
 *
 * Will be called daily
 *   - Look up mail jobs for the current day and for each one:
 *       - Apply Template
 *       - Send Email
 *       - Record success or errors
 */
const moment = require('moment');


exports.handler = (event, context, callback) => {

    let dayStr = moment().format('YYYY-MM-DD');

    console.log(`Processing mail for day ${dayStr}`);

    callback(null, 'Executed mailer lambda.');
};
