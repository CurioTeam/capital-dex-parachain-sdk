import { ApiPromise, ApiRx } from '@polkadot/api';
import { Observable, BehaviorSubject } from 'rxjs';
import { Token, TokenPair, FixedPointNumber } from '../sdk-core';
import { LiquidityPool, SwapResult, Fee, SwapTradeMode, MiddleResult } from './types';
import { SwapParameters } from './swap-parameters';
export declare abstract class SwapBase<T extends ApiPromise | ApiRx> {
    protected api: T;
    protected enableTradingPairs$: BehaviorSubject<TokenPair[]>;
    readonly constants: {
        tradingPathLimit: number;
        fee: Fee;
    };
    constructor(api: T);
    protected abstract getTradingPairs(): Observable<TokenPair[]>;
    get config(): {
        tradingPathLimit: number;
        fee: Fee;
    };
    private queryConstants;
    protected getTokenPairsFromPath(path: Token[]): TokenPair[];
    protected isTradingPairEnable(currency1: Token, currency2: Token, enablePairs: TokenPair[]): boolean;
    private isPathUseable;
    getTradingPaths(input: Token, output: Token): Observable<Token[][]>;
    protected sortLiquidityPoolWithTokenOrder(pool: LiquidityPool, token1: Token): [FixedPointNumber, FixedPointNumber];
    protected getOutputAmountWithExactInput(inputToken: Token, outputToken: Token, inputAmount: FixedPointNumber, outputAmount: FixedPointNumber, path: Token[], liquidityPools: LiquidityPool[]): SwapResult;
    protected getInputAmountWithExactOutput(inputToken: Token, outputToken: Token, inputAmount: FixedPointNumber, outputAmount: FixedPointNumber, path: Token[], liquidityPools: LiquidityPool[]): SwapResult;
    protected calculateExchangeFee(path: Token[], input: FixedPointNumber, fee: Fee, decimal: number): {
        fee: FixedPointNumber;
        rate: FixedPointNumber;
    };
    protected calculateMidPrice(path: Token[], pools: LiquidityPool[]): FixedPointNumber;
    protected calculatePriceImpact(midPrice: FixedPointNumber, inputAmount: FixedPointNumber, outputAmount: FixedPointNumber): FixedPointNumber;
    protected transformToSwapResult(result: MiddleResult): SwapResult;
    protected getBestSwapResult(mode: SwapTradeMode, paths: Token[][], liquidityPools: LiquidityPool[], baseParams: [Token, Token, FixedPointNumber, FixedPointNumber]): SwapParameters;
}
