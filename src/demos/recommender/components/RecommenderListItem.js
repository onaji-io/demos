import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

export const RecommenderListItem = ({ collection }) => {
  return (
    <Flex flexDirection={"row"} alignItems="center" marginBottom={2}>
      <Image
        src={collection?.image}
        width={50}
        height={50}
        marginRight={4}
        borderRadius={4}
        alt="nft image"
      />
      <Text>{collection?.name}</Text>
    </Flex>
  );
};
