import React from "react";
import { CopyIcon } from "@chakra-ui/icons";
import { Divider, Flex, Heading, Text } from "@chakra-ui/react";

const MAX_ADDRESS_DISPLAY_CHARS = 10;
const truncateAddress = (address) => {
  if (address.length <= MAX_ADDRESS_DISPLAY_CHARS) {
    return address;
  }

  return address.slice(0, 5) + "..." + address.slice(-5);
};

export const RecommenderWallets = ({ wallet }) => {
  return (
    <Flex flexDirection={"column"} borderRadius={4} marginBottom={4}>
      <Heading size="sm" marginBottom={2}>
        Wallet
      </Heading>
      <Divider marginBottom={2} />
      {wallet && (
        <Flex flexDirection={"row"} alignItems="center" marginBottom={2}>
          <Text fontSize={"xs"}>{truncateAddress(wallet)}</Text>
          <CopyIcon
            marginLeft={2}
            cursor={"pointer"}
            onClick={() => {
              navigator?.clipboard?.writeText(wallet);
            }}
          />
        </Flex>
      )}
    </Flex>
  );
};
