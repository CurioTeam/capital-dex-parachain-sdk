import { AnyApi, CurrencyObject, TokenType } from './types';
import { FixedPointNumber } from './fixed-point-number';
import { CurrencyId, DexShare, TokenSymbol, TradingPair } from 'curio-parachain-ts-interfaces/interfaces';
interface Configs {
    type?: TokenType;
    chain?: string;
    display?: string;
    fullname?: string;
    symbol?: string;
    decimals?: number;
    decimal?: number;
    ed?: FixedPointNumber;
    locations?: {
        paraChainId?: number;
        generalIndex?: number;
        palletInstance?: number;
    };
}
export declare class Token {
    readonly name: string;
    readonly display: string;
    readonly fullname: string;
    readonly symbol: string;
    readonly decimals: number;
    readonly ed: FixedPointNumber;
    readonly chain: string | undefined;
    readonly type: TokenType;
    readonly pair?: [Token, Token];
    readonly locations?: {
        paraChainId?: number;
        generalIndex?: number;
        palletInstance?: number;
    };
    constructor(name: string, configs?: Configs);
    get isTokenSymbol(): boolean;
    get isDexShare(): boolean;
    get decimal(): number;
    static create(name: string, configs?: Configs): Token;
    static fromCurrencyName(name: string, configs?: Configs): Token;
    static fromCurrencyId(currency: CurrencyId, configs?: Configs): Token;
    static fromTokenSymbol(token: TokenSymbol, configs?: Configs): Token;
    static fromTokens(token1: Token, token2: Token, configs?: Configs): Token;
    static fromCurrencies(currency1: CurrencyId, currency2: CurrencyId, decimals?: number | [number, number]): Token;
    static fromTokenSymbols(currency1: TokenSymbol, currency2: TokenSymbol, decimals?: number | [number, number]): Token;
    static sortTokenNames(...names: string[]): string[];
    static sortCurrencies(...currencies: CurrencyId[]): CurrencyId[];
    static sort(...tokens: Token[]): Token[];
    toCurrencyId(api: AnyApi): CurrencyId;
    toTradingPair(api: AnyApi): TradingPair;
    toDexShare(api: AnyApi): DexShare;
    toTokenSymbol(api: AnyApi): TokenSymbol;
    clone(): Token;
    isEqual(target: Token, compare?: (token1: Token, token2: Token) => boolean): boolean;
    toChainData(): CurrencyObject;
    toString(): string;
}
export {};
