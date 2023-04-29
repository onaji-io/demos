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
import { NFTCard } from "./NFTCard";

export const NFTDisplayGrid = ({nfts}) => {
    if (!nfts || nfts.length === 0) {
        return <div>no search results</div>
    }
    return (
        <Flex flexDirection={'row'} flexWrap={'wrap'} justifyContent={'space-evenly'}>
            {nfts && nfts.map((nft) => <NFTCard key={`${nft?.contract}-${nft?.token_id}-${nft?.blockchain}`} nft={nft}></NFTCard>)}
        </Flex>
    );
}