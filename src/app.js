import * as config from './config/config';
import { User, Product, DirWatcher } from './models';

console.log(config.default.name);
const user = new User();
const product = new Product();
const dirWatcher = new DirWatcher();

dirWatcher.watch(__dirname + '\\data\\products.txt', 1000)

