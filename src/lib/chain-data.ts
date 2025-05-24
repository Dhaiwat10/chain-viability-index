import { calculateHVS, Chain } from "./chains";

export const chainData: Chain[] = [
  {
    name: "Fuel Ignition",
    iconURL:
      "https://chainbroker.io/_next/image/?url=https%3A%2F%2Fstatic.chainbroker.io%2Fmediafiles%2Fprojects%2Ffuel-network%2Ffuuel.jpg&w=2560&q=75",
    hardwareRequirements: {
      cpuCores: 2,
      RAM: 8,
      storage: 500,
      refLink:
        "https://docs.fuel.network/guides/running-a-node/#hardware-requirements",
    },
    maxTheoreticalTPS: 8 * 21000,
  },
  {
    name: "Solana",
    iconURL: "https://cryptologos.cc/logos/solana-sol-logo.png",
    hardwareRequirements: {
      cpuCores: 12,
      RAM: 128,
      storage: 1000,
      refLink: "https://docs.solana.com/running-validator/validator-reqs",
    },
    maxTheoreticalTPS: 65000,
  },
  {
    name: "Aptos",
    iconURL: "https://cryptologos.cc/logos/aptos-apt-logo.png",
    hardwareRequirements: {
      cpuCores: 32,
      RAM: 64,
      storage: 3000,
      refLink: "https://aptos.dev/nodes/aptos-node-requirements",
    },
    maxTheoreticalTPS: 160000,
  },
  {
    name: "Sui",
    iconURL: "https://cryptologos.cc/logos/sui-sui-logo.png",
    hardwareRequirements: {
      cpuCores: 10,
      RAM: 32,
      storage: 1000,
      refLink: "https://docs.sui.io/guides/build/fullnode",
    },
    maxTheoreticalTPS: 297000,
  },
  {
    name: "Monad",
    iconURL: "https://miro.medium.com/v2/resize:fit:400/0*aRHYdVg5kllfc7Gn.jpg",
    hardwareRequirements: {
      cpuCores: 16,
      RAM: 32,
      storage: 4000,
      refLink: "https://monad.xyz/docs/running-a-node",
    },
    maxTheoreticalTPS: 10000,
  },
  {
    name: "Sei",
    iconURL: "https://cryptologos.cc/logos/sei-sei-logo.png",
    hardwareRequirements: {
      cpuCores: 16,
      RAM: 64,
      storage: 1000,
      refLink: "https://docs.seinetwork.io/nodes/hardware-requirements",
    },
    maxTheoreticalTPS: 12500,
  },
  {
    name: "Starknet",
    iconURL: "https://cryptologos.cc/logos/starknet-token-strk-logo.png",
    hardwareRequirements: {
      cpuCores: 4,
      RAM: 8,
      storage: 500,
      refLink: "https://docs.starknet.io/docs/FullNode.html",
    },
    maxTheoreticalTPS: 857,
  },
  {
    name: "Ethereum",
    iconURL:
      "https://w7.pngwing.com/pngs/715/916/png-transparent-ethereum%EF%BC%8Ceth%EF%BC%8Cicon.png",
    hardwareRequirements: {
      cpuCores: 4,
      RAM: 16,
      storage: 2000,
      refLink:
        "https://www.quicknode.com/guides/infrastructure/node-setup/ethereum-full-node-vs-archive-node#what-is-an-ethereum-full-node",
    },
  },
  {
    name: "Bitcoin",
    iconURL: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    hardwareRequirements: {
      cpuCores: 2,
      RAM: 2,
      storage: 600,
      refLink: "https://bitcoin.org/en/full-node",
    },
  },
  {
    name: "Base",
    iconURL:
      "https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.jpg",
    hardwareRequirements: {
      cpuCores: 8,
      RAM: 16,
      storage: 2000,
      refLink: "https://docs.base.org/tutorials/run-a-base-node/",
    },
  },
  {
    name: "Optimism",
    iconURL: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
    hardwareRequirements: {
      cpuCores: 8,
      RAM: 16,
      storage: 1600,
      refLink:
        "https://docs.optimism.io/builders/node-operators/tutorials/mainnet",
    },
  },
  {
    name: "Arbitrum One",
    iconURL: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
    hardwareRequirements: {
      cpuCores: 4,
      RAM: 16,
      storage: 2500,
      refLink: "https://docs.arbitrum.io/run-arbitrum-node/run-full-node",
    },
  },
  {
    name: "ZKSync Era",
    iconURL:
      "https://icoholder.com/files/img/60f7217ff5d8bd7fdfdf6d5a2403589e.jpeg",
    hardwareRequirements: {
      cpuCores: 4,
      RAM: 16,
      storage: 700,
      refLink: "https://github.com/matter-labs/zksync-era/blob/main/docs/src/guides/external-node/00_quick_start.md",
    },
  },
  {
    name: "Gnosis",
    iconURL: "https://cryptologos.cc/logos/gnosis-gno-gno-logo.png?v=002",
    hardwareRequirements: {
      cpuCores: 4,
      RAM: 16,
      storage: 2000,
      refLink: "https://docs.gnosischain.com/node#requirements",
    },
  },
];

export const getChainDataWithHVS = () => {
  const withHVS = chainData.map((chain) => {
    return {
      ...chain,
      hvs: calculateHVS(chain),
    };
  });

  // sort by HVS in descending order
  return withHVS.sort((a, b) => b.hvs - a.hvs);
};

export const renderCPUCores = (cpuCores: number) => {
  return cpuCores === 1 ? "1 core" : `${cpuCores} cores`;
};

export const renderRAM = (RAM: number) => {
  return `${RAM} GB`;
};

export const renderStorage = (storage: number) => {
  if (storage < 1000) {
    return `${storage} GB`;
  }
  const storageInTB = storage / 1000;

  // if there is a decimal, round to 2 decimal places
  if (storageInTB % 1 !== 0) {
    return `${storageInTB.toFixed(2)} TB`;
  }

  return `${storageInTB} TB`;
};
