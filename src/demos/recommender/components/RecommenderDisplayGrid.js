import React, { useState } from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Fade,
  Flex,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import { RecommenderNFTCard } from "./RecommenderNFTCard";

export const RecommenderDisplayGrid = ({
  nfts,
  nftClickHandler,
  fallbackMessage,
}) => {
  const [isTooltipHover, setIsTooltipHover] = useState(false);

  return (
    <Flex flexDirection={"column"}>
      <Flex position={"relative"} flexDirection={"row"} alignItems={"baseline"}>
        <Heading size="sm" marginBottom={2}>
          Recommendations and search scores
        </Heading>
        <InfoOutlineIcon
          color="#A0A2A6"
          cursor="pointer"
          marginLeft={2}
          onMouseEnter={() => setIsTooltipHover(true)}
          onMouseLeave={() => setIsTooltipHover(false)}
        />
        <Fade in={isTooltipHover} style={{ zIndex: 1 }}>
          <Box
            background={"white"}
            position="absolute"
            top="30px"
            left="0px"
            border="1px solid #6D5773"
            width="278px"
            zIndex="1"
            opacity={isTooltipHover ? 1 : 0}
            display={isTooltipHover ? "block" : "none"}
            padding={4}
          >
            <Text>
              The search score reflects our model's confidence in this
              particular collection recommendation. A higher score indicates a
              greater likelihood that the wallet will proceed with the NFT
              purchase.
            </Text>
          </Box>
        </Fade>
      </Flex>
      <Divider marginBottom={2} />
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(5, 1fr)"]}
        justifyItems={["center", "start"]}
        gap={4}
      >
        {nfts && nfts?.length > 0 ? (
          nfts.map((nft) => (
            <RecommenderNFTCard
              key={nft?.address}
              nft={nft}
              nftClickHandler={nftClickHandler}
            ></RecommenderNFTCard>
          ))
        ) : (
          <div>{fallbackMessage}</div>
        )}

        {/* {nfts && nfts?.length &&
          nfts.map((nft) => (
            <RecommenderNFTCard
              key={nft?.address}
              nft={nft}
              nftClickHandler={nftClickHandler}
            ></RecommenderNFTCard>
          ))}
        {!nfts && !nfts.length && (
          <div>no recommendation results for this address yet</div>
        )} */}
      </Grid>
    </Flex>
  );
};
