const program = require('commander');
const fs = require('fs');
const csv = require('csvtojson');

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
    .option('-p, --path <path>', 'set the path to file')

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
            cssBundler(program.path);
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
    if (!isFileNameValid(filePath)) {
        console.log('Wrong file path');
        return;
    }

    csv().fromFile(filePath).then((res) => {
        console.log(res);
    });
}

function convertToFile(filePath) {
    if (!isFileNameValid(filePath)) {
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
    const writer = fs.createWriteStream(`${path}/bundle.css`);

    fs.readdir(path, (err, fileNames) => {
        if (err) {
            console.log('ERROR');
            return;
        }

        fileNames.forEach((file) => {
            const pathToFile = `${path}/${file}`;
            fs.readFile(pathToFile, (err, res) => {
                writer.write(res + '\n');
            });
        })
    });
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

function isFileNameValid(filePath) {
    const csvRegExp = /csv$/;
    return csvRegExp.test(filePath);
}