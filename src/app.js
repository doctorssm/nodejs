import * as config from './config/config';
import { User, Product, DirWatcher, Importer } from './models';

console.log(config.default.name);
const user = new User();
const product = new Product();
const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.watch(__dirname + '\\data\\products.csv', 1000);
let content = importer.import();

