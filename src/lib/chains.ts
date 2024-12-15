export type Chain = {
  name: string;
  iconURL: string;
  hardwareRequirements: HardwareRequirements;
  maxTheoreticalTPS: number;
};

type HardwareRequirements = {
  cpuCores: number;
  RAM: number; // in GB
  storage: number; // in GB
  refLink: string;
};

// Scoring weights
const cpuWeights = [
  { max: 2, score: 90 },
  { max: 4, score: 70 },
  { max: 8, score: 40 },
  { max: 16, score: 20 },
  { max: 32, score: 10 },
  { max: Infinity, score: 5 },
];

const ramWeights = [
  { max: 8, score: 95 },
  { max: 16, score: 70 },
  { max: 32, score: 40 },
  { max: 64, score: 20 },
  { max: Infinity, score: 10 },
];

const storageWeights = [
  { max: 250, score: 95 },
  { max: 500, score: 80 },
  { max: 1000, score: 70 },
  { max: 2000, score: 40 },
  { max: 3000, score: 20 },
  { max: 4000, score: 10 },
  { max: Infinity, score: 5 },
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

  // just a percentage of the range from 800 to 300000
  const tpsScore = Math.round((maxTheoreticalTPS / 300000) * 100);

  return tpsScore;
}