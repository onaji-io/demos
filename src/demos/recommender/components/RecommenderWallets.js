import React from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Fade,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RecommenderListItem } from "./RecommenderListItem";

export const RecommenderWallets = () => {
  return (
    <Flex flexDirection={"column"} borderRadius={4} marginBottom={4}>
      <Heading size="sm" marginBottom={2}>
        Wallet
      </Heading>
      <Divider marginBottom={2} />
      <RecommenderListItem />
    </Flex>
  );
};
