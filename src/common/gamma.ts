import { GAMMA_COLLECTION_API, NFT_BASE_URI } from "./constants";
import { NftCollectionData, NftDetailResponse } from "../types/stacks";
import axios from "axios";

export async function getNftDetail(
  tokenId: string,
  contractAddress: string,
  contractName: string
): Promise<NftDetailResponse> {
  const apiUrl = `${NFT_BASE_URI}/${contractAddress}.${contractName}/${tokenId}`;
  try {
    const response = await axios.get<NftDetailResponse>(apiUrl, {
      timeout: 30000,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error GET nftdetail", error);
    throw error;
  }
}

export async function getNftsCollectionData(
  collectionId: string
): Promise<NftCollectionData | undefined> {
  try {
    const apiUrl = `${GAMMA_COLLECTION_API}/${collectionId}?include=floorItem`;

    const response = await axios.get<NftCollectionData>(apiUrl, {
      timeout: 30000,
    });
    return response.data;
  } catch (error) {
    console.error("Error GET nftdetail", error);
    return undefined;
  }
}
