const fs = require('fs');
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
                    resolve(data);
                });
            })
        });
    }

    importSync(path) {
        let content = fs.readFileSync(path).toString();
        return content;
    }
}