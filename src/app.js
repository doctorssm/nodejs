import * as config from './config/config';
import { User, Product, DirWatcher, Importer } from './models';

console.log(config.default.name);
const user = new User();
const product = new Product();

const dirWatcher = new DirWatcher();
const importer = new Importer();
const fileName = `${__dirname}\\data\\products.csv`;

dirWatcher.watch(fileName, 1000);
importer.import(fileName).then((res) => console.log('res', res))
// let importSyncContent = importer.importSync(fileName);

// console.log('importSyncContent', importSyncContent)



