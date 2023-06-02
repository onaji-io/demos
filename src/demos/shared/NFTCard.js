import React, { useEffect, useState } from "react";
import {
  Image,
} from "@chakra-ui/react";

export const NFTCard = ({ nft }) => {
  return (
    <Image src={nft.image} width={250} height={250} marginBottom={8} borderRadius={'15px'}></Image>
  );
};
