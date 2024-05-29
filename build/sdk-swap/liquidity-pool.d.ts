import { FixedPointNumber, Token } from '../sdk-core';
interface LiquidityPoolState {
    token0: Token;
    token1: Token;
    pool0: FixedPointNumber;
    pool1: FixedPointNumber;
}
interface AddLiquidityParams {
    tokenA: Token;
    tokenB: Token;
    maxAmountA: FixedPointNumber;
    maxAmountB: FixedPointNumber;
    totalShare: FixedPointNumber;
}
export declare class LiquidityPoolHelper {
    readonly token0: Token;
    readonly token1: Token;
    readonly pool0: FixedPointNumber;
    readonly pool1: FixedPointNumber;
    constructor(state: LiquidityPoolState);
    estimateAddLiquidity(params: AddLiquidityParams): {
        incrementA: FixedPointNumber;
        incrementB: FixedPointNumber;
        incrementShare: FixedPointNumber;
    };
}
export {};
