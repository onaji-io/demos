import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import { SearchBar } from '../shared/SearchBar'
import { NFTDisplayGrid } from '../shared/NFTDisplayGrid';
import { mock_tezos_request, mock_visual_prompts_request } from '../mocks/MockData';
import { generateUUID } from "../shared/Utils";
import { CDN_URL_BASE_PATH } from '../../App';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Fade,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

const VisualSearch = () => {
  const [nfts, setNfts] = useState([])
  const [searchPrompts, setSearchPrompts] = useState([]);

  const getVisualDataFromOnaji = async (query) => {
    // TODO: Add proper API key and API once deployed
    const url = `https://staging-api.onaji.io/v1/search/visual?text_query=${query}&blockchain_filter=ETH`
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

  const getRandomDataFromOnaji = async () => {
    // TODO: Add proper API key and API once deployed
    const url = `https://staging-api.onaji.io/v1/recommend/random_curation?blockchain_filter=ETH`
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
    // console.log('visual search: ', query)
    // const data = await mock_tezos_request();
    // console.log(data)

    const data = await getVisualDataFromOnaji(query)
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

  // TODO: Use random search function
  const onRandomSearch = async () => {
    console.log('visual random search: ')
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

  useEffect(() => {
    const getPrompts = async () => {
      const prompts = await mock_visual_prompts_request();
      setSearchPrompts(prompts)
    }
    getPrompts();
  }, []);
  return (
    <div>
      <Header title="Visual Search" titleInfo={'Search for NFTs based on visual similarity'}/>
      <SearchBar placeholderText={'Search for NFTs based on visuals, colors, narrartives, or any other inspiration'} searchHandler={onSearch} searchPrompts={searchPrompts}>
        <Button onClick={onRandomSearch} marginRight={4} style={{color: '#805AD5'}} width={40}>Random Search</Button>
      </SearchBar>
      <Divider />
      <NFTDisplayGrid nfts={nfts}/>
    </div>
  );
};

export default VisualSearch;
