import React from "react";
import { Divider, Flex, Heading, Text } from "@chakra-ui/react";

export const RecommenderWallets = ({ wallet }) => {
  return (
    <Flex flexDirection={"column"} borderRadius={4} marginBottom={4}>
      <Heading size="sm" marginBottom={2}>
        Wallet
      </Heading>
      <Divider marginBottom={2} />
      <Flex flexDirection={"row"} alignItems="center" marginBottom={2}>
        <Text fontSize={"xs"}>{wallet}</Text>
      </Flex>
    </Flex>
  );
};
