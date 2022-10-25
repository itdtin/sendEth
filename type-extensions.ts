import "hardhat/types/config";
import "hardhat/types/runtime";

// @ts-ignore
import {BN} from "ethereumjs-util";
import {HttpNetworkAccountsConfig} from "hardhat/src/types/config";

declare module "hardhat/types/config" {
  export interface HardhatNetworkConfig {
    chainId: number;
    from?: string;
    gas: "auto" | number;
    gasPrice: "auto" | number;
    gasMultiplier: number;
    initialBaseFeePerGas?: number;
    hardfork: string;
    mining: HardhatNetworkMiningConfig;
    accounts: HardhatNetworkAccountsConfig;
    blockGasLimit: number;
    minGasPrice: BN;
    throwOnTransactionFailures: boolean;
    throwOnCallFailures: boolean;
    allowUnlimitedContractSize: boolean;
    initialDate: string;
    loggingEnabled: boolean;
    forking?: HardhatNetworkForkingConfig;
    coinbase?: string;
    chains: HardhatNetworkChainsConfig;
    lzChainId: number;
    endpoint: string;
    weth: string;
  }

  export interface HardhatConfig {
    defaultNetwork: string;
    paths: ProjectPathsConfig;
    networks: NetworksConfig;
    solidity: SolidityConfig;
    mocha: Mocha.MochaOptions;
    masterchain: string;
    getNetworkById: Function;
  }

  export interface NetworksConfig {
    hardhat: HardhatNetworkConfig;
    localhost: HttpNetworkConfig;

    [networkName: string]: NetworkConfig;
  }

  export interface HttpNetworkConfig {
    chainId?: number;
    from?: string;
    gas: "auto" | number;
    gasPrice: "auto" | number;
    gasMultiplier: number;
    url: string;
    timeout: number;
    httpHeaders: { [name: string]: string };
    accounts: HttpNetworkAccountsConfig;
    lzChainId: number;
    endpoint: string;
    weth: string;

  }

  // @ts-ignore
  export type NetworkConfig = HardhatNetworkConfig | HttpNetworkConfig;

}

