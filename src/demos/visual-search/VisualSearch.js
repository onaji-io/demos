import React from 'react';
import Header from '../shared/Header';
import { SearchBar } from '../shared/SearchBar'
import { NFTDisplayGrid } from '../shared/NFTDisplayGrid';
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
  return (
    <div>
      <Header title="Visual Search" titleInfo={'Search for NFTs based on visual similarity'}/>
      <SearchBar placeholderText={'Search for NFTs based on visuals, colors, narrartives, or any other inspiration'} searchHandler={() => console.log('hi')}>
        <Button onClick={() => console.log('rando')} marginRight={4} style={{color: '#805AD5'}} width={40}>Random Search</Button>
      </SearchBar>
      <NFTDisplayGrid nfts={[1,2,3,4,5,6,7,8,9,10]}/>
    </div>
  );
};

export default VisualSearch;
