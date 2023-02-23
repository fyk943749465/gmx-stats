import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

import { ARBITRUM, AVALANCHE } from './addresses'

const apolloOptions = {
  query: {
    fetchPolicy: 'no-cache'
  },
  watchQuery: {
    fetchPolicy: 'no-cache'
  }
}
// https://api.thegraph.com/subgraphs/name/fyk943749465/prices
const arbitrumPricesClient = new ApolloClient({
  // link: new HttpLink({ uri: 'https://api.thegraph.com/subgraphs/name/gmx-io/gmx-arbitrum-prices', fetch }),
  link: new HttpLink({ uri: 'https://api.thegraph.com/subgraphs/name/fyk943749465/prices', fetch }),
  cache: new InMemoryCache(),
  defaultOptions: apolloOptions
})
// https://api.thegraph.com/subgraphs/name/fyk943749465/avalanche-prices
const avalanchePricesClient = new ApolloClient({
  // link: new HttpLink({ uri: 'https://api.thegraph.com/subgraphs/name/gmx-io/gmx-avalanche-prices', fetch }),
  link: new HttpLink({ uri: 'https://api.thegraph.com/subgraphs/name/fyk943749465/avalanche-prices', fetch }),
  cache: new InMemoryCache(),
  defaultOptions: apolloOptions
})

function getPricesClient(chainId) {
  if (chainId === ARBITRUM) {
    return arbitrumPricesClient
  } else if (chainId === AVALANCHE) {
    return avalanchePricesClient
  } else {
    throw new Error(`Invalid chainId ${chainId}`)
  }
}

module.exports = {
  getPricesClient
}
