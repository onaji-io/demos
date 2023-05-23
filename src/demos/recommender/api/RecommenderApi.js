export const getRecommendationsFromOnaji = async (wallet) => {
  const url = `https://staging-api.onaji.io/v1/recommend/contracts?blockchain=ETH&wallet_address=${wallet}&k=10&recently_popular_weight=0&return_wallet_content=1&exclude_owned_contracts=1`;
  try {
    const response = await fetch(url, { credentials: "include" });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
