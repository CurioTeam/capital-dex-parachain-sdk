"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoTradingPathError = exports.AmountTooSmall = exports.NoLiquidityPoolError = exports.InsufficientLiquidityError = void 0;
class InsufficientLiquidityError extends Error {
    constructor() {
        super();
        this.name = 'InsufficientLiquidity';
        this.message = 'Insufficient Liquidity';
    }
}
exports.InsufficientLiquidityError = InsufficientLiquidityError;
class NoLiquidityPoolError extends Error {
    constructor() {
        super();
        this.name = 'NoLiquidityPool';
        this.message = 'No Liquidity Pool';
    }
}
exports.NoLiquidityPoolError = NoLiquidityPoolError;
class AmountTooSmall extends Error {
    constructor() {
        super();
        this.name = 'AmountTooSmall';
        this.message = 'Amount Too Samll';
    }
}
exports.AmountTooSmall = AmountTooSmall;
class NoTradingPathError extends Error {
    constructor() {
        super();
        this.name = 'NoTradingPath';
        this.message = 'No Trading Path';
    }
}
exports.NoTradingPathError = NoTradingPathError;
