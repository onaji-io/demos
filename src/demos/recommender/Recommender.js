import React from 'react';
import Header from '../shared/Header';
import { SearchBar } from '../shared/SearchBar'
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

const Recommender = () => {
  return (
    <div>
      <Header title="Recommendations" titleInfo={"Search for collections related to a wallet or a collection"} />
      <SearchBar placeholderText={'Enter a wallet address or a collection address'} searchHandler={() => console.log('hi')}>
        <Button onClick={() => console.log('rando')} marginRight={4} style={{color: '#805AD5'}} width={40}>Random Wallet</Button>
        <Button onClick={() => console.log('rando')} marginRight={4} style={{color: '#805AD5'}} width={52}>Random Collection</Button>
      </SearchBar>
    </div>
  );
};

export default Recommender;

