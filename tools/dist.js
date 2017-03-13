const archiver = require('archiver');
const copydir = require('copy-dir');
const fs = require('fs');
const mkdirp = require('mkdirp');
const pkg = require('../package.json');
const rimraf = require('rimraf');


const DIST = './dist';
const FUNCTIONS = ['enroll', 'mailer'];

rimraf.sync(DIST);
mkdirp.sync(DIST);

// Copy each function to dist
FUNCTIONS.forEach(lambdaFunction => {
    console.log(`Copying ${lambdaFunction} to ${DIST}/${lambdaFunction}`);
    mkdirp.sync(`${DIST}/${lambdaFunction}`);
    copydir.sync(`./${lambdaFunction}`, `${DIST}/${lambdaFunction}`);
});

// Copy node_modules to every lambda function in dist
FUNCTIONS.forEach(lambdaFunction => {
    console.log(`Copying node_modules to ${lambdaFunction}`);
    mkdirp.sync(`${lambdaFunction}/node_modules`);
    copydir.sync('./node_modules', `${lambdaFunction}/node_modules`);
});

// Zip up every lambda function in dist
FUNCTIONS.forEach(lambdaFunction => {
    //create a zip file in dist
    let filename = `${DIST}/${lambdaFunction}-${pkg.version}.zip`
    console.log(`Building ${filename}...`);
    let output = fs.createWriteStream(filename);
    let archive = archiver('zip', {
        store: true
    });
    output.on('close', function() {
        console.log(`    ${filename} (${archive.pointer()} total bytes)`);
        console.log(`Removing ${DIST}/${lambdaFunction}`);
        rimraf.sync(`${DIST}/${lambdaFunction}`);
    });
    archive.pipe(output);
    archive.directory(`${lambdaFunction}`);
    archive.finalize();
});


// Delete every folder in dist so only the zip files remain
