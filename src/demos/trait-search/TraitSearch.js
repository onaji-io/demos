import React from 'react';
import Header from '../shared/Header';
import { SearchBar } from '../shared/SearchBar'
import { NFTDisplayGrid } from '../shared/NFTDisplayGrid';

const TraitSearch = () => {
  return (
    <div>
      <Header title="Trait Search" titleInfo={"Trait search is available for the 12 most popular NFT collections"}/>
      <SearchBar placeholderText={'Search for NFTs within a collection, based on their attributes. eg smiling doodles with a blue background'} searchHandler={() => console.log('hi')}/>
      <NFTDisplayGrid nfts={[1,2,3,4,5,6,7,8,9,10]}/>
    </div>
  );
};

export default TraitSearch;

