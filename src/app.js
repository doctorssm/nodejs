import * as config from './config/config';
import { User, Product } from './models';

console.log(config.default.name);
const user = new User();
const product = new Product();
