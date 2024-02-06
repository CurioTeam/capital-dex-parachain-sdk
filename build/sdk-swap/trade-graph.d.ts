import { Token, TokenPair } from '../sdk-core';
export declare class TradeGraph {
    private adj;
    constructor(data: TokenPair[]);
    getAdj(token: Token): Token[] | undefined;
    getPathes(start: Token, end: Token, lengthLimit?: number): Token[][];
}
