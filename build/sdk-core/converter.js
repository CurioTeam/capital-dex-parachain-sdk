"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceToCurrencyName = exports.getCurrencyObject = exports.getDexShareCurrencyObject = exports.getTokenCurrencyObject = exports.getCurrencyTypeByName = exports.unzipDexShareName = exports.isDexShareName = exports.createDexShareName = exports.isBasicToken = void 0;
const errors_1 = require("./errors");
const token_1 = require("./token");
const types_1 = require("./types");
const constants_1 = require("./constants");
const tokens_registry_1 = require("./tokens-registry");
function isBasicToken(name) {
    return name.search('//') < 0;
}
exports.isBasicToken = isBasicToken;
function createDexShareName(name1, name2) {
    return `lp://${encodeURIComponent(name1)}/${encodeURIComponent(name2)}`;
}
exports.createDexShareName = createDexShareName;
function isDexShareName(name) {
    return name.startsWith('lp://');
}
exports.isDexShareName = isDexShareName;
function unzipDexShareName(name) {
    if (!isDexShareName(name))
        throw new errors_1.NotDexShareName(name);
    const reg = /^lp:\/\/([^/]*)?\/([^/]*)$/;
    const result = reg.exec(name);
    if (!result)
        throw new errors_1.NotDexShareName(name);
    return [decodeURIComponent(result[1]), decodeURIComponent(result[2])];
}
exports.unzipDexShareName = unzipDexShareName;
function getCurrencyTypeByName(name) {
    if (isDexShareName(name))
        return types_1.TokenType.DEX_SHARE;
    if (constants_1.BASIC_TOKEN_SYMBOLS.includes(name)) {
        return types_1.TokenType.BASIC;
    }
    return types_1.TokenType.FOREIGN_ASSET;
}
exports.getCurrencyTypeByName = getCurrencyTypeByName;
function getTokenCurrencyObject(name) {
    if (!tokens_registry_1.TOKEN_NAME_TO_TOKEN_MAP.has(name)) {
        throw Error(`Unexpected token name: ${name}`);
    }
    return tokens_registry_1.TOKEN_NAME_TO_TOKEN_MAP.get(name).currencyId;
}
exports.getTokenCurrencyObject = getTokenCurrencyObject;
function getDexShareCurrencyObject(name) {
    const inner = (name) => {
        if (isDexShareName(name)) {
            const [name1, name2] = unzipDexShareName(name);
            return { DexShare: [inner(name1), inner(name2)] };
        }
        return getTokenCurrencyObject(name);
    };
    return inner(name);
}
exports.getDexShareCurrencyObject = getDexShareCurrencyObject;
function getCurrencyObject(name) {
    if (isDexShareName(name))
        return getDexShareCurrencyObject(name);
    return getTokenCurrencyObject(name);
}
exports.getCurrencyObject = getCurrencyObject;
function forceToCurrencyName(target) {
    try {
        if (typeof target === 'string')
            return target;
        if (Array.isArray(target))
            return createDexShareName(target[0], target[1]);
        if (target instanceof token_1.Token)
            return target.toString();
        if (target.isToken)
            return target.asToken.toString();
        if (target.isDexShare)
            return target.asDexShare.toString();
        if (target.isForeignAsset) {
            const assetId = target.asForeignAsset.toNumber();
            const foreignAsset = tokens_registry_1.FOREIGN_ASSET_ID_TO_TOKEN_MAP.get(assetId);
            if (foreignAsset) {
                return foreignAsset.symbol;
            }
        }
        ;
        return target.toString();
    }
    catch (e) {
        throw new errors_1.ConvertToCurrencyNameFailed(target);
    }
}
exports.forceToCurrencyName = forceToCurrencyName;
