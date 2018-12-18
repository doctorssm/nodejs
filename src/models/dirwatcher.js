const fs = require('fs');
const events = require('events');
export const eventEmitter = new events.EventEmitter();

export class DirWatcher {
    constructor() {
        console.log('ctor: DirWatcher');
    }

    watch(path, delay) {
        // fs.watch(path, function (curr, prev) {
        //     setTimeout(() => {
        //         eventEmitter.emit('changed');
        //     }, delay);
        // });

        let context = '';

        fs.readFile(path, 'utf8', function (err, data) {
            console.log('context == data', context == data)
            if (context == data) {
                return;
            }

            context = data;
            setTimeout(() => {
                eventEmitter.emit('changed');
            }, delay);

        });

    }
}