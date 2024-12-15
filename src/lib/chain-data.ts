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
      cpuCores: 8,
      RAM: 128,
      storage: 4000,
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
      storage: 2000,
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
      storage: 250,
      refLink: "https://docs.starknet.io/docs/FullNode.html",
    },
    maxTheoreticalTPS: 857,
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
  return `${storageInTB.toFixed(0)} TB`;
};
