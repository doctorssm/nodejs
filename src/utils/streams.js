const program = require('commander');
const fs = require('fs');
const csv = require('csvtojson');
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
    .option('-p, --path [path]', 'set the path to file')

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
        case 'convertFromFile':
            convertFromFile(program.file);
            break;
        case 'convertToFile':
            convertToFile(program.file);
            break;
        case 'cssBundler':
            convertToFile(program.path);
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
    const reader = fs.createReadStream(filePath);

    reader.on('readable', () => {
        const buffer = reader.read();

        if (buffer) {
            process.stdout.write(convertBufferToString(buffer));
        }
    });
}

function convertFromFile(filePath) {
    csv().fromFile(filePath).then((res) => {
        console.log(res);
    });
}

function convertToFile(filePath) {
    if (!/csv$/.test(filePath)) {
        console.log('Wrong file path');
        return;
    }

    const path = filePath.replace('csv', 'json');
    const writer = fs.createWriteStream(path);

    csv().fromFile(filePath).then((res) => {
        writer.write(JSON.stringify(res));
    });
}

function cssBundler(path) {
    console.log('cssBundler ', path);
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