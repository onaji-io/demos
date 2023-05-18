import React, { useState } from "react";
import Header from "../shared/Header";
import { SearchBar } from "../shared/SearchBar";
import { Button, Divider, Flex } from "@chakra-ui/react";
import { RecommenderWallets } from "./components/RecommenderWallets";
import { RecommenderRecentTrades } from "./components/RecommenderRecentTrades";
import { RecommenderDisplayGrid } from "./components/RecommenderDisplayGrid";

const Recommender = () => {
  const [nfts, setNfts] = useState([]);
  const [walletSearchAddress, setWalletSearchAddress] = useState("");
  const [walletContents, setWalletContents] = useState([]);

  const sanitizeSearchAddress = (addr) => {
    // remove whitespace
    const trimmed = addr.trim();
    // address strings have length 42 (40 if you exclude the leading 0x)
    // addresses strings which are not valid should receive the default recommendations
    let retAddr = DEFAULT_ADDRESS;
    // maybe they forgot the 0x
    if (trimmed.length === 40) {
      retAddr = "0x" + trimmed;
    } else if (trimmed.length === 42) {
      retAddr = trimmed;
    }
    return retAddr;
  };

  const getRecommendationsFromOnaji = async (wallet) => {
    let data = {};
    // TODO: Add proper API key and API once deployed
    const url = `https://staging-api.onaji.io/v1/recommend/contracts?blockchain=ETH&wallet_address=${wallet}&k=10&recently_popular_weight=0&return_wallet_content=1&exclude_owned_contracts=0`;
    try {
      const response = await fetch(url, { credentials: "include" });
      data = await response.json();
    } catch (error) {
      console.log("err: ", error);
      setNfts([]);
      setWalletContents([]);
      setWalletSearchAddress("");
    }
    return data;
  };

  const onNftClick = async (contractAddress) => {
    fetch(
      `https://staging-api.onaji.io/v1/recommend/content_based_contract?blockchain=ETH&contract=${contractAddress}&k=10&return_wallet_content=1&exclude_owned_contracts=0`,
      {
        credentials: "include",
      }
    )
      .then((r) => r.json())
      .then((data) => {
        let ret = [];
        for (let i = 0; i < data.scores.length; i++) {
          ret.push({
            address: data.contract_addresses[i],
            score: data.scores[i],
          });
        }
        setNfts(ret);
        setWalletContents([]);
        setWalletSearchAddress("");
      })
      .catch((err) => {
        console.log(err);
        setNfts([]);
        setWalletContents([]);
        setWalletSearchAddress("");
      });
  };

  const onSearch = async (wallet) => {
    const data = await getRecommendationsFromOnaji(wallet);
    console.log(data);
    let recommendations = [];
    // process the results
    if (data?.scores?.length === 0) {
      // This could be either a wallet with no history, OR the user gave us a collection address.
      // Asssume it's the latter
      setNfts([]);
      setWalletContents([]);
      setWalletSearchAddress("");
      return onNftClick(wallet);
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

  const getRandomWallet = async () => {
    fetch(
      `https://staging-api.onaji.io/v1/recommend/random_wallet?blockchain=ETH`,
      {
        credentials: "include",
      }
    )
      .then((r) => r.json())
      .then((data) => {
        setWalletSearchAddress(data?.wallet);
        return onSearch(data?.wallet);
      })
      .catch((err) => {
        console.log(err);
      });
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
          onClick={() => getRandomWallet()}
          style={{ color: "#805AD5" }}
          width={40}
        >
          Random Wallet
        </Button>
      </SearchBar>
      <Divider marginBottom={4} />
      <Flex flexDirection={"row"}>
        <Flex flexDirection={"column"} flex={1}>
          <RecommenderWallets />
          <RecommenderRecentTrades trades={walletContents} />
        </Flex>
        <Flex flex={4}>
          <RecommenderDisplayGrid nfts={nfts} nftClickHandler={onNftClick} />
        </Flex>
      </Flex>
    </div>
  );
};

export default Recommender;
