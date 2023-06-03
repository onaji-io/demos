import React, { useEffect, useState } from "react";
import { Box, Image, Fade, Text, useMediaQuery } from "@chakra-ui/react";

const attributeTextStyles = {
  color: "white",
  display: "inline-block",
  border: "1px solid white",
  borderRadius: "32px",
  padding: "2px 8px 2px 8px",
  margin: "2px",
};

const EthereumDisplay = ({ attr }) => {
  return (
    <Text sx={attributeTextStyles} fontSize={"12px"} key={attr?.trait_type}>
      {attr?.trait_type}:{" "}
      {attr?.value?.length > 20 ? attr.value.slice(0, 22) + "..." : attr?.value}
    </Text>
  );
};

export const NFTCard = ({ nft }) => {
  // const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
  const isLargerThan1200 = true;
  const [isHover, setIsHover] = useState(false);

  const attributeContainerStyles = {
    position: "absolute",
    top: "0px",
    opacity: 0,
    height: "100%",
    width: "100%",
    borderRadius: "15px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
  return (
    <Box
      width={250}
      height={250}
      marginBottom={8}
      position="relative"
      borderRadius="15px"
      overflow="hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      boxShadow="0px 0px 6px 2px rgba(255, 255, 255, 0.25)"
      _hover={{
        cursor: "pointer",
        "> .ape-image": {
          filter: "auto",
          brightness: "40%",
        },
        ".ape-attribute-box": { opacity: 1 },
      }}
    >
      <Image
        src={nft.image}
        width={250}
        height={250}
        marginBottom={8}
        borderRadius={"15px"}
        className="ape-image"
      ></Image>
      <Fade in={isHover}>
        <Box
          className="ape-attribute-box"
          sx={attributeContainerStyles}
          backdropFilter="auto"
          // backdropBlur="8px"
          borderRadius="15px"
        >
          <Text
            color="white"
            fontSize={"md"}
            fontFamily="Plus Jakarta Sans, semibold, sans-serif"
            fontWeight="bold"
          >
            Token {nft?.token_id}
          </Text>
          <div>
            {isLargerThan1200 &&
              nft?.attributes &&
              Array.isArray(nft?.attributes) &&
              nft?.attributes?.map((attr) => <EthereumDisplay attr={attr} />)}
          </div>
        </Box>
      </Fade>
    </Box>
  );
};
