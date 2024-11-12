import dotenv from "dotenv";

dotenv.config();

export const MOONPAY_KEY = process.env.MOONPAY_KEY;
export const CDP_SECRET = JSON.parse(process.env.CDP_SECRET as string);
export const CLOUDFRONT_URL = "https://cdn.orangecrypto.com/assets";
export const COINS = [
  {
    id: "alex",
    name: "ALEX LABS",
    ticker: "ALEX", 
    description:
      "Bring your Bitcoin to Life: launch new projects, earn interest, rewrite finance, reinvent culture",
    image: "https://cdn.orangecrypto.com/assets/alexgo-orange-40px.svg",
    decimals: 8,
    supported: true,
    contract:
      "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.age000-governance-token",
  },
  {
    id: "atalexv2",
    name: "Auto-staked $ALEX",
    ticker: "atALEXv2",
    description:
      "Bring your Bitcoin to Life: launch new projects, earn interest, rewrite finance, reinvent culture",
    image: "https://cdn.alexlab.co/logos/AutoALEXV2_Token.png",
    decimals: 8,
    supported: true,
    contract: "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.auto-alex-v2",
  },
  {
    id: "bridged-usdt",
    name: "Bridged USDT",
    ticker: "sUSDT",
    description: "Bridged USDT",
    image: "https://cdn.orangecrypto.com/assets/wrappedusdt-orange-40px.svg",
    decimals: 8,
    supported: true,
    contract: "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token-susdt",
  },
  {
    id: "wrapped-bitcoin",
    name: "Wrapped Bitcoin",
    ticker: "xBTC",
    description:
      "Wrapped Bitcoin on Stacks (xBTC) is a 1:1 equivalent of Bitcoin (BTC) on the Stacks network. xBTC combines the security of Bitcoin with general purpose smart contracts of Stacks, making DeFi applications for the Bitcoin ecosystem possible.",
    image: "https://cdn.orangecrypto.com/assets/wrappedbitcoin-orange-40px.svg",
    decimals: 8,
    supported: true,
    contract: "SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.Wrapped-Bitcoin",
  },
  {
    id: "xusd",
    name: "Wrapped USDC",
    ticker: "xUSD",
    description:
      "Wrapped USD on Stacks (xUSD) is a 1:1 equivalent of stable-backed USD on the Stacks network.",
    image: "https://cdn.orangecrypto.com/assets/wrappedusdc-orange-40px.svg",
    decimals: 8,
    supported: true,
    contract: "SP2TZK01NKDC89J6TA56SA47SDF7RTHYEQ79AAB9A.Wrapped-USD",
  },
  {
    id: "usda",
    name: "Arkadiko USD Stablecoin",
    ticker: "USDA",
    description: "A crypto-overcollateralised stablecoin on Stacks",
    image: "https://app.arkadiko.finance/assets/tokens/usda.svg",
    decimals: 6,
    supported: true,
    contract: "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.usda-token",
  },
  {
    id: "arkadiko-protocol",
    name: "ARKADIKO",
    ticker: "DIKO",
    description: "Arkadiko's Governance token",
    image: "https://cdn.orangecrypto.com/assets/arkadiko-orange-40px.svg",
    decimals: 6,
    supported: true,
    contract: "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-token",
  },
  {
    id: "miaswap",
    name: "MIAMICOIN",
    ticker: "MIA",
    description:
      "A CityCoin for Miami, ticker is MIA, Stack it to earn Stacks (STX)",
    image: "https://cdn.citycoins.co/logos/miamicoin.png",
    decimals: 6,
    supported: true,
    contract: "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.miamicoin-token-v2",
  },
  {
    id: "newyorkcoin",
    name: "NYCCOIN",
    ticker: "NYC",
    description:
      "A CityCoin for New York City, ticker is NYC, Stack it to earn Stacks (STX)",
    image: "https://cdn.citycoins.co/logos/newyorkcitycoin.png",
    decimals: 6,
    supported: true,
    contract:
      "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11.newyorkcitycoin-token-v2",
  },
  {
    id: "snail-trail",
    name: "BM secondary utility token",
    ticker: "SLIME",
    image:
      "https://images.ctfassets.net/frwmwlognk87/2V50JwTfywuU2liZlWYdqg/4b9bd5306dad78ab5b044f000d863794/Untitled.png",
    decimals: 6,
    supported: true,
    contract: "SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7.slime-token",
  },
  {
    id: "banana",
    name: "BM alpha utility token",
    ticker: "BANANA",
    image:
      "https://images.ctfassets.net/frwmwlognk87/1hmx3vgBUjCuf5TdC27sWu/fd10565fa2549c406cdefb84495f912e/BANANA.svg",
    decimals: 6,
    supported: true,
    contract: "SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.btc-monkeys-bananas",
  },
  {
    id: "welsh-corgi-coin",
    name: "WELSHCORGI",
    ticker: "WELSH",
    description: "$WELSH is the first memecoin built on Stacks blockchain",
    image: "https://cdn.orangecrypto.com/assets/welshcorgi-orange-40px.svg",
    decimals: 6,
    supported: true,
    contract: "SP3NE50GEXFG9SZGTT51P40X2CKYSZ5CC4ZTZ7A2G.welshcorgicoin-token",
  },
  {
    id: "token-wleo",
    name: "LEO",
    ticker: "LEO",
    description:
      "LEO is a memecoin on STX blockchain that represents Muneeb, the founder of STX's cat (who is still alive and well!).",
    image:
      "https://images.ctfassets.net/frwmwlognk87/7FbJB0n9quSMYi8Pa3aOzi/09e5bb3d955bd45e9be9b5154a2967c3/ltc-v1.png",
    decimals: 6,
    supported: true,
    contract: "SP1AY6K3PQV5MRT6R4S671NWW2FRVPKM0BR162CT6.leo-token",
  },
  {
    id: "hirevibes",
    name: "HireVibes",
    ticker: "VIBES",
    image:
      "https://images.ctfassets.net/frwmwlognk87/1DpuZEVOzSh2eIV84Qo1dk/46787c8c4a92b7f29c73149b18213bcc/image.png",
    decimals: 8,
    supported: true,
    contract: "SP27BB1Y2DGSXZHS7G9YHKTSH6KQ6BD3QG0AN3CR9.vibes-token",
  },
  {
    id: "stacking-dao",
    name: "Stacking DAO",
    ticker: "STSTX",
    image:
      "https://assets.coingecko.com/coins/images/37485/standard/StackingDAO-200x200.png?1714491243",
    decimals: 6,
    supported: true,
    contract: "SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.ststx-token",
  },
];

