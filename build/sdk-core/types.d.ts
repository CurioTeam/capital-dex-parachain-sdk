import { CurrencyId } from 'curio-parachain-ts-interfaces/interfaces';
import { ApiPromise, ApiRx } from '@polkadot/api';
import { AccountId } from '@polkadot/types/interfaces';
import { Codec, Observable } from '@polkadot/types/types';
import { Token } from './token';
export type AnyApi = ApiPromise | ApiRx;
export type ObOrPromiseResult<T extends AnyApi, R> = T extends ApiRx ? Observable<R> : Promise<R>;
export type MaybeCurrency = number | string | CurrencyId | Token | Codec | [string, string];
export type MaybeAccount = string | AccountId | Codec;
export declare enum TokenType {
    'BASIC' = 0,
    'DEX_SHARE' = 1
}
export type CurrencyObject = {
    Token: string;
} | {
    DexShare: [CurrencyObject, CurrencyObject];
};
