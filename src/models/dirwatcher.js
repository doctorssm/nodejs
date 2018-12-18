const fs = require('fs');
// var path = require("path");
var events = require('events');
var eventEmitter = new events.EventEmitter();

export class DirWatcher {
    constructor() {
        console.log('ctor: DirWatcher');
        eventEmitter.on('changed', this.myEventHandler);
    }

    myEventHandler() {
        console.log('I hear a changed!');
    }

    watch(path, delay) {
        console.log(path);

        // let content = fs.readFileSync(path);
        // console.log(content)

       

        fs.watchFile(path, function (curr, prev) {
            // on file change we can read the new xml
            setTimeout(() => {
                eventEmitter.emit('changed');

            }, delay);
            // fs.readFile(path, 'utf8', function (err, data) {
            //     if (err) throw err;
            //     console.dir(data);
            //     console.log('Done');
            // });
        });
    }


}

