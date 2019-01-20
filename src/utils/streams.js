const program = require('commander');

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
    .option('-a, --action <type>', 'action type', handleActionOption)
    .option('-f, --file [path]', 'set the path to file')

program.on('--help', function () {
    console.log('HELP!, SOS!');
});

program.parse(process.argv);

function handleActionOption(arg) {
    switch (arg) {
        case 'reverse':
            reverse(arg);
            break;
        default:
            console.log('ERROR');
    }
}

function reverse(str) {
    process.stdin.on('data', (data) => {
        const reversedStr = data.toString().trim().split('').reverse().join('');
        process.stdout.write(`${reversedStr}\n`);
    });
}

function transform(str) {
    console.log('transform', str);
}

function outputFile(filePath) {
    console.log('outputFile', filePath);
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