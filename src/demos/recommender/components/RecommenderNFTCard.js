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

const ALCHEMY_BASE_URL = "https://eth-mainnet.g.alchemy.com/nft/v2/";

export const RecommenderNFTCard = ({ nft }) => {
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
          `${ALCHEMY_BASE_URL}nFeNA-aDnxaeO3WQwlw36tHAHHjtDlbk/getNFTsForCollection?contractAddress=${nft.address}&withMetadata=true&limit=1`
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
    <Flex flexDirection={"column"} marginBottom={8}>
      <Image
        src={
          nft?.media?.[0]?.thumbnail ||
          nft?.contractMetadata?.openSea?.imageUrl ||
          nft?.media?.[0]?.gateway
        }
        width={200}
        height={200}
        marginBottom={2}
      ></Image>
      <Flex flexDirection={"column"}>
        <Heading size="sm">{nft?.address}</Heading>
        <Text>{nft?.score}</Text>
      </Flex>
    </Flex>
  );
};
