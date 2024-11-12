import Web3 from "web3";
import { INFURA_PROVIDER_URL } from "../common/constants";

export const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_PROVIDER_URL));
