import { getRecommendationsFromOnaji } from "./RecommenderApi";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test("getRecommendationsFromOnaji fetches data from the api", async () => {
  const wallet = "0xabc123";
  const apiResponse = {
    contract_addresses: ["0x123456", "0x789101"],
    scores: [4.117968559265137, 4.074355125427246],
    runtime_milliseconds: 187.837890625,
    wallet_contents: ["0xdef456"],
  };

  fetch.mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(apiResponse),
    })
  );

  const data = await getRecommendationsFromOnaji(wallet);

  expect(fetch).toHaveBeenCalledWith(
    `https://demo-api.onaji.io/v1/recommend/contracts?blockchain=ETH&wallet_address=${wallet}&k=10&recently_popular_weight=0&return_wallet_content=1&exclude_owned_contracts=1`,
    { credentials: "include" }
  );

  expect(data).toEqual(apiResponse);
});

test("getRecommendationsFromOnaji throws an error if the api call fails", async () => {
  const wallet = "0xabc123";
  // simulate an api error
  fetch.mockImplementation(() => Promise.reject("API error"));

  try {
    const res = await getRecommendationsFromOnaji(wallet);
  } catch (err) {
    expect(err).toBe("API error");
  }
});
