import { FixedPointNumber } from '../sdk-core';
import { Fee } from './types';
export declare function getTargetAmount(supplyPool: FixedPointNumber, targetPool: FixedPointNumber, supplyAmount: FixedPointNumber, exchangeFee: Fee): FixedPointNumber;
export declare function getSupplyAmount(supplyPool: FixedPointNumber, targetPool: FixedPointNumber, targetAmount: FixedPointNumber, exchangeFee: Fee): FixedPointNumber;
