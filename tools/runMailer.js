const mailer = require('../mailer');

let evt = {};
let ctx = {};
let cb = function() {
    console.log('tools/runMailer.js is finished!');
}

mailer.handler(evt, ctx, cb);
