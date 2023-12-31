// import '../interfaces/augment-api';
// import '../interfaces/augment-types';
// import '@polkadot/api-base/types/storage';

import { getApiPromise, getSwapPromiseFromApi, getDefaultAccountsKeyring } from './common';
import { FixedPointNumber, Token, TokenPair } from '../sdk-core/src';
import { LiquidityPoolHelper } from '../sdk-swap/src';
import "curio-parachain-ts-interfaces/src/interfaces/augment-api.ts"
import "node_modules/curio-parachain-ts-interfaces/src/interfaces/augment-api"
import "node_modules/curio-parachain-ts-interfaces/src/interfaces/augment-types"
import "node_modules/curio-parachain-ts-interfaces/src/interfaces/types-lookup"
 
async function main() {
    const api = await getApiPromise();

    // let we have CGT-DOT token pair
    const CGT = Token.fromCurrencyName('CGT', { decimals: 18} );
    const DOT = Token.fromCurrencyName('DOT', { decimals: 10} );

    // user selected tokens
    const tokenA = CGT;
    const tokenB = DOT;
    const pair = new TokenPair(tokenA, tokenB);

    // get liquidity pool balances
    const liquidityPool = await api.query.dex.liquidityPool(pair.toTradingPair(api));
    console.log(`Liquidity pool: ${liquidityPool[0]} ${liquidityPool[1]}`);

    // creating the helper
    const poolState = {
        token0: tokenA,
        token1: tokenB,
        pool0: new FixedPointNumber(liquidityPool[0].toString()),
        pool1: new FixedPointNumber(liquidityPool[1].toString()),
    };
    const poolHelper = new LiquidityPoolHelper(poolState);

    // getting total issuance of the pair's lp token
    const dexShare = Token.fromTokens(tokenA, tokenB).toCurrencyId(api); // lp token for the pair
    const totalShare = await api.query.tokens.totalIssuance(dexShare);

    // user specified amounts of tokens to provide as liquidity
    // !!! Precision (second arg) should be equal to token decimals if the value will be used as token amount !!!
    const tokenAAmount = new FixedPointNumber(10, tokenA.decimals);
    // !!! Precision (second arg) should be equal to token decimals if the value will be used as token amount !!!
    const tokenBAmount = new FixedPointNumber(10, tokenB.decimals);

    // estimate liquidity provition result and show to user
    const addLiquidityParams = {
        tokenA: tokenA,
        tokenB: tokenB,
        maxAmountA: tokenAAmount,
        maxAmountB: tokenBAmount,
        totalShare: new FixedPointNumber(totalShare.toString()),
    };
    const estimatedResults = poolHelper.estimateAddLiquidity(addLiquidityParams);
    
    console.log(`incrementA: ${estimatedResults.incrementA}`);
    console.log(`incrementB: ${estimatedResults.incrementB}`);
    // TODO: fix incrementShare calculation
    console.log(`incrementShare: ${estimatedResults.incrementShare}`); // !!! Is not calculated correctly due to all this precisions mess

    // Example account
    const [alice, ] = getDefaultAccountsKeyring();

    //Add liquidity after user vconfirmation
    const unsub = await api.tx.dex
        .addLiquidity(  
            tokenA.toCurrencyId(api),
            tokenB.toCurrencyId(api),
            tokenAAmount.toChainData(),
            tokenBAmount.toChainData(),
            0, // TODO: replace with actual value after calculation fix
            true // TODO: ???
        )
        .signAndSend(alice, (result) => {
            console.log(`Current status is ${result.status}`);
            if (result.status.isInBlock) {
            console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
            console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
            unsub();
            }
        });
}

main();
