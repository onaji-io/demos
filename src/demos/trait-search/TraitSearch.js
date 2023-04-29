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
  const onSearch = async (query) => {
    console.log('trait search: ', query)
    const data = await mock_tezos_request();
    console.log(data)
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

