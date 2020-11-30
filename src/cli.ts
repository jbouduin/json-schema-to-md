import { Main } from './lib/main';

const instance = new Main();
instance.process(process.argv.slice(2));