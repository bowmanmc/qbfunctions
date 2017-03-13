/**
 * Mailer Lambda Function
 *
 * Will be called daily
 *   - Look up mail jobs for the current day and for each one:
 *       - Apply Template
 *       - Send Email
 *       - Record success or errors
 */
exports.handler = (event, context, callback) => {

    console.log('Hello from the console ' + event['name']);
    callback(null, 'Hello from Lambda ' + event['name']);

};
