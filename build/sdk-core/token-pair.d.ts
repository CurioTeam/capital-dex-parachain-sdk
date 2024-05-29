import { Token } from './token';
import { CurrencyId, TradingPair } from 'curio-parachain-ts-interfaces/interfaces';
import { AnyApi } from './types';
export declare class TokenPair {
    private token1;
    private token2;
    private origin;
    static fromCurrencyId(currency: CurrencyId): TokenPair;
    static fromCurrencies(currency1: CurrencyId, currency2: CurrencyId): TokenPair;
    static fromTrandingPair(tradingPair: TradingPair): TokenPair;
    constructor(token1: Token, token2: Token);
    getOrigin(): [Token, Token];
    getPair(): [Token, Token];
    isEqual(pair: TokenPair, compare?: (token1: Token, token2: Token) => boolean): boolean;
    toChainData(): [{
        Token: string;
    }, {
        Token: string;
    }];
    toTradingPair(api: AnyApi): TradingPair;
}
