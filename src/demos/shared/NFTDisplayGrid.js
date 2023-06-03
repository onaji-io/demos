import React from "react";
import { Flex } from "@chakra-ui/react";
import { NFTCard } from "./NFTCard";
import { generateUUID } from "./Utils";

export const NFTDisplayGrid = ({ nfts }) => {
  if (!nfts || nfts.length === 0) {
    return <div>no search results</div>;
  }
  return (
    <Flex
      flexDirection={"row"}
      flexWrap={"wrap"}
      justifyContent={"space-evenly"}
      marginTop={8}
    >
      {nfts &&
        nfts.map((nft) => (
          <NFTCard
            key={generateUUID(nft?.token_id, nft?.contract, nft?.blockchain)}
            nft={nft}
          ></NFTCard>
        ))}
    </Flex>
  );
};
