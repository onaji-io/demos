import React from 'react';
import Header from '../shared/Header';
import { SearchBar } from '../shared/SearchBar'

const Recommender = () => {
  return (
    <div>
      <Header title="Recommendations" titleInfo={"Search for collections related to a wallet or a collection"} />
      <SearchBar placeholderText={'Enter a wallet address or a collection address'} searchHandler={() => console.log('hi')}/>
    </div>
  );
};

export default Recommender;

