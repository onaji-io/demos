import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

export const RecommenderListItem = ({ collection, onItemClick }) => {
  if (collection == null || !collection?.name || !collection?.address) {
    return null;
  }

  return (
    <Flex
      flexDirection={"row"}
      alignItems="center"
      marginBottom={2}
      // cursor={"pointer"}
    >
      <Image
        src={collection?.image}
        width={50}
        height={50}
        marginRight={4}
        borderRadius={4}
        alt="nft image"
        // onClick={() => onItemClick(collection?.address)}
      />
      <Text>{collection?.name ?? collection?.address}</Text>
    </Flex>
  );
};
