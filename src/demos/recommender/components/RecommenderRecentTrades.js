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
import { RecommenderListItem } from './RecommenderListItem';

export const RecommenderRecentTrades = () => {
    return (
        <Flex flexDirection={'column'}>
            <Heading size='sm' marginBottom={2}>Wallet recent trades</Heading>
            <Divider marginBottom={2} />
            <RecommenderListItem />
            <RecommenderListItem />
            <RecommenderListItem />
            <RecommenderListItem />
            <RecommenderListItem />
        </Flex>
    )
}