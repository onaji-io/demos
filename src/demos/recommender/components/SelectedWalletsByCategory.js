import React, { useEffect } from "react";
import { Select, Stack } from "@chakra-ui/react";

export const SelectedWalletsByCategory = ({ category, onClickFn }) => {
  const NOTABLE_WALLETS = [
    { wallet: "0xCe90a7949bb78892F159F428D0dC23a8E3584d75", name: "Cozomo" },
    {
      wallet: "0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4",
      name: "Wilson Cusack",
    },
    {
      wallet: "0xE5501BC2B0Df6D0D7daAFC18D2ef127D9e612963",
      name: "Mike Demarais from Rainbow",
    },
    { wallet: "0xc5F59709974262c4AFacc5386287820bDBC7eB3A", name: "Farokh" },
    {
      wallet: "0x90e5aa59a9dF2ADd394df81521DbBEd5F3c4A1A3",
      name: "Andy from Tesssera",
    },
    { wallet: "0xfbA2C2bBF977eDA19Ad819Bb46787F4C91d1fFaD", name: "Akzent" },
    {
      wallet: "0xed2ab4948bA6A909a7751DEc4F34f303eB8c7236",
      name: "Franklin is bored",
    },
    { wallet: "0x3f8cD3cc58391E704A2A0fab2482B8116Cb9D670", name: "Luca Netz" },
    { wallet: "0x000000000002e33d9a86567c6dfe6d92f6777d1e", name: "" },
    { wallet: "0x0000000000ad737a527c2757136ae83bb40b925e", name: "" },
    { wallet: "0x0000000000e43e0c383403dd18066ff60d5003b3", name: "" },
    { wallet: "0x0000000000f6b28110192be56ce7a4a9c75c79eb", name: "" },
    { wallet: "0x000000002e4254f818f89051778f423219de1626", name: "" },
  ];
  const GAMING_WALLETS = [
    { wallet: "0x0D24d79751236cBb715185aAb4eA401f2287f9CA", name: "" },
    { wallet: "0x2cD7fe9cD848ea6eAc3224f8c3aA56b86D7B3105", name: "" },
    { wallet: "0x6924686B3DCD04Ae8ef91a3fEccC262d020F519D", name: "" },
  ];
  const ANIME_WALLETS = [
    { wallet: "0x7db839bcF7C81dc0452e8FB491f887a4A77EA940", name: "" },
    { wallet: "0xB46134d5c0db2eF833402B3845B5A37B9174Fb4F", name: "" },
    { wallet: "0x15F5843AB2D339601Cf4eb84E6E4FBa00b21105E", name: "" },
  ];
  const PFP_COLLECTORS_WALLETS = [
    { wallet: "0xA9Cba6Fa4C40e5f885DB97A94528B9225A700b1c", name: "" },
    { wallet: "0x80aC8B6F4CACEa6129F5cF1365904F056b4E29EA", name: "" },
    { wallet: "0x1A409f336FcD7F97dB04a84Cc521309766321595", name: "" },
    { wallet: "0x6112083d4BB12dBF64e4850842685aaEfBeAcb10", name: "" },
  ];
  const YUGA_WALLETS = [
    { wallet: "0xe2A83b15FC300D8457eB9E176f98d92a8FF40a49", name: "" },
    { wallet: "0xf090Eb4c2B63e7B26E8Bb09e6Fc0cC3A7586263B", name: "" },
    { wallet: "0x7eb413211a9de1cd2fe8b8bb6055636c43f7d206", name: "" },
    { wallet: "0xf02e86d9e0efd57ad034faf52201b79917fe0713", name: "" },
  ];
  const GEN_ART_WALLETS = [
    { wallet: "0xF910131011D2aA6cE7D86E6F1Cbec7260bA193Cc", name: "" },
    { wallet: "0x3ea53c5ec9ee9C66Fc29f06c488BC1a0bA044Aa2", name: "" },
    { wallet: "0x56E81BC43A5fc9a01Ff000270bc55a02df268147", name: "" },
    { wallet: "0x13DDf16f41f9A634EACa69bE176773FE5C629c1E", name: "" },
  ];
  const MILADY_WALLETS = [
    { wallet: "0xC9b5db189631ED9bB35eb795826d90717b43B56A", name: "" },
    { wallet: "0x1DCa9aD259FAc5941292eEc5be6c45782b91B3FB", name: "" },
    { wallet: "0x2a2df89605714be2fe153Ab68ED247CeE67a870f", name: "" },
    { wallet: "0x2e6b28fda29e5328acd9cadaf6b5900daf5cb576", name: "" },
  ];

  let selectedWallets = GAMING_WALLETS;

  if (category === "milady") {
    selectedWallets = MILADY_WALLETS;
  } else if (category === "genart") {
    selectedWallets = GEN_ART_WALLETS;
  } else if (category === "yuga") {
    selectedWallets = YUGA_WALLETS;
  } else if (category === "pfp") {
    selectedWallets = PFP_COLLECTORS_WALLETS;
  } else if (category === "anime") {
    selectedWallets = ANIME_WALLETS;
  } else if (category === "gaming") {
    selectedWallets = GAMING_WALLETS;
  } else if (category === "notable") {
    selectedWallets = NOTABLE_WALLETS;
  }

  useEffect(() => {
    onClickFn(selectedWallets[0].wallet);
  }, [category]);

  return (
    <Stack spacing={3} width={"35%"}>
      <Select
        marginBottom={4}
        size="md"
        defaultValue={selectedWallets[0].wallet}
        onChange={(e) => onClickFn(e.target.value)}
      >
        {selectedWallets.map((option) => (
          <option key={option.wallet} value={option.wallet}>
            {option.wallet}
          </option>
        ))}
      </Select>
    </Stack>
  );
};
