import React, { useState } from "react";
import Header from "../shared/Header";
import { SearchBar } from "../shared/SearchBar";
import { Button, Divider, Flex, Select, Stack } from "@chakra-ui/react";
import { RecommenderWallets } from "./components/RecommenderWallets";
import { RecommenderRecentTrades } from "./components/RecommenderRecentTrades";
import { RecommenderDisplayGrid } from "./components/RecommenderDisplayGrid";
import { SelectedWalletsByCategory } from "./components/SelectedWalletsByCategory";
import {
  getRandomWalletFromOnaji,
  getRecommendationsFromOnaji,
} from "./api/RecommenderApi";

const Recommender = () => {
  const [nfts, setNfts] = useState([]);
  const [walletSearchAddress, setWalletSearchAddress] = useState("");
  const [walletContents, setWalletContents] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const options = [
    { value: "gaming", label: "Gaming" },
    { value: "anime", label: "Anime" },
    { value: "milady", label: "Milady-Related" },
    { value: "pfp", label: "PFP Collectors" },
    { value: "genart", label: "Gen Art" },
    { value: "notable", label: "Notable Wallets" },
  ];

  const onNftClick = async (contractAddress) => {
    setWalletContents([]);
    setWalletSearchAddress("");
    fetch(
      `https://staging-api.onaji.io/v1/recommend/content_based_contract?blockchain=ETH&contract=${contractAddress}&k=10&return_wallet_content=1&exclude_owned_contracts=1`,
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

        setWalletContents([]);
        setNfts(ret);
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
    try {
      const data = await getRecommendationsFromOnaji(wallet);
      let recommendations = [];
      // process the results
      if (data?.scores?.length === 0) {
        // This could be either a wallet with no history, OR the user gave us a collection address.
        //
        setNfts([]);

        // although there are no recommendations, it may be possible to display recent purchaes
        if (data?.wallet_contents?.length !== 0) {
          const uniqueWallets = [...new Set(data.wallet_contents)];
          setWalletContents(uniqueWallets);
          setWalletSearchAddress(wallet);
        } else {
          setWalletContents([]);
          setWalletSearchAddress("");
        }

        // return onNftClick(wallet);
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
        setWalletSearchAddress(wallet);
        if (data?.wallet_contents) {
          const uniqueWallets = [...new Set(data.wallet_contents)];
          setWalletContents(uniqueWallets);
        } else {
          // clear potentially stale wallet contents
          setWalletContents([]);
        }
      }
    } catch (error) {
      // If the api has returned an error, clear all data
      setNfts([]);
      setWalletContents([]);
      setWalletSearchAddress("");
    }
  };

  const getRandomWallet = async () => {
    try {
      const data = await getRandomWalletFromOnaji();
      setWalletSearchAddress(data?.wallet);
      return onSearch(data?.wallet);
    } catch (error) {
      // If the api has returned an error, clear all data
      setNfts([]);
      setWalletContents([]);
      setWalletSearchAddress("");
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
        parentSearchValue={walletSearchAddress}
      >
        <Button
          onClick={() => getRandomWallet()}
          style={{ color: "#805AD5" }}
          width={40}
        >
          Random Wallet
        </Button>
      </SearchBar>

      <Flex marginTop={8} alignItems={"baseline"}>
        <span style={{ marginLeft: "16px", marginRight: "16px" }}>
          or try a test wallet
        </span>
        <Stack spacing={3} width={"25%"} marginRight={4}>
          <Select
            marginBottom={4}
            size="md"
            defaultValue={options[0].value}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Stack>
        <SelectedWalletsByCategory
          category={selectedValue}
          onClickFn={(w) => setWalletSearchAddress(w)}
        />
      </Flex>

      <Divider marginBottom={4} />
      <Flex flexDirection={["column", "row"]}>
        <Flex flexDirection={"column"} flex={1}>
          <RecommenderWallets wallet={walletSearchAddress} />
          <RecommenderRecentTrades
            trades={walletContents}
            onTradeClick={onNftClick}
          />
        </Flex>
        <Flex flex={4} justifyItems={["center", "start"]}>
          <RecommenderDisplayGrid nfts={nfts} nftClickHandler={onNftClick} />
        </Flex>
      </Flex>
    </div>
  );
};

export default Recommender;
