import React, { useState } from 'react';
import Header from '../shared/Header';
import { SearchBar } from '../shared/SearchBar'
import { NFTDisplayGrid } from '../shared/NFTDisplayGrid';
import { mock_tezos_request } from '../mocks/MockData';

const TraitSearch = () => {
  const [nfts, setNfts] = useState([])
  const onSearch = async (query) => {
    console.log('trait search: ', query)
    const data = await mock_tezos_request();
    console.log(data)
    setNfts(data.hits)
  }
  return (
    <div>
      <Header title="Trait Search" titleInfo={"Trait search is available for the 12 most popular NFT collections"}/>
      <SearchBar placeholderText={'Search for NFTs within a collection, based on their attributes. eg smiling doodles with a blue background'} searchHandler={onSearch}/>
      <NFTDisplayGrid nfts={nfts}/>
    </div>
  );
};

export default TraitSearch;

