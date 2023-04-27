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
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, InfoOutlineIcon, SearchIcon } from "@chakra-ui/icons";

export const NFTDisplayGrid = ({nfts}) => {
    return (
        <Flex flexDirection={'row'} flexWrap={'wrap'} justifyContent={'space-evenly'}>
            {nfts && nfts.map(() => <Box width={250} height={250} marginBottom={8} background={"silver"}></Box>)}
        </Flex>
    );
}