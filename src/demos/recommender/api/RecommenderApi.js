export const getRecommendationsFromOnaji = async (wallet) => {
  const url = `https://demo-api.onaji.io/v1/recommend/contracts?blockchain=ETH&wallet_address=${wallet}&k=10&recently_popular_weight=0&return_wallet_content=1&exclude_owned_contracts=1`;
  try {
    const response = await fetch(url, { credentials: "include" });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getRandomWalletFromOnaji = async () => {
  const url = `https://demo-api.onaji.io/v1/recommend/random_wallet?blockchain=ETH`;

  try {
    const response = await fetch(url, { credentials: "include" });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCollectionRecommendationsFromOnaji = async (
  collectionAddress
) => {
  const url = `https://demo-api.onaji.io/v1/recommend/content_based_contract?blockchain=ETH&contract=${collectionAddress}&k=10&return_wallet_content=1&exclude_owned_contracts=1`;

  try {
    const response = await fetch(url, { credentials: "include" });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
