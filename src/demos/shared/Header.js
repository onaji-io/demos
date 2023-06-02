import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Fade, Flex, Heading } from "@chakra-ui/react";
import { CloseIcon, InfoOutlineIcon, SearchIcon } from "@chakra-ui/icons";

const Header = ({
  title,
  titleInfo,
  connectFn,
  isConnecting,
  connectedAccounts,
  showConnect,
}) => {
  const [isTooltipHover, setIsTooltipHover] = useState(false);
  return (
    <>
      <Flex
        alignItems={"center"}
        paddingTop={"40px"}
        justifyContent={"space-between"}
        marginBottom={4}
      >
        <Box marginRight={16}>
          <Heading size="md" as="h2">
            onaji。
          </Heading>
        </Box>
        <Flex alignItems={"center"} position={"relative"}>
          {showConnect && (
            <Button
              onClick={connectFn}
              disabled={isConnecting || connectedAccounts?.length > 0}
              marginRight={2}
              style={{ color: "#805AD5" }}
            >
              {isConnecting
                ? "Connecting..."
                : connectedAccounts?.length > 0
                ? "Connected"
                : "Connect Wallet"}
            </Button>
          )}
          <Heading size="md" as="h2" marginRight={2}>
            {title}
          </Heading>
          <InfoOutlineIcon
            color="#A0A2A6"
            cursor="pointer"
            onMouseEnter={() => setIsTooltipHover(true)}
            onMouseLeave={() => setIsTooltipHover(false)}
          />
          <Fade in={isTooltipHover} style={{ zIndex: 1 }}>
            <Box
              background={"white"}
              position="absolute"
              top="30px"
              right="0px"
              border="1px solid #6D5773"
              width="278px"
              zIndex="1"
              opacity={isTooltipHover ? 1 : 0}
              display={isTooltipHover ? "block" : "none"}
              padding={4}
            >
              {titleInfo}
            </Box>
          </Fade>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default Header;
