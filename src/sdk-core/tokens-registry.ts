interface IBasicToken {
  symbol: string,
  decimals: number,
  currencyId: { Token: string }
};

interface IForeignAsset {
  symbol: string,
  decimals: number,
  currencyId: { ForeignAsset: number }
};

type IToken = IBasicToken | IForeignAsset;

export const TOKENS_LIST: IToken[] = [
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
  }
];

export const TOKEN_NAME_TO_TOKEN_MAP = new Map<string, IToken>(TOKENS_LIST.map((token) => [token.symbol, token]));
export const FOREIGN_ASSET_ID_TO_TOKEN_MAP = new Map<number, IForeignAsset>(
  (TOKENS_LIST.filter(token => 'ForeignAsset' in token.currencyId) as IForeignAsset[])
    .map(token => [token.currencyId.ForeignAsset, token])
);