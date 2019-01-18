const fs = require('fs');
const csv = require('csvtojson');

import {
    eventEmitter
} from './dirwatcher'

export class Importer {
    constructor() {
        console.log('ctor: Importer');
    }

    import(path) {
        return new Promise((resolve, reject) => {
            eventEmitter.on('changed', () => {
                fs.readFile(path, 'utf8', function (err, data) {
                    if (err) throw err;
                    resolve(csv().fromString(data));
                });
            })
        });
    }

    importSync(path) {
        let content = fs.readFileSync(path).toString();
        return content;
    }
}