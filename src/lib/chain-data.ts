import { calculateHVS, Chain } from "./chains";

export const chainData: Chain[] = [
  // TODO: No bandwidth requirements found for Fuel Ignition
  // {
  //   name: "Fuel Ignition",
  //   iconURL:
  //     "https://chainbroker.io/_next/image/?url=https%3A%2F%2Fstatic.chainbroker.io%2Fmediafiles%2Fprojects%2Ffuel-network%2Ffuuel.jpg&w=2560&q=75",
  //   hardwareRequirements: {
  //     cpuCores: 2,
  //     RAM: 8,
  //     storage: 500,
  //     refLink:
  //       "https://docs.fuel.network/guides/running-a-node/#hardware-requirements",
  //   },
  //   maxTheoreticalTPS: 8 * 21000,
  // },
  {
    name: "Solana",
    iconURL: "/solana.jpg",
    hardwareRequirements: {
      cpuCores: 12,
      RAM: 128,
      storage: 1000,
      bandwidth: 15,
      refLink: "https://docs.solana.com/running-validator/validator-reqs",
    },
    maxTheoreticalTPS: 65000,
  },
  {
    name: "Aptos",
    iconURL: "/aptos.png",
    hardwareRequirements: {
      cpuCores: 32,
      RAM: 64,
      storage: 3000,
      bandwidth: 15,
      refLink: "https://aptos.dev/nodes/aptos-node-requirements",
    },
    maxTheoreticalTPS: 160000,
  },
  {
    name: "Sui",
    iconURL: "/sui.png",
    hardwareRequirements: {
      cpuCores: 10,
      RAM: 32,
      storage: 1000,
      bandwidth: 3,
      refLink: "https://docs.sui.io/guides/build/fullnode",
    },
    maxTheoreticalTPS: 297000,
  },
  {
    name: "Monad",
    iconURL: "/monad.jpg",
    hardwareRequirements: {
      cpuCores: 16,
      RAM: 32,
      storage: 4000,
      bandwidth: 3,
      refLink: "https://monad.xyz/docs/running-a-node",
    },
    maxTheoreticalTPS: 10000,
  },
  {
    name: "Sei",
    iconURL: "/sei.png",
    hardwareRequirements: {
      cpuCores: 16,
      RAM: 64,
      storage: 1000,
      bandwidth: 15,
      refLink: "https://docs.seinetwork.io/nodes/hardware-requirements",
    },
    maxTheoreticalTPS: 12500,
  },
  {
    name: "Starknet",
    iconURL: "/starknet.png",
    hardwareRequirements: {
      cpuCores: 4,
      RAM: 8,
      storage: 500,
      bandwidth: 1.5,
      refLink: "https://docs.starknet.io/ecosystem/fullnodes-rpc-providers/#full_nodes",
    },
    maxTheoreticalTPS: 857,
  },
  {
    name: "Ethereum",
    iconURL: "/ethereum.png",
    hardwareRequirements: {
      cpuCores: 4,
      RAM: 16,
      storage: 2000,
      bandwidth: 2,
      refLink:
        "https://www.quicknode.com/guides/infrastructure/node-setup/ethereum-full-node-vs-archive-node#what-is-an-ethereum-full-node",
    },
  },
  {
    name: "Bitcoin",
    iconURL: "/bitcoin.png",
    hardwareRequirements: {
      cpuCores: 2,
      RAM: 2,
      storage: 600,
      bandwidth: 0.3,
      refLink: "https://bitcoin.org/en/full-node",
    },
  },
  {
    name: "Base",
    iconURL: "/base.webp",
    hardwareRequirements: {
      cpuCores: 8,
      RAM: 16,
      storage: 2000,
      bandwidth: 2,
      refLink: "https://docs.base.org/tutorials/run-a-base-node/",
    },
  },
  {
    name: "Optimism",
    iconURL: "/optimism.png",
    hardwareRequirements: {
      cpuCores: 8,
      RAM: 16,
      storage: 1600,
      bandwidth: 2,
      refLink:
        "https://docs.optimism.io/builders/node-operators/tutorials/mainnet",
    },
  },
  {
    name: "Arbitrum One",
    iconURL: "/arbitrum.png",
    hardwareRequirements: {
      cpuCores: 4,
      RAM: 16,
      storage: 2500,
      bandwidth: 3,
      refLink: "https://docs.arbitrum.io/run-arbitrum-node/run-full-node",
    },
  },
  {
    name: "ZKSync Era",
    iconURL: "/zksync.webp",
    hardwareRequirements: {
      cpuCores: 4,
      RAM: 32,
      storage: 500,
      bandwidth: 2,
      refLink:
        "https://github.com/matter-labs/zksync-era/blob/main/docs/src/guides/external-node/00_quick_start.md",
    },
  },
  {
    name: "Gnosis",
    iconURL: "/gnosis.png",
    hardwareRequirements: {
      cpuCores: 4,
      RAM: 16,
      storage: 2000,
      bandwidth: 3,
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

export const renderBandwidth = (bandwidth: number) => {
  if (bandwidth > 10) {
    return `> 10TB/month`;
  }

  return `~ ${bandwidth} TB/month`;
};
