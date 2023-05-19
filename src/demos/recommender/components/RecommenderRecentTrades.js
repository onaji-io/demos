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
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RecommenderListItem } from "./RecommenderListItem";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
};

const ALCHEMY_BASE_URL = "https://eth-mainnet.g.alchemy.com/nft/v2/";

export const RecommenderRecentTrades = ({ trades }) => {
  const [collectionData, setCollectionData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBatchMetadata = async (collections) => {
      const body = {
        tokens: collections.map((c) => ({
          tokenId: "1",
          contractAddress: `${c}`,
        })),
        refreshCache: false,
      };

      setLoading(true);
      try {
        const res = await fetch(
          `${ALCHEMY_BASE_URL}${settings.apiKey}/getNFTMetadataBatch`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        if (res.status === 429) {
          // Alchemy is rate limited. wait and retry
          const retryAfter = 3000;
          await new Promise((resolve) => setTimeout(resolve, retryAfter));
          return fetchBatchMetadata(collections);
        }
        const data = await res.json();
        const collectionInfo = data.map((d) => ({
          name: d?.contractMetadata?.name,
          image: d?.media?.[0]?.thumbnail,
        }));
        setCollectionData(collectionInfo);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (trades?.length === 0) {
      setCollectionData([]);
    } else {
      fetchBatchMetadata(trades);
    }
  }, [trades]);
  return (
    <Flex flexDirection={"column"}>
      <Heading size="sm" marginBottom={2}>
        Wallet recent trades
      </Heading>
      <Divider marginBottom={2} />
      {collectionData &&
        collectionData.map((c) => <RecommenderListItem collection={c} />)}
    </Flex>
  );
};
