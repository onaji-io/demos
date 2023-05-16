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
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

export const RecommenderListItem = ({ collection }) => {
  return (
    <Flex flexDirection={"row"} alignItems="center" marginBottom={2}>
      <Image
        src={collection?.image}
        width={50}
        height={50}
        marginRight={4}
        borderRadius={4}
      />
      <Text>{collection?.name}</Text>
    </Flex>
  );
};
