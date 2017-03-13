const Publisher = require('aws-publisher');
const aws = require('../aws.json');


let publisher = new Publisher({
    bucket: aws.params.Bucket,
    key: aws.accessKeyId,
    secret: aws.secretAccessKey
});

publisher.publishDir({
    origin: 'dist',
    dest: aws.params.Folder
}, function() {
    console.log('Uploaded dist to aws!');
});

// Needs aws.json next to package.json in the format:
// {
//     "params": {
//         "Bucket": "bucket-name",
//         "Folder": "folder-prefix"
//     },
//     "accessKeyId": "xxx",
//     "region": "xxx",
//     "secretAccessKey": "xxx"
// }
