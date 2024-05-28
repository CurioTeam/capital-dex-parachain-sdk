interface IBasicToken {
    symbol: string;
    decimals: number;
    currencyId: {
        Token: string;
    };
}
interface IForeignAsset {
    symbol: string;
    decimals: number;
    currencyId: {
        ForeignAsset: number;
    };
}
type IToken = IBasicToken | IForeignAsset;
export declare const TOKENS_LIST: IToken[];
export declare const TOKEN_NAME_TO_TOKEN_MAP: Map<string, IToken>;
export declare const FOREIGN_ASSET_ID_TO_TOKEN_MAP: Map<number, IForeignAsset>;
export {};
