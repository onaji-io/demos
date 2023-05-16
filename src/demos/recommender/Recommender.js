import React, { useState } from "react";
import Header from "../shared/Header";
import { SearchBar } from "../shared/SearchBar";
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
import { RecommenderWallets } from "./components/RecommenderWallets";
import { RecommenderRecentTrades } from "./components/RecommenderRecentTrades";
import { RecommenderDisplayGrid } from "./components/RecommenderDisplayGrid";

const Recommender = () => {
  const [nfts, setNfts] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const getRecommendationsFromOnaji = async (wallet,) => {
    // TODO: Add proper API key and API once deployed
    const url = `https://api.onaji.io/v1/recommend/contracts?blockchain=ETH&wallet_address=${wallet}&k=10&recently_popular_weight=0&return_wallet_content=1&exclude_owned_contracts=0`;
    try {
      const response = fetch(url, { credentials: "include" });
      const data = await response.json();
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const onSearch = async (wallet) => {
    const data = await getRecommendationsFromOnaji(wallet);
    console.log(data)
  }

  return (
    <div>
      <Header
        title="Recommendations"
        titleInfo={"Search for collections related to a wallet or a collection"}
      />
      <SearchBar
        placeholderText={"Enter a wallet address or a collection address"}
        searchHandler={(wallet) => onSearch(wallet)}
      >
        <Button
          onClick={() => console.log("rando")}
          marginRight={4}
          style={{ color: "#805AD5" }}
          width={40}
        >
          Random Wallet
        </Button>
        <Button
          onClick={() => console.log("rando")}
          marginRight={4}
          style={{ color: "#805AD5" }}
          width={52}
        >
          Random Collection
        </Button>
      </SearchBar>
      <Divider marginBottom={4} />
      <Flex flexDirection={"row"}>
        <Flex flexDirection={"column"} width="25%">
          <RecommenderWallets />
          <RecommenderRecentTrades />
        </Flex>
        <Flex width="75%">
          <RecommenderDisplayGrid nfts={nfts} />
        </Flex>
      </Flex>
    </div>
  );
};

export default Recommender;
