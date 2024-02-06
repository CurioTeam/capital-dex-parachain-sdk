import { ApiPromise } from '@polkadot/api';
import { Observable } from 'rxjs';
import { Token, TokenPair, TokenSet } from '../sdk-core';
import { FixedPointNumber } from '../sdk-core';
import { SwapParameters } from './swap-parameters';
import { LiquidityPool, SwapTradeMode } from './types';
import { SwapBase } from './swap-base';
export declare class SwapPromise extends SwapBase<ApiPromise> {
    constructor(api: ApiPromise);
    get availableTokens(): Observable<TokenSet>;
    getEnableTradingPairs(): Promise<TokenPair[]>;
    private getLiquidityPoolsByPath;
    private _getTradingPairs;
    protected getTradingPairs(): Observable<TokenPair[]>;
    swapper: import("@polkadot/util/types").Memoized<(inputToken: Token, outputToken: Token) => Observable<[LiquidityPool[], Token[][]]>>;
    swap(path: [Token, Token], input: FixedPointNumber, mode: SwapTradeMode): Promise<SwapParameters | undefined>;
}
