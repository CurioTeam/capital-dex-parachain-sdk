import primitivesConfig from 'curio-parachain-ts-interfaces/interfaces/primitives/definitions';
import {
  getCurrencyTypeByName,
  isBasicToken,
  isDexShareName,
  unzipDexShareName
} from './converter';
import { TokenType } from './types';

const TOKEN_TYPE_WEIGHTS = {
  [TokenType.BASIC]: 9,
  [TokenType.DEX_SHARE]: 8,
  [TokenType.FOREIGN_ASSET]: 7
};

export function getTokenTypeWeight(name: string): number {
  return 1000 * (TOKEN_TYPE_WEIGHTS[getCurrencyTypeByName(name)] || 0);
}

const TOKEN_SORT: Record<string, number> = primitivesConfig.types.TokenSymbol._enum;

export function sortTokenByName(a: string, b: string): number {
  const weightA = getTokenTypeWeight(a);
  const weightB = getTokenTypeWeight(b);

  if (weightA !== weightB) {
    return weightB - weightA;
  }

  if (isBasicToken(a) && isBasicToken(b)) {
    return TOKEN_SORT[a] - TOKEN_SORT[b];
  }

  if (isDexShareName(a) && isDexShareName(b)) {
    const [a0, a1] = unzipDexShareName(a);
    const [b0, b1] = unzipDexShareName(b);

    const [result0, result1] = [sortTokenByName(a0, a1), sortTokenByName(b0, b1)];

    if (a0 === b0) return result1;

    return result0;
  }

  return 0;
}
