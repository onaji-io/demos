import React from "react";
import { Flex } from "@chakra-ui/react";
import { RecommenderNFTCard } from "./RecommenderNFTCard";

export const RecommenderDisplayGrid = ({ nfts, nftClickHandler }) => {
  if (!nfts || nfts.length === 0) {
    return <div>no search results</div>;
  }
  return (
    <Flex
      flexDirection={"row"}
      flexWrap={"wrap"}
      justifyContent={"space-evenly"}
    >
      {nfts &&
        nfts.map((nft) => (
          <RecommenderNFTCard
            key={nft?.address}
            nft={nft}
            nftClickHandler={nftClickHandler}
          ></RecommenderNFTCard>
        ))}
    </Flex>
  );
};
