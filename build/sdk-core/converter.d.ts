import { CurrencyObject, MaybeCurrency, TokenType } from './types';
export declare function isBasicToken(name: string): boolean;
export declare function createDexShareName(name1: string, name2: string): string;
export declare function isDexShareName(name: string): boolean;
export declare function unzipDexShareName(name: string): [string, string];
export declare function getCurrencyTypeByName(name: string): TokenType;
export declare function getTokenCurrencyObject(name: string): CurrencyObject;
export declare function getDexShareCurrencyObject(name: string): CurrencyObject;
export declare function getCurrencyObject(name: string): CurrencyObject;
export declare function forceToCurrencyName(target: MaybeCurrency): string;
