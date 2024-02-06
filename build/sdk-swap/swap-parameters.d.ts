import { Token, FixedPointNumber, TokenBalance } from '../sdk-core';
import { SwapResult, SwapTradeMode } from './types';
export declare class SwapParameters implements SwapResult {
    mode: SwapTradeMode;
    midPrice: FixedPointNumber;
    priceImpact: FixedPointNumber;
    naturalPriceImpact: FixedPointNumber;
    path: Token[];
    input: TokenBalance;
    output: TokenBalance;
    exchangeFee: FixedPointNumber;
    exchangeRate: FixedPointNumber;
    constructor(mode: SwapTradeMode, config: SwapResult);
    toChainData(): [{
        Token: string;
    }[], string, string];
}
