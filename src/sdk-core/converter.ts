import {
  ConvertToCurrencyIdFailed,
  ConvertToCurrencyNameFailed,
  NotDexShareName,
} from './errors';
import { CurrencyId } from 'curio-parachain-ts-interfaces/interfaces';
import { Token } from './token';
import { AnyApi, CurrencyObject, MaybeCurrency, TokenType } from './types';
import { BASIC_TOKEN_SYMBOLS, DEPRECATED_STABLE_SYMBOLS, NATIVE_TOKEN_SYMBOL, PARENT_TOKEN_SYMBOL } from './constants';
import { FOREIGN_ASSET_ID_TO_TOKEN_MAP, TOKEN_NAME_TO_TOKEN_MAP } from './tokens-registry';

/**
 *  we set a name with a prefix to all types of tokens for easy passing and use.
 *  e.g.
 *  { DexShare: [{ Token: KAR }, { Token: KSM }] } is lp://KAR/KSM
 *  { stableAsset: 0 } is sa://0
 *  { foreignAsset: 0 } is fa://0
 *  { ERC20: '0x100000000' } is erc20://0x10000
 *  we can also combine these name for complex types
 *  e.g.
 *  lp://${encode(lp://KAR/KSM)}/${encode(sa://0)} is { DexShare: [ { DexShare: [{ Token: 'KAR' }, { Token: 'KSM}] }, { stableAsset: 0 } ] }
 */
export function isBasicToken(name: string): boolean {
  return name.search('//') < 0;
}

// for dex share
export function createDexShareName(name1: string, name2: string): string {
  return `lp://${encodeURIComponent(name1)}/${encodeURIComponent(name2)}`;
}

export function isDexShareName(name: string): boolean {
  return name.startsWith('lp://');
}
/**
 * @name unzipDexShareName
 * @description unzip dex share name to two token name, e.g. lp://KAR/KSM -> [KAR, KSM];
 */
export function unzipDexShareName(name: string): [string, string] {
  if (!isDexShareName(name)) throw new NotDexShareName(name);

  const reg = /^lp:\/\/([^/]*)?\/([^/]*)$/;

  const result = reg.exec(name);

  if (!result) throw new NotDexShareName(name);

  return [decodeURIComponent(result[1]), decodeURIComponent(result[2])] as [string, string];
}

export function getCurrencyTypeByName(name: string): TokenType {

  if (isDexShareName(name)) return TokenType.DEX_SHARE;

  if (BASIC_TOKEN_SYMBOLS.includes(name)) {
    return TokenType.BASIC;
  }

  return TokenType.FOREIGN_ASSET;
}

export function getTokenCurrencyObject(name: string): CurrencyObject {
  if (!TOKEN_NAME_TO_TOKEN_MAP.has(name)) {
    throw Error(`Unexpected token name: ${name}`);
  }
  return TOKEN_NAME_TO_TOKEN_MAP.get(name)!.currencyId;
}

export function getDexShareCurrencyObject(name: string): CurrencyObject {
  const inner = (name: string): CurrencyObject => {
    if (isDexShareName(name)) {
      const [name1, name2] = unzipDexShareName(name);

      return { DexShare: [inner(name1), inner(name2)] };
    }

    return getTokenCurrencyObject(name);
  };

  return inner(name);
}

export function getCurrencyObject(name: string): CurrencyObject {
  if (isDexShareName(name)) return getDexShareCurrencyObject(name);

  return getTokenCurrencyObject(name);
}

/**
 * @name forceToCurrencyName
 * @description convert `maybeCurrency` to currency name
 */
export function forceToCurrencyName(target: MaybeCurrency): string {
  try {
    if (typeof target === 'string') return target;

    if (Array.isArray(target)) return createDexShareName(target[0], target[1]);

    if (target instanceof Token) return target.toString();

    if ((target as CurrencyId).isToken) return (target as CurrencyId).asToken.toString();
    
    if ((target as CurrencyId).isDexShare) return (target as CurrencyId).asDexShare.toString();

    if ((target as CurrencyId).isForeignAsset) {
      const assetId = (target as CurrencyId).asForeignAsset.toNumber();
      const foreignAsset = FOREIGN_ASSET_ID_TO_TOKEN_MAP.get(assetId);
      if (foreignAsset) {
        return foreignAsset.symbol;
      }
    };

    return target.toString();
  } catch (e) {
    throw new ConvertToCurrencyNameFailed(target);
  }
}