import { validateStacksAddress } from "@stacks/transactions";
import BigNumber from "bignumber.js";
import validate from "bitcoin-address-validation";
import { NextFunction, Request, Response } from "express";

interface ApiRequest extends Request {
  isTestnet?: boolean;
}

// Middleware to check if it's testnet or not
const checkTestnet = (
  req: ApiRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.baseUrl.startsWith("/testnet")) {
    req.isTestnet = true;
  } else {
    req.isTestnet = false;
  }
  next();
};

const rateLimitMiddleware = async (
  req: ApiRequest,
  res: Response,
  next: NextFunction
) => {
  let requestQueue: any = [];
  const REQUEST_LIMIT = 5;
  const WINDOW_SIZE = 60000; // 1 minute in milliseconds
  const now = Date.now();
  // Remove requests older than 1 minute from request queue
  requestQueue = requestQueue.filter(
    (entry: any) => entry.timestamp + WINDOW_SIZE > now
  );

  if (requestQueue.length >= REQUEST_LIMIT) {
    // Calculate time remaining until next request is allowed
    const timeRemaining = requestQueue[0].timestamp + WINDOW_SIZE - now;
    await new Promise((resolve) => setTimeout(resolve, timeRemaining));
  }

  // Add current request to the queue
  requestQueue.push({ timestamp: now });
  next();
};



const satsToBtc = (sats: BigNumber): BigNumber => sats.multipliedBy(0.00000001);

const btcToSats = (btc: BigNumber): BigNumber => btc.multipliedBy(100000000);

const microstacksToStx = (microstacks: BigNumber): BigNumber =>
  microstacks.multipliedBy(0.000001);

const stxToMicrostacks = (stacks: BigNumber): BigNumber =>
  stacks.multipliedBy(1000000);

const getStxFiatEquivalent = (
  stxAmount: BigNumber,
  stxBtcRate: BigNumber,
  btcFiatRate: BigNumber
): BigNumber =>
  microstacksToStx(stxAmount)
    .multipliedBy(stxBtcRate)
    .multipliedBy(btcFiatRate);

const getBtcFiatEquivalent = (
  btcAmount: BigNumber,
  btcFiatRate: BigNumber
): BigNumber => satsToBtc(btcAmount).multipliedBy(btcFiatRate);

const getFiatBtcEquivalent = (
  fiatAmount: BigNumber,
  btcFiatRate: BigNumber
): BigNumber => new BigNumber(fiatAmount.dividedBy(btcFiatRate).toFixed(8));

const getStxTokenEquivalent = (
  fiatAmount: BigNumber,
  stxBtcRate: BigNumber,
  btcFiatRate: BigNumber
): BigNumber => fiatAmount.dividedBy(stxBtcRate).dividedBy(btcFiatRate);

const validateAddress = (
  address: string
): {
  address: string;
  blockchain: string[];
} => {
  if (validate(address)) return { address, blockchain: ["bitcoin"] };
  if (validateStacksAddress(address))
    return { address, blockchain: ["stacks"] };
  throw new Error("Invalid address");
};
export {
  checkTestnet,
  ApiRequest,
  rateLimitMiddleware,
  btcToSats,
  getBtcFiatEquivalent,
  getFiatBtcEquivalent,
  getStxFiatEquivalent,
  getStxTokenEquivalent,
  microstacksToStx,
  satsToBtc,
  stxToMicrostacks,
  validateAddress,
};
