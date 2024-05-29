"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedPointNumber = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const lodash_1 = require("lodash");
function genFnFromBigNumber(fn, noRight) {
    if (noRight) {
        return function () {
            return this.inner[fn]();
        };
    }
    return function (right) {
        const temp = right.clone();
        this.alignPrecision(temp);
        return this.inner[fn](temp._getInner());
    };
}
const BN = bignumber_js_1.default.clone();
let GLOBAL_PRECISION = 18;
class FixedPointNumber {
    constructor(origin, precision = GLOBAL_PRECISION) {
        this.isGreaterThan = genFnFromBigNumber('isGreaterThan', false).bind(this);
        this.isGreaterThanOrEqualTo = genFnFromBigNumber('isGreaterThanOrEqualTo', false).bind(this);
        this.isLessThan = genFnFromBigNumber('isLessThan', false).bind(this);
        this.isLessOrEqualTo = genFnFromBigNumber('isLessThanOrEqualTo', false).bind(this);
        this.isEqualTo = genFnFromBigNumber('isEqualTo', false).bind(this);
        this.isZero = genFnFromBigNumber('isZero', true).bind(this);
        this.isNaN = genFnFromBigNumber('isNaN', true).bind(this);
        this.isFinaite = genFnFromBigNumber('isFinite', true).bind(this);
        this.isNegative = genFnFromBigNumber('isNegative', true).bind(this);
        this.isPositive = genFnFromBigNumber('isPositive', true).bind(this);
        this.add = this.plus;
        this.sub = this.minus;
        this.mul = this.times;
        this.lt = this.isLessThan;
        this.gt = this.isGreaterThan;
        this.lte = this.isLessOrEqualTo;
        this.gte = this.isGreaterThanOrEqualTo;
        this.eq = this.isEqualTo;
        if (typeof origin !== 'number' && typeof origin !== 'string')
            throw new Error('FixedPointNumber constructor should use number or string');
        this.precision = precision;
        this.inner = new BN(origin).shiftedBy(this.precision);
    }
    static setGlobalPrecision(precision = 18) {
        GLOBAL_PRECISION = precision;
    }
    static fromRational(numerator, denominator, precision = 18) {
        const _numerator = numerator instanceof FixedPointNumber ? numerator._getInner() : new BN(numerator);
        const _denominator = denominator instanceof FixedPointNumber ? denominator._getInner() : new BN(denominator);
        const inner = _numerator.times(10 ** precision).div(_denominator);
        const temp = new FixedPointNumber(0, precision);
        temp._setInner(inner);
        return temp;
    }
    static fromInner(origin, precision = 18) {
        const inner = new BN(origin);
        const temp = new FixedPointNumber(0, precision);
        temp._setInner(inner);
        return temp;
    }
    static _fromBN(origin, precision = 18) {
        const temp = new FixedPointNumber(0, precision);
        temp._setInner(origin);
        return temp;
    }
    _setInner(origin) {
        this.inner = origin;
    }
    _getInner() {
        return this.inner;
    }
    setMode(dp = 0, rm = 3) {
        BN.config({
            DECIMAL_PLACES: dp,
            ROUNDING_MODE: rm,
            EXPONENTIAL_AT: [-100, 100]
        });
    }
    toNumber(dp, rm = 3) {
        this.setMode();
        return this.inner
            .shiftedBy(-this.precision)
            .dp((0, lodash_1.isNumber)(dp) ? dp : this.precision || 8, rm)
            .toNumber();
    }
    toString(dp, rm = 3) {
        this.setMode();
        return this.inner
            .shiftedBy(-this.precision)
            .dp((0, lodash_1.isNumber)(dp) ? dp : this.precision || 8, rm)
            .toString();
    }
    toChainData() {
        return this.inner.toFixed(0, 3);
    }
    trunc() {
        this.setMode();
        const DIV = 10 ** this.precision;
        const inner = this._getInner().abs().div(DIV).dp(0, 3).times(DIV);
        if (this.isNegative()) {
            return FixedPointNumber._fromBN(inner.negated());
        }
        else {
            return FixedPointNumber._fromBN(inner);
        }
    }
    frac() {
        const integer = this.trunc();
        const fractional = this.minus(integer);
        if (integer.isZero()) {
            return fractional;
        }
        else {
            return fractional.abs();
        }
    }
    alignPrecision(b) {
        if (this.precision !== b.precision) {
            b.setPrecision(this.precision);
        }
    }
    setPrecision(precision) {
        const oldPrecision = this.precision;
        this.precision = precision;
        this._setInner(this.inner.shiftedBy(this.precision - oldPrecision));
    }
    forceSetPrecision(precision) {
        this.precision = precision;
    }
    getPrecision() {
        return this.precision;
    }
    abs() {
        return FixedPointNumber._fromBN(this.inner.abs(), this.precision);
    }
    plus(right) {
        const temp = right.clone();
        this.alignPrecision(temp);
        this.setMode();
        return FixedPointNumber._fromBN(this.inner.plus(temp.inner), this.precision);
    }
    minus(right) {
        const temp = right.clone();
        this.alignPrecision(temp);
        this.setMode();
        return FixedPointNumber._fromBN(this.inner.minus(temp.inner), this.precision);
    }
    times(right) {
        const temp = right.clone();
        this.alignPrecision(temp);
        this.setMode();
        return FixedPointNumber._fromBN(this.inner.times(temp.inner).shiftedBy(-this.precision), this.precision);
    }
    div(right) {
        const temp = right.clone();
        this.alignPrecision(temp);
        this.setMode();
        return FixedPointNumber._fromBN(this.inner.shiftedBy(this.precision).div(temp.inner), this.precision);
    }
    reciprocal() {
        return FixedPointNumber.ONE.div(this);
    }
    clone() {
        return FixedPointNumber.fromInner(this.inner.toString(), this.precision);
    }
    min(...targets) {
        const temp = targets.map((item) => item.clone());
        temp.forEach((item) => this.alignPrecision(item));
        return FixedPointNumber._fromBN(bignumber_js_1.default.min.apply(null, [this.inner, ...temp.map((i) => i._getInner())]), this.precision);
    }
    max(...targets) {
        const temp = targets.map((item) => item.clone());
        temp.forEach((item) => this.alignPrecision(item));
        return FixedPointNumber._fromBN(bignumber_js_1.default.max.apply(null, [this.inner, ...temp.map((i) => i._getInner())]), this.precision);
    }
}
exports.FixedPointNumber = FixedPointNumber;
FixedPointNumber.ZERO = new FixedPointNumber(0);
FixedPointNumber.ONE = new FixedPointNumber(1);
FixedPointNumber.TWO = new FixedPointNumber(2);
FixedPointNumber.THREE = new FixedPointNumber(3);
FixedPointNumber.FOUR = new FixedPointNumber(4);
FixedPointNumber.FIVE = new FixedPointNumber(5);
FixedPointNumber.SIX = new FixedPointNumber(6);
FixedPointNumber.TEN = new FixedPointNumber(10);
