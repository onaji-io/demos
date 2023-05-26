import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Header from "../shared/Header";
import { SearchBar } from "../shared/SearchBar";
import { Button, Divider, Flex, Select, Stack } from "@chakra-ui/react";
import { RecommenderWallets } from "./components/RecommenderWallets";
import { RecommenderRecentTrades } from "./components/RecommenderRecentTrades";
import { RecommenderDisplayGrid } from "./components/RecommenderDisplayGrid";
import { SelectedWalletsByCategory } from "./components/SelectedWalletsByCategory";
import {
  getCollectionRecommendationsFromOnaji,
  getRandomWalletFromOnaji,
  getRecommendationsFromOnaji,
} from "./api/RecommenderApi";

const DEFAULT_WALLET = "0x0D24d79751236cBb715185aAb4eA401f2287f9CA";

const Recommender = () => {
  const [nfts, setNfts] = useState([]);
  const [walletSearchAddress, setWalletSearchAddress] = useState("");
  const [walletContents, setWalletContents] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [fallbackMessage, setFallbackMessage] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const options = [
    { value: "gaming", label: "Gaming" },
    { value: "anime", label: "Anime" },
    { value: "milady", label: "Milady-Related" },
    { value: "pfp", label: "PFP Collectors" },
    { value: "genart", label: "Gen Art" },
    { value: "notable", label: "Notable Wallets" },
  ];

  const connectWallet = async () => {
    setIsConnecting(true);
    if (window?.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const _accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(_accounts);
        console.log(_accounts);
        if (_accounts.length > 0) {
          setWalletSearchAddress(_accounts[0]);
          onSearch(_accounts[0]);
        }
      } catch (error) {
        console.error("User denied account access");
      } finally {
        setIsConnecting(false);
      }

      window.ethereum.on("accountsChanged", (_accounts) => {
        setAccounts(_accounts);
        console.log(_accounts);
        if (_accounts.length > 0) {
          setWalletSearchAddress(_accounts[0]);
          onSearch(_accounts[0]);
        }
      });
    } else {
      console.log("Please install Metamask");
      setIsConnecting(false);
    }
  };

  // TODO: This feature will be activated in future
  // clicking on an NFT will show recommendations based on that collection.
  const onNftClick = async (contractAddress) => {
    setWalletContents([]);
    setWalletSearchAddress("");

    try {
      const data = await getCollectionRecommendationsFromOnaji(contractAddress);
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
    } catch (error) {
      setNfts([]);
      setWalletContents([]);
      setWalletSearchAddress("");
    }
  };

  // This function will fetch recommendations from Onaji for a provided wallet.
  const onSearch = async (wallet) => {
    try {
      const data = await getRecommendationsFromOnaji(wallet);
      let recommendations = [];
      if (data?.scores?.length === 0) {
        setNfts([]);

        // TODO: In these situations, a message needs to be shown to the user.
        setFallbackMessage(
          "Hang on! This wallet isn't included in this demo. Reach out to us for access to the complete version or feel free to try other wallets and collections. Keep the fun alive! 🚀"
        );

        // although there are no recommendations (data.scores is empty), it may be possible to display recent purchaes for this wallet
        if (data?.wallet_contents?.length !== 0) {
          // don't display multiple transactions for the same collection
          const uniqueWallets = [...new Set(data.wallet_contents)];
          setWalletContents(uniqueWallets);
          // setWalletSearchAddress(wallet);
        } else {
          setWalletContents([]);
          // setWalletSearchAddress("");
        }
        // always display the wallet address for reference
        setWalletSearchAddress(wallet);

        // TODO: This feature will be enabled in future
        // no results can also mean that a collection address was provided, instead of a wallet.
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

        // display any recent transactions for this wallet
        if (data?.wallet_contents) {
          const uniqueWallets = [...new Set(data.wallet_contents)];
          setWalletContents(uniqueWallets);
        } else {
          // clear potentially stale wallet contents
          setWalletContents([]);
        }
      }
    } catch (error) {
      // If the api has returned an error, clear all component data
      setNfts([]);
      setWalletContents([]);
      setWalletSearchAddress("");
      setFallbackMessage("A network error has occurred. Please try again.");
    }
  };

  // This function will fetch a random wallet from Onaji, which can then be passed along to the
  // search method to receive recommendations.
  const getRandomWallet = async () => {
    try {
      const data = await getRandomWalletFromOnaji();
      setWalletSearchAddress(data?.wallet);
      return onSearch(data?.wallet);
    } catch (error) {
      setNfts([]);
      setWalletContents([]);
      setWalletSearchAddress("");
      setFallbackMessage("A network error has occurred. Please try again.");
    }
  };

  // on initial render, go ahead and search the default address
  useEffect(() => {
    const initialSearch = async () => {
      await onSearch(DEFAULT_WALLET);
    };
    initialSearch();
  }, []);

  return (
    <div>
      <Header
        title="Recommendations"
        titleInfo={"Search for collections related to a wallet or a collection"}
        connectFn={connectWallet}
        isConnecting={isConnecting}
        connectedAccounts={accounts}
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
        <Flex
          flexDirection={"column"}
          flex={1}
          minW={["100px", "200px", "300px", "300px"]}
        >
          <RecommenderWallets wallet={walletSearchAddress} />
          <RecommenderRecentTrades
            trades={walletContents}
            onTradeClick={onNftClick}
          />
        </Flex>
        <Flex flex={4} justifyItems={["center", "start"]}>
          <RecommenderDisplayGrid
            nfts={nfts}
            nftClickHandler={onNftClick}
            fallbackMessage={fallbackMessage}
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default Recommender;
