"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupplyAmount = exports.getTargetAmount = void 0;
const sdk_core_1 = require("../sdk-core");
function getTargetAmount(supplyPool, targetPool, supplyAmount, exchangeFee) {
    if (supplyAmount.isZero() || supplyPool.isZero() || targetPool.isZero())
        return sdk_core_1.FixedPointNumber.ZERO;
    const supplyAmountWithFee = supplyAmount.times(exchangeFee.denominator.minus(exchangeFee.numerator));
    const numerator = supplyAmountWithFee.times(targetPool);
    const denominator = supplyPool.times(exchangeFee.denominator).plus(supplyAmountWithFee);
    if (denominator.isZero())
        return sdk_core_1.FixedPointNumber.ZERO;
    return numerator.div(denominator);
}
exports.getTargetAmount = getTargetAmount;
function getSupplyAmount(supplyPool, targetPool, targetAmount, exchangeFee) {
    if (targetAmount.isZero() || supplyPool.isZero() || targetPool.isZero())
        return sdk_core_1.FixedPointNumber.ZERO;
    const { numerator: feeNumerator, denominator: feeDenominator } = exchangeFee;
    const numerator = supplyPool.times(targetAmount).times(feeDenominator);
    const denominator = targetPool
        .minus(targetAmount)
        .times(feeDenominator.minus(feeNumerator))
        .max(sdk_core_1.FixedPointNumber.ZERO);
    if (denominator.isZero())
        return sdk_core_1.FixedPointNumber.ZERO;
    return sdk_core_1.FixedPointNumber.fromInner(numerator.div(denominator)._getInner().toNumber() + 1, numerator.getPrecision());
}
exports.getSupplyAmount = getSupplyAmount;
