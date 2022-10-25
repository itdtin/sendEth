import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";
import "hardhat-change-network";
import "solidity-docgen";
import "hardhat-contract-sizer";
import "@tenderly/hardhat-tenderly"
import "./type-extensions";
import * as dotenv from "dotenv";


dotenv.config();

const { pk } = require("./secrets.json");

const config = {
  defaultNetwork: "hardhat",
  masterchain: "ethTestnet",
  networks: {
    hardhat: {
      // blockGasLimit: 10000000,
      // forking: {
      //   url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
      // }
    },
    ethTestnet: {
      url: `https://thrilling-convincing-fire.ethereum-goerli.quiknode.pro/2dccda67a7706727111291f27b483c645ce05f77`,
      chainId: 5,
      accounts: [pk],
      gasMultiplier: 1.25,
      lzChainId: 10121,
      weth: "0x329aDA69c04caE49A3A674E8B0e49DC1dc3e44cB",
      endpoint: "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23",
    },

  },

  etherscan: {
    apiKey: {
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },

    ],
  },
  mocha: {
    timeout: 30000,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  }
};

export default config;
