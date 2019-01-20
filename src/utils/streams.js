const program = require('commander');
const fs = require('fs');
// const through = require('through2');
// const stream = through(write, end);

// function write(buffer, encoding, next) {
//     this.push('I got some data ' + buffer + '\n');
//     console.log('write');
//     next();
// }

// function end(done) {
//     console.log('end');
//     done();
// }

let args = process.argv.slice(2);
const helpRegExp = /^(-h|--help)$/;

if (!args.length) {
    console.log('No inputs found!')
    program.outputHelp();
}

if (hasHelpArg(args) && !isHelpArg(args[0])) {
    process.argv = process.argv.filter((arg) => !isHelpArg(arg));
}

program.version('0.1.0')
    .option('-a, --action <type>', 'action type')
    .option('-f, --file [path]', 'set the path to file')

program.on('--help', function () {
    console.log('HELP!, SOS!');
});

program.parse(process.argv);

if (program.action) {
    handleActionOption(program.action)
}

function handleActionOption(arg) {
    switch (arg) {
        case 'reverse':
            reverse(arg);
            break;
        case 'transform':
            transform(arg);
            break;
        case 'outputFile':
            outputFile(program.file);
            break;
        default:
            console.log('ERROR');
    }
}

function reverse(str) {
    process.stdin.on('data', (data) => {
        const reversedStr = convertBufferToString(data).split('').reverse().join('');
        process.stdout.write(`${reversedStr}\n`);
    });
}

function transform(str) {
    process.stdin.on('data', (data) => {
        const upperCaseStr = convertBufferToString(data).toUpperCase();
        process.stdout.write(`${upperCaseStr}\n`);
    });
}

function outputFile(filePath) {
    console.log('outputFile', filePath);

    fs.readFile(filePath, (err, data) => {
        console.log(data.toString())
    })
}

function convertFromFile(filePath) {
    console.log('convertFromFile', filePath);
}

function convertToFile(filePath) {
    console.log('convertToFile', filePath);
}

// HELPER FN
// ============================================

function isHelpArg(arg) {
    return helpRegExp.test(arg);
}

function hasHelpArg(ar) {
    return ar.some((arg) => isHelpArg(arg));
}

function convertBufferToString(buffer) {
    return buffer.toString().trim();
}