// 3rd Party Providers
export const NFT_BASE_URI = "https://stacks.gamma.io/api/v1/collections";
export const GAMMA_COLLECTION_API =
  "https://api.gamma.io/nft-data-service/v1/collections";
export const HIRO_ORD = "https://api.hiro.so/ordinals";
export const HIRO_INSCRIPTIONS_API =
  "https://api.hiro.so/ordinals/v1/inscriptions";
export const BESTINSLOT_TESTNET_API = "https://testnet.api.bestinslot.xyz/v3";
export const INFURA_PROVIDER_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
export const BLOCKCHAIN_INFO_API = "https://api.blockchain.info/mempool/fees";
export const CRYPTOCOMPARE_API = "https://min-api.cryptocompare.com/data/price";
export const MEMPOOL_SPACE_API = "https://mempool.space/api";
export const COINGECKO_API = "https://api.coingecko.com/api/v3";
export const XVERSE_MAINNET_API = "https://api-3.xverse.app";
export const XVERSE_TESTNET_API = "https://api-testnet.xverse.app";
export const BTC_DOMAINS_API = "https://btcdomains.io/open_api";
export const STACKS_DOMAINS_API =
  "https://stacks-node-api.mainnet.stacks.co/v1";
export const COINBASE_DEVELOPER_API = "https://api.developer.coinbase.com";
export const BESTINSLOT_API_KEY = process.env.BESTINSLOT_API_KEY;

export const ERC721_ABI = [
  {
    constant: true,
    inputs: [{ name: "_tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export const API_TIMEOUT = 5000;
