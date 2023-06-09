import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import { SearchBar } from "../shared/SearchBar";
import { NFTDisplayGrid } from "../shared/NFTDisplayGrid";
import { generateUUID } from "../shared/Utils";
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

const CDN_URL_BASE_PATH = "https://staging-cdn.onaji.io/";

const TraitSearch = () => {
  const [nfts, setNfts] = useState([]);
  const [selectedValue, setSelectedValue] = useState(
    "0xbc4CA0eda7647a8ab7c2061c2e118a18a936f13d"
  );

  const options = [
    { value: "0xbc4CA0eda7647a8ab7c2061c2e118a18a936f13d", label: "BAYC" },
    {
      value: "0xd1258db6ac08eb0e625b75b371c023da478e94a9",
      label: "Digi Daigaku",
    },
    {
      value: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
      label: "Pudgy Penguins",
    },
    { value: "0x1a92f7381b9f03921564a437210bb9396471050c", label: "Cool Cats" },
    { value: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e", label: "Doodles" },
    { value: "0x79fcdef22feed20eddacbb2587640e45491b757f", label: "mfers" },
    // { value: "0x60e4d786628fea6478f785a6d7e704777c86a7c6", label: "MAYC" },
    { value: "0xed5af388653567af2f388e6224dc7c4b3241c544", label: "Azuki" },
    { value: "0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6", label: "Cryptoadz" },
  ];

  const getTraitDataFromOnaji = async (query) => {
    const url = `https://demo-api.onaji.io/v1/search/trait?text_query=${query}&blockchain_filter=ETH&contract_filter=${selectedValue}`;
    try {
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const onSearch = async (query) => {
    const data = await getTraitDataFromOnaji(query);

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
  };

  // when the page loads, populate with default BAYC results
  useEffect(() => {
    const initialRequest = async () => {
      await onSearch();
    };
    initialRequest();
  }, []);
  return (
    <div>
      <Header
        showConnect={false}
        title="AI Trait Search"
        titleInfo={
          "AI Trait search is available for the most popular NFT collections"
        }
      />
      <Flex alignItems="baseline">
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
        <Box flex={2}>
          <SearchBar
            placeholderText={
              "Search for NFTs within a collection, based on their attributes. eg smiling doodles with a blue background"
            }
            searchHandler={onSearch}
          />
        </Box>
      </Flex>
      <Divider />
      <NFTDisplayGrid nfts={nfts} />
    </div>
  );
};

export default TraitSearch;
