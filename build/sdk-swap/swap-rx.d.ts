import { ApiRx } from '@polkadot/api';
import { Observable } from 'rxjs';
import { Token, TokenPair, TokenSet, FixedPointNumber } from '../sdk-core';
import { SwapParameters } from './swap-parameters';
import { LiquidityPool, SwapTradeMode } from './types';
import { SwapBase } from './swap-base';
export declare class SwapRx extends SwapBase<ApiRx> {
    constructor(api: ApiRx);
    get enableTradingPairs(): Observable<TokenPair[]>;
    get availableTokens(): Observable<TokenSet>;
    protected getTradingPairs(): Observable<TokenPair[]>;
    private getLiquidityPoolsByPath;
    _swapper: import("@polkadot/util/types").Memoized<(inputToken: Token, outputToken: Token) => Observable<[LiquidityPool[], Token[][]]>>;
    swap(path: [Token, Token], input: FixedPointNumber, mode: SwapTradeMode): Observable<SwapParameters>;
}
