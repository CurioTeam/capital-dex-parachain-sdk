"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOREIGN_ASSET_ID_TO_TOKEN_MAP = exports.TOKEN_NAME_TO_TOKEN_MAP = exports.TOKENS_LIST = void 0;
;
;
exports.TOKENS_LIST = [
    {
        symbol: "CGT",
        decimals: 18,
        currencyId: { Token: "CGT" },
    },
    {
        symbol: "KSM",
        decimals: 12,
        currencyId: { Token: "KSM" },
    },
    {
        symbol: "DAI",
        decimals: 18,
        currencyId: { Token: "DAI" },
    },
    {
        symbol: "USDC",
        decimals: 6,
        currencyId: { Token: "USDC" },
    },
    {
        symbol: "BSX",
        decimals: 12,
        currencyId: { ForeignAsset: 0 },
    },
    {
        symbol: "VAL",
        decimals: 18,
        currencyId: { ForeignAsset: 2 },
    },
    {
    symbol: "PSWAP",
    decimals: 18,
    currencyId: { ForeignAsset: 3 },
    },
];
exports.TOKEN_NAME_TO_TOKEN_MAP = new Map(exports.TOKENS_LIST.map((token) => [token.symbol, token]));
exports.FOREIGN_ASSET_ID_TO_TOKEN_MAP = new Map(exports.TOKENS_LIST.filter(token => 'ForeignAsset' in token.currencyId)
    .map(token => [token.currencyId.ForeignAsset, token]));
