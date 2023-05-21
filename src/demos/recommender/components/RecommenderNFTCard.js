import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  SimpleGrid,
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
      <SimpleGrid>
        {nfts &&
          nfts.map((nftData, index) => (
            <Card
              width={220}
              // cursor="pointer"
              // onClick={() => nftClickHandler(nftData?.contract?.address)}
              marginBottom={4}
            >
              <CardBody
                position="relative"
                _hover={{
                  "> div": {
                    visibility: "visible",
                  },
                }}
              >
                <Image
                  src={
                    nftData?.media?.[0]?.thumbnail ||
                    nftData?.contractMetadata?.openSea?.imageUrl ||
                    nftData?.media?.[0]?.gateway
                  }
                  alt={"an nft"}
                  width={200}
                  height={200}
                />
                <Stack mt="6" spacing="3">
                  <Text mb="2">
                    {collectionName != "" ? collectionName : nft?.address}
                  </Text>
                  <Text>{nft?.score?.toFixed(2)}</Text>
                </Stack>
                <Box
                  position="absolute"
                  top={4}
                  left={4}
                  zIndex={1}
                  visibility="hidden"
                  backgroundColor="white"
                  borderRadius="sm"
                  p={1}
                >
                  <Text>Similar NFTs search</Text>
                </Box>
              </CardBody>
            </Card>
          ))}
      </SimpleGrid>
    </>
  );
};
