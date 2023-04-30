import React from 'react';
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
import { RecommenderNFTCard } from "./RecommenderNFTCard";
import { generateUUID } from "../../shared/Utils";

export const RecommenderDisplayGrid = ({nfts}) => {
    if (!nfts || nfts.length === 0) {
        return <div>no search results</div>
    }
    return (
        <Flex flexDirection={'row'} flexWrap={'wrap'} justifyContent={'space-evenly'}>
            {nfts && nfts.map((nft) => <RecommenderNFTCard key={generateUUID(nft?.token_id, nft?.contract, nft?.blockchain)} nft={nft}></RecommenderNFTCard>)}
        </Flex>
    );
}