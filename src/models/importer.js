const fs = require('fs');
import {
    eventEmitter
} from './dirwatcher'

export class Importer {
    constructor() {
        console.log('ctor: Importer');
    }

    import(path) {
        console.log('[IMPORTER]: I hear a changed!');
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
        console.log('[IMPORTER SYNC]: I hear a changed!');
        let content = fs.readFileSync(path).toString();
        return content;
    }
}