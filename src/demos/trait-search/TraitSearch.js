import React, { useState } from 'react';
import Header from '../shared/Header';
import { SearchBar } from '../shared/SearchBar'
import { NFTDisplayGrid } from '../shared/NFTDisplayGrid';
import { mock_tezos_request } from '../mocks/MockData';
import { generateUUID } from "../shared/Utils";
import { CDN_URL_BASE_PATH } from '../../App';
import {
  Divider,
} from "@chakra-ui/react";


const TraitSearch = () => {
  const [nfts, setNfts] = useState([])

  const getTraitDataFromOnaji = async (query) => {
    // TODO: Add proper API key and API once deployed
    const url = `https://api.onaji.io/v1/search/trait?text_query=${query}&blockchain_filter=ETH`
    try {
    const response = fetch(
      url,
      {credentials: 'include'}      
      );
    const data = await response.json()
    } catch (error) {
      console.log('err: ', error)
    }
  }

  const onSearch = async (query) => {
    const data = await getTraitDataFromOnaji(query)

    setNfts(
      data?.hits.map((nft) => ({
        ...nft,
        image: `${CDN_URL_BASE_PATH}${generateUUID(
          nft.token_id,
          nft.contract,
          nft.blockchain
        )}.jpeg`,
      }))
    );
  }
  return (
    <div>
      <Header title="Trait Search" titleInfo={"Trait search is available for the 12 most popular NFT collections"}/>
      <SearchBar placeholderText={'Search for NFTs within a collection, based on their attributes. eg smiling doodles with a blue background'} searchHandler={onSearch}/>
      <Divider />
      <NFTDisplayGrid nfts={nfts}/>
    </div>
  );
};

export default TraitSearch;

