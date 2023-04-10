import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";
import { setGlobalDispatcher, ProxyAgent } from "undici";

const proxyAgent = new ProxyAgent("http://127.0.0.1:7890");
setGlobalDispatcher(proxyAgent);
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/n8xcT_93off23GqcuNON_fm7_kerbSX-",
      accounts: {
        mnemonic: process.env.mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
     
    },

  },
  etherscan: {
    apiKey: {
      sepolia: process.env.apiKey!,
    },
  },
};

export default config;
