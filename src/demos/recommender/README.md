## Onaji Recommender

live demo:
https://demos.onaji.io/recommender

This demo shows an example of how to integrate with Onaji's recommender api endpoints. Simply paste a wallet into the search bar to recieve a list of recommnded collections, or try a random wallet. You can also connect your wallet if you have an extension such as Metamask.

https://github.com/onaji-io/demos/assets/8813282/b9d9b4dc-935f-4124-9322-ca7762c4f914

The frontend React code in this repository is given as an example to showcase how an application could interact with Onaji's API endpoints.

Please note that this is only a limited demo of the Onaji recommender. For more information, [please contact us](https://onaji.io/).

## API Endpoints

For a full list of Onaji's endpoints, please see the [official documentation](https://api.onaji.io/docs).

This demo uses the [/v1/recommend/contracts endpoint](https://api.onaji.io/docs#/recommender/contract_recommender_endpoint_v1_recommend_contracts_get) to return a list of recommended collections based on a user wallet.

The structure of the response is as follows:
| field | type | explanation |
|----------------------|----------|-----------------------------------------------------------------------------------|
| contract_addresses | string[] | A list of addresses of recommended collections |
| runtime_milliseconds | number | The time required to generate collection recommendations |
| scores | number[] | A list containing the score for each recommended collection |
| wallet_contents | string[] | A list containing collection addresses of recent NFT transactions for this wallet |

Please note that the `runtime_milliseconds` field is the time required for Onaji's systems to generate a list of recommendations for a wallet. It does not include the time required for the frontend to fetch metadata and images to display information about that collection.

For example, searching for wallet `0xf4d78fb51ff3ed3458995db8789ee7ac4e575d08` yieled:

```
{
  "contract_addresses": [
    "0x90a1f4b78fa4198bb620b7686f510fd476ec7a0b",
    "0x231d3559aa848bf10366fb9868590f01d34bf240",
    "0x764aeebcf425d56800ef2c84f2578689415a2daa",
    "0xcd1f6be81f1dc58558f44bbc5ca4cc43cbb1ec05",
    "0x6c410cf0b8c113dc6a7641b431390b11d5515082",
    "0x52e69720be9b7200f7ea509a6f06d643ad24a777",
    "0x790b2cf29ed4f310bf7641f013c65d4560d28371",
    "0x6339e5e072086621540d0362c4e3cea0d643e114",
    "0x283c0bba69ebd4643cfce761b34b0206e75b2091",
    "0x51bd5948cf84a1041d2720f56ded5e173396fc95"
  ],
  "scores": [
    4.117968559265137,
    4.074355125427246,
    4.061517715454102,
    3.9571189880371094,
    3.9458518028259277,
    3.894456624984741,
    3.808011770248413,
    3.7999253273010254,
    3.7810964584350586,
    3.7174901962280273
  ],
  "runtime_milliseconds": 187.837890625,
  "wallet_contents": [
    "0xbe9371326f91345777b04394448c23e2bfeaa826",
    "0x07ce82f414a42d9a73b0bd9ec23c249d446a0109",
    "0xe17827609ac34443b3987661f4e037642f6bd9ba",
    "0xac5aeb3b4ac8797c2307320ed00a84b869ab9333",
    "0x201ea40d5b47e94ef51fd968029b01e6951ac0b6",
    "0xad27c6ef1c2e37a78514a9e54f5c35a8bf51601d",
    "0x3110ef5f612208724ca51f5761a69081809f03b7",
    "0xe4597f9182ba947f7f3bf8cbc6562285751d5aee",
    "0xfcf89a84c3f2e6092605e4f0aba7a84fdcff1863",
    "0x04793d5b788386125a224359dab7bcbcae22355a",
    ...
  ]
}
```

Please note that the response data and recommendations for a particular wallet will change over time, depending on the activity of that wallet.
