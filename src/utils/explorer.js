export default async function getCurrentChainHeight() {
  const url = 'https://api-testnet.ergoplatform.com/api/v1/blocks?limit=1'
  return fetch(url)
    .then((res) => res.json())
    .then((data) => { return data.total})
}
