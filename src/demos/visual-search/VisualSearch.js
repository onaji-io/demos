import React from 'react';
import Header from '../shared/Header';
import { SearchBar } from '../shared/SearchBar'
import { NFTDisplayGrid } from '../shared/NFTDisplayGrid';

const VisualSearch = () => {
  return (
    <div>
      <Header title="Visual Search" titleInfo={'Search for NFTs based on visual similarity'}/>
      <SearchBar placeholderText={'Search for NFTs based on visuals, colors, narrartives, or any other inspiration'} searchHandler={() => console.log('hi')}/>
      <NFTDisplayGrid nfts={[1,2,3,4,5,6,7,8,9,10]}/>
    </div>
  );
};

export default VisualSearch;
