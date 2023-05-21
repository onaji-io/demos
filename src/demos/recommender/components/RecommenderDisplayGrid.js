import React from "react";
import { Divider, Flex, Grid, Heading } from "@chakra-ui/react";
import { RecommenderNFTCard } from "./RecommenderNFTCard";

export const RecommenderDisplayGrid = ({ nfts, nftClickHandler }) => {
  if (!nfts || nfts.length === 0) {
    return <div>no search results</div>;
  }
  return (
    <Flex flexDirection={"column"}>
      <Heading size="sm" marginBottom={2}>
        Recommendations and search scores
      </Heading>
      <Divider marginBottom={2} />
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(5, 1fr)"]}
        justifyItems={["center", "start"]}
        gap={4}
      >
        {nfts &&
          nfts.map((nft) => (
            <RecommenderNFTCard
              key={nft?.address}
              nft={nft}
              nftClickHandler={nftClickHandler}
            ></RecommenderNFTCard>
          ))}
      </Grid>
    </Flex>
  );
};
