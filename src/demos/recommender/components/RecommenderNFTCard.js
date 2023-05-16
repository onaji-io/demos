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
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

export const RecommenderNFTCard = ({ nft }) => {
  return (
    <Flex flexDirection={"column"} marginBottom={8}>
      <Image src={nft?.image} width={200} height={200} marginBottom={2}></Image>
      <Flex flexDirection={"column"}>
        <Heading size="sm">Azuki</Heading>
        <Text>8.93</Text>
      </Flex>
    </Flex>
  );
};
