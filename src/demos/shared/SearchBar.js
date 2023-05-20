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

export const SearchBar = ({
  placeholderText,
  searchHandler,
  searchPrompts,
  children,
  parentSearchValue,
}) => {
  const [searchText, setSearchText] = useState(parentSearchValue);

  useEffect(() => {
    setSearchText(parentSearchValue);
  }, [parentSearchValue]);

  return (
    <>
      <Flex marginTop={4} marginBottom={4}>
        <InputGroup width="100%" marginRight={4}>
          <Input
            width="100%"
            value={searchText}
            placeholder={placeholderText}
            onChange={(v) => {
              setSearchText(v.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchHandler(searchText);
              }
            }}
          ></Input>
          <InputRightElement
            children={
              <CloseIcon
                fontSize="sm"
                cursor="pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchText("");
                }}
              />
            }
          />
        </InputGroup>
        <Button
          onClick={() => {
            searchHandler(searchText);
          }}
          marginRight={4}
          style={{ backgroundColor: "#E9D8FD", color: "#805AD5" }}
          width={32}
        >
          Search
        </Button>
        {children}
      </Flex>
      {searchPrompts?.length &&
        searchPrompts.map((p) => (
          <Text
            cursor={"pointer"}
            onClick={() => {
              setSearchText(p);
            }}
            key={p}
            display={"inline"}
            marginRight={4}
          >
            {p}
          </Text>
        ))}
    </>
  );
};
