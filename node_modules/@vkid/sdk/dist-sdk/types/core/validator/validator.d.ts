import { ValidatorRule } from './types';
export declare const validator: <T extends Record<string, any>>(rules: { [key in keyof T]?: ValidatorRule[] | undefined; }) => any;
