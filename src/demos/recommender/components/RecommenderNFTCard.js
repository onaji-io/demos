import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Fade,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
};

const ALCHEMY_BASE_URL = "https://eth-mainnet.g.alchemy.com/nft/v2/";

export const RecommenderNFTCard = ({ nft, nftClickHandler }) => {
  // fetch metadata from alchemy.
  const [metadata, setMetadata] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  useEffect(() => {
    const fetchMeta = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${ALCHEMY_BASE_URL}${settings.apiKey}/getNFTsForCollection?contractAddress=${nft.address}&withMetadata=true&limit=1`
        );
        if (res.status === 429) {
          // Alchemy is rate limited. wait and retry
          const retryAfter = 3000;
          await new Promise((resolve) => setTimeout(resolve, retryAfter));
          return fetchMeta();
        }
        const data = await res.json();
        setNfts(data?.nfts);
        setCollectionName(data?.nfts?.[0]?.contractMetadata?.name);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeta();
  }, [nft]);

  return (
    <>
      {nfts &&
        nfts.map((nftData) => (
          <Flex flexDirection={"column"} marginBottom={8}>
            <Image
              src={
                nftData?.media?.[0]?.thumbnail ||
                nftData?.contractMetadata?.openSea?.imageUrl ||
                nftData?.media?.[0]?.gateway
              }
              width={200}
              height={200}
              marginBottom={2}
              onClick={() => nftClickHandler(nftData?.contract?.address)}
              cursor={"pointer"}
            ></Image>
            <Flex flexDirection={"column"}>
              <Heading size="sm">
                {collectionName != "" ? collectionName : nft?.address}
              </Heading>
              <Text>{nft?.score}</Text>
            </Flex>
          </Flex>
        ))}
    </>
  );
};
