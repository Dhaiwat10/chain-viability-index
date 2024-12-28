export type Chain = {
  name: string;
  iconURL: string;
  hardwareRequirements: HardwareRequirements;
  maxTheoreticalTPS?: number;
};

type HardwareRequirements = {
  cpuCores: number;
  RAM: number; // in GB
  storage: number; // in GB
  refLink: string;
};

// Scoring weights
const cpuWeights = [
  { max: 2, score: 100 },
  { max: 4, score: 90 },
  { max: 8, score: 70 },
  { max: 16, score: 50 },
  { max: 32, score: 30 },
  { max: Infinity, score: 10 },
];

const ramWeights = [
  { max: 4, score: 100 },
  { max: 8, score: 85 },
  { max: 16, score: 70 },
  { max: 32, score: 50 },
  { max: 64, score: 20 },
  { max: Infinity, score: 0 },
];

const storageWeights = [
  { max: 500, score: 100 },   // Base tier for all chains under 500GB
  { max: 750, score: 92 },    // New intermediate tier
  { max: 1000, score: 85 },   // First major penalty tier
  { max: 2000, score: 60 },   // Significant drop
  { max: 3000, score: 35 },   // Heavy penalty
  { max: 4000, score: 15 },   // Severe penalty
  { max: Infinity, score: 0 }, // Anything above is considered impractical
];

// Function to get weight score
const getWeightScore = (
  value: number,
  weights: { max: number; score: number }[]
) => {
  return weights.find((weight) => value <= weight.max)?.score ?? 50;
};

// Calculate HVS
export const calculateHVS = (chain: Chain): number => {
  const { cpuCores, RAM, storage } = chain.hardwareRequirements;

  // Get scores for CPU, RAM, and storage
  const cpuScore = getWeightScore(cpuCores, cpuWeights);
  const ramScore = getWeightScore(RAM, ramWeights);
  const storageScore = getWeightScore(storage, storageWeights);

  // Weighted average calculation
  const hvs = 0.45 * cpuScore + 0.4 * ramScore + 0.15 * storageScore;

  return Math.round(hvs * 100) / 100; // Round to 2 decimal places
};

export const calculateTPSScore = (chain: Chain): number => {
  const { maxTheoreticalTPS } = chain;

  if (!maxTheoreticalTPS) {
    throw new Error("Max theoretical TPS is not defined");
  }

  // just a percentage of the range from 800 to 300000
  const tpsScore = Math.round((maxTheoreticalTPS / 300000) * 100);

  return tpsScore;
};
