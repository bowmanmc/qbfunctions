const archiver = require('archiver');
const fs = require('fs');
const mkdirp = require('mkdirp');
const pkg = require('../package.json');

const DIST = 'dist';
const FUNCTIONS = ['enroll', 'mailer'];

mkdirp.sync(DIST);

FUNCTIONS.forEach(lambdaFunction => {
    let filename = `./${DIST}/${lambdaFunction}-${pkg.version}.zip`
    console.log(`Building ${filename}...`);
    let output = fs.createWriteStream(filename);
    let archive = archiver('zip', {
        store: true
    });
    output.on('close', function() {
        //console.log(lambdaFunction + archive.pointer() + ' total bytes');
        console.log(`    ${filename} (${archive.pointer()} total bytes)`);
    });
    archive.pipe(output);
    // zip contents of lambdaFunction folder into root level in zip
    archive.glob(`${lambdaFunction}/*`);
    archive.finalize();
});
