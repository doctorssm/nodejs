const program = require('commander');

program.version('0.1.0')
    .option('-a, --action <type>', 'action type')
    .option('-f, --file [path]', 'set the path to file')

program.on('--help', function () {
   console.log('HELP!, SOS!');
});

program.parse(process.argv);


 console.log(program)
console.log('================================================')

console.log('help: ', program.help);
 console.log('action: ', program.action);
console.log('file: ', program.file);

function actionHandler(arg) {
    console.log('YO', arg);
}



function reverse(str) {
    console.log('reverse', str);
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