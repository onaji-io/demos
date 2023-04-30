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
  const onSearch = async (query) => {
    console.log('visual search: ', query)
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
