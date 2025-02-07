import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { PAdicNumber } from './modules/p-adic-number.class';

const a = new PAdicNumber(2, [1, 0, 1, 0, 1, 0, 0, 0]);
console.log(a.toString());
