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
  const [nfts, setNfts] = useState([]);
  const [walletSearchAddress, setWalletSearchAddress] = useState("");
  const [walletContents, setWalletContents] = useState([]);

  const getRecommendationsFromOnaji = async (wallet) => {
    let data = {};
    // TODO: Add proper API key and API once deployed
    const url = `https://staging-api.onaji.io/v1/recommend/contracts?blockchain=ETH&wallet_address=${wallet}&k=10&recently_popular_weight=0&return_wallet_content=1&exclude_owned_contracts=0`;
    try {
      const response = await fetch(url, { credentials: "include" });
      data = await response.json();
    } catch (error) {
      console.log("err: ", error);
    }
    return data;
  };

  const onSearch = async (wallet) => {
    const data = await getRecommendationsFromOnaji(wallet);
    console.log(data);
    let recommendations = [];
    // process the results
    if (data?.scores?.length === 0) {
      // This could be either a wallet with no history, OR the user gave us a collection address.
      // Asssume it's the latter
    } else {
      // the api has returned results, so display the data
      for (let i = 0; i < data.scores.length; i++) {
        recommendations.push({
          address: data.contract_addresses[i],
          score: data.scores[i],
        });
      }
      // at this point, recommendation data has been pulled. the next step is to fetch metadata
      // for the recommended collections in order to display them
      setNfts(recommendations);
      if (data?.wallet_contents) {
        const uniqueWallets = [...new Set(data.wallet_contents)];
        setWalletContents(uniqueWallets);
      } else {
        // clear potentially stale wallet contents
        setWalletContents([]);
      }
    }
  };

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
