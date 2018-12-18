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
                let content = fs.readFileSync(path);
                resolve(content);
            })
        });
    }

    importSync(path) {
        console.log('[IMPORTER SYNC]: I hear a changed!');
        return new Promise((resolve, reject) => {
            eventEmitter.on('changed', () => {
                let content = fs.readFileSync(path);
                resolve(content);
            })
        });
    }
}