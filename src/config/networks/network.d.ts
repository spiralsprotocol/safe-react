// matches src/logic/tokens/store/model/token.ts `TokenProps` type

export enum WALLETS {
  METAMASK = 'metamask',
  WALLET_CONNECT = 'walletConnect',
  TREZOR = 'trezor',
  LEDGER = 'ledger',
  TRUST = 'trust',
  FORTMATIC = 'fortmatic',
  PORTIS = 'portis',
  AUTHEREUM = 'authereum',
  TORUS = 'torus',
  COINBASE = 'coinbase',
  WALLET_LINK = 'walletLink',
  OPERA = 'opera',
  OPERA_TOUCH = 'operaTouch',
  LATTICE = 'lattice',
  KEYSTONE = 'keystone',
}

export enum FEATURES {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  SAFE_APPS = 'SAFE_APPS',
  CONTRACT_INTERACTION = 'CONTRACT_INTERACTION',
  DOMAIN_LOOKUP = 'DOMAIN_LOOKUP',
  SPENDING_LIMIT = 'SPENDING_LIMIT',
}

type Token = {
  address: string
  name: string
  symbol: string
  decimals: number
  logoUri?: string
}

export enum ETHEREUM_LAYER {
  L1 = '1',
  L2 = '2',
}

export enum ETHEREUM_NETWORK {
  UNKNOWN = '0',
  MAINNET = '42220', // Meaning Celo Mainnet
  LOCAL = '4447',
  ALFAJORES = '44787',
  BAKLAVA = '62320',
}

export type NetworkSettings = {
  // TODO: id now seems to be unnecessary
  id: ETHEREUM_NETWORK
  backgroundColor: string
  textColor: string
  label: string
  isTestNet: boolean
  ethereumLayer: ETHEREUM_LAYER
  nativeCoin: Token
}

// something around this to display or not some critical sections in the app, depending on the network support
// I listed the ones that may conflict with the network.
// If non is present, all the sections are available.
export type SafeFeatures = FEATURES[]

export type Wallets = WALLETS[]

export type GasPriceOracle = {
  url: string
  // Different gas api providers can use a different name to reflect different gas levels based on tx speed
  // For example in ethGasStation for ETHEREUM_MAINNET = safeLow | average | fast
  gasParameter: string
  // Some providers may not use the most common standard, gwei to return the gas price value
  // This is the case of Ethgasstation that returns price as gwei x 10.
  gweiFactor: string
}

type GasPrice =
  | {
      gasPrice: number
      gasPriceOracles?: GasPriceOracle[]
    }
  | {
      gasPrice?: number
      // for infura there's a REST API Token required stored in: `REACT_APP_INFURA_TOKEN`
      gasPriceOracles: GasPriceOracle[]
    }

export type EnvironmentSettings = GasPrice & {
  clientGatewayUrl: string
  txServiceUrl: string
  configServiceUrl: string
  safeUrl: string
  rpcServiceUrl: string
  safeAppsRpcServiceUrl: string
  networkExplorerName: string
  networkExplorerUrl: string
  networkExplorerApiUrl: string
}

type SafeEnvironments = {
  dev?: EnvironmentSettings
  staging?: EnvironmentSettings
  production: EnvironmentSettings
}

export type NetworkInfo = Omit<NetworkSettings, 'isTestNet' | 'ethereumLayer' | 'nativeCoin'> & { safeUrl: string }

export interface NetworkConfig {
  network: NetworkSettings
  disabledFeatures?: SafeFeatures
  disabledWallets?: Wallets
  environment: SafeEnvironments
}